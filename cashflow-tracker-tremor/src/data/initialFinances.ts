import type { Financing, Account, Budget, Income } from '@/types/finances';

export const initialFinancing: Financing[] = [
  {
    id: crypto.randomUUID(),
    name: "Kia Ceed",
    description: "Auto-Finanzierung",
    initialAmount: 20000,
    remainingAmount: 16000,
    monthlyPayment: 300,
    startDate: "2025-08-29",
    endDate: "2027-12-31"
  }
];

export const initialAccounts: Account[] = [
  {
    id: crypto.randomUUID(),
    name: "Tagesgeld Trade Republic",
    type: "savings",
    balance: 2600,
    currency: "EUR",
    lastUpdated: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    name: "Tagesgeld Sparkasse",
    type: "savings",
    balance: 145,
    currency: "EUR",
    lastUpdated: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    name: "Cash",
    type: "cash",
    balance: 600,
    currency: "EUR",
    lastUpdated: new Date().toISOString()
  }
];

export const initialBudgets: Budget[] = [
  {
    id: crypto.randomUUID(),
    category: "🍔 Lebensmittel",
    limit: 300,
    spent: 50,
    period: "monthly",
    subcategories: []
  },
  {
    id: crypto.randomUUID(),
    category: "🚗 Transport",
    limit: 530,
    spent: 380,
    period: "monthly",
    subcategories: [
      { name: "Finanzierung", limit: 300, spent: 300 },
      { name: "Versicherung", limit: 70, spent: 70 },
      { name: "Steuer", limit: 10, spent: 10 },
      { name: "Sprit", limit: 150, spent: 0 }
    ]
  },
  {
    id: crypto.randomUUID(),
    category: "🎬 Entertainment",
    limit: 162.66,
    spent: 112.66,
    period: "monthly",
    subcategories: []
  },
  {
    id: crypto.randomUUID(),
    category: "👕 Kleidung",
    limit: 70,
    spent: 0,
    period: "monthly",
    subcategories: []
  },
  {
    id: crypto.randomUUID(),
    category: "💰 Sonstiges",
    limit: 1370,
    spent: 270,
    period: "monthly",
    subcategories: [
      { name: "Sonstiges", limit: 270, spent: 270 },
      { name: "Stahlfelgen", limit: 400, spent: 0 },
      { name: "Urlaub", limit: 700, spent: 0 }
    ]
  }
];

export const initialIncome: Income = {
  monthly: 1452.55,
  sources: [
    { name: "Gehalt", amount: 1452.55 }
  ]
};
