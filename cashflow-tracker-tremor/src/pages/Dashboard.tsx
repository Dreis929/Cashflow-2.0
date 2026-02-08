import { useState, useEffect, useMemo } from 'react';
import { Card } from '@tremor/react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import StatsCards from '@/components/StatsCards';
import Charts from '@/components/Charts';
import type { Expense } from '@/types';
import { loadFromStorage, saveToStorage } from '@/utils/storage';
import { 
  calculateStats, 
  getCategoryBreakdown, 
  getMonthlyTrend
} from '@/utils/calculations';
import { initialExpenses } from '@/data/initialExpenses';

type TimeRangeType = 'custom' | 'last-month' | 'last-year' | 'all';

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRangeType>('last-month');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Load expenses from LocalStorage or initialize with seed data
  useEffect(() => {
    const stored = loadFromStorage<Expense[]>('cashflow-expenses', []);
    if (stored.length === 0) {
      // First time load - use initial expenses
      setExpenses(initialExpenses);
      saveToStorage('cashflow-expenses', initialExpenses);
    } else {
      setExpenses(stored);
    }
  }, []);

  // Calculate date range based on selection
  const dateRange = useMemo(() => {
    const today = new Date();
    let start: Date;
    let end: Date = today;

    switch (timeRange) {
      case 'last-month':
        start = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        break;
      case 'last-year':
        start = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        break;
      case 'custom':
        start = startDate ? new Date(startDate) : new Date(0);
        end = endDate ? new Date(endDate) : today;
        break;
      case 'all':
      default:
        start = new Date(0);
        break;
    }

    return { start, end };
  }, [timeRange, startDate, endDate]);

  // Filter expenses based on date range
  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= dateRange.start && expenseDate <= dateRange.end;
    });
  }, [expenses, dateRange]);

  // Calculate statistics
  const stats = useMemo(() => calculateStats(filteredExpenses), [filteredExpenses]);
  
  const totalExpenses = stats.total;
  const transactionCount = stats.count;
  const averagePerDay = useMemo(() => {
    if (filteredExpenses.length === 0) return 0;
    const days = Math.max(
      1,
      Math.ceil(
        (dateRange.end.getTime() - dateRange.start.getTime()) / (1000 * 60 * 60 * 24)
      )
    );
    return totalExpenses / days;
  }, [filteredExpenses, totalExpenses, dateRange]);

  // Calculate previous period stats for comparison
  const previousStats = useMemo(() => {
    if (timeRange === 'all' || timeRange === 'custom') return undefined;

    const rangeDays = Math.ceil(
      (dateRange.end.getTime() - dateRange.start.getTime()) / (1000 * 60 * 60 * 24)
    );
    const previousStart = new Date(dateRange.start);
    previousStart.setDate(previousStart.getDate() - rangeDays);
    
    const previousExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= previousStart && expenseDate < dateRange.start;
    });

    const previousTotal = previousExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const previousCount = previousExpenses.length;
    const previousAverage = rangeDays > 0 ? previousTotal / rangeDays : 0;

    return {
      total: previousTotal,
      count: previousCount,
      average: previousAverage,
    };
  }, [expenses, dateRange, timeRange]);

  // Chart data
  const categoryData = useMemo(
    () => getCategoryBreakdown(filteredExpenses),
    [filteredExpenses]
  );
  
  const monthlyData = useMemo(
    () => getMonthlyTrend(filteredExpenses),
    [filteredExpenses]
  );

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-zinc-400">Übersicht deiner Ausgaben</p>
      </div>

      {/* Time Range Filter */}
      <Card className="bg-zinc-900 border-2 border-zinc-800 p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="timeRange" className="text-white">Zeitraum</Label>
            <Select value={timeRange} onValueChange={(value: TimeRangeType) => setTimeRange(value)}>
              <SelectTrigger id="timeRange" className="mt-2 bg-zinc-950 border-zinc-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-month">Letzter Monat</SelectItem>
                <SelectItem value="last-year">Letztes Jahr</SelectItem>
                <SelectItem value="all">Alle Zeit</SelectItem>
                <SelectItem value="custom">Benutzerdefiniert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {timeRange === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate" className="text-white">Startdatum</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-2 bg-zinc-950 border-zinc-800"
                />
              </div>
              <div>
                <Label htmlFor="endDate" className="text-white">Enddatum</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-2 bg-zinc-950 border-zinc-800"
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Stats Cards */}
      <StatsCards
        totalExpenses={totalExpenses}
        transactionCount={transactionCount}
        averagePerDay={averagePerDay}
        previousStats={previousStats}
      />

      {/* Charts */}
      <Charts
        categoryData={categoryData}
        monthlyData={monthlyData}
      />

      {categoryData.length > 0 && (
        <Card className="bg-zinc-900 border-2 border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Kategorie-Übersicht
          </h3>
          <div className="space-y-3">
            {categoryData.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <span className="text-zinc-300">{category.name}</span>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                      style={{
                        width: `${(category.value / totalExpenses) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-white font-semibold w-24 text-right">
                    {new Intl.NumberFormat('de-DE', {
                      style: 'currency',
                      currency: 'EUR',
                    }).format(category.value)}
                  </span>
                  <span className="text-zinc-400 text-sm w-16 text-right">
                    {((category.value / totalExpenses) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
