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

// Currency formatting utility for Indian Rupees
export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Large number formatting for Indian numbering system (lakhs, crores)
export const formatINRLarge = (amount: number): string => {
  if (amount >= 10000000) { // 1 crore
    return `₹${(amount / 10000000).toFixed(1)}Cr`;
  } else if (amount >= 100000) { // 1 lakh
    return `₹${(amount / 100000).toFixed(1)}L`;
  } else if (amount >= 1000) { // 1 thousand
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return formatINR(amount);
};

// Type guards for runtime validation
const isValidTransactionType = (type: string): type is 'income' | 'expense' => {
  return type === 'income' || type === 'expense';
};

const isValidInsuranceStatus = (status: string): status is 'active' | 'expired' | 'cancelled' => {
  return status === 'active' || status === 'expired' || status === 'cancelled';
};

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

  // Map database records to our Transaction interface with type validation
  return (data || []).map(record => ({
    id: record.id,
    date: record.date,
    description: record.description,
    amount: record.amount,
    category: record.category,
    type: isValidTransactionType(record.type) ? record.type : 'expense',
    user_id: record.user_id
  }));
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

  return {
    id: data.id,
    date: data.date,
    description: data.description,
    amount: data.amount,
    category: data.category,
    type: isValidTransactionType(data.type) ? data.type : 'expense',
    user_id: data.user_id
  };
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

  return {
    id: data.id,
    date: data.date,
    description: data.description,
    amount: data.amount,
    category: data.category,
    type: isValidTransactionType(data.type) ? data.type : 'expense',
    user_id: data.user_id
  };
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

  // Map database records to our FinancialGoal interface
  return (data || []).map(record => ({
    id: record.id,
    title: record.title,
    targetAmount: record.target_amount,
    currentAmount: record.current_amount,
    deadline: record.deadline,
    category: record.category,
    user_id: record.user_id
  }));
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
      title: goal.title,
      target_amount: goal.targetAmount,
      current_amount: goal.currentAmount,
      deadline: goal.deadline,
      category: goal.category,
      user_id: user.id
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating financial goal:', error);
    throw error;
  }

  return {
    id: data.id,
    title: data.title,
    targetAmount: data.target_amount,
    currentAmount: data.current_amount,
    deadline: data.deadline,
    category: data.category,
    user_id: data.user_id
  };
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

  return (data || []).map(record => ({
    id: record.id,
    policy_name: record.policy_name,
    provider: record.provider,
    policy_type: record.policy_type,
    coverage_amount: record.coverage_amount || 0,
    premium_amount: record.premium_amount || 0,
    start_date: record.start_date || '',
    end_date: record.end_date || '',
    status: isValidInsuranceStatus(record.status) ? record.status : 'active',
    user_id: record.user_id
  }));
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

  return {
    id: data.id,
    policy_name: data.policy_name,
    provider: data.provider,
    policy_type: data.policy_type,
    coverage_amount: data.coverage_amount || 0,
    premium_amount: data.premium_amount || 0,
    start_date: data.start_date || '',
    end_date: data.end_date || '',
    status: isValidInsuranceStatus(data.status) ? data.status : 'active',
    user_id: data.user_id
  };
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
