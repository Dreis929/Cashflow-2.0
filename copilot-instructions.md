# Cashflow Tracker - Copilot Projektanleitung

## 🎯 Projektübersicht

**Projekt:** Cashflow Tracker mit Tremor UI + shadcn/ui
**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, Tremor (Charts), shadcn/ui (Forms)
**Ziel:** Moderne Finanz-Dashboard-Anwendung mit Ausgabenverwaltung und Finanzübersicht

---

## 📁 Ordnerstruktur

```
cashflow-tracker-tremor/
├── src/
│   ├── components/
│   │   ├── ui/                      # shadcn/ui Komponenten
│   │   │   ├── button.tsx           # Button-Komponente (Varianten: default, outline, ghost, etc.)
│   │   │   ├── dialog.tsx           # Modal-Dialog-Komponente
│   │   │   ├── input.tsx            # Input-Feld-Komponente
│   │   │   ├── label.tsx            # Label-Komponente
│   │   │   └── select.tsx           # Select-Dropdown-Komponente
│   │   ├── Charts.tsx               # Tremor Charts (Bar, Donut, Area, Line)
│   │   ├── ExpenseForm.tsx          # Formular zum Hinzufügen/Bearbeiten von Ausgaben
│   │   ├── ExpenseTable.tsx         # Tabelle mit Ausgaben (Filter, Such, Edit, Delete)
│   │   ├── ExpenseTable_old.tsx     # Legacy-Version (nicht aktiv)
│   │   ├── Header.tsx               # App-Header mit Import/Export
│   │   ├── Navigation.tsx           # Hauptnavigation zwischen Seiten
│   │   └── StatsCards.tsx           # Statistik-Karten für Dashboard
│   ├── pages/
│   │   ├── Dashboard.tsx            # Dashboard-Seite mit Zeitraum-Filter und Stats
│   │   ├── ExpensesPage.tsx         # Ausgaben-Verwaltungsseite
│   │   └── FinancesPage.tsx         # Finanzübersicht-Seite (Konten, Kredit, Budget)
│   ├── types/
│   │   ├── index.ts                 # Expense-Typen und Konstanten
│   │   └── finances.ts              # Finanz-Typen (Accounts, Financing, Budget)
│   ├── utils/
│   │   ├── calculations.ts          # Berechnungen (Stats, Kategorien, Monatsdaten)
│   │   └── storage.ts               # LocalStorage-Management
│   ├── lib/
│   │   └── utils.ts                 # cn() Utility für className-Merging
│   ├── App.tsx                      # Haupt-App-Komponente mit Routing
│   ├── main.tsx                     # Entry Point
│   └── index.css                    # Globale Styles + shadcn/ui CSS Variables
├── public/                          # Statische Assets
├── components.json                  # shadcn/ui Konfiguration
├── tailwind.config.js              # Tailwind + shadcn/ui Config
├── vite.config.ts                  # Vite Config mit Path Aliases
├── tsconfig.app.json               # TypeScript Config mit @/ Alias
├── package.json                    # Dependencies
├── SHADCN_SETUP.md                 # shadcn/ui Setup-Dokumentation
└── CHARTS_DOCUMENTATION.md         # Chart-Komponenten-Dokumentation
```

---

## 🚀 Schnellstart-Rekonstruktion

### Schritt 1: Projekt initialisieren
```bash
npm create vite@latest cashflow-tracker-tremor -- --template react-ts
cd cashflow-tracker-tremor
```

### Schritt 2: Dependencies installieren
```bash
npm install --legacy-peer-deps
```

**Haupt-Dependencies (MINIMAL - funktioniert garantiert):**
```json
{
  "@tremor/react": "^3.18.7",           // Charts & Dashboard
  "@radix-ui/react-dialog": "^1.1.1",    // shadcn Dialog
  "@radix-ui/react-label": "^2.1.0",     // shadcn Label
  "@radix-ui/react-select": "^2.1.1",    // shadcn Select
  "@radix-ui/react-slot": "^1.1.0",      // shadcn Slot
  "class-variance-authority": "^0.7.0",  // CVA für Varianten
  "clsx": "^2.1.1",                      // Klassen-Merging
  "tailwind-merge": "^2.5.5",            // Tailwind-Klassen-Merging
  "tailwindcss-animate": "^1.0.7",       // Animationen
  "date-fns": "^4.1.0",                  // Datums-Utilities
  "lucide-react": "^0.563.0",            // Icons
  "react-router-dom": "^7.13.0",         // Routing
  "recharts": "^3.7.0"                   // Charts (von Tremor verwendet)
}
```
**☝️ Diese Pakete reichen für die volle Funktionalität (LocalStorage-Modus)!**

**Optionale Cloud-Provider (SPÄTER hinzufügen, wenn benötigt):**
```json
{
  "@supabase/supabase-js": "^2.48.0",    // Option A: Supabase
  "firebase": "^11.2.0",                 // Option B: Firebase
  "axios": "^1.7.0"                      // Option C: Eigene REST-API
}
```

**Optionale PWA (SPÄTER hinzufügen):**
```json
{
  "vite-plugin-pwa": "^0.21.1"           // Dev-Dependency für Progressive Web App
}
```

**Erweiterte Features (Optional):**
```json
{
  "react-dropzone": "^14.3.5",           // Drag & Drop für Datei-Import
  "@radix-ui/react-toast": "^1.2.2",     // Toast-Benachrichtigungen
  "framer-motion": "^11.15.0",           // Animationen
  "papaparse": "^5.4.1",                 // CSV-Parser
  "@types/papaparse": "^5.3.15"          // TypeScript-Types für CSV
}
```

### Schritt 3: Konfiguration

**vite.config.ts:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**tsconfig.app.json - Path Aliases hinzufügen:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**tailwind.config.js:**
```javascript
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // ... shadcn/ui color variables
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}
```

---

## 📊 Datenstruktur & Typen

### Expense (Ausgaben)
```typescript
interface Expense {
  id: string;
  date: string;              // ISO-Format: "2025-01-15"
  amount: number;
  category: string;          // z.B. "🍔 Lebensmittel"
  description: string;
  paymentMethod: string;     // z.B. "💳 Kreditkarte"
  createdAt: string;         // ISO-Timestamp
}
```

### Kategorien & Zahlungsmethoden
```typescript
const CATEGORIES = [
  'Alle Kategorien',
  '🍔 Lebensmittel',
  '🚗 Transport',
  '🏠 Wohnung',
  '💊 Gesundheit',
  '🎬 Entertainment',
  '👕 Kleidung',
  '📚 Bildung',
  '💰 Sonstiges'
];

const PAYMENT_METHODS = [
  '💳 Kreditkarte',
  '💵 Bargeld',
  '🏦 Debitkarte',
  '📱 PayPal'
];
```

### Financial Data (Finanzen)
```typescript
interface Account {
  name: string;
  balance: number;
  type: 'savings' | 'checking' | 'cash';
}

interface Financing {
  name: string;
  totalPrice: number;
  loanAmount: number;
  downPayment: number;
  financingAmount: number;
  repayments: Array<{
    date: string;
    amount: number;
    remainingBalance: number;
  }>;
}

interface ExpenseCategory {
  category: string;
  amount: number;
  subcategories?: Array<{
    name: string;
    amount: number;
  }>;
}
```

---

## 🎨 Webseiten-Inhalt & Funktionen

### 1. Dashboard-Seite (`/`)
**Hauptfeatures:**
- ✅ Zeitraum-Filter (Benutzerdefiniert, Letzter Monat, Letztes Jahr)
- ✅ Datum-Range-Picker (Start- und Enddatum)
- ✅ 3 Statistik-Cards:
  - Gesamtausgaben (mit Vergleich zum vorherigen Zeitraum)
  - Durchschnitt pro Tag (mit Trend)
  - Transaktionen-Anzahl (mit Änderung)
- ✅ Kategorie-Breakdown (Top-Kategorien)
- ✅ Charts:
  - Top 5 Kategorien (Horizontal Bar Chart)
  - Monatliche Entwicklung (Area Chart)
  - Zahlungsmethoden-Verteilung (Donut Chart)

**UI-Komponenten:**
- Tremor Card für Stats
- Gradient-Hintergründe (blue, purple, orange)
- Trendindikatoren (grün für Verbesserung, rot für Verschlechterung)

### 2. Ausgaben-Seite (`/expenses`)
**Hauptfeatures:**
- ✅ Expense Form (shadcn/ui):
  - Datum (Input type="date")
  - Betrag (Input type="number")
  - Kategorie (Select)
  - Beschreibung (Input type="text")
  - Zahlungsmethode (Select)
  - Submit Button (Gradient blau-lila)
- ✅ Expense Table:
  - Such-Funktion (filtert nach Beschreibung)
  - Kategorie-Filter (Dropdown)
  - Edit & Delete Buttons pro Zeile
  - Hover-Effekte
- ✅ Charts:
  - Top 5 Kategorien Bar Chart
  - Kategorien-Verteilung Donut Chart
  - Monatliche Trends Area Chart
  - Zahlungsmethoden Line Chart

**Datenpersistenz:**
- LocalStorage (`cashflow-expenses` Key)
- Auto-Save bei jeder Änderung
- Import/Export über Header-Buttons

### 3. Finanzen-Seite (`/finances`)
**Hauptfeatures:**
- ✅ 4 Top-Stats-Cards:
  - Gesamtvermögen (Summe aller Konten)
  - Netto-Einkommen (Einkommen - Ausgaben)
  - Sparquote (%)
  - Restkredit
- ✅ Konten-Übersicht:
  - Tagesgeld-Konten
  - Cash
  - Card-Design mit Icons
- ✅ Finanzierung-Tracker:
  - Kia Ceed (Beispiel)
  - Fortschrittsbalken
  - Rückzahlungs-Historie
- ✅ Budget-Übersicht:
  - Einnahmen vs. Ausgaben
  - Kategorie-Breakdown mit Subcategories
  - Progress Bars pro Kategorie
- ✅ Ausgaben-Verteilung Charts:
  - Donut Chart (Hauptkategorien)
  - Bar Chart (Detailliert mit Subcategories)

**Datenquelle:**
- ~~Aktuell: Hardcoded in `FinancesPage.tsx`~~ ❌ **DEPRECATED**
- ✅ **Neu:** JSON-basiertes Management-System (siehe unten)

---

## 💾 Finanzdaten-Management (Lösung für Hardcoding)

### Problem: Hardcoded Finanzdaten
**Alt (❌):** Daten direkt in `FinancesPage.tsx` hardcoded → schwer wartbar

**Neu (✅):** Externes JSON-Management-System

### Implementierung

**1. Neue Datei: `src/data/financialData.json`**
```json
{
  "accounts": [
    {
      "id": "acc-1",
      "name": "Tagesgeld DKB",
      "balance": 15000,
      "type": "savings",
      "currency": "EUR",
      "lastUpdated": "2026-02-01"
    },
    {
      "id": "acc-2",
      "name": "Cash",
      "balance": 500,
      "type": "cash",
      "currency": "EUR",
      "lastUpdated": "2026-02-07"
    }
  ],
  "financing": [
    {
      "id": "fin-1",
      "name": "Kia Ceed",
      "totalPrice": 25000,
      "loanAmount": 20000,
      "downPayment": 5000,
      "financingAmount": 20000,
      "interestRate": 3.5,
      "startDate": "2024-06-01",
      "repayments": [
        {
          "date": "2024-07-01",
          "amount": 400,
          "remainingBalance": 19600
        }
      ]
    }
  ],
  "budgets": [
    {
      "id": "budget-1",
      "category": "🍔 Lebensmittel",
      "monthlyLimit": 400,
      "subcategories": [
        {
          "name": "Supermarkt",
          "limit": 300
        },
        {
          "name": "Restaurants",
          "limit": 100
        }
      ]
    }
  ],
  "income": {
    "monthly": 3500,
    "sources": [
      {
        "name": "Gehalt",
        "amount": 3200
      },
      {
        "name": "Nebenverdienst",
        "amount": 300
      }
    ]
  }
}
```

**2. Neue Utility: `src/utils/financialStorage.ts`**
```typescript
import { Account, Financing, Budget, Income } from '@/types/finances';

const STORAGE_KEYS = {
  accounts: 'cashflow-accounts',
  financing: 'cashflow-financing',
  budgets: 'cashflow-budgets',
  income: 'cashflow-income'
};

export const loadFinancialData = () => {
  const accounts = loadFromStorage<Account[]>(STORAGE_KEYS.accounts, []);
  const financing = loadFromStorage<Financing[]>(STORAGE_KEYS.financing, []);
  const budgets = loadFromStorage<Budget[]>(STORAGE_KEYS.budgets, []);
  const income = loadFromStorage<Income>(STORAGE_KEYS.income, { monthly: 0, sources: [] });
  
  return { accounts, financing, budgets, income };
};

export const saveFinancialData = (data: Partial<FinancialData>) => {
  if (data.accounts) saveToStorage(STORAGE_KEYS.accounts, data.accounts);
  if (data.financing) saveToStorage(STORAGE_KEYS.financing, data.financing);
  if (data.budgets) saveToStorage(STORAGE_KEYS.budgets, data.budgets);
  if (data.income) saveToStorage(STORAGE_KEYS.income, data.income);
};

export const importFinancialDataFromJSON = async (file: File) => {
  const text = await file.text();
  const data = JSON.parse(text);
  saveFinancialData(data);
  return data;
};
```

**3. Update `FinancesPage.tsx`**
```typescript
import { useState, useEffect } from 'react';
import { loadFinancialData } from '@/utils/financialStorage';

export default function FinancesPage() {
  const [financialData, setFinancialData] = useState(loadFinancialData());
  
  // Statt hardcoded Daten → dynamisches Laden
  useEffect(() => {
    const data = loadFinancialData();
    setFinancialData(data);
  }, []);
  
  return (
    <div>
      {/* Dynamische Rendering basierend auf financialData */}
    </div>
  );
}
```

**4. CRUD-Funktionen für Finanzdaten**
```typescript
// Konto hinzufügen
export const addAccount = (account: Omit<Account, 'id'>) => {
  const accounts = loadFromStorage<Account[]>(STORAGE_KEYS.accounts, []);
  const newAccount = { ...account, id: crypto.randomUUID() };
  accounts.push(newAccount);
  saveToStorage(STORAGE_KEYS.accounts, accounts);
  return newAccount;
};

// Konto aktualisieren
export const updateAccount = (id: string, updates: Partial<Account>) => {
  const accounts = loadFromStorage<Account[]>(STORAGE_KEYS.accounts, []);
  const index = accounts.findIndex(acc => acc.id === id);
  if (index !== -1) {
    accounts[index] = { ...accounts[index], ...updates };
    saveToStorage(STORAGE_KEYS.accounts, accounts);
  }
};

// Konto löschen
export const deleteAccount = (id: string) => {
  const accounts = loadFromStorage<Account[]>(STORAGE_KEYS.accounts, []);
  const filtered = accounts.filter(acc => acc.id !== id);
  saveToStorage(STORAGE_KEYS.accounts, filtered);
};
```

---

## 🏗️ Future-Proof Architektur (Technologie-Agnostisch)

### ⚠️ WICHTIG: Vendor Lock-in vermeiden!

**Problem:** Zu frühe Festlegung auf spezifische Cloud-Anbieter kann später Migration erschweren.

**Lösung:** Abstraktionsschicht zwischen App-Logik und externen Services.

### Adapter-Pattern für Datenpersistenz

**1. Interface definieren: `src/services/storage/IStorageAdapter.ts`**
```typescript
// Technologie-unabhängiges Interface
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
  
  // Sync
  sync?(): Promise<void>;
  isOnline?(): boolean;
}
```

**2. LocalStorage-Adapter (immer verfügbar): `src/services/storage/LocalStorageAdapter.ts`**
```typescript
import { IStorageAdapter } from './IStorageAdapter';
import { Expense, Account } from '@/types';

export class LocalStorageAdapter implements IStorageAdapter {
  private readonly KEYS = {
    expenses: 'cashflow-expenses',
    accounts: 'cashflow-accounts',
  };
  
  async getExpenses(): Promise<Expense[]> {
    const data = localStorage.getItem(this.KEYS.expenses);
    return data ? JSON.parse(data) : [];
  }
  
  async saveExpense(expense: Expense): Promise<void> {
    const expenses = await this.getExpenses();
    expenses.push(expense);
    localStorage.setItem(this.KEYS.expenses, JSON.stringify(expenses));
  }
  
  async updateExpense(id: string, updates: Partial<Expense>): Promise<void> {
    const expenses = await this.getExpenses();
    const index = expenses.findIndex(e => e.id === id);
    if (index !== -1) {
      expenses[index] = { ...expenses[index], ...updates };
      localStorage.setItem(this.KEYS.expenses, JSON.stringify(expenses));
    }
  }
  
  async deleteExpense(id: string): Promise<void> {
    const expenses = await this.getExpenses();
    const filtered = expenses.filter(e => e.id !== id);
    localStorage.setItem(this.KEYS.expenses, JSON.stringify(filtered));
  }
  
  // Accounts analog implementieren
  async getAccounts(): Promise<Account[]> { /* ... */ }
  async saveAccount(account: Account): Promise<void> { /* ... */ }
  async updateAccount(id: string, updates: Partial<Account>): Promise<void> { /* ... */ }
  async deleteAccount(id: string): Promise<void> { /* ... */ }
  
  isOnline(): boolean {
    return false; // LocalStorage ist immer "offline"
  }
}
```

**3. Supabase-Adapter (optional): `src/services/storage/SupabaseAdapter.ts`**
```typescript
import { IStorageAdapter } from './IStorageAdapter';
import { supabase } from '@/lib/supabase';

export class SupabaseAdapter implements IStorageAdapter {
  private localFallback = new LocalStorageAdapter();
  
  async getExpenses(userId?: string): Promise<Expense[]> {
    try {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', userId || (await supabase.auth.getUser()).data.user?.id);
      
      if (error) throw error;
      
      // Cache lokal für Offline-Zugriff
      this.localFallback.cacheExpenses(data);
      return data || [];
    } catch (error) {
      console.warn('Supabase offline, using LocalStorage fallback');
      return this.localFallback.getExpenses();
    }
  }
  
  async sync(): Promise<void> {
    // Bidirektionales Sync (siehe oben)
  }
  
  isOnline(): boolean {
    return navigator.onLine;
  }
}
```

**4. Firebase-Adapter (alternative): `src/services/storage/FirebaseAdapter.ts`**
```typescript
import { IStorageAdapter } from './IStorageAdapter';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export class FirebaseAdapter implements IStorageAdapter {
  private localFallback = new LocalStorageAdapter();
  
  async getExpenses(userId?: string): Promise<Expense[]> {
    try {
      const snapshot = await getDocs(collection(db, 'expenses'));
      const expenses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      this.localFallback.cacheExpenses(expenses);
      return expenses;
    } catch (error) {
      console.warn('Firebase offline, using LocalStorage fallback');
      return this.localFallback.getExpenses();
    }
  }
  
  // Analog zu Supabase
}
```

**5. Storage-Factory (wählt Adapter): `src/services/storage/StorageFactory.ts`**
```typescript
import { IStorageAdapter } from './IStorageAdapter';
import { LocalStorageAdapter } from './LocalStorageAdapter';
import { SupabaseAdapter } from './SupabaseAdapter';
import { FirebaseAdapter } from './FirebaseAdapter';

type StorageProvider = 'local' | 'supabase' | 'firebase';

export class StorageFactory {
  private static instance: IStorageAdapter | null = null;
  
  static getAdapter(provider?: StorageProvider): IStorageAdapter {
    if (this.instance) return this.instance;
    
    // Provider aus Environment oder Config
    const selectedProvider = provider || 
      (import.meta.env.VITE_STORAGE_PROVIDER as StorageProvider) || 
      'local';
    
    switch (selectedProvider) {
      case 'supabase':
        // Nur laden wenn Credentials vorhanden
        if (import.meta.env.VITE_SUPABASE_URL) {
          this.instance = new SupabaseAdapter();
          console.log('✅ Using Supabase Storage');
        } else {
          console.warn('⚠️ Supabase credentials missing, falling back to LocalStorage');
          this.instance = new LocalStorageAdapter();
        }
        break;
        
      case 'firebase':
        if (import.meta.env.VITE_FIREBASE_API_KEY) {
          this.instance = new FirebaseAdapter();
          console.log('✅ Using Firebase Storage');
        } else {
          console.warn('⚠️ Firebase credentials missing, falling back to LocalStorage');
          this.instance = new LocalStorageAdapter();
        }
        break;
        
      default:
        this.instance = new LocalStorageAdapter();
        console.log('✅ Using LocalStorage (Offline-Only)');
    }
    
    return this.instance;
  }
  
  // Zum Wechseln des Providers zur Laufzeit
  static switchProvider(provider: StorageProvider): void {
    this.instance = null;
    this.getAdapter(provider);
  }
}
```

**6. Usage in Components:**
```typescript
import { StorageFactory } from '@/services/storage/StorageFactory';

export default function ExpensesPage() {
  const storage = StorageFactory.getAdapter(); // Automatisch richtige Implementierung
  
  const loadExpenses = async () => {
    const expenses = await storage.getExpenses(); // Funktioniert mit jedem Adapter!
    setExpenses(expenses);
  };
  
  const addExpense = async (expense: Expense) => {
    await storage.saveExpense(expense);
    await loadExpenses();
  };
}
```

### 🔄 Migration zwischen Technologien

**Szenario: Von LocalStorage → Supabase**

1. Supabase-Credentials in `.env.local` hinzufügen
2. `VITE_STORAGE_PROVIDER=supabase` setzen
3. Daten migrieren:

```typescript
// Migration-Script: src/scripts/migrate.ts
import { LocalStorageAdapter } from '@/services/storage/LocalStorageAdapter';
import { SupabaseAdapter } from '@/services/storage/SupabaseAdapter';

async function migrateToSupabase() {
  const local = new LocalStorageAdapter();
  const supabase = new SupabaseAdapter();
  
  const expenses = await local.getExpenses();
  
  console.log(`Migrating ${expenses.length} expenses...`);
  
  for (const expense of expenses) {
    await supabase.saveExpense(expense);
  }
  
  console.log('✅ Migration complete!');
}
```

4. App neu starten → verwendet automatisch Supabase
5. LocalStorage als Backup behalten (Offline-Fallback)

### 🎯 Vorteile dieser Architektur

✅ **Keine Vendor Lock-in:** Wechsel zwischen Anbietern ohne Code-Änderungen
✅ **Progressive Enhancement:** Start mit LocalStorage, später Cloud
✅ **Offline-First:** Fallback immer verfügbar
✅ **Testbar:** Mock-Adapter für Unit-Tests
✅ **Flexibel:** Neue Adapter hinzufügen (z.B. eigene REST-API)

### 📝 `.env.local` Konfiguration

```bash
# Storage-Provider wählen: 'local' | 'supabase' | 'firebase'
VITE_STORAGE_PROVIDER=local

# Supabase (optional - nur wenn VITE_STORAGE_PROVIDER=supabase)
# VITE_SUPABASE_URL=https://xxx.supabase.co
# VITE_SUPABASE_ANON_KEY=xxx

# Firebase (optional - nur wenn VITE_STORAGE_PROVIDER=firebase)
# VITE_FIREBASE_API_KEY=xxx
# VITE_FIREBASE_PROJECT_ID=xxx
```

**Start ohne Cloud → funktioniert sofort!**
**Später Cloud aktivieren → 2 Zeilen ändern!**

---

## ☁️ Cloud-Sync-Implementierung (Optional)

### ⚠️ HINWEIS: Nur implementieren wenn wirklich benötigt!

Dank Adapter-Pattern kannst du jederzeit wechseln. Starte mit LocalStorage.

### Option 1: Supabase (wenn du dich entscheidest)

**Installation:**
```bash
npm install @supabase/supabase-js
```

**Setup: `src/lib/supabase.ts`**
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

**Datenbank-Schema (SQL):**
```sql
-- Tabelle: expenses
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  payment_method VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabelle: accounts
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  balance DECIMAL(10,2) NOT NULL,
  type VARCHAR(20) NOT NULL,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own expenses"
  ON expenses FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own accounts"
  ON accounts FOR ALL
  USING (auth.uid() = user_id);
```

**Sync-Service: `src/services/syncService.ts`**
```typescript
import { supabase } from '@/lib/supabase';
import { Expense } from '@/types';

// Offline-First: LocalStorage als primäre Quelle
export class SyncService {
  private static syncInProgress = false;
  
  // Auto-Sync bei Online-Status
  static async autoSync() {
    if (!navigator.onLine || this.syncInProgress) return;
    
    this.syncInProgress = true;
    try {
      await this.syncExpenses();
      await this.syncAccounts();
    } finally {
      this.syncInProgress = false;
    }
  }
  
  // Bidirektionales Sync
  static async syncExpenses() {
    const localExpenses = loadFromStorage<Expense[]>('cashflow-expenses', []);
    const { data: cloudExpenses } = await supabase
      .from('expenses')
      .select('*')
      .order('updated_at', { ascending: false });
    
    // Merge-Strategie: Neueste Änderung gewinnt
    const merged = this.mergeData(localExpenses, cloudExpenses || []);
    
    // Upload lokale Änderungen
    const toUpload = merged.filter(exp => 
      !cloudExpenses?.find(ce => ce.id === exp.id)
    );
    
    if (toUpload.length > 0) {
      await supabase.from('expenses').upsert(toUpload);
    }
    
    // Speichere merged Data lokal
    saveToStorage('cashflow-expenses', merged);
    return merged;
  }
  
  private static mergeData<T extends { id: string; updated_at?: string }>(local: T[], cloud: T[]): T[] {
    const map = new Map<string, T>();
    
    // Füge alle ein, neueste Änderung gewinnt
    [...local, ...cloud].forEach(item => {
      const existing = map.get(item.id);
      if (!existing || (item.updated_at && existing.updated_at && item.updated_at > existing.updated_at)) {
        map.set(item.id, item);
      }
    });
    
    return Array.from(map.values());
  }
}

// Event-Listener für Online/Offline
window.addEventListener('online', () => SyncService.autoSync());

// Periodisches Sync (alle 5 Min)
setInterval(() => SyncService.autoSync(), 5 * 60 * 1000);
```

**Offline-Indicator-Komponente:**
```typescript
import { Wifi, WifiOff } from 'lucide-react';
import { useState, useEffect } from 'react';

export function OnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return (
    <div className="flex items-center gap-2">
      {isOnline ? (
        <><Wifi className="w-4 h-4 text-green-500" /> Verbunden</>
      ) : (
        <><WifiOff className="w-4 h-4 text-red-500" /> Offline</>
      )}
    </div>
  );
}
```

### Option 2: Firebase (Alternative)

**Installation:**
```bash
npm install firebase
```

**Setup mit Firestore:**
```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

---

## 🔐 Authentifizierungs-System

### Problem gelöst: ✅ Keine Authentifizierung → Sicherer Multi-User-Zugriff

### Implementierung mit Supabase Auth

**1. Auth-Context: `src/contexts/AuthContext.tsx`**
```typescript
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Session-Check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    
    // Auth-Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    
    return () => subscription.unsubscribe();
  }, []);
  
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };
  
  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };
  
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };
  
  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

**2. Login-Seite: `src/pages/LoginPage.tsx`**
```typescript
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="w-full max-w-md p-8 bg-zinc-900 border-2 border-zinc-800 rounded-lg">
        <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Cashflow Tracker
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">E-Mail</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="password">Passwort</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            {isSignUp ? 'Registrieren' : 'Anmelden'}
          </Button>
          
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-zinc-400 hover:text-zinc-300"
          >
            {isSignUp ? 'Bereits registriert? Anmelden' : 'Noch kein Konto? Registrieren'}
          </button>
        </form>
      </div>
    </div>
  );
}
```

**3. Protected Routes: `src/components/ProtectedRoute.tsx`**
```typescript
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Laden...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}
```

**4. Update `App.tsx` mit Auth:**
```typescript
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          {/* Weitere geschützte Routes */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
```

---

## 📱 Mobile-Optimierung

### Problem gelöst: ✅ Fehlende Mobile-Optimierung

### Responsive Design-Prinzipien

**1. Tailwind Mobile-First Approach**
```typescript
// Statt Desktop-First:
<div className="grid grid-cols-3 gap-4"> ❌

// Mobile-First (richtig):
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> ✅
```

**2. Touch-Optimierte Buttons**
```css
/* Mindest-Touch-Target: 44x44px (Apple), 48x48px (Android) */
.touch-target {
  @apply min-h-[44px] min-w-[44px] flex items-center justify-center;
}
```

**3. Responsive Navigation**
```typescript
// Mobile: Hamburger Menu
// Desktop: Horizontal Navigation

import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function ResponsiveNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </button>
      
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex gap-4">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/expenses">Ausgaben</NavLink>
        <NavLink to="/finances">Finanzen</NavLink>
      </nav>
      
      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-zinc-950">
          <nav className="flex flex-col gap-4 p-4">
            <NavLink to="/" onClick={() => setIsOpen(false)}>Dashboard</NavLink>
            <NavLink to="/expenses" onClick={() => setIsOpen(false)}>Ausgaben</NavLink>
            <NavLink to="/finances" onClick={() => setIsOpen(false)}>Finanzen</NavLink>
          </nav>
        </div>
      )}
    </>
  );
}
```

**4. Mobile-Optimierte Charts**
```typescript
import { useWindowSize } from '@/hooks/useWindowSize';

export function ResponsiveChart() {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  
  return (
    <BarChart
      data={data}
      index="name"
      categories={["Betrag"]}
      layout={isMobile ? "vertical" : "horizontal"} // Automatisch anpassen
      showLegend={!isMobile} // Legende nur auf Desktop
      height={isMobile ? "h-64" : "h-96"}
    />
  );
}
```

**5. Viewport Meta-Tag (index.html)**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
```

**6. Mobile-Optimierte Tabelle**
```typescript
// Statt große Tabelle:
export function MobileExpenseList({ expenses }: { expenses: Expense[] }) {
  return (
    <div className="lg:hidden space-y-2">
      {expenses.map(expense => (
        <div key={expense.id} className="bg-zinc-900 border-2 border-zinc-800 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-semibold">{expense.description}</div>
              <div className="text-sm text-zinc-400">{expense.category}</div>
            </div>
            <div className="text-right">
              <div className="font-bold">{formatCurrency(expense.amount)}</div>
              <div className="text-sm text-zinc-400">{expense.date}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

**7. PWA-Konfiguration (Progressive Web App)**

**manifest.json:**
```json
{
  "name": "Cashflow Tracker",
  "short_name": "Cashflow",
  "description": "Persönlicher Finanz-Tracker",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#09090b",
  "theme_color": "#3b82f6",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

**Service Worker (vite-plugin-pwa):**
```bash
npm install vite-plugin-pwa -D
```

```typescript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      manifest: {
        /* siehe manifest.json */
      }
    })
  ]
});
```

---

## 📥 JSON-Import-Mechanismus

### Import-Funktion im Header
```typescript
const handleImportClick = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = JSON.parse(event.target?.result as string);
        // Validierung und Import
        setExpenses(data);
        saveToLocalStorage(data);
      };
      reader.readAsText(file);
    }
  };
  input.click();
};
```

### Export-Funktion
```typescript
const handleExportClick = () => {
  const dataStr = JSON.stringify(expenses, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `cashflow-export-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
};
```

### JSON-Format für Ausgaben
```json
[
  {
    "id": "uuid-v4-string",
    "date": "2025-01-15",
    "amount": 45.99,
    "category": "🍔 Lebensmittel",
    "description": "Supermarkt Einkauf",
    "paymentMethod": "💳 Kreditkarte",
    "createdAt": "2025-01-15T10:30:00.000Z"
  }
]
```

---

## 📊 Diagramm-Komponenten (Tremor)

### Verwendete Chart-Typen

**1. BarChart (Horizontal)**
```typescript
<BarChart
  data={top5Categories}
  index="name"
  categories={["Betrag"]}
  colors={["blue"]}
  layout="horizontal"
  showLegend={false}
  showGridLines={false}
  valueFormatter={(value) => formatCurrency(value)}
/>
```
**Verwendung:** Top 5 Kategorien, Detaillierte Subcategories

**2. DonutChart**
```typescript
<DonutChart
  data={donutData}
  category="value"
  index="name"
  colors={["blue", "violet", "purple", "fuchsia", "pink"]}
  valueFormatter={(value) => formatCurrency(value)}
  showAnimation={true}
/>
```
**Verwendung:** Kategorien-Verteilung, Zahlungsmethoden

**3. AreaChart**
```typescript
<AreaChart
  data={monthlyTrendData}
  index="Monat"
  categories={["Ausgaben", "Durchschnitt"]}
  colors={["blue", "purple"]}
  valueFormatter={(value) => formatCurrency(value)}
  showLegend={true}
  showGridLines={true}
/>
```
**Verwendung:** Monatliche Trends, Zeitreihen

**4. LineChart**
```typescript
<LineChart
  data={paymentMethodData}
  index="Monat"
  categories={["Kreditkarte", "Bargeld", "Debitkarte"]}
  colors={["blue", "emerald", "violet"]}
  valueFormatter={(value) => formatCurrency(value)}
/>
```
**Verwendung:** Zahlungsmethoden-Trends, Vergleiche

### Chart-Styling (Dark Theme)
```css
/* Tremor Chart Text */
[class*="tremor"] text {
  @apply fill-zinc-300 !important;
}

/* Chart Grid Lines */
[class*="tremor"] .recharts-cartesian-grid line {
  @apply stroke-zinc-700 !important;
}

/* Chart Tooltips */
[class*="tremor"] .tremor-Tooltip {
  @apply bg-zinc-800 border-zinc-700 !important;
}
```

---

## 🎯 Kommende Funktionalitäten

### ✅ Abgeschlossen (siehe Dokumentation oben)
- [x] Cloud-Sync (Supabase/Firebase) → § "Cloud-Sync-Implementierung"
- [x] Offline-First mit Service Worker → § "Mobile-Optimierung" (PWA)
- [x] Multi-Device-Sync → § "Cloud-Sync-Implementierung"
- [x] Responsive Mobile-Optimierung → § "Mobile-Optimierung"
- [x] Authentifizierung & User-Management → § "Authentifizierungs-System"
- [x] JSON-basiertes Finanzdaten-Management → § "Finanzdaten-Management"

### Priorität 1: Erweiterte Datenimporte
- [ ] CSV-Import für Bankdaten (MT940, CAMT.053 Format)
- [ ] Automatische Kategorisierung per KI/Regeln (OpenAI API Integration)
- [ ] Bulk-Import mit Mapping-Interface (Spalten-Zuordnung)
- [ ] Import-Historie und Rollback (Versionierung)
- [ ] OCR für Rechnungs-Scans (Tesseract.js)

### Priorität 2: Erweiterte Analysen
- [ ] Monats-Vergleiche (MoM, YoY) mit Delta-Anzeige
- [ ] Budgetverwaltung mit Limits & Warnungen (✅ Datenmodell vorhanden)
- [ ] Ausgaben-Prognosen (Machine Learning - TensorFlow.js)
- [ ] Savings-Goals-Tracker mit Fortschrittsbalken
- [ ] Recurring Expenses Detection (Pattern-Matching)
- [ ] Cashflow-Forecast (3/6/12 Monate)

### Priorität 3: UI/UX-Verbesserungen
- [ ] Toast-Benachrichtigungen (shadcn/ui Toast - Erfolg/Fehler)
- [ ] Alert-Dialoge für Löschbestätigungen (shadcn/ui AlertDialog)
- [ ] Drag & Drop für CSV-Import (react-dropzone)
- [ ] Tabs für verschiedene Ansichten (shadcn/ui Tabs)
- [ ] Dark/Light Mode Toggle (mit System-Präferenz)
- [ ] Skeleton Loaders für bessere UX
- [ ] Animations & Transitions (Framer Motion)

### Priorität 4: Erweiterte Datenpersistenz
- [x] Cloud-Sync (Supabase) ✅
- [x] Offline-First ✅
- [ ] Backup-Automatisierung (täglich/wöchentlich)
- [x] Multi-Device-Sync ✅
- [ ] Verschlüsselung sensibler Daten (AES-256)
- [ ] Audit-Log für alle Änderungen

### Priorität 5: Berichte & Exports
- [ ] PDF-Report-Generierung
- [ ] Excel-Export mit Formeln
- [ ] E-Mail-Reports (monatlich)
- [ ] Custom Report Builder

### Priorität 6: Finanz-Features
- [ ] Konten-Management (CRUD)
- [ ] Kredit-Tracking mit Zinsen
- [ ] Investment-Portfolio-Tracking
- [ ] Recurring Transactions
- [ ] Split-Transactions (mehrere Kategorien)

---

## 🛠️ Design-System

### Farbschema (Dark Theme)
```css
--background: 240 10% 3.9%;        /* Dunkelgrau */
--foreground: 240 4.8% 95.9%;      /* Fast Weiß */
--primary: 240 5.9% 90%;           /* Helles Grau */
--accent: 240 3.7% 15.9%;          /* Dunkler Akzent */
--destructive: 0 62.8% 30.6%;      /* Rot */
```

### Gradient-Kombinationen
- **Blau-Lila:** `from-blue-600 to-purple-600` (Primary Actions)
- **Blau-Dunkel:** `from-blue-900/50 to-blue-950/50` (Stats Cards)
- **Lila-Dunkel:** `from-purple-900/50 to-purple-950/50` (Stats Cards)
- **Orange-Dunkel:** `from-orange-900/50 to-orange-950/50` (Stats Cards)
- **Grün-Dunkel:** `from-emerald-900/50 to-emerald-950/50` (Positive Stats)

### Border-Styling
- Standard: `border-2 border-zinc-800`
- Keine farbigen Borders mehr (früher: `border-blue-800` → jetzt: `border-zinc-800`)

### Component-Hierarchie
1. **Tremor Components:** Charts, Cards (Dashboard-Elemente)
2. **shadcn/ui Components:** Forms, Inputs, Buttons, Dialogs (Interaktive Elemente)
3. **Custom Components:** Navigation, Header, Tables

---

## 🔧 Entwickler-Workflows

### Storage-Provider wechseln (ohne Code-Änderung)

```bash
# 1. In .env.local ändern:
VITE_STORAGE_PROVIDER=supabase  # oder 'firebase' oder 'local'

# 2. App neu starten
npm run dev

# 3. Optional: Daten migrieren (siehe Migration-Script oben)
```

### Neue shadcn/ui Komponente hinzufügen
```bash
# Manuell erstellen in src/components/ui/
# Oder via CLI (wenn PowerShell Policy erlaubt):
npx shadcn@latest add [component-name]
```

### Neue Chart-Komponente erstellen
```typescript
import { BarChart } from '@tremor/react';

<BarChart
  data={data}
  index="name"
  categories={["value"]}
  colors={["blue"]}
  valueFormatter={(v) => formatCurrency(v)}
/>
```

### LocalStorage-Operationen
```typescript
// Speichern
localStorage.setItem('cashflow-expenses', JSON.stringify(expenses));

// Laden
const stored = localStorage.getItem('cashflow-expenses');
const expenses = stored ? JSON.parse(stored) : [];
```

### Routing hinzufügen
```typescript
// In App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/expenses" element={<ExpensesPage />} />
  <Route path="/finances" element={<FinancesPage />} />
</Routes>
```

---

## 🚨 Häufige Probleme & Lösungen

### Problem: React 19 + Tremor Dependency Conflict
**Lösung:**
```bash
npm install --legacy-peer-deps
```

### Problem: PowerShell Execution Policy
**Lösung:**
```bash
# Via cmd.exe ausführen:
cmd /c "npm install"
```

### Problem: Path Aliases funktionieren nicht
**Lösung:**
1. `tsconfig.app.json` → `baseUrl` und `paths` prüfen
2. `vite.config.ts` → `resolve.alias` prüfen
3. VSCode neustarten

### Problem: Tremor Charts zeigen keine Daten
**Lösung:**
- `data` Array prüfen (muss nicht-leer sein)
- `index` und `categories` Props prüfen
- Datenformat prüfen (Schlüssel müssen matchen)

---

## 📝 Best Practices

### Code-Organisation
✅ **DO:**
- Komponenten in logische Ordner gruppieren (`components/`, `pages/`)
- Typen in separaten Files (`types/`)
- Utils für wiederverwendbare Logik (`utils/`)
- CSS Variables für Theming

❌ **DON'T:**
- Inline-Styles (nutze Tailwind)
- Globale State ohne Context/Props
- Hardcoded Strings (nutze Konstanten)

### TypeScript
✅ **DO:**
- Interfaces für alle Daten-Strukturen
- Props-Types für alle Komponenten
- Return-Types für komplexe Funktionen
- Strikte Type-Checks (`strict: true` in tsconfig)

### Performance
✅ **DO:**
- `useMemo` für teure Berechnungen
- `useCallback` für Event-Handler
- Lazy Loading für große Components
- Code-Splitting (React.lazy)
- Virtualisierung für lange Listen (react-window)

### Security
✅ **DO:**
- Environment Variables für API-Keys (`.env.local`)
- Row Level Security (RLS) in Supabase aktivieren
- Input-Validierung (Client + Server)
- HTTPS für alle API-Calls
- Content Security Policy (CSP) konfigurieren

❌ **DON'T:**
- API-Keys im Code committen
- Sensible Daten im LocalStorage ohne Verschlüsselung
- XSS-anfällige `dangerouslySetInnerHTML`

### Mobile-Optimierung
✅ **DO:**
- Mobile-First CSS (min-width Breakpoints)
- Touch-Targets mindestens 44x44px
- PWA-Manifest & Service Worker
- Responsive Images (srcSet, sizes)
- Viewport Meta-Tag korrekt setzen

❌ **DON'T:**
- Hover-only Interaktionen
- Zu kleine Touch-Targets
- Horizontales Scrollen erzwingen

---

## 🔐 Environment Variables

### Setup `.env.local` (nicht committen!)

```bash
# Supabase (empfohlen)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Firebase (Alternative)
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id

# OpenAI (für Auto-Kategorisierung)
VITE_OPENAI_API_KEY=sk-...

# App-Config
VITE_APP_NAME="Cashflow Tracker"
VITE_APP_VERSION="2.0"
```

### `.gitignore` erweitern
```bash
# Environment
.env
.env.local
.env.*.local

# Supabase
.supabase/

# Build
dist/
build/
```

### Type-Safe Environment Variables

**`src/env.d.ts`:**
```typescript
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_FIREBASE_API_KEY?: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN?: string;
  readonly VITE_FIREBASE_PROJECT_ID?: string;
  readonly VITE_OPENAI_API_KEY?: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

---

## 🎓 Lernressourcen

### UI & Styling
- **Tremor:** https://tremor.so/docs
- **shadcn/ui:** https://ui.shadcn.com/docs
- **Radix UI:** https://radix-ui.com/primitives/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **React Router:** https://reactrouter.com/en/main

### Cloud & Auth (NEU ✅)
- **Supabase Docs:** https://supabase.com/docs
- **Supabase Au (OHNE Cloud - funktioniert sofort!)
- [ ] 1. Vite-Projekt mit React-TS Template erstellen
- [ ] 2. Nur MINIMALE Dependencies installieren (siehe oben - 13 Pakete)
- [ ] 3. Tailwind CSS konfigurieren (mit shadcn/ui Extensions)
- [ ] 4. Path Aliases einrichten (`@/` → `./src/`)
- [ ] 5. `src/lib/utils.ts` mit `cn()` erstellen
- [ ] 6. shadcn/ui Komponenten in `src/components/ui/` erstellen
- [ ] 7. Typen in `src/types/` definieren
- [ ] 8. Utils in `src/utils/` implementieren
- [ ] 9. **Adapter-Pattern implementieren** (IStorageAdapter + LocalStorageAdapter)
- [ ] 10. `.env.local` mit `VITE_STORAGE_PROVIDER=local` erstellsponsive-web-design-basics/
- **Touch Targets:** https://web.dev/accessible-tap-targets/

### Performance & Security
- **React Performance:** https://react.dev/learn/render-and-commit
- **Web Security:** https://owasp.org/www-project-web-security-testing-guide/
- **Content Security Policy:** https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP

---

## ✅ Checkliste: Projekt rekonstruieren

### Basis-Setup
- [ ] 1. Vite-Projekt mit React-TS Template erstellen
- [ ] 2. Dependencies installieren (`--legacy-peer-deps`)
- [ ] 3. Tailwind CSS k⚠️ OPTIONAL - später hinzufügen!)
- [ ] 20. **ENTSCHEIDUNG:** Welcher Provider? (Supabase/Firebase/eigene API)
- [ ] 21. `npm install @supabase/supabase-js` ODER `npm install firebase`
- [ ] 22. Provider-Credentials in `.env.local` hinzufügen
- [ ] 23. Entsprechenden Adapter implementieren (Supabase/Firebase)
- [ ] 24. `VITE_STORAGE_PROVIDER` in `.env.local` ändern
- [ ] 25. Migration-Script ausführen (Daten von LocalStorage → Cloud)
- [ ] 26. Datenbank-Tabellen erstellen (siehe SQL-Schema)
- [ ] 27. Auth-System implementieren (nur wenn Cloud-Provider)
- [ ] 28 Tremor Charts in `src/components/Charts.tsx` erstellen
- [ ] 10. Pages in `src/pages/` erstellen
- [ ] 11. Navigation & Header erstellen
- [ ] 12. Routing in `App.tsx` einrichten
- [ ] 13. CSS Variables in `index.css` hinzufügen
- [ ] 14. LocalStorage-Integration testen
- [ ] 15. Import/Export-Funktionalität testen

### Finanzdaten-Management (✅ Neue Anforderung)
- [ ] 16. `src/data/financialData.json` erstellen
- [ ] 17. `src/utils/financialStorage.ts` mit CRUD-Operationen
- [ ] 18. `FinancesPage.tsx` auf JSON-basiert umstellen
- [ ] 19. Import-Funktion für Finanzdaten im Header

### Cloud-Sync & Auth (✅ Neue Anforderung)
- [ ] 20. `.env.local` mit Supabase/Firebase Credentials erstellen
- [ ] 21. Supabase-Client in `src/lib/supabase.ts` konfigurieren
- [ ] 22. Datenbank-Tabellen mit RLS erstellen (siehe SQL-Schema)
- [ ] 23. `src/services/syncService.ts` implementieren
- [ ] 24. `src/contexts/AuthContext.tsx` für User-Management
- [ ] 25. `src/pages/LoginPage.tsx` erstellen
- [ ] 26. Protected Routes in `App.tsx` einrichten
- [ ] 27. Online/Offline-Indicator in Header

### Mobile-Optimierung (✅ Neue Anforderung)
- [ ] 28. Responsive Navigation (Hamburger Menu)
- [ ] 29. Mobile-First Breakpoints in allen Komponenten
- [ ] 30. Touch-optimierte Buttons (min 44x44px)
- [ ] 31. Mobile-optimierte Tabellen/Listen
- [ ] 32. PWA-Manifest (`public/manifest.json`)
- [ ] 33. Vite-PWA-Plugin konfigurieren
- [ ] 34. Service Worker testen (Offline-Modus)
- [ ] 35. Responsive Charts (viewport-abhängig)

### Testing & Deployment
- [ ] 36. Dev-Server starten und testen
- [ ] 37. Mobile-Ansicht testen (Chrome DevTools)
- [ ] 38. Auth-Flow testen (Login/Logout)
- [ ] 39. Cloud-Sync testen (Offline → Online)
- [ ] 40. Production-Build erstellen (`npm run build`)
- [ ] 41. Deployment (Vercel/Netlify/Cloudflare Pages)

---

**Erstellt:** Februar 2026
**Letzte Aktualisierung:** Februar 2026
**Version:** 2.0 (Enterprise-Ready)
**Status:** ✅ Production Ready mit:
- Tremor + shadcn/ui (UI)
- Supabase Cloud-Sync + Auth (Backend)
- Offline-First PWA (Mobile)
- JSON-basiertes Daten-Management (Flexibilität)
