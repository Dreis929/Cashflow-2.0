import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import type { Financing } from '@/types/finances';

interface FinancingFormProps {
  financing?: Financing | null;
  onSubmit: (data: Omit<Financing, 'id'>) => void;
  onCancel: () => void;
}

export default function FinancingForm({ financing, onSubmit, onCancel }: FinancingFormProps) {
  const [formData, setFormData] = useState<Omit<Financing, 'id'>>({
    name: financing?.name || '',
    description: financing?.description || '',
    initialAmount: financing?.initialAmount || 0,
    remainingAmount: financing?.remainingAmount || 0,
    monthlyPayment: financing?.monthlyPayment || 0,
    startDate: financing?.startDate || new Date().toISOString().split('T')[0],
    endDate: financing?.endDate || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Bitte einen Namen eingeben');
      return;
    }

    if (formData.initialAmount <= 0) {
      alert('Bitte einen gültigen Gesamtbetrag eingeben');
      return;
    }

    if (!formData.endDate) {
      alert('Bitte ein Enddatum eingeben');
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="financing-name">Name *</Label>
        <Input
          id="financing-name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="z.B. Auto-Finanzierung"
          className="bg-zinc-800 border-zinc-700 text-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="financing-description">Beschreibung</Label>
        <Input
          id="financing-description"
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="z.B. VW Golf 2024"
          className="bg-zinc-800 border-zinc-700 text-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="financing-initial">Gesamtbetrag (€) *</Label>
          <Input
            id="financing-initial"
            type="number"
            step="0.01"
            value={formData.initialAmount}
            onChange={(e) => setFormData({ ...formData, initialAmount: parseFloat(e.target.value) || 0 })}
            placeholder="0.00"
            className="bg-zinc-800 border-zinc-700 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="financing-remaining">Restbetrag (€) *</Label>
          <Input
            id="financing-remaining"
            type="number"
            step="0.01"
            value={formData.remainingAmount}
            onChange={(e) => setFormData({ ...formData, remainingAmount: parseFloat(e.target.value) || 0 })}
            placeholder="0.00"
            className="bg-zinc-800 border-zinc-700 text-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="financing-monthly">Monatliche Rate (€) *</Label>
        <Input
          id="financing-monthly"
          type="number"
          step="0.01"
          value={formData.monthlyPayment}
          onChange={(e) => setFormData({ ...formData, monthlyPayment: parseFloat(e.target.value) || 0 })}
          placeholder="0.00"
          className="bg-zinc-800 border-zinc-700 text-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="financing-start">Startdatum *</Label>
          <Input
            id="financing-start"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="bg-zinc-800 border-zinc-700 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="financing-end">Enddatum *</Label>
          <Input
            id="financing-end"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="bg-zinc-800 border-zinc-700 text-white"
          />
        </div>
      </div>

      {/* Info Box */}
      {formData.initialAmount > 0 && formData.remainingAmount > 0 && (
        <div className="p-3 bg-blue-900/30 border border-blue-800 rounded-lg">
          <div className="text-sm space-y-1">
            <div className="flex justify-between text-zinc-300">
              <span>Bereits bezahlt:</span>
              <span className="font-semibold text-white">
                €{(formData.initialAmount - formData.remainingAmount).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-zinc-300">
              <span>Fortschritt:</span>
              <span className="font-semibold text-white">
                {((formData.initialAmount - formData.remainingAmount) / formData.initialAmount * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Abbrechen
        </Button>
        <Button type="submit">
          {financing ? 'Aktualisieren' : 'Hinzufügen'}
        </Button>
      </div>
    </form>
  );
}
