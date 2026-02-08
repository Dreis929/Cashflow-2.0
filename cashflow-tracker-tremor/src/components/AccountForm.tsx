import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { Account } from '@/types/finances';

interface AccountFormProps {
  account?: Account | null;
  onSubmit: (data: Omit<Account, 'id'>) => void;
  onCancel: () => void;
}

export default function AccountForm({ account, onSubmit, onCancel }: AccountFormProps) {
  const [formData, setFormData] = useState<Omit<Account, 'id'>>({
    name: account?.name || '',
    type: account?.type || 'checking',
    balance: account?.balance || 0,
    currency: account?.currency || 'EUR',
    lastUpdated: new Date().toISOString(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Bitte einen Kontonamen eingeben');
      return;
    }

    onSubmit({
      ...formData,
      lastUpdated: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="account-name">Kontoname *</Label>
        <Input
          id="account-name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="z.B. Sparkasse Hauptkonto"
          className="bg-zinc-800 border-zinc-700 text-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="account-type">Kontotyp *</Label>
        <Select
          value={formData.type}
          onValueChange={(value) => setFormData({ ...formData, type: value as Account['type'] })}
        >
          <SelectTrigger id="account-type" className="bg-zinc-800 border-zinc-700 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-zinc-800 border-zinc-700">
            <SelectItem value="checking">💳 Girokonto</SelectItem>
            <SelectItem value="savings">🏦 Sparkonto</SelectItem>
            <SelectItem value="cash">💵 Bargeld</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="account-balance">Kontostand (€) *</Label>
        <Input
          id="account-balance"
          type="number"
          step="0.01"
          value={formData.balance}
          onChange={(e) => setFormData({ ...formData, balance: parseFloat(e.target.value) || 0 })}
          placeholder="0.00"
          className="bg-zinc-800 border-zinc-700 text-white"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Abbrechen
        </Button>
        <Button type="submit">
          {account ? 'Aktualisieren' : 'Hinzufügen'}
        </Button>
      </div>
    </form>
  );
}
