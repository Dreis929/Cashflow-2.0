import { useState, useEffect } from 'react';
import { Card, DonutChart } from '@tremor/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Wallet } from 'lucide-react';
import AccountsOverview from '@/components/AccountsOverview';
import AccountForm from '@/components/AccountForm';
import FinancingOverview from '@/components/FinancingOverview';
import FinancingForm from '@/components/FinancingForm';
import BudgetOverview from '@/components/BudgetOverview';
import BudgetForm from '@/components/BudgetForm';
import IncomeManager from '@/components/IncomeManager';
import type { Account, Budget, Financing, FinancialData } from '@/types/finances';
import { formatCurrency } from '@/utils/helpers';
import {
  loadFinancialData,
  addAccount,
  updateAccount,
  deleteAccount,
  addBudget,
  updateBudget,
  deleteBudget,
} from '@/utils/financialStorage';
import { useToast } from '@/components/ui/use-toast';

export default function FinancesPage() {
  const [financialData, setFinancialData] = useState<FinancialData>({
    accounts: [],
    financing: [],
    budgets: [],
    monthlyIncome: 0,
  });

  const [accountDialogOpen, setAccountDialogOpen] = useState(false);
  const [budgetDialogOpen, setBudgetDialogOpen] = useState(false);
  const [financingDialogOpen, setFinancingDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [editingFinancing, setEditingFinancing] = useState<Financing | null>(null);
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'account' | 'budget' | 'financing'; id: string } | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    const data = loadFinancialData();
    setFinancialData(data);
  }, []);

  // Account Handlers
  const handleAddAccount = () => {
    setEditingAccount(null);
    setAccountDialogOpen(true);
  };

  const handleEditAccount = (account: Account) => {
    setEditingAccount(account);
    setAccountDialogOpen(true);
  };

  const handleSubmitAccount = (accountData: Omit<Account, 'id'>) => {
    if (editingAccount) {
      const updated = updateAccount(editingAccount.id, accountData);
      setFinancialData(updated);
      toast({
        title: 'Konto aktualisiert',
        description: `${accountData.name} wurde erfolgreich aktualisiert`,
      });
    } else {
      const updated = addAccount(accountData);
      setFinancialData(updated);
      toast({
        title: 'Konto hinzugefügt',
        description: `${accountData.name} wurde erfolgreich angelegt`,
      });
    }
    setAccountDialogOpen(false);
    setEditingAccount(null);
  };

  const handleDeleteAccountClick = (account: Account) => {
    setDeleteTarget({ type: 'account', id: account.id });
    setDeleteDialogOpen(true);
  };

  // Budget Handlers
  const handleAddBudget = () => {
    setEditingBudget(null);
    setBudgetDialogOpen(true);
  };

  const handleEditBudget = (budget: Budget) => {
    setEditingBudget(budget);
    setBudgetDialogOpen(true);
  };

  const handleSubmitBudget = (budgetData: Omit<Budget, 'id'>) => {
    if (editingBudget) {
      const updated = updateBudget(editingBudget.id, budgetData);
      setFinancialData(updated);
      toast({
        title: 'Budget aktualisiert',
        description: `${budgetData.category} wurde erfolgreich aktualisiert`,
      });
    } else {
      const updated = addBudget(budgetData);
      setFinancialData(updated);
      toast({
        title: 'Budget hinzugefügt',
        description: `${budgetData.category} wurde erfolgreich angelegt`,
      });
    }
    setBudgetDialogOpen(false);
    setEditingBudget(null);
  };

  const handleDeleteBudgetClick = (budget: Budget) => {
    setDeleteTarget({ type: 'budget', id: budget.id });
    setDeleteDialogOpen(true);
  };

  // Financing Handlers (vorerst nur Platzhalter, da keine add/update/delete Funktionen in financialStorage)
  const handleAddFinancing = () => {
    setEditingFinancing(null);
    setFinancingDialogOpen(true);
  };

  const handleSubmitFinancing = (financingData: Omit<Financing, 'id'>) => {
    // TODO: Implementiere addFinancing/updateFinancing in financialStorage
    toast({
      variant: 'warning',
      title: 'Funktion in Entwicklung',
      description: 'Finanzierungen hinzufügen/bearbeiten wird bald verfügbar sein',
    });
    setFinancingDialogOpen(false);
    setEditingFinancing(null);
  };

  const handleIncomeUpdate = () => {
    const data = loadFinancialData();
    setFinancialData(data);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === 'account') {
      const updated = deleteAccount(deleteTarget.id);
      setFinancialData(updated);
      toast({
        title: 'Konto gelöscht',
        description: 'Das Konto wurde erfolgreich entfernt',
        variant: 'destructive',
      });
    } else if (deleteTarget.type === 'budget') {
      const updated = deleteBudget(deleteTarget.id);
      setFinancialData(updated);
      toast({
        title: 'Budget gelöscht',
        description: 'Das Budget wurde erfolgreich entfernt',
        variant: 'destructive',
      });
    }
    // TODO: Add financing delete when implemented

    setDeleteDialogOpen(false);
    setDeleteTarget(null);
  };

  // Calculate financial overview
  const totalAssets = financialData.accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalDebt = financialData.financing.reduce((sum, f) => sum + f.remainingAmount, 0);
  const netWorth = totalAssets - totalDebt;

  const totalBudgetLimit = financialData.budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalBudgetSpent = financialData.budgets.reduce((sum, b) => sum + b.spent, 0);

  // Prepare chart data
  const accountDistribution = financialData.accounts.map((acc) => ({
    name: acc.name,
    value: acc.balance,
  }));

  const budgetDistribution = financialData.budgets.map((budget) => ({
    name: budget.category,
    value: budget.spent,
  }));

  return (
    <div className="space-y-6 pb-20">
      {/* Income Manager */}
      <IncomeManager 
        monthlyIncome={financialData.monthlyIncome} 
        onUpdate={handleIncomeUpdate}
      />

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-emerald-900/50 to-emerald-950/50 border-2 border-emerald-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400 mb-1">Gesamtvermögen</p>
              <p className="text-3xl font-bold text-white">{formatCurrency(totalAssets)}</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-emerald-500/20">
              <Wallet className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-red-900/50 to-red-950/50 border-2 border-red-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400 mb-1">Finanzierungen</p>
              <p className="text-3xl font-bold text-white">{formatCurrency(totalDebt)}</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-red-500/20">
              <span className="text-3xl">💳</span>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/50 to-blue-950/50 border-2 border-blue-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400 mb-1">Nettovermögen</p>
              <p className="text-3xl font-bold text-white">{formatCurrency(netWorth)}</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-500/20">
              <span className="text-3xl">💰</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      {(accountDistribution.length > 0 || budgetDistribution.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {accountDistribution.length > 0 && (
            <Card className="bg-zinc-900 border-2 border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Vermögensverteilung</h3>
              <DonutChart
                data={accountDistribution}
                category="value"
                index="name"
                valueFormatter={(value) => formatCurrency(value)}
                colors={['emerald', 'blue', 'purple', 'amber', 'rose']}
                className="h-60"
              />
            </Card>
          )}

          {budgetDistribution.length > 0 && (
            <Card className="bg-zinc-900 border-2 border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Budget-Ausgaben</h3>
              <DonutChart
                data={budgetDistribution}
                category="value"
                index="name"
                valueFormatter={(value) => formatCurrency(value)}
                colors={['blue', 'emerald', 'amber', 'rose', 'purple']}
                className="h-60"
              />
              <div className="mt-4 text-center text-sm text-zinc-400">
                {formatCurrency(totalBudgetSpent)} von {formatCurrency(totalBudgetLimit)} ausgegeben
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Accounts Section */}
      <AccountsOverview
        accounts={financialData.accounts}
        onAddAccount={handleAddAccount}
      />

      {/* Accounts Table (with edit/delete) */}
      {financialData.accounts.length > 0 && (
        <Card className="bg-zinc-900 border-2 border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Konten verwalten</h3>
          <div className="space-y-2">
            {financialData.accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg hover:bg-zinc-750 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-white">{account.name}</p>
                  <p className="text-sm text-zinc-400">
                    {account.type === 'checking' ? '💳 Girokonto' : account.type === 'savings' ? '🏦 Sparkonto' : '💵 Bargeld'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-white min-w-[120px] text-right">
                    {formatCurrency(account.balance)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditAccount(account)}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteAccountClick(account)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Financing Section */}
      {financialData.financing.length > 0 && (
        <FinancingOverview financings={financialData.financing} />
      )}

      {/* Budget Section */}
      <div className="space-y-4">
        <BudgetOverview
          budgets={financialData.budgets}
          onAddBudget={handleAddBudget}
        />

        {/* Budget Management Table */}
        {financialData.budgets.length > 0 && (
          <Card className="bg-zinc-900 border-2 border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Budgets verwalten</h3>
            <div className="space-y-2">
              {financialData.budgets.map((budget) => (
                <div
                  key={budget.id}
                  className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg hover:bg-zinc-750 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-white">{budget.category}</p>
                    <p className="text-sm text-zinc-400">
                      {budget.period === 'monthly' ? '📅 Monatlich' : '📆 Jährlich'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right min-w-[150px]">
                      <p className="text-sm text-zinc-400">
                        {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {((budget.spent / budget.limit) * 100).toFixed(0)}% verwendet
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditBudget(budget)}
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteBudgetClick(budget)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Account Dialog */}
      <Dialog open={accountDialogOpen} onOpenChange={setAccountDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingAccount ? 'Konto bearbeiten' : 'Neues Konto anlegen'}</DialogTitle>
            <DialogDescription className="text-zinc-400">
              {editingAccount
                ? 'Aktualisieren Sie die Kontoinformationen'
                : 'Fügen Sie ein neues Konto zu Ihrer Übersicht hinzu'}
            </DialogDescription>
          </DialogHeader>
          <AccountForm
            account={editingAccount}
            onSubmit={handleSubmitAccount}
            onCancel={() => {
              setAccountDialogOpen(false);
              setEditingAccount(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Budget Dialog */}
      <Dialog open={budgetDialogOpen} onOpenChange={setBudgetDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingBudget ? 'Budget bearbeiten' : 'Neues Budget anlegen'}</DialogTitle>
            <DialogDescription className="text-zinc-400">
              {editingBudget
                ? 'Aktualisieren Sie die Budget-Informationen'
                : 'Legen Sie ein neues Budget für eine Ausgabenkategorie fest'}
            </DialogDescription>
          </DialogHeader>
          <BudgetForm
            budget={editingBudget}
            onSubmit={handleSubmitBudget}
            onCancel={() => {
              setBudgetDialogOpen(false);
              setEditingBudget(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Financing Dialog */}
      <Dialog open={financingDialogOpen} onOpenChange={setFinancingDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingFinancing ? 'Finanzierung bearbeiten' : 'Neue Finanzierung anlegen'}</DialogTitle>
            <DialogDescription className="text-zinc-400">
              {editingFinancing
                ? 'Aktualisieren Sie die Finanzierungs-Informationen'
                : 'Fügen Sie eine neue Finanzierung hinzu'}
            </DialogDescription>
          </DialogHeader>
          <FinancingForm
            financing={editingFinancing}
            onSubmit={handleSubmitFinancing}
            onCancel={() => {
              setFinancingDialogOpen(false);
              setEditingFinancing(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-zinc-900 border-zinc-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              {deleteTarget?.type === 'account' ? 'Konto löschen?' : 'Budget löschen?'}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              {deleteTarget?.type === 'account'
                ? 'Sind Sie sicher, dass Sie dieses Konto löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.'
                : 'Sind Sie sicher, dass Sie dieses Budget löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-750">
              Abbrechen
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
