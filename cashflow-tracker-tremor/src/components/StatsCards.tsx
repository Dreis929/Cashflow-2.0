import { Card } from '@tremor/react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatCurrency } from '@/utils/helpers';

interface StatCardProps {
  title: string;
  value: number;
  subtitle?: string;
  previousValue?: number;
  trend?: 'up' | 'down' | 'neutral';
  gradient: string;
  icon?: React.ReactNode;
  formatValue?: (value: number) => string;
}

function StatCard({
  title,
  value,
  subtitle,
  previousValue,
  trend,
  gradient,
  icon,
  formatValue = formatCurrency,
}: StatCardProps) {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4" />;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-red-400'; // Mehr Ausgaben = schlecht
    if (trend === 'down') return 'text-emerald-400'; // Weniger Ausgaben = gut
    return 'text-zinc-400';
  };

  const getTrendText = () => {
    if (!previousValue || previousValue === 0) return null;
    const change = ((value - previousValue) / previousValue) * 100;
    const changeText = Math.abs(change).toFixed(1);
    return `${change > 0 ? '+' : ''}${changeText}%`;
  };

  return (
    <Card
      className={`bg-gradient-to-br ${gradient} border-2 border-zinc-800 p-6 shadow-lg`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-zinc-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white mb-2">{formatValue(value)}</p>
          {subtitle && <p className="text-xs text-zinc-300">{subtitle}</p>}
        </div>
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
            {icon}
          </div>
        )}
      </div>

      {trend && previousValue !== undefined && (
        <div className={`flex items-center gap-1 mt-3 text-sm ${getTrendColor()}`}>
          {getTrendIcon()}
          <span className="font-medium">{getTrendText()}</span>
          <span className="text-zinc-400 ml-1">vs. vorheriger Zeitraum</span>
        </div>
      )}
    </Card>
  );
}

interface StatsCardsProps {
  totalExpenses: number;
  transactionCount: number;
  averagePerDay: number;
  previousStats?: {
    total?: number;
    count?: number;
    average?: number;
  };
}

export default function StatsCards({
  totalExpenses,
  transactionCount,
  averagePerDay,
  previousStats,
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Gesamtausgaben */}
      <StatCard
        title="Gesamtausgaben"
        value={totalExpenses}
        subtitle={`${transactionCount} ${transactionCount === 1 ? 'Transaktion' : 'Transaktionen'}`}
        previousValue={previousStats?.total}
        trend={
          previousStats?.total
            ? totalExpenses > previousStats.total
              ? 'up'
              : totalExpenses < previousStats.total
              ? 'down'
              : 'neutral'
            : undefined
        }
        gradient="from-blue-900/50 to-blue-950/50"
        icon={<span className="text-2xl">💰</span>}
      />

      {/* Durchschnitt pro Tag */}
      <StatCard
        title="Durchschnitt pro Tag"
        value={averagePerDay}
        subtitle="Tägliche Ausgaben"
        previousValue={previousStats?.average}
        trend={
          previousStats?.average
            ? averagePerDay > previousStats.average
              ? 'up'
              : averagePerDay < previousStats.average
              ? 'down'
              : 'neutral'
            : undefined
        }
        gradient="from-purple-900/50 to-purple-950/50"
        icon={<span className="text-2xl">📊</span>}
      />

      {/* Transaktionen */}
      <StatCard
        title="Transaktionen"
        value={transactionCount}
        subtitle="Anzahl der Ausgaben"
        previousValue={previousStats?.count}
        trend={
          previousStats?.count
            ? transactionCount > previousStats.count
              ? 'up'
              : transactionCount < previousStats.count
              ? 'down'
              : 'neutral'
            : undefined
        }
        gradient="from-orange-900/50 to-orange-950/50"
        icon={<span className="text-2xl">🔢</span>}
        formatValue={(v) => v.toString()}
      />
    </div>
  );
}
