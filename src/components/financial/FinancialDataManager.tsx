
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Edit, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  Transaction,
  validateTransaction,
  formatINR
} from '@/services/financialDataService';

const FinancialDataManager = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    category: '',
    type: 'expense' as 'income' | 'expense'
  });
  const [editingTransaction, setEditingTransaction] = useState<string | null>(null);

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Travel',
    'Education',
    'Investments',
    'Other'
  ];

  // Query for transactions
  const { data: transactions = [], isLoading, error } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
    enabled: !!user,
  });

  // Mutation for creating transactions
  const createTransactionMutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      setNewTransaction({ description: '', amount: '', category: '', type: 'expense' });
      toast.success('Transaction added successfully');
    },
    onError: (error: Error) => {
      console.error('Error creating transaction:', error);
      toast.error(error.message || 'Failed to add transaction');
    },
  });

  // Mutation for updating transactions
  const updateTransactionMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Transaction> }) =>
      updateTransaction(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      setEditingTransaction(null);
      toast.success('Transaction updated');
    },
    onError: (error: Error) => {
      console.error('Error updating transaction:', error);
      toast.error(error.message || 'Failed to update transaction');
    },
  });

  // Mutation for deleting transactions
  const deleteTransactionMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success('Transaction deleted');
    },
    onError: (error: Error) => {
      console.error('Error deleting transaction:', error);
      toast.error('Failed to delete transaction');
    },
  });

  const handleAddTransaction = () => {
    if (!user) {
      toast.error('Please sign in to add transactions');
      return;
    }

    const transactionData = {
      description: newTransaction.description.trim(),
      amount: parseFloat(newTransaction.amount),
      category: newTransaction.category,
      type: newTransaction.type,
      date: new Date().toISOString().split('T')[0]
    };

    const errors = validateTransaction(transactionData);
    if (errors.length > 0) {
      toast.error(errors.join(', '));
      return;
    }

    createTransactionMutation.mutate(transactionData);
  };

  const handleUpdateTransaction = (id: string, field: keyof Transaction, value: any) => {
    if (!user) {
      toast.error('Please sign in to update transactions');
      return;
    }

    const updates = { [field]: value };
    updateTransactionMutation.mutate({ id, updates });
  };

  const handleDeleteTransaction = (id: string) => {
    if (!user) {
      toast.error('Please sign in to delete transactions');
      return;
    }

    deleteTransactionMutation.mutate(id);
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            Please sign in to access your financial data.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-destructive">
            Error loading transactions. Please try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add New Transaction */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Transaction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="description">Description *</Label>
              <Input
                id="description"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                placeholder="Transaction description"
                maxLength={200}
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount (₹) *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                max="999999999"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select 
                onValueChange={(value) => setNewTransaction({...newTransaction, category: value})}
                value={newTransaction.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="type">Type *</Label>
              <Select 
                onValueChange={(value) => setNewTransaction({...newTransaction, type: value as 'income' | 'expense'})}
                value={newTransaction.type}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button 
            onClick={handleAddTransaction} 
            className="w-full"
            disabled={createTransactionMutation.isPending}
          >
            <Plus className="w-4 h-4 mr-2" />
            {createTransactionMutation.isPending ? 'Adding...' : 'Add Transaction'}
          </Button>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading transactions...</div>
          ) : (
            <div className="space-y-2">
              {transactions.slice(0, 10).map(transaction => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    {editingTransaction === transaction.id ? (
                      <div className="grid grid-cols-4 gap-2">
                        <Input
                          defaultValue={transaction.description}
                          onBlur={(e) => handleUpdateTransaction(transaction.id, 'description', e.target.value)}
                          maxLength={200}
                        />
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          max="999999999"
                          defaultValue={transaction.amount}
                          onBlur={(e) => handleUpdateTransaction(transaction.id, 'amount', parseFloat(e.target.value) || 0)}
                        />
                        <Select onValueChange={(value) => handleUpdateTransaction(transaction.id, 'category', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder={transaction.category} />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(category => (
                              <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="flex gap-1">
                          <Button size="sm" onClick={() => setEditingTransaction(null)}>
                            <Save className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingTransaction(null)}>
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{transaction.description}</span>
                          <span className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.type === 'income' ? '+' : '-'}{formatINR(transaction.amount)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline">{transaction.category}</Badge>
                          <span>{transaction.date}</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex gap-1 ml-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingTransaction(transaction.id)}
                      disabled={updateTransactionMutation.isPending}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteTransaction(transaction.id)}
                      disabled={deleteTransactionMutation.isPending}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
              {transactions.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No transactions yet. Add your first transaction above.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialDataManager;
