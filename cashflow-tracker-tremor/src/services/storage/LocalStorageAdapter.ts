import { IStorageAdapter } from './IStorageAdapter';
import { Expense } from '@/types';
import { Account } from '@/types/finances';

export class LocalStorageAdapter implements IStorageAdapter {
  private readonly KEYS = {
    expenses: 'cashflow-expenses',
    accounts: 'cashflow-accounts',
  };

  // ========== EXPENSES ==========
  
  async getExpenses(): Promise<Expense[]> {
    const data = localStorage.getItem(this.KEYS.expenses);
    return data ? JSON.parse(data) : [];
  }
  
  async saveExpense(expense: Expense): Promise<void> {
    const expenses = await this.getExpenses();
    
    // Prüfe ob Expense bereits existiert
    const existingIndex = expenses.findIndex(e => e.id === expense.id);
    
    if (existingIndex !== -1) {
      // Update
      expenses[existingIndex] = { ...expense, updatedAt: new Date().toISOString() };
    } else {
      // Create
      expenses.push(expense);
    }
    
    localStorage.setItem(this.KEYS.expenses, JSON.stringify(expenses));
  }
  
  async updateExpense(id: string, updates: Partial<Expense>): Promise<void> {
    const expenses = await this.getExpenses();
    const index = expenses.findIndex(e => e.id === id);
    
    if (index !== -1) {
      expenses[index] = { 
        ...expenses[index], 
        ...updates,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(this.KEYS.expenses, JSON.stringify(expenses));
    } else {
      throw new Error(`Expense with id ${id} not found`);
    }
  }
  
  async deleteExpense(id: string): Promise<void> {
    const expenses = await this.getExpenses();
    const filtered = expenses.filter(e => e.id !== id);
    localStorage.setItem(this.KEYS.expenses, JSON.stringify(filtered));
  }

  // ========== ACCOUNTS ==========
  
  async getAccounts(): Promise<Account[]> {
    const data = localStorage.getItem(this.KEYS.accounts);
    return data ? JSON.parse(data) : [];
  }
  
  async saveAccount(account: Account): Promise<void> {
    const accounts = await this.getAccounts();
    
    const existingIndex = accounts.findIndex(a => a.id === account.id);
    
    if (existingIndex !== -1) {
      accounts[existingIndex] = { ...account, lastUpdated: new Date().toISOString() };
    } else {
      accounts.push(account);
    }
    
    localStorage.setItem(this.KEYS.accounts, JSON.stringify(accounts));
  }
  
  async updateAccount(id: string, updates: Partial<Account>): Promise<void> {
    const accounts = await this.getAccounts();
    const index = accounts.findIndex(a => a.id === id);
    
    if (index !== -1) {
      accounts[index] = { 
        ...accounts[index], 
        ...updates,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(this.KEYS.accounts, JSON.stringify(accounts));
    } else {
      throw new Error(`Account with id ${id} not found`);
    }
  }
  
  async deleteAccount(id: string): Promise<void> {
    const accounts = await this.getAccounts();
    const filtered = accounts.filter(a => a.id !== id);
    localStorage.setItem(this.KEYS.accounts, JSON.stringify(filtered));
  }

  // ========== UTILITY ==========
  
  isOnline(): boolean {
    return false; // LocalStorage ist immer "offline"
  }
}
