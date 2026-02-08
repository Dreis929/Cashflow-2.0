import { Expense, MonthlyData, ExpenseStats } from '@/types';
import { format, isWithinInterval, subMonths } from 'date-fns';
import { de } from 'date-fns/locale';

// Währungsformatierung
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};

// Statistiken berechnen
export const calculateStats = (
  expenses: Expense[],
  startDate?: Date,
  endDate?: Date
): ExpenseStats => {
  let filteredExpenses = expenses;
  
  if (startDate && endDate) {
    filteredExpenses = expenses.filter(expense => 
      isWithinInterval(new Date(expense.date), { start: startDate, end: endDate })
    );
  }
  
  const total = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const count = filteredExpenses.length;
  const average = count > 0 ? total / count : 0;
  
  // Vorheriger Zeitraum für Trend
  let previousTotal: number | undefined;
  if (startDate && endDate) {
    const duration = endDate.getTime() - startDate.getTime();
    const previousStart = new Date(startDate.getTime() - duration);
    const previousEnd = new Date(startDate);
    
    const previousExpenses = expenses.filter(expense =>
      isWithinInterval(new Date(expense.date), { start: previousStart, end: previousEnd })
    );
    
    previousTotal = previousExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  }
  
  const trend = previousTotal !== undefined 
    ? (total < previousTotal ? 'down' : total > previousTotal ? 'up' : 'neutral')
    : undefined;
  
  return {
    total,
    count,
    average,
    previousTotal,
    trend,
  };
};

// Kategorien-Breakdown
export const getCategoryBreakdown = (expenses: Expense[]): Array<{ name: string; value: number }> => {
  const categoryMap = new Map<string, number>();
  
  expenses.forEach(expense => {
    const existing = categoryMap.get(expense.category) || 0;
    categoryMap.set(expense.category, existing + expense.amount);
  });
  
  return Array.from(categoryMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

// Top N Kategorien
export const getTopCategories = (
  expenses: Expense[],
  limit: number = 5
): Array<{ name: string; value: number }> => {
  return getCategoryBreakdown(expenses).slice(0, limit);
};

// Monatliche Daten
export const getMonthlyData = (
  expenses: Expense[],
  monthsBack: number = 6
): MonthlyData[] => {
  const monthlyMap = new Map<string, { expenses: number; count: number }>();
  
  // Initialisiere letzte N Monate
  for (let i = monthsBack - 1; i >= 0; i--) {
    const date = subMonths(new Date(), i);
    const monthKey = format(date, 'MMM yyyy', { locale: de });
    monthlyMap.set(monthKey, { expenses: 0, count: 0 });
  }
  
  // Fülle mit Daten
  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthKey = format(date, 'MMM yyyy', { locale: de });
    
    if (monthlyMap.has(monthKey)) {
      const existing = monthlyMap.get(monthKey)!;
      monthlyMap.set(monthKey, {
        expenses: existing.expenses + expense.amount,
        count: existing.count + 1,
      });
    }
  });
  
  // Konvertiere zu Array
  return Array.from(monthlyMap.entries()).map(([month, data]) => ({
    month,
    expenses: data.expenses,
    average: data.count > 0 ? data.expenses / data.count : 0,
    count: data.count,
  }));
};

// Durchschnitt pro Tag
export const getAveragPerDay = (
  expenses: Expense[],
  startDate: Date,
  endDate: Date
): number => {
  const total = expenses
    .filter(expense =>
      isWithinInterval(new Date(expense.date), { start: startDate, end: endDate })
    )
    .reduce((sum, exp) => sum + exp.amount, 0);
  
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  return days > 0 ? total / days : 0;
};

// Monatliche Trends für Charts
export const getMonthlyTrend = (expenses: Expense[]): Array<{ Monat: string; Ausgaben: number }> => {
  const monthlyMap = new Map<string, number>();
  
  // Gruppiere nach Monat
  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthKey = format(date, 'MMM yy', { locale: de });
    const existing = monthlyMap.get(monthKey) || 0;
    monthlyMap.set(monthKey, existing + expense.amount);
  });
  
  // Konvertiere zu Array und sortiere chronologisch
  return Array.from(monthlyMap.entries())
    .map(([Monat, Ausgaben]) => ({ Monat, Ausgaben }))
    .sort((a, b) => {
      const dateA = new Date(a.Monat);
      const dateB = new Date(b.Monat);
      return dateA.getTime() - dateB.getTime();
    });
};
