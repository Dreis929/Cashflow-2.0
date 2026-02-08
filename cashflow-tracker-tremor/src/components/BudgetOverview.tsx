import { Card } from '@tremor/react';
import { Target, TrendingDown, AlertTriangle, Plus } from 'lucide-react';
import { Button } from './ui/button';
import type { Budget, BudgetSubcategory } from '@/types/finances';
import { formatCurrency } from '@/utils/helpers';
import type { ReactElement } from 'react';

interface BudgetOverviewProps {
  budgets: Budget[];
  onAddBudget?: () => void;
}

const getCategoryIcon = (category: string): ReactElement => {
  switch (category) {
    case 'Lebensmittel':
      return <span className="text-2xl">🍔</span>;
    case 'Transport':
      return <span className="text-2xl">🚗</span>;
    case 'Unterhaltung':
      return <span className="text-2xl">🎮</span>;
    case 'Gesundheit':
      return <span className="text-2xl">💊</span>;
    case 'Bildung':
      return <span className="text-2xl">📚</span>;
    case 'Wohnen':
      return <span className="text-2xl">🏠</span>;
    default:
      return <Target className="h-6 w-6 text-zinc-400" />;
  }
};

const getProgressColor = (spent: number, limit: number): string => {
  const percentage = (spent / limit) * 100;
  if (percentage >= 100) return 'bg-red-500';
  if (percentage >= 80) return 'bg-yellow-500';
  if (percentage >= 60) return 'bg-blue-500';
  return 'bg-emerald-500';
};

const getStatusColor = (spent: number, limit: number): string => {
  const percentage = (spent / limit) * 100;
  if (percentage >= 100) return 'text-red-400 bg-red-900/30 border-red-800';
  if (percentage >= 80) return 'text-yellow-400 bg-yellow-900/30 border-yellow-800';
  return 'text-emerald-400 bg-emerald-900/30 border-emerald-800';
};

export default function BudgetOverview({ budgets, onAddBudget }: BudgetOverviewProps) {
  const totalLimit = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const overallPercentage = totalLimit > 0 ? (totalSpent / totalLimit) * 100 : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Budget-Übersicht</h3>
          <p className="text-sm text-zinc-400">
            {formatCurrency(totalSpent)} von {formatCurrency(totalLimit)} ausgegeben
          </p>
        </div>
        {onAddBudget && (
          <Button
            variant="outline"
            size="sm"
            onClick={onAddBudget}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Budget hinzufügen
          </Button>
        )}
      </div>

      {budgets.length === 0 ? (
        <Card className="bg-zinc-900 border-2 border-zinc-800 p-6">
          <div className="text-center py-8">
            <Target className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-400 mb-4">Noch keine Budgets angelegt</p>
            {onAddBudget && (
              <Button
                variant="outline"
                onClick={onAddBudget}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Erstes Budget anlegen
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <>
          {/* Overall Progress */}
          <Card className="bg-gradient-to-br from-purple-900/50 to-purple-950/50 border-2 border-purple-800 p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Gesamtbudget</span>
                <span className="text-2xl font-bold text-white">
                  {overallPercentage.toFixed(0)}%
                </span>
              </div>
              <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getProgressColor(totalSpent, totalLimit)} transition-all duration-500`}
                  style={{ width: `${Math.min(overallPercentage, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">
                  Ausgegeben: {formatCurrency(totalSpent)}
                </span>
                <span className="text-zinc-400">
                  Verfügbar: {formatCurrency(Math.max(0, totalLimit - totalSpent))}
                </span>
              </div>
            </div>
          </Card>

          {/* Individual Budget Cards */}
          <div className="space-y-3">
            {budgets.map((budget) => {
              const percentage = budget.limit > 0 ? (budget.spent / budget.limit) * 100 : 0;
              const remaining = budget.limit - budget.spent;
              const isOverBudget = percentage >= 100;
              const isWarning = percentage >= 80 && percentage < 100;

              return (
                <Card
                  key={budget.id}
                  className="bg-zinc-900 border-2 border-zinc-800 p-5 hover:border-zinc-700 transition-colors"
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800">
                          {getCategoryIcon(budget.category)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{budget.category}</h4>
                          <p className="text-sm text-zinc-400">
                            {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                          </p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full border ${getStatusColor(budget.spent, budget.limit)}`}>
                        <span className="text-xs font-semibold">
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getProgressColor(budget.spent, budget.limit)} transition-all duration-500`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-zinc-500">
                          {isOverBudget ? (
                            <span className="text-red-400 font-semibold">
                              {formatCurrency(Math.abs(remaining))} über Budget
                            </span>
                          ) : (
                            <span>Noch {formatCurrency(remaining)} verfügbar</span>
                          )}
                        </p>
                        <p className="text-xs text-zinc-500">
                          Periode: {budget.period === 'monthly' ? 'Monatlich' : 'Jährlich'}
                        </p>
                      </div>
                    </div>

                    {/* Warnings */}
                    {isOverBudget && (
                      <div className="flex items-center gap-2 p-2 bg-red-900/30 border border-red-800 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
                        <p className="text-xs text-red-300">Budget überschritten!</p>
                      </div>
                    )}
                    {isWarning && !isOverBudget && (
                      <div className="flex items-center gap-2 p-2 bg-yellow-900/30 border border-yellow-800 rounded-lg">
                        <TrendingDown className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                        <p className="text-xs text-yellow-300">Nur noch {(100 - percentage).toFixed(0)}% verfügbar</p>
                      </div>
                    )}

                    {/* Subcategories */}
                    {budget.subcategories && budget.subcategories.length > 0 && (
                      <div className="pt-2 border-t border-zinc-800 space-y-2">
                        <p className="text-xs font-semibold text-zinc-400 uppercase">Unterkategorien</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {budget.subcategories.map((sub: BudgetSubcategory, idx: number) => {
                            const subPercentage = sub.limit > 0 ? (sub.spent / sub.limit) * 100 : 0;
                            return (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-2 bg-zinc-800/50 rounded-lg"
                              >
                                <div className="flex-1">
                                  <p className="text-xs font-medium text-white">{sub.name}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <div className="flex-1 h-1 bg-zinc-700 rounded-full overflow-hidden">
                                      <div
                                        className={`h-full ${getProgressColor(sub.spent, sub.limit)}`}
                                        style={{ width: `${Math.min(subPercentage, 100)}%` }}
                                      />
                                    </div>
                                    <span className="text-xs text-zinc-500 whitespace-nowrap">
                                      {subPercentage.toFixed(0)}%
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
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
