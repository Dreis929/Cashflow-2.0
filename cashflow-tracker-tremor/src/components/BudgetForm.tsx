import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Trash2 } from 'lucide-react';
import type { Budget, BudgetSubcategory } from '@/types/finances';

interface BudgetFormProps {
  budget?: Budget | null;
  onSubmit: (data: Omit<Budget, 'id'>) => void;
  onCancel: () => void;
}

const BUDGET_CATEGORIES = [
  '🍔 Lebensmittel',
  '🚗 Transport',
  '🎮 Unterhaltung',
  '💊 Gesundheit',
  '📚 Bildung',
  '🏠 Wohnen',
  '👕 Kleidung',
  '🎁 Geschenke',
  '🔧 Sonstiges',
];

export default function BudgetForm({ budget, onSubmit, onCancel }: BudgetFormProps) {
  const [formData, setFormData] = useState<Omit<Budget, 'id'>>({
    category: budget?.category || '',
    limit: budget?.limit || 0,
    spent: budget?.spent || 0,
    period: budget?.period || 'monthly',
    subcategories: budget?.subcategories || [],
  });

  const [newSubcategory, setNewSubcategory] = useState<BudgetSubcategory>({
    name: '',
    limit: 0,
    spent: 0,
  });

  const handleAddSubcategory = () => {
    if (!newSubcategory.name.trim() || newSubcategory.limit <= 0) {
      alert('Bitte Name und Limit für Unterkategorie eingeben');
      return;
    }

    setFormData({
      ...formData,
      subcategories: [...(formData.subcategories || []), { ...newSubcategory }],
    });

    setNewSubcategory({ name: '', limit: 0, spent: 0 });
  };

  const handleRemoveSubcategory = (index: number) => {
    setFormData({
      ...formData,
      subcategories: formData.subcategories?.filter((_, i) => i !== index) || [],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category) {
      alert('Bitte eine Kategorie auswählen');
      return;
    }

    if (formData.limit <= 0) {
      alert('Bitte ein gültiges Limit eingeben');
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="budget-category">Kategorie *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger id="budget-category" className="bg-zinc-800 border-zinc-700 text-white">
              <SelectValue placeholder="Kategorie wählen" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700">
              {BUDGET_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="budget-limit">Limit (€) *</Label>
            <Input
              id="budget-limit"
              type="number"
              step="0.01"
              value={formData.limit}
              onChange={(e) => setFormData({ ...formData, limit: parseFloat(e.target.value) || 0 })}
              placeholder="0.00"
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget-spent">Bereits ausgegeben (€)</Label>
            <Input
              id="budget-spent"
              type="number"
              step="0.01"
              value={formData.spent}
              onChange={(e) => setFormData({ ...formData, spent: parseFloat(e.target.value) || 0 })}
              placeholder="0.00"
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget-period">Periode *</Label>
          <Select
            value={formData.period}
            onValueChange={(value) => setFormData({ ...formData, period: value as 'monthly' | 'yearly' })}
          >
            <SelectTrigger id="budget-period" className="bg-zinc-800 border-zinc-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700">
              <SelectItem value="monthly">📅 Monatlich</SelectItem>
              <SelectItem value="yearly">📆 Jährlich</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Subcategories Section */}
      <div className="space-y-3 pt-4 border-t border-zinc-700">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold">Unterkategorien (optional)</Label>
          <span className="text-xs text-zinc-500">
            {formData.subcategories?.length || 0} Unterkategorie(n)
          </span>
        </div>

        {/* Existing Subcategories */}
        {formData.subcategories && formData.subcategories.length > 0 && (
          <div className="space-y-2">
            {formData.subcategories.map((sub, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 bg-zinc-800 rounded-lg border border-zinc-700"
              >
                <div className="flex-1 grid grid-cols-3 gap-2 text-sm">
                  <span className="text-white font-medium truncate">{sub.name}</span>
                  <span className="text-zinc-400">Limit: €{sub.limit.toFixed(2)}</span>
                  <span className="text-zinc-400">Ausgegeben: €{sub.spent.toFixed(2)}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveSubcategory(index)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Add New Subcategory */}
        <div className="space-y-2 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
          <p className="text-xs font-medium text-zinc-400">Neue Unterkategorie hinzufügen</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Input
              type="text"
              placeholder="Name"
              value={newSubcategory.name}
              onChange={(e) => setNewSubcategory({ ...newSubcategory, name: e.target.value })}
              className="bg-zinc-800 border-zinc-700 text-white text-sm"
            />
            <Input
              type="number"
              step="0.01"
              placeholder="Limit (€)"
              value={newSubcategory.limit || ''}
              onChange={(e) => setNewSubcategory({ ...newSubcategory, limit: parseFloat(e.target.value) || 0 })}
              className="bg-zinc-800 border-zinc-700 text-white text-sm"
            />
            <Input
              type="number"
              step="0.01"
              placeholder="Ausgegeben (€)"
              value={newSubcategory.spent || ''}
              onChange={(e) => setNewSubcategory({ ...newSubcategory, spent: parseFloat(e.target.value) || 0 })}
              className="bg-zinc-800 border-zinc-700 text-white text-sm"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddSubcategory}
            className="w-full gap-2"
          >
            <Plus className="h-4 w-4" />
            Unterkategorie hinzufügen
          </Button>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-zinc-700">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Abbrechen
        </Button>
        <Button type="submit">
          {budget ? 'Aktualisieren' : 'Hinzufügen'}
        </Button>
      </div>
    </form>
  );
}
