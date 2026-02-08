import { useState, useEffect } from 'react';
import { Card } from '@tremor/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseTable from '@/components/ExpenseTable';
import type { Expense, ExpenseFormData } from '@/types';
import { loadFromStorage, saveToStorage } from '@/utils/storage';
import { generateId } from '@/utils/helpers';
import { initialExpenses } from '@/data/initialExpenses';

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  // Load expenses from LocalStorage or initialize with seed data
  useEffect(() => {
    const stored = loadFromStorage<Expense[]>('cashflow-expenses', []);
    if (stored.length === 0) {
      // First time load - use initial expenses
      setExpenses(initialExpenses);
      saveToStorage('cashflow-expenses', initialExpenses);
    } else {
      setExpenses(stored);
    }
  }, []);

  // Save to LocalStorage whenever expenses change
  useEffect(() => {
    if (expenses.length > 0 || loadFromStorage<Expense[]>('cashflow-expenses', []).length > 0) {
      saveToStorage('cashflow-expenses', expenses);
    }
  }, [expenses]);

  const handleAddExpense = (formData: ExpenseFormData) => {
    const newExpense: Expense = {
      ...formData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };

    setExpenses((prev) => [...prev, newExpense]);
    setIsDialogOpen(false);
  };

  const handleEditExpense = (formData: ExpenseFormData) => {
    if (!editingExpense) return;

    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === editingExpense.id
          ? {
              ...expense,
              ...formData,
              updatedAt: new Date().toISOString(),
            }
          : expense
      )
    );

    setEditingExpense(null);
    setIsDialogOpen(false);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const openEditDialog = (expense: Expense) => {
    setEditingExpense(expense);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setEditingExpense(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Ausgaben</h1>
          <p className="text-zinc-400">
            Verwalte deine Ausgaben und behalte den Überblick
          </p>
        </div>
        <button
          onClick={() => {
            setEditingExpense(null);
            setIsDialogOpen(true);
          }}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all shadow-lg"
        >
          + Neue Ausgabe
        </button>
      </div>

      {/* Expense Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-900 border-2 border-zinc-800 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              {editingExpense ? 'Ausgabe bearbeiten' : 'Neue Ausgabe hinzufügen'}
            </DialogTitle>
          </DialogHeader>
          <ExpenseForm
            onSubmit={editingExpense ? handleEditExpense : handleAddExpense}
            onCancel={closeDialog}
            initialData={editingExpense || undefined}
            isEditing={!!editingExpense}
          />
        </DialogContent>
      </Dialog>

      {/* Expense Table */}
      <Card className="bg-zinc-900 border-2 border-zinc-800 p-6">
        <ExpenseTable
          expenses={expenses}
          onEdit={openEditDialog}
          onDelete={handleDeleteExpense}
        />
      </Card>
    </div>
  );
}
