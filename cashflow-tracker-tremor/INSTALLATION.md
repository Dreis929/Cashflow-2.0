# Cashflow Tracker - Installation

## ⚠️ PowerShell Execution Policy Problem

Falls npm-Befehle nicht funktionieren, nutze eine der Lösungen:

### Lösung 1: CMD verwenden (empfohlen)
```cmd
cd "c:\Users\REISD5\Documents\Cashflow 2.0\cashflow-tracker-tremor"
npm install --legacy-peer-deps
```

### Lösung 2: PowerShell als Administrator
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Lösung 3: Visual Studio Code Terminal
- Terminal öffnen in VS Code
- Sollte direkt funktionieren

## Installation fortsetzen

```bash
# 1. Basis-Dependencies
npm install --legacy-peer-deps

# 2. Tailwind CSS & PostCSS
npm install -D tailwindcss postcss autoprefixer --legacy-peer-deps
npx tailwindcss init -p

# 3. Minimale Projekt-Dependencies
npm install @tremor/react recharts date-fns lucide-react react-router-dom --legacy-peer-deps

# 4. shadcn/ui Dependencies
npm install @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-select @radix-ui/react-slot class-variance-authority clsx tailwind-merge tailwindcss-animate --legacy-peer-deps

# 5. Dev Server starten
npm run dev
```

## Nächste Schritte nach Installation

Siehe copilot-instructions.md für detaillierte Anweisungen.
