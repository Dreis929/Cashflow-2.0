# Cashflow Tracker 2.0

Moderne Finanz-Dashboard-Anwendung mit React 19, TypeScript, Tremor UI und shadcn/ui.

## 🚀 Projekt-Status

### ✅ Abgeschlossen (Phase 1)

1. **Projekt-Struktur**
   - ✅ Vite + React 19 + TypeScript Setup
   - ✅ Path Aliases konfiguriert (`@/` → `./src/`)
   - ✅ Tailwind CSS + PostCSS
   - ✅ shadcn/ui Konfiguration
   - ✅ Environment Variables (`.env.local`)

2. **Type-System**
   - ✅ Expense-Typen mit Kategorien & Zahlungsmethoden
   - ✅ Financial-Typen (Accounts, Financing, Budget)
   - ✅ Statistik-Typen

3. **Adapter-Pattern (Future-Proof Architecture)**
   - ✅ `IStorageAdapter` Interface
   - ✅ `LocalStorageAdapter` (funktioniert ohne Cloud)
   - ✅ `StorageFactory` (wechselt Provider automatisch)
   - ⏳ SupabaseAdapter (vorbereitet für später)
   - ⏳ FirebaseAdapter (vorbereitet für später)

4. **Utility-Funktionen**
   - ✅ `calculations.ts` (Stats, Kategorien, Trends)
   - ✅ `storage.ts` (LocalStorage Helpers)
   - ✅ `helpers.ts` (UUID, Datum, Validierung)
   - ✅ `lib/utils.ts` (className-Merging)

5. **shadcn/ui Komponenten**
   - ✅ Button (inkl. Gradient-Variante)
   - ✅ Input
   - ✅ Label
   - ✅ Select
   - ✅ Dialog

### ✅ Abgeschlossen (Phase 2)

1. **Projekt-Struktur**
   - ✅ Vite + React 19 + TypeScript Setup
   - ✅ Path Aliases konfiguriert (`@/` → `./src/`)
   - ✅ Tailwind CSS + PostCSS
   - ✅ shadcn/ui Konfiguration
   - ✅ Environment Variables (`.env.local`)

2. **Type-System**
   - ✅ Expense-Typen mit Kategorien & Zahlungsmethoden
   - ✅ Financial-Typen (Accounts, Financing, Budget)
   - ✅ Statistik-Typen

3. **Adapter-Pattern (Future-Proof Architecture)**
   - ✅ `IStorageAdapter` Interface
   - ✅ `LocalStorageAdapter` (funktioniert ohne Cloud)
   - ✅ `StorageFactory` (wechselt Provider automatisch)
   - ⏳ SupabaseAdapter (vorbereitet für später)
   - ⏳ FirebaseAdapter (vorbereitet für später)

4. **Utility-Funktionen**
   - ✅ `calculations.ts` (Stats, Kategorien, Trends)
   - ✅ `storage.ts` (LocalStorage Helpers)
   - ✅ `helpers.ts` (UUID, Datum, Validierung)
   - ✅ `lib/utils.ts` (className-Merging)

5. **shadcn/ui Komponenten**
   - ✅ Button (inkl. Gradient-Variante)
   - ✅ Input
   - ✅ Label
   - ✅ Select
   - ✅ Dialog

6. **Core-Komponenten**
   - ✅ Header (mit Import/Export)
   - ✅ Navigation (Desktop & Mobile)
   - ✅ ExpenseForm
   - ✅ ExpenseTable
   - ✅ StatsCards
   - ✅ Charts (Tremor)

7. **Seiten**
   - ✅ Dashboard (mit Zeitraum-Filter & Charts)
   - ✅ ExpensesPage (CRUD-Operationen)
   - ⏳ FinancesPage (Platzhalter)

8. **Routing & Navigation**
   - ✅ React Router DOM
   - ✅ Import/Export-Funktionalität
   - ✅ LocalStorage-Persistierung

### 🔄 In Bearbeitung (Phase 3)

- ⏹️ FinancesPage vollständig implementieren
- ⏹️ Toast-Benachrichtigungen
- ⏹️ Alert-Dialoge für Bestätigungen

### 📋 Noch ausstehend (Phase 4+)
- ⏹️ Cloud-Sync (optional)
- ⏹️ PWA-Konfiguration (optional)

---

## 📦 Installation

**⚠️ WICHTIG:** npm-Befehle funktionieren in PowerShell nicht (Execution Policy).

### Lösung: CMD verwenden

```cmd
cd "c:\Users\REISD5\Documents\Cashflow 2.0\cashflow-tracker-tremor"

REM 1. Basis-Dependencies
npm install --legacy-peer-deps

REM 2. Tailwind CSS
npm install -D tailwindcss postcss autoprefixer --legacy-peer-deps

REM 3. Projekt-Dependencies (minimal)
npm install @tremor/react recharts date-fns lucide-react react-router-dom --legacy-peer-deps

REM 4. shadcn/ui Dependencies
npm install @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-select @radix-ui/react-slot class-variance-authority clsx tailwind-merge tailwindcss-animate --legacy-peer-deps

REM 5. Dev-Server
npm run dev
```

### Alternative: VS Code Terminal

Öffne das Terminal in VS Code → sollte ohne Probleme funktionieren.

---

## 🏗️ Architektur

### Adapter-Pattern für Storage

```typescript
// Verwendung in Komponenten
import { StorageFactory } from '@/services/storage/StorageFactory';

const storage = StorageFactory.getAdapter(); // Automatisch richtige Implementierung

// LocalStorage (Standard)
const expenses = await storage.getExpenses();
await storage.saveExpense(newExpense);

// Später wechseln: .env.local ändern
VITE_STORAGE_PROVIDER=supabase
// → App verwendet automatisch Supabase statt LocalStorage!
```

**Vorteile:**
- ✅ Kein Vendor Lock-in
- ✅ Wechsel zwischen Providern ohne Code-Änderung
- ✅ Offline-First (LocalStorage als Fallback)
- ✅ Testbar (Mock-Adapter)

---

## 📁 Projekt-Struktur

```
cashflow-tracker-tremor/
├── src/
│   ├── components/
│   │   └── ui/              # shadcn/ui Komponenten
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       └── dialog.tsx
│   ├── pages/               # Seiten (Dashboard, Expenses, Finances)
│   ├── services/
│   │   └── storage/         # Adapter-Pattern
│   │       ├── IStorageAdapter.ts
│   │       ├── LocalStorageAdapter.ts
│   │       └── StorageFactory.ts
│   ├── types/               # TypeScript-Typen
│   │   ├── index.ts         # Expense-Typen
│   │   └── finances.ts      # Financial-Typen
│   ├── utils/               # Hilfsfunktionen
│   │   ├── calculations.ts
│   │   ├── storage.ts
│   │   └── helpers.ts
│   ├── lib/
│   │   └── utils.ts         # cn() für className-Merging
│   ├── data/                # JSON-Daten
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css            # Tailwind + shadcn/ui Variables
├── .env.local               # Environment Variables
├── components.json          # shadcn/ui Config
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## 🎨 Design-System

### Dark Theme (Standard)

```css
--background: 240 10% 3.9%;        /* Dunkelgrau */
--foreground: 240 4.8% 95.9%;      /* Fast Weiß */
--primary: 240 5.9% 90%;           /* Helles Grau */
```

### Gradient-Varianten

```tsx
<Button variant="gradient">Speichern</Button>
// → Blau-Lila Gradient
```

---

## 🔧 Nächste Schritte

1. **Dependencies installieren** (siehe oben - via CMD)
2. **Dev-Server testen:** `npm run dev`
3. **Core-Komponenten entwickeln** (Header, Navigation)
4. **Erste Seite implementieren** (Dashboard)

---

## 📚 Dokumentation

- **Vollständige Anleitung:** `copilot-instructions.md` (im Workspace-Root)
- **Installation-Hilfe:** `INSTALLATION.md`

---

**Version:** 2.0 (Enterprise-Ready Architecture)  
**Status:** 🏗️ In aktiver Entwicklung  
**Letztes Update:** 7. Februar 2026
