import { useState } from 'react';
import { Card } from '@tremor/react';
import { Wallet, TrendingUp, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { formatCurrency } from '@/utils/helpers';
import { updateIncome } from '@/utils/financialStorage';
import { useToast } from './ui/use-toast';

interface IncomeManagerProps {
  monthlyIncome: number;
  onUpdate?: () => void;
}

export default function IncomeManager({ monthlyIncome, onUpdate }: IncomeManagerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newIncome, setNewIncome] = useState(monthlyIncome);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newIncome < 0) {
      toast({
        variant: 'destructive',
        title: 'Ungültige Eingabe',
        description: 'Das Einkommen kann nicht negativ sein',
      });
      return;
    }

    updateIncome({ monthly: newIncome, sources: [] });
    
    toast({
      variant: 'success',
      title: 'Einkommen aktualisiert',
      description: `Neues monatliches Einkommen: ${formatCurrency(newIncome)}`,
    });

    setDialogOpen(false);
    onUpdate?.();
  };

  const yearlyIncome = monthlyIncome * 12;

  return (
    <>
      <Card className="bg-gradient-to-br from-green-900/50 to-green-950/50 border-2 border-green-800 p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/20">
                <Wallet className="h-7 w-7 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Monatliches Einkommen</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(monthlyIncome)}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setNewIncome(monthlyIncome);
                setDialogOpen(true);
              }}
              className="gap-2"
            >
              <Edit className="h-4 w-4" />
              Bearbeiten
            </Button>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-green-800">
            <TrendingUp className="h-4 w-4 text-green-400" />
            <div className="flex-1">
              <p className="text-xs text-zinc-400">Jährliches Einkommen</p>
              <p className="text-sm font-semibold text-white">{formatCurrency(yearlyIncome)}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Monatliches Einkommen bearbeiten</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Aktualisieren Sie Ihr durchschnittliches monatliches Netto-Einkommen
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="income-amount">Monatliches Netto-Einkommen (€)</Label>
              <Input
                id="income-amount"
                type="number"
                step="0.01"
                value={newIncome}
                onChange={(e) => setNewIncome(parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="bg-zinc-800 border-zinc-700 text-white"
                autoFocus
              />
              <p className="text-xs text-zinc-500">
                Jährlich: {formatCurrency(newIncome * 12)}
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Abbrechen
              </Button>
              <Button type="submit">
                Speichern
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
