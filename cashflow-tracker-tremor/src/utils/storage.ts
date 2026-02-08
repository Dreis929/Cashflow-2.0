// Generic LocalStorage helpers
export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    
    // Initialize with default value on first load
    if (defaultValue !== null && defaultValue !== undefined) {
      saveToStorage(key, defaultValue);
    }
    return defaultValue;
  } catch (error) {
    console.error(`Error loading from localStorage (${key}):`, error);
    return defaultValue;
  }
};

export const saveToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);
  }
};

export const removeFromStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
  }
};

// Spezifische Storage-Keys
export const STORAGE_KEYS = {
  EXPENSES: 'cashflow-expenses',
  ACCOUNTS: 'cashflow-accounts',
  FINANCING: 'cashflow-financing',
  BUDGETS: 'cashflow-budgets',
  INCOME: 'cashflow-income',
  THEME: 'cashflow-theme',
  SETTINGS: 'cashflow-settings',
} as const;
