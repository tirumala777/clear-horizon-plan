
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  user_id?: string;
}

export interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  user_id?: string;
}

export interface InsurancePolicy {
  id: string;
  policy_name: string;
  provider: string;
  policy_type: string;
  coverage_amount: number;
  premium_amount: number;
  start_date: string;
  end_date: string;
  status: 'active' | 'expired' | 'cancelled';
  user_id?: string;
}

export interface PortfolioHolding {
  id: string;
  symbol: string;
  name: string;
  shares: number;
  purchase_price: number;
  current_price: number;
  purchase_date: string;
  user_id?: string;
}

// Input validation functions
export const validateTransaction = (transaction: Partial<Transaction>): string[] => {
  const errors: string[] = [];
  
  if (!transaction.description?.trim()) {
    errors.push('Description is required');
  }
  if (!transaction.amount || transaction.amount <= 0) {
    errors.push('Amount must be greater than 0');
  }
  if (!transaction.category?.trim()) {
    errors.push('Category is required');
  }
  if (!transaction.type || !['income', 'expense'].includes(transaction.type)) {
    errors.push('Type must be income or expense');
  }
  
  return errors;
};

export const validateFinancialGoal = (goal: Partial<FinancialGoal>): string[] => {
  const errors: string[] = [];
  
  if (!goal.title?.trim()) {
    errors.push('Title is required');
  }
  if (!goal.targetAmount || goal.targetAmount <= 0) {
    errors.push('Target amount must be greater than 0');
  }
  if (!goal.category?.trim()) {
    errors.push('Category is required');
  }
  
  return errors;
};

// Transaction services
export const getTransactions = async (): Promise<Transaction[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }

  return data || [];
};

export const createTransaction = async (transaction: Omit<Transaction, 'id' | 'user_id'>): Promise<Transaction> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const errors = validateTransaction(transaction);
  if (errors.length > 0) {
    throw new Error(errors.join(', '));
  }

  const { data, error } = await supabase
    .from('transactions')
    .insert({
      ...transaction,
      user_id: user.id
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }

  return data;
};

export const updateTransaction = async (id: string, updates: Partial<Transaction>): Promise<Transaction> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  if (Object.keys(updates).length > 0) {
    const errors = validateTransaction(updates);
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
  }

  const { data, error } = await supabase
    .from('transactions')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }

  return data;
};

export const deleteTransaction = async (id: string): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};

// Financial Goals services
export const getFinancialGoals = async (): Promise<FinancialGoal[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('financial_goals')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching financial goals:', error);
    throw error;
  }

  return data || [];
};

export const createFinancialGoal = async (goal: Omit<FinancialGoal, 'id' | 'user_id'>): Promise<FinancialGoal> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const errors = validateFinancialGoal(goal);
  if (errors.length > 0) {
    throw new Error(errors.join(', '));
  }

  const { data, error } = await supabase
    .from('financial_goals')
    .insert({
      ...goal,
      user_id: user.id
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating financial goal:', error);
    throw error;
  }

  return data;
};

// Insurance Policy services
export const getInsurancePolicies = async (): Promise<InsurancePolicy[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('insurance_policies')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching insurance policies:', error);
    throw error;
  }

  return data || [];
};

export const createInsurancePolicy = async (policy: Omit<InsurancePolicy, 'id' | 'user_id'>): Promise<InsurancePolicy> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('insurance_policies')
    .insert({
      ...policy,
      user_id: user.id
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating insurance policy:', error);
    throw error;
  }

  return data;
};

// Portfolio Holdings services
export const getPortfolioHoldings = async (): Promise<PortfolioHolding[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('portfolio_holdings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching portfolio holdings:', error);
    throw error;
  }

  return data || [];
};

export const createPortfolioHolding = async (holding: Omit<PortfolioHolding, 'id' | 'user_id'>): Promise<PortfolioHolding> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('portfolio_holdings')
    .insert({
      ...holding,
      user_id: user.id
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating portfolio holding:', error);
    throw error;
  }

  return data;
};
