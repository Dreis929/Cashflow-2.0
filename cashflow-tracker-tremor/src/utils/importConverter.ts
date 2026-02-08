import { Expense } from '@/types';

// Mapping von alten Kategorien zu neuen Kategorien mit Emojis
const CATEGORY_MAPPING: Record<string, string> = {
  'Lebensmittel': '🍔 Lebensmittel',
  'Sprit & Tanken': '🚗 Transport',
  'Auto & Mobilität': '🚗 Transport',
  'Fixkosten': '🏠 Wohnung',
  'Restaurants & Essen gehen': '🍔 Lebensmittel',
  'Mittagessen (Arbeit)': '🍔 Lebensmittel',
  'Unterhaltung & Events': '🎬 Entertainment',
  'Reisen & Urlaub': '🎬 Entertainment',
  'Gesundheit & Sport': '💊 Gesundheit',
  'Kleidung': '👕 Kleidung',
  'Geschenke': '💰 Sonstiges',
  'Shopping & Elektronik': '💰 Sonstiges',
  'Sonstiges': '💰 Sonstiges',
};

// Import-Format-Typen
interface BackupFormat {
  expenses: Array<{
    id: string;
    date: string;
    amount: number;
    category: string;
    description: string;
    createdAt: string;
  }>;
  categories?: unknown;
  settings?: unknown;
  exportDate?: string;
}

/**
 * Konvertiert verschiedene Import-Formate ins einheitliche Expense-Format
 */
export const convertImportData = (data: unknown): Expense[] => {
  // Fall 1: Direktes Array von Expenses (neues Format)
  if (Array.isArray(data)) {
    return data.map(expense => ({
      ...expense,
      // Ensure all required fields are present
      id: expense.id || generateId(),
      date: expense.date,
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      createdAt: expense.createdAt || new Date().toISOString(),
    }));
  }

  // Fall 2: Backup-Format mit verschachtelter Struktur
  if (typeof data === 'object' && data !== null && 'expenses' in data) {
    const backup = data as BackupFormat;
    
    return backup.expenses.map(expense => {
      // Mappe alte Kategorie zu neuer mit Emoji
      const mappedCategory = CATEGORY_MAPPING[expense.category] || '💰 Sonstiges';
      
      return {
        id: expense.id,
        date: expense.date,
        amount: expense.amount,
        category: mappedCategory,
        description: expense.description,
        createdAt: expense.createdAt,
      };
    });
  }

  throw new Error('Ungültiges Datenformat! Erwartetes Format: Array von Expenses oder Backup-Objekt mit expenses-Array.');
};

// Simple ID generator (if needed)
const generateId = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Validiert, ob die importierten Daten gültige Expenses sind
 */
export const validateExpenses = (expenses: Expense[]): boolean => {
  return expenses.every(expense => 
    expense.id &&
    expense.date &&
    expense.amount !== undefined &&
    expense.category &&
    expense.description &&
    expense.createdAt
  );
};
