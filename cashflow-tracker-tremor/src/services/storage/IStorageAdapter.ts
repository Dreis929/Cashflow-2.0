import { Expense } from '@/types';
import { Account } from '@/types/finances';

// Technologie-unabhängiges Interface für Storage
export interface IStorageAdapter {
  // Expenses
  getExpenses(userId?: string): Promise<Expense[]>;
  saveExpense(expense: Expense): Promise<void>;
  updateExpense(id: string, updates: Partial<Expense>): Promise<void>;
  deleteExpense(id: string): Promise<void>;
  
  // Accounts
  getAccounts(userId?: string): Promise<Account[]>;
  saveAccount(account: Account): Promise<void>;
  updateAccount(id: string, updates: Partial<Account>): Promise<void>;
  deleteAccount(id: string): Promise<void>;
  
  // Sync (optional für Cloud-Provider)
  sync?(): Promise<void>;
  isOnline?(): boolean;
}
