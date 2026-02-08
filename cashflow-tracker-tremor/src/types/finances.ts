// Konto-Typen
export type AccountType = 'savings' | 'checking' | 'cash';

export interface Account {
  id: string;
  name: string;
  balance: number;
  type: AccountType;
  currency: string;
  lastUpdated: string;     // ISO-Date
}

// Finanzierung
export interface Financing {
  id: string;
  name: string;
  description: string;
  initialAmount: number;
  remainingAmount: number;
  monthlyPayment: number;
  startDate: string;       // ISO-Date
  endDate: string;         // ISO-Date
}

// Budget
export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: 'monthly' | 'yearly';
  subcategories?: SubBudget[];
}

export interface SubBudget {
  name: string;
  limit: number;
  spent: number;
}

export type BudgetSubcategory = SubBudget;

// Einkommen
export interface Income {
  monthly: number;
  sources: IncomeSource[];
}

export interface IncomeSource {
  name: string;
  amount: number;
}

// Ausgaben-Kategorie mit Subcategories
export interface ExpenseCategory {
  category: string;
  amount: number;
  subcategories?: SubCategory[];
}

export interface SubCategory {
  name: string;
  amount: number;
}

// Finanz-Übersicht
export interface FinancialData {
  accounts: Account[];
  financing: Financing[];
  budgets: Budget[];
  income: Income;
}

// Statistiken für Finanzen-Seite
export interface FinancialStats {
  totalAssets: number;
  netIncome: number;
  savingsRate: number;
  remainingDebt: number;
}
