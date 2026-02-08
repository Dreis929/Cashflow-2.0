# 🚀 Schnellstart - Windows PowerShell Workaround

## ⚠️ Problem: PowerShell Execution Policy

npm-Befehle funktionieren nicht direkt in PowerShell wegen der Execution Policy.

---

## ✅ Lösung 1: CMD verwenden (Empfohlen)

### Schritt 1: CMD öffnen
```
Win + R → cmd → Enter
```

### Schritt 2: Zum Projektordner navigieren
```cmd
cd "c:\Users\REISD5\Documents\Cashflow 2.0\cashflow-tracker-tremor"
```

### Schritt 3: Dev-Server starten
```cmd
npm run dev
```

### Schritt 4: Browser öffnen
```
http://localhost:5173/
```

---

## ✅ Lösung 2: VS Code Terminal (Einfachste Methode)

1. Öffne VS Code
2. Öffne den Projektordner
3. Terminal öffnen: `Strg + Ö` oder `View → Terminal`
4. Im Terminal ausführen:
```bash
npm run dev
```

---

## ✅ Lösung 3: PowerShell Policy ändern (Fortgeschritten)

**⚠️ Nur wenn du Administrator-Rechte hast!**

### Schritt 1: PowerShell als Administrator öffnen
```
Win + X → Windows PowerShell (Administrator)
```

### Schritt 2: Execution Policy ändern
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Schritt 3: Bestätigen
```
Y → Enter
```

### Schritt 4: Jetzt funktioniert npm in PowerShell
```powershell
cd "c:\Users\REISD5\Documents\Cashflow 2.0\cashflow-tracker-tremor"
npm run dev
```

---

## 🎯 Quick Commands

### Development
```cmd
npm run dev          # Dev-Server starten
npm run build        # Production-Build
npm run preview      # Preview von Production-Build
```

### TypeScript
```cmd
npx tsc --noEmit     # Type-Check ohne Build
```

### Dependencies
```cmd
npm install --legacy-peer-deps           # Alle Dependencies installieren
npm install <package> --legacy-peer-deps # Einzelnes Package hinzufügen
```

---

## 📂 Wichtige Dateien

### Konfiguration
- `package.json` - Dependencies & Scripts
- `vite.config.ts` - Vite-Konfiguration
- `tsconfig.json` - TypeScript-Config
- `tailwind.config.cjs` - Tailwind-Config

### Source
- `src/App.tsx` - Haupt-App mit Routing
- `src/main.tsx` - Entry Point
- `src/index.css` - Globale Styles

### Daten
- Browser-LocalStorage - `cashflow-expenses` Key
- JSON-Export/Import - Über Header-Buttons

---

## 🐛 Troubleshooting

### Problem: "npm: Die Benennung wurde nicht erkannt"
**Lösung:** Node.js nicht installiert oder nicht im PATH
```cmd
# Node.js-Version prüfen
node --version

# npm-Version prüfen
npm --version
```

### Problem: "Cannot find module '@/components/...'"
**Lösung:** TypeScript Path Aliases nicht konfiguriert
- Prüfe `tsconfig.app.json` → `paths` Section
- Prüfe `vite.config.ts` → `resolve.alias`

### Problem: Port 5173 bereits belegt
**Lösung:** Anderen Port verwenden
```cmd
npm run dev -- --port 3000
```

### Problem: Module nicht gefunden
**Lösung:** Dependencies neu installieren
```cmd
rmdir /s /q node_modules
npm install --legacy-peer-deps
```

---

## 📱 Features testen

### 1. Neue Ausgabe hinzufügen
1. Navigiere zu "Ausgaben"
2. Klicke "+ Neue Ausgabe"
3. Fülle das Formular aus
4. Klicke "Hinzufügen"

### 2. Dashboard anzeigen
1. Navigiere zu "Dashboard"
2. Wähle Zeitraum (z.B. "Letzter Monat")
3. Sieh dir die Charts an

### 3. Daten exportieren
1. Klicke "Export" im Header
2. JSON-Datei wird heruntergeladen

### 4. Daten importieren
1. Klicke "Import" im Header
2. Wähle JSON-Datei
3. Daten werden geladen

---

## 🎨 Browser-DevTools

### LocalStorage inspizieren
1. F12 → Console
2. Eingeben:
```javascript
localStorage.getItem('cashflow-expenses')
```

### Responsive Design testen
1. F12 → Toggle Device Toolbar (Strg + Shift + M)
2. Wähle Mobile-Gerät (z.B. iPhone 12)

---

**Viel Erfolg beim Testen! 🚀**
