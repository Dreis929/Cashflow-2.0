import { BarChart, DonutChart, AreaChart } from '@tremor/react';
import { Card } from '@tremor/react';
import { formatCurrency } from '@/utils/helpers';

interface CategoryData {
  name: string;
  value: number;
}

interface MonthlyData {
  Monat: string;
  Ausgaben: number;
  Durchschnitt?: number;
}

interface ChartsProps {
  categoryData: CategoryData[];
  monthlyData: MonthlyData[];
}

export default function Charts({
  categoryData,
  monthlyData,
}: ChartsProps) {
  // Top 5 Kategorien für Bar Chart
  const top5Categories = categoryData.slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top 5 Kategorien - Horizontal Bar Chart */}
      <Card className="bg-zinc-900 border-2 border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Top 5 Kategorien</h3>
        {top5Categories.length > 0 ? (
          <BarChart
            data={top5Categories}
            index="name"
            categories={['value']}
            colors={['blue']}
            layout="horizontal"
            showLegend={false}
            showGridLines={false}
            valueFormatter={(value) => formatCurrency(value)}
            className="h-64"
          />
        ) : (
          <div className="h-64 flex items-center justify-center text-zinc-400">
            Keine Daten verfügbar
          </div>
        )}
      </Card>

      {/* Kategorien-Verteilung - Donut Chart */}
      <Card className="bg-zinc-900 border-2 border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Kategorien-Verteilung
        </h3>
        {categoryData.length > 0 ? (
          <DonutChart
            data={categoryData}
            category="value"
            index="name"
            colors={['blue', 'violet', 'purple', 'fuchsia', 'pink', 'rose', 'orange', 'amber']}
            valueFormatter={(value) => formatCurrency(value)}
            showAnimation={true}
            className="h-64"
          />
        ) : (
          <div className="h-64 flex items-center justify-center text-zinc-400">
            Keine Daten verfügbar
          </div>
        )}
      </Card>

      {/* Monatliche Entwicklung - Area Chart */}
      <Card className="bg-zinc-900 border-2 border-zinc-800 p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold text-white mb-4">
          Monatliche Entwicklung
        </h3>
        {monthlyData.length > 0 ? (
          <AreaChart
            data={monthlyData}
            index="Monat"
            categories={monthlyData[0]?.Durchschnitt !== undefined ? ['Ausgaben', 'Durchschnitt'] : ['Ausgaben']}
            colors={['blue', 'purple']}
            valueFormatter={(value) => formatCurrency(value)}
            showLegend={true}
            showGridLines={true}
            className="h-80"
          />
        ) : (
          <div className="h-80 flex items-center justify-center text-zinc-400">
            Keine Daten verfügbar
          </div>
        )}
      </Card>
    </div>
  );
}
