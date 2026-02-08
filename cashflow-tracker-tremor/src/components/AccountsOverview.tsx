import { Card } from '@tremor/react';
import { Wallet, PiggyBank, Banknote, Plus } from 'lucide-react';
import { Button } from './ui/button';
import type { Account } from '@/types/finances';
import { formatCurrency } from '@/utils/helpers';

interface AccountsOverviewProps {
  accounts: Account[];
  onAddAccount?: () => void;
}

const getAccountIcon = (type: string) => {
  switch (type) {
    case 'savings':
      return <PiggyBank className="h-8 w-8 text-emerald-400" />;
    case 'cash':
      return <Banknote className="h-8 w-8 text-blue-400" />;
    default:
      return <Wallet className="h-8 w-8 text-purple-400" />;
  }
};

const getAccountColor = (type: string) => {
  switch (type) {
    case 'savings':
      return 'from-emerald-900/50 to-emerald-950/50 border-emerald-800';
    case 'cash':
      return 'from-blue-900/50 to-blue-950/50 border-blue-800';
    default:
      return 'from-purple-900/50 to-purple-950/50 border-purple-800';
  }
};

const getAccountTypeName = (type: string): string => {
  switch (type) {
    case 'savings':
      return 'Sparkonto';
    case 'checking':
      return 'Girokonto';
    case 'cash':
      return 'Bargeld';
    default:
      return type;
  }
};

export default function AccountsOverview({ accounts, onAddAccount }: AccountsOverviewProps) {
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Konten-Übersicht</h3>
          <p className="text-sm text-zinc-400">
            Gesamtvermögen: <span className="font-bold text-white">{formatCurrency(totalBalance)}</span>
          </p>
        </div>
        {onAddAccount && (
          <Button
            variant="outline"
            size="sm"
            onClick={onAddAccount}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Konto hinzufügen
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.length === 0 ? (
          <Card className="bg-zinc-900 border-2 border-zinc-800 p-6 md:col-span-2 lg:col-span-3">
            <div className="text-center py-8">
              <Wallet className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 mb-4">Noch keine Konten angelegt</p>
              {onAddAccount && (
                <Button
                  variant="outline"
                  onClick={onAddAccount}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Erstes Konto anlegen
                </Button>
              )}
            </div>
          </Card>
        ) : (
          accounts.map((account) => (
            <Card
              key={account.id}
              className={`bg-gradient-to-br ${getAccountColor(account.type)} border-2 p-6 shadow-lg`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-sm text-zinc-400 mb-1">{getAccountTypeName(account.type)}</p>
                  <h4 className="text-lg font-semibold text-white">{account.name}</h4>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                  {getAccountIcon(account.type)}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-zinc-400">Kontostand</span>
                  <span className="text-2xl font-bold text-white">
                    {formatCurrency(account.balance)}
                  </span>
                </div>
                
                {account.lastUpdated && (
                  <div className="text-xs text-zinc-500">
                    Aktualisiert: {new Date(account.lastUpdated).toLocaleDateString('de-DE')}
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
