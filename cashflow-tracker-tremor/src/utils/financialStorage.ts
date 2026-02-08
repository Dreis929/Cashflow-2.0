import type { Account, Financing, Budget, Income, FinancialData } from '@/types/finances';
import { loadFromStorage, saveToStorage } from './storage';

const STORAGE_KEYS = {
  accounts: 'cashflow-accounts',
  financing: 'cashflow-financing',
  budgets: 'cashflow-budgets',
  income: 'cashflow-income',
} as const;

// ============= LOAD =============

export const loadFinancialData = (): FinancialData => {
  const accounts = loadFromStorage<Account[]>(STORAGE_KEYS.accounts, []);
  const financing = loadFromStorage<Financing[]>(STORAGE_KEYS.financing, []);
  const budgets = loadFromStorage<Budget[]>(STORAGE_KEYS.budgets, []);
  const income = loadFromStorage<Income>(STORAGE_KEYS.income, { monthly: 0, sources: [] });
  
  return { accounts, financing, budgets, income };
};

export const loadAccounts = (): Account[] => {
  return loadFromStorage<Account[]>(STORAGE_KEYS.accounts, []);
};

export const loadFinancing = (): Financing[] => {
  return loadFromStorage<Financing[]>(STORAGE_KEYS.financing, []);
};

export const loadBudgets = (): Budget[] => {
  return loadFromStorage<Budget[]>(STORAGE_KEYS.budgets, []);
};

export const loadIncome = (): Income => {
  return loadFromStorage<Income>(STORAGE_KEYS.income, { monthly: 0, sources: [] });
};

// ============= SAVE =============

export const saveFinancialData = (data: Partial<FinancialData>): void => {
  if (data.accounts) saveToStorage(STORAGE_KEYS.accounts, data.accounts);
  if (data.financing) saveToStorage(STORAGE_KEYS.financing, data.financing);
  if (data.budgets) saveToStorage(STORAGE_KEYS.budgets, data.budgets);
  if (data.income) saveToStorage(STORAGE_KEYS.income, data.income);
};

// ============= ACCOUNTS =============

export const addAccount = (account: Omit<Account, 'id'>): Account => {
  const accounts = loadAccounts();
  const newAccount: Account = {
    ...account,
    id: crypto.randomUUID(),
  };
  accounts.push(newAccount);
  saveToStorage(STORAGE_KEYS.accounts, accounts);
  return newAccount;
};

export const updateAccount = (id: string, updates: Partial<Omit<Account, 'id'>>): void => {
  const accounts = loadAccounts();
  const index = accounts.findIndex(acc => acc.id === id);
  if (index !== -1) {
    accounts[index] = { ...accounts[index], ...updates };
    saveToStorage(STORAGE_KEYS.accounts, accounts);
  }
};

export const deleteAccount = (id: string): void => {
  const accounts = loadAccounts();
  const filtered = accounts.filter(acc => acc.id !== id);
  saveToStorage(STORAGE_KEYS.accounts, filtered);
};

// ============= FINANCING =============

export const addFinancing = (financing: Omit<Financing, 'id'>): Financing => {
  const financings = loadFinancing();
  const newFinancing: Financing = {
    ...financing,
    id: crypto.randomUUID(),
  };
  financings.push(newFinancing);
  saveToStorage(STORAGE_KEYS.financing, financings);
  return newFinancing;
};

export const updateFinancing = (id: string, updates: Partial<Omit<Financing, 'id'>>): void => {
  const financings = loadFinancing();
  const index = financings.findIndex(fin => fin.id === id);
  if (index !== -1) {
    financings[index] = { ...financings[index], ...updates };
    saveToStorage(STORAGE_KEYS.financing, financings);
  }
};

export const deleteFinancing = (id: string): void => {
  const financings = loadFinancing();
  const filtered = financings.filter(fin => fin.id !== id);
  saveToStorage(STORAGE_KEYS.financing, filtered);
};

// ============= BUDGETS =============

export const addBudget = (budget: Omit<Budget, 'id'>): Budget => {
  const budgets = loadBudgets();
  const newBudget: Budget = {
    ...budget,
    id: crypto.randomUUID(),
  };
  budgets.push(newBudget);
  saveToStorage(STORAGE_KEYS.budgets, budgets);
  return newBudget;
};

export const updateBudget = (id: string, updates: Partial<Omit<Budget, 'id'>>): void => {
  const budgets = loadBudgets();
  const index = budgets.findIndex(bud => bud.id === id);
  if (index !== -1) {
    budgets[index] = { ...budgets[index], ...updates };
    saveToStorage(STORAGE_KEYS.budgets, budgets);
  }
};

export const deleteBudget = (id: string): void => {
  const budgets = loadBudgets();
  const filtered = budgets.filter(bud => bud.id !== id);
  saveToStorage(STORAGE_KEYS.budgets, filtered);
};

// ============= INCOME =============

export const updateIncome = (income: Income): void => {
  saveToStorage(STORAGE_KEYS.income, income);
};

// ============= IMPORT/EXPORT =============

export const exportFinancialData = (): string => {
  const data = loadFinancialData();
  return JSON.stringify(data, null, 2);
};

export const importFinancialData = (jsonData: string): FinancialData => {
  const data = JSON.parse(jsonData) as FinancialData;
  saveFinancialData(data);
  return data;
};
