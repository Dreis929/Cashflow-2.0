# 📥 Import-Funktionalität - Unterstützte Formate

Die Cashflow Tracker App unterstützt **zwei verschiedene Import-Formate**:

---

## Format 1: Direktes Expense-Array (Standard)

**Verwendung:** Export aus der App selbst

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
  },
  {
    "id": "uuid-v4-string-2",
    "date": "2025-01-16",
    "amount": 12.50,
    "category": "🚗 Transport",
    "description": "Tankstelle",
    "paymentMethod": "💵 Bargeld",
    "createdAt": "2025-01-16T14:20:00.000Z"
  }
]
```

---

## Format 2: Backup-Format (Legacy)

**Verwendung:** Alte Backups mit zusätzlichen Metadaten

```json
{
  "expenses": [
    {
      "id": "exp_202410_001",
      "date": "2024-10-20",
      "amount": 16,
      "category": "Lebensmittel",
      "description": "Groceries",
      "paymentMethod": "Karte",
      "createdAt": "2024-10-20T12:00:00Z"
    }
  ],
  "categories": [
    {
      "id": "cat-1",
      "name": "Lebensmittel",
      "color": "#4CAF50",
      "icon": "🛒",
      "budget": 50
    }
  ],
  "settings": {
    "currency": "EUR",
    "dateFormat": "de-DE"
  },
  "exportDate": "2026-02-04T10:26:00.953Z"
}
```

---

## 🔄 Automatische Konvertierung

Die App konvertiert **automatisch** alte Formate ins neue Format:

### Kategorie-Mapping

| Alt (ohne Emoji) | Neu (mit Emoji) |
|-----------------|-----------------|
| Lebensmittel | 🍔 Lebensmittel |
| Sprit & Tanken | 🚗 Transport |
| Auto & Mobilität | 🚗 Transport |
| Fixkosten | 🏠 Wohnung |
| Restaurants & Essen gehen | 🍔 Lebensmittel |
| Mittagessen (Arbeit) | 🍔 Lebensmittel |
| Unterhaltung & Events | 🎬 Entertainment |
| Reisen & Urlaub | 🎬 Entertainment |
| Gesundheit & Sport | 💊 Gesundheit |
| Kleidung | 👕 Kleidung |
| Geschenke | 💰 Sonstiges |
| Shopping & Elektronik | 💰 Sonstiges |
| Sonstiges | 💰 Sonstiges |

### Zahlungsmethoden-Mapping

| Alt | Neu |
|-----|-----|
| Karte | 💳 Kreditkarte |
| Bar | 💵 Bargeld |
| Überweisung | 🏦 Debitkarte |
| Paypal | 📱 PayPal |

---

## 📋 Import-Prozess

### 1. Via Header-Button
1. Klicke auf "Import" im Header
2. Wähle deine JSON-Datei
3. Die App erkennt automatisch das Format
4. Konvertierung erfolgt transparent
5. Duplikate werden basierend auf ID erkannt und übersprungen
6. Bestätigungsmeldung zeigt Details an

### 2. Merge-Logik

**Intelligentes Merging:**
- ✅ Bestehende Ausgaben bleiben erhalten
- ✅ Neue Ausgaben werden hinzugefügt
- ✅ Duplikate (gleiche ID) werden automatisch übersprungen
- ✅ Keine Datenverluste

**Beispiel:**
```
Bestehende Ausgaben: 50
Import-Datei: 120 Ausgaben
  - Davon neu: 100
  - Davon Duplikate: 20

Ergebnis: 150 Ausgaben (50 + 100)
```

---

## 🎯 Deine Backup-Datei

**Format:** ✅ Backup-Format (Legacy)  
**Ausgaben:** 120 Einträge  
**Zeitraum:** Oktober 2024 - Januar 2026  
**Status:** ✅ Kompatibel - Import möglich!

### So importierst du deine Daten:

1. Öffne die App: http://localhost:5173/
2. Klicke auf **"Import"** im Header (oben rechts)
3. Wähle deine Datei: `cashflow-backup-2026-02-04 (1).json`
4. Fertig! ✅

Die App wird:
- Alle 120 Ausgaben konvertieren
- Kategorien automatisch mappen
- Zahlungsmethoden anpassen
- Mit bestehenden Daten mergen (falls vorhanden)

---

## 🔧 Manuelles Mapping anpassen

Falls du eigene Kategorien verwenden möchtest:

**Datei:** `src/utils/importConverter.ts`

```typescript
const CATEGORY_MAPPING: Record<string, string> = {
  'Deine alte Kategorie': '🎯 Deine neue Kategorie',
  // Weitere Mappings hinzufügen...
};
```

---

## ⚠️ Fehlerbehandlung

**Mögliche Fehler:**

1. **"Ungültiges Datenformat!"**
   - JSON ist fehlerhaft
   - Fehlende Pflichtfelder (id, date, amount, etc.)
   - **Lösung:** JSON-Validator verwenden (z.B. jsonlint.com)

2. **"Expense-Validierung fehlgeschlagen"**
   - Datentypen stimmen nicht (z.B. amount als String statt Zahl)
   - **Lösung:** Datentypen prüfen

3. **"Import erfolgreich, aber 0 neue Ausgaben"**
   - Alle IDs existieren bereits (Duplikate)
   - **Lösung:** Normal, keine Aktion nötig

---

## 📊 Nach dem Import

**Automatisch verfügbar:**
- ✅ Dashboard zeigt alle importierten Daten
- ✅ Charts werden neu berechnet
- ✅ Filter & Suche funktionieren
- ✅ Export enthält alle Daten

**Tipp:** Nach großem Import Dashboard mit "Alle Zeit" Filter aufrufen, um alle Daten zu sehen!

---

**Version:** 2.0  
**Letzte Aktualisierung:** 8. Februar 2026
