# Supabase Setup-Anleitung für Cashflow 2.0

## 1. Supabase Account erstellen

1. Gehen Sie zu [https://supabase.com](https://supabase.com)
2. Klicken Sie auf "Start your project"
3. Registrieren Sie sich mit GitHub oder E-Mail

## 2. Neues Projekt erstellen

1. Klicken Sie auf "New Project"
2. Wählen Sie einen Projektnamen (z.B. "cashflow-tracker")
3. Erstellen Sie ein starkes Datenbank-Passwort
4. Wählen Sie eine Region (z.B. Frankfurt für Deutschland)
5. Klicken Sie auf "Create new project"

## 3. Datenbank-Schema einrichten

1. Gehen Sie zu "SQL Editor" in der linken Sidebar
2. Klicken Sie auf "New query"
3. Kopieren Sie den gesamten Inhalt von `database-schema.sql`
4. Fügen Sie ihn in den SQL-Editor ein
5. Klicken Sie auf "Run" (oder drücken Sie Ctrl+Enter)

## 4. API-Schlüssel kopieren

1. Gehen Sie zu "Settings" → "API" in der linken Sidebar
2. Kopieren Sie die folgenden Werte:
   - **Project URL** (z.B. `https://xxxxx.supabase.co`)
   - **anon/public** API Key (der lange String)

## 5. .env Datei erstellen

1. Kopieren Sie `.env.example` zu `.env`:
   ```bash
   cp .env.example .env
   ```

2. Öffnen Sie `.env` und ersetzen Sie die Werte:
   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...
   ```

## 6. E-Mail-Authentifizierung konfigurieren

1. Gehen Sie zu "Authentication" → "Providers"
2. Aktivieren Sie "Email"
3. Optional: Konfigurieren Sie E-Mail-Templates unter "Email Templates"

## 7. Anwendung starten

```bash
npm run dev
```

## 8. Erste Schritte

1. Öffnen Sie die Anwendung im Browser
2. Klicken Sie auf "Noch kein Account? Jetzt registrieren"
3. Geben Sie E-Mail und Passwort ein
4. Bestätigen Sie Ihre E-Mail-Adresse (prüfen Sie Ihren Posteingang)
5. Melden Sie sich an

## Features

✅ **Sichere Authentifizierung**
- Login & Registrierung
- E-Mail-Bestätigung
- Passwort-Hashing

✅ **Datenbank**
- PostgreSQL-Datenbank
- Automatische Backups
- Row Level Security (RLS)

✅ **Datenschutz**
- Jeder Benutzer sieht nur seine eigenen Daten
- Verschlüsselte Verbindungen
- DSGVO-konform

## Troubleshooting

### Fehler: "Invalid API key"
- Prüfen Sie, ob die `.env` Datei korrekt ist
- Stellen Sie sicher, dass Sie den **anon** Key verwenden (nicht den service_role Key)

### Fehler: "Email not confirmed"
- Prüfen Sie Ihren Posteingang und Spam-Ordner
- In Supabase können Sie unter "Authentication" → "Users" die E-Mail manuell bestätigen

### Datenbank-Fehler
- Stellen Sie sicher, dass das SQL-Schema korrekt ausgeführt wurde
- Prüfen Sie unter "Database" → "Tables" ob alle Tabellen erstellt wurden

## Migration von LocalStorage

Ihre bisherigen Daten in LocalStorage bleiben erhalten. Nach dem ersten Login können Sie:
1. Ihre Daten exportieren (Export-Button)
2. Mit neuem Account anmelden
3. Daten wieder importieren (Import-Button)

Die Daten werden dann automatisch in die Datenbank migriert.
