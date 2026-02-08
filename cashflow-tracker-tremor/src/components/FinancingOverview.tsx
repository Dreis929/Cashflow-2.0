import { Card } from '@tremor/react';
import { TrendingUp, Calendar, AlertCircle, Plus, CreditCard } from 'lucide-react';
import { Button } from './ui/button';
import type { Financing } from '@/types/finances';
import { formatCurrency } from '@/utils/helpers';

interface FinancingOverviewProps {
  financings: Financing[];
  onAddFinancing?: () => void;
}

export default function FinancingOverview({ financings, onAddFinancing }: FinancingOverviewProps) {
  const totalDebt = financings.reduce((sum, f) => sum + f.remainingAmount, 0);
  const totalInitial = financings.reduce((sum, f) => sum + f.initialAmount, 0);
  const totalPaid = totalInitial - totalDebt;
  const overallProgress = totalInitial > 0 ? (totalPaid / totalInitial) * 100 : 0;

  const getMonthsRemaining = (financing: Financing): number => {
    const endDate = new Date(financing.endDate);
    const now = new Date();
    
    const monthsRemaining = (endDate.getFullYear() - now.getFullYear()) * 12 + 
      (endDate.getMonth() - now.getMonth());
    
    return Math.max(0, monthsRemaining);
  };

  const getStatusColor = (progress: number): string => {
    if (progress >= 75) return 'text-emerald-400 bg-emerald-900/30';
    if (progress >= 50) return 'text-blue-400 bg-blue-900/30';
    if (progress >= 25) return 'text-yellow-400 bg-yellow-900/30';
    return 'text-red-400 bg-red-900/30';
  };

  const getProgressBarColor = (progress: number): string => {
    if (progress >= 75) return 'bg-emerald-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Finanzierungen</h3>
          <p className="text-sm text-zinc-400">
            Gesamt verbleibend: <span className="font-bold text-white">{formatCurrency(totalDebt)}</span>
          </p>
        </div>
        {onAddFinancing && (
          <Button
            variant="outline"
            size="sm"
            onClick={onAddFinancing}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Finanzierung hinzufügen
          </Button>
        )}
      </div>

      {financings.length === 0 ? (
        <Card className="bg-zinc-900 border-2 border-zinc-800 p-6">
          <div className="text-center py-8">
            <CreditCard className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-400 mb-4">Noch keine Finanzierungen angelegt</p>
            {onAddFinancing && (
              <Button
                variant="outline"
                onClick={onAddFinancing}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Erste Finanzierung anlegen
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <>
          {/* Overall Progress Card */}
          <Card className="bg-gradient-to-br from-indigo-900/50 to-indigo-950/50 border-2 border-indigo-800 p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Gesamtfortschritt</span>
                <span className="text-2xl font-bold text-white">
                  {overallProgress.toFixed(1)}%
                </span>
              </div>
              <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getProgressBarColor(overallProgress)} transition-all duration-500`}
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">
                  Bezahlt: {formatCurrency(totalPaid)}
                </span>
                <span className="text-zinc-400">
                  Offen: {formatCurrency(totalDebt)}
                </span>
              </div>
            </div>
          </Card>

          {/* Individual Financing Cards */}
          <div className="space-y-3">
            {financings.map((financing) => {
              const progress = ((financing.initialAmount - financing.remainingAmount) / financing.initialAmount) * 100;
              const monthsRemaining = getMonthsRemaining(financing);
              
              return (
                <Card
                  key={financing.id}
                  className="bg-zinc-900 border-2 border-zinc-800 p-5 hover:border-zinc-700 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-white mb-1">{financing.name}</h4>
                        <p className="text-sm text-zinc-400">{financing.description}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full ${getStatusColor(progress)}`}>
                        <span className="text-xs font-semibold">
                          {progress.toFixed(0)}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getProgressBarColor(progress)} transition-all duration-500`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-zinc-500">
                        <span>{formatCurrency(financing.initialAmount - financing.remainingAmount)} bezahlt</span>
                        <span>{formatCurrency(financing.remainingAmount)} offen</span>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-zinc-800">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-zinc-500" />
                        <div>
                          <p className="text-xs text-zinc-500">Rate/Monat</p>
                          <p className="text-sm font-semibold text-white">
                            {formatCurrency(financing.monthlyPayment)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-zinc-500" />
                        <div>
                          <p className="text-xs text-zinc-500">Verbleibend</p>
                          <p className="text-sm font-semibold text-white">
                            {monthsRemaining} {monthsRemaining === 1 ? 'Monat' : 'Monate'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {monthsRemaining <= 3 && monthsRemaining > 0 && (
                      <div className="flex items-center gap-2 p-2 bg-yellow-900/30 border border-yellow-800 rounded-lg">
                        <AlertCircle className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                        <p className="text-xs text-yellow-300">
                          Läuft bald aus! Ende: {new Date(financing.endDate).toLocaleDateString('de-DE')}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
