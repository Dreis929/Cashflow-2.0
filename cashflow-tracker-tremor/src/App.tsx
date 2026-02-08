import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AuthProvider from './components/AuthProvider';
import Dashboard from './pages/Dashboard';
import ExpensesPage from './pages/ExpensesPage';
import FinancesPage from './pages/FinancesPage';
import { Toaster } from './components/ui/use-toast';
import { toast } from './components/ui/use-toast';
import type { Expense } from './types';
import type { FinancialData } from './types/finances';
import { loadFromStorage, saveToStorage } from './utils/storage';
import { convertImportData, validateExpenses } from './utils/importConverter';
import { loadFinancialData, saveFinancialData } from './utils/financialStorage';

function App() {
  const handleImport = (data: unknown) => {
    try {
      // Prüfe ob es Finanzdaten oder Ausgaben sind
      const dataObj = data as Record<string, unknown>;
      
      // Import für Finanzdaten (accounts, budgets, financing)
      if (dataObj && typeof dataObj === 'object' && 
          ('accounts' in dataObj || 'budgets' in dataObj || 'financing' in dataObj)) {
        const financialData = dataObj as unknown as FinancialData;
        
        // Validiere Finanzdaten
        if (!financialData.accounts && !financialData.budgets && !financialData.financing) {
          toast({
            variant: 'destructive',
            title: 'Import fehlgeschlagen',
            description: 'Keine gültigen Finanzdaten gefunden!',
          });
          return;
        }
        
        // Speichere Finanzdaten
        saveFinancialData(financialData);
        
        toast({
          variant: 'success',
          title: '✅ Finanzdaten importiert!',
          description: `Konten: ${financialData.accounts?.length || 0}, Budgets: ${financialData.budgets?.length || 0}`,
        });
        
        setTimeout(() => window.location.reload(), 1500);
        return;
      }
      
      // Import für Ausgaben
      const expenses = convertImportData(data);
      
      // Validiere die konvertierten Daten
      if (!validateExpenses(expenses)) {
        toast({
          variant: 'destructive',
          title: 'Import fehlgeschlagen',
          description: 'Ungültiges Datenformat! Bitte überprüfe die Datei.',
        });
        return;
      }
      
      // Lade bestehende Ausgaben
      const existingExpenses = loadFromStorage<Expense[]>('cashflow-expenses', []);
      
      // Merge: Neue Expenses hinzufügen, aber keine Duplikate (basierend auf ID)
      const existingIds = new Set(existingExpenses.map(e => e.id));
      const newExpenses = expenses.filter(e => !existingIds.has(e.id));
      
      const mergedExpenses = [...existingExpenses, ...newExpenses];
      
      // Speichern
      saveToStorage('cashflow-expenses', mergedExpenses);
      
      toast({
        variant: 'success',
        title: '✅ Import erfolgreich!',
        description: `${newExpenses.length} neue Ausgaben hinzugefügt. Gesamt: ${mergedExpenses.length}`,
      });
      
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error('Import-Fehler:', error);
      toast({
        variant: 'destructive',
        title: 'Import fehlgeschlagen',
        description: error instanceof Error ? error.message : 'Unbekannter Fehler',
      });
    }
  };

  const handleExport = () => {
    const expenses = loadFromStorage<Expense[]>('cashflow-expenses', []);
    const financialData = loadFinancialData();
    
    // Kompletter Export mit allen Daten
    const exportData = {
      expenses: expenses,
      finances: financialData,
      exportDate: new Date().toISOString(),
      version: '2.0',
    };
    
    if (expenses.length === 0 && 
        financialData.accounts.length === 0 && 
        financialData.budgets.length === 0 && 
        financialData.financing.length === 0) {
      toast({
        variant: 'warning',
        title: 'Keine Daten',
        description: 'Keine Daten zum Exportieren vorhanden!',
      });
      return;
    }

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    const dateStr = new Date().toISOString().split('T')[0];
    link.download = `cashflow-complete-export-${dateStr}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      variant: 'success',
      title: 'Export erfolgreich',
      description: `Ausgaben: ${expenses.length}, Konten: ${financialData.accounts.length}, Budgets: ${financialData.budgets.length}`,
    });
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <Header onImport={handleImport} onExport={handleExport} />
            
            <main className="flex-1 pb-20 lg:pb-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/expenses" element={<ExpensesPage />} />
                <Route path="/finances" element={<FinancesPage />} />
              </Routes>
            </main>
          </div>
          
          <Toaster />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
