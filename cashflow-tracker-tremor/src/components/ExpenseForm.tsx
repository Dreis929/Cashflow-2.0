import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { CATEGORIES, type Expense, type ExpenseFormData } from '@/types';
import { PlusCircle, Save, X } from 'lucide-react';

interface ExpenseFormProps {
  onSubmit: (expense: ExpenseFormData) => void;
  onCancel?: () => void;
  initialData?: Expense;
  isEditing?: boolean;
}

export default function ExpenseForm({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
}: ExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseFormData>({
    date: initialData?.date || new Date().toISOString().split('T')[0],
    amount: initialData?.amount || 0,
    category: initialData?.category || CATEGORIES[1],
    description: initialData?.description || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || formData.amount <= 0) {
      alert('Bitte gib einen gültigen Betrag ein!');
      return;
    }
    
    if (!formData.description.trim()) {
      alert('Bitte gib eine Beschreibung ein!');
      return;
    }

    onSubmit(formData);
    
    // Reset form nach Submit (nur bei neuem Eintrag)
    if (!isEditing) {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        amount: 0,
        category: CATEGORIES[1],
        description: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Datum */}
        <div className="space-y-2">
          <Label htmlFor="date">Datum</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            className="bg-zinc-900 border-zinc-800"
          />
        </div>

        {/* Betrag */}
        <div className="space-y-2">
          <Label htmlFor="amount">Betrag (€)</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            value={formData.amount || ''}
            onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
            required
            placeholder="0.00"
            className="bg-zinc-900 border-zinc-800"
          />
        </div>

        {/* Kategorie */}
        <div className="space-y-2">
          <Label htmlFor="category">Kategorie</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger className="bg-zinc-900 border-zinc-800">
              <SelectValue placeholder="Kategorie wählen" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.filter(cat => cat !== 'Alle Kategorien').map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Beschreibung */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Beschreibung</Label>
          <Input
            id="description"
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            placeholder="z.B. Supermarkt Einkauf"
            className="bg-zinc-900 border-zinc-800"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Abbrechen
          </Button>
        )}
        <Button
          type="submit"
          className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4" />
              Aktualisieren
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4" />
              Hinzufügen
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
