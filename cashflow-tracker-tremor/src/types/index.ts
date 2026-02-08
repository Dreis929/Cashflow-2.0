// Expense (Ausgaben)
export interface Expense {
  id: string;
  date: string;              // ISO-Format: "2025-01-15"
  amount: number;
  category: string;          // z.B. "🍔 Lebensmittel"
  description: string;
  createdAt: string;         // ISO-Timestamp
  updatedAt?: string;        // ISO-Timestamp
}

// Kategorien
export const CATEGORIES = [
  'Alle Kategorien',
  '🍔 Lebensmittel',
  '🚗 Transport',
  '🏠 Wohnung',
  '💊 Gesundheit',
  '🎬 Entertainment',
  '👕 Kleidung',
  '📚 Bildung',
  '💰 Sonstiges'
] as const;

export type Category = typeof CATEGORIES[number];

// Helper-Types
export type ExpenseFormData = Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>;

// Statistiken
export interface ExpenseStats {
  total: number;
  count: number;
  average: number;
  previousTotal?: number;
  previousCount?: number;
  trend?: 'up' | 'down' | 'neutral';
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
  count: number;
  percentage: number;
}

export interface MonthlyData {
  month: string;           // "Jan 2026"
  expenses: number;
  average: number;
  count: number;
}
