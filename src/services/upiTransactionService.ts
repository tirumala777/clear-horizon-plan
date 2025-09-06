import { supabase } from '@/integrations/supabase/client';

export interface UPITransaction {
  id: string;
  user_id: string;
  transaction_id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  merchant_name?: string;
  upi_id: string;
  status: 'success' | 'pending' | 'failed';
  timestamp: string;
  category: string;
  reference_number: string;
  bank_name?: string;
}

export interface RealTimeTransactionData {
  totalTransactions: number;
  totalAmount: number;
  todayTransactions: number;
  todayAmount: number;
  recentTransactions: UPITransaction[];
  categoryBreakdown: { [key: string]: number };
  hourlyTrend: { hour: string; amount: number; count: number }[];
}

// Mock UPI Transaction Generator (simulating real-time data)
export const generateMockUPITransaction = (): Omit<UPITransaction, 'id' | 'user_id'> => {
  const types: ('credit' | 'debit')[] = ['credit', 'debit'];
  const categories = ['Food & Dining', 'Shopping', 'Transportation', 'Bills & Utilities', 'Entertainment', 'Healthcare', 'Education', 'Investment'];
  const merchants = ['Swiggy', 'Zomato', 'Amazon', 'Flipkart', 'Uber', 'Ola', 'Paytm', 'PhonePe', 'Google Pay', 'IRCTC'];
  const banks = ['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak', 'PNB', 'BOB'];
  
  const type = types[Math.floor(Math.random() * types.length)];
  const amount = type === 'credit' 
    ? Math.floor(Math.random() * 50000) + 1000 // Credits: 1k to 50k
    : Math.floor(Math.random() * 5000) + 50;   // Debits: 50 to 5k
  
  return {
    transaction_id: `UPI${Date.now()}${Math.floor(Math.random() * 1000)}`,
    type,
    amount,
    description: type === 'credit' ? 'Salary/Income' : `Payment to ${merchants[Math.floor(Math.random() * merchants.length)]}`,
    merchant_name: type === 'debit' ? merchants[Math.floor(Math.random() * merchants.length)] : undefined,
    upi_id: `user${Math.floor(Math.random() * 1000)}@${['paytm', 'phonepe', 'googlepay', 'upi'][Math.floor(Math.random() * 4)]}`,
    status: Math.random() > 0.05 ? 'success' : (Math.random() > 0.5 ? 'pending' : 'failed'),
    timestamp: new Date().toISOString(),
    category: categories[Math.floor(Math.random() * categories.length)],
    reference_number: `${Date.now()}${Math.floor(Math.random() * 10000)}`,
    bank_name: banks[Math.floor(Math.random() * banks.length)]
  };
};

// Real-time transaction simulation
export class UPITransactionStream {
  private listeners: ((transaction: UPITransaction) => void)[] = [];
  private interval: NodeJS.Timeout | null = null;
  
  start() {
    this.interval = setInterval(() => {
      const mockTransaction = generateMockUPITransaction();
      const transaction: UPITransaction = {
        ...mockTransaction,
        id: `txn_${Date.now()}`,
        user_id: 'current_user' // In real app, this would be the actual user ID
      };
      
      this.listeners.forEach(listener => listener(transaction));
    }, 3000 + Math.random() * 7000); // Random interval between 3-10 seconds
  }
  
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
  
  onTransaction(listener: (transaction: UPITransaction) => void) {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }
}

// Singleton instance
export const upiTransactionStream = new UPITransactionStream();

// Get transaction analytics
export const getTransactionAnalytics = (transactions: UPITransaction[]): RealTimeTransactionData => {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const totalTransactions = transactions.length;
  const totalAmount = transactions.reduce((sum, t) => sum + (t.type === 'credit' ? t.amount : -t.amount), 0);
  
  const todayTransactions = transactions.filter(t => new Date(t.timestamp) >= todayStart).length;
  const todayAmount = transactions
    .filter(t => new Date(t.timestamp) >= todayStart)
    .reduce((sum, t) => sum + (t.type === 'credit' ? t.amount : -t.amount), 0);
  
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);
  
  // Category breakdown for debits only
  const categoryBreakdown: { [key: string]: number } = {};
  transactions
    .filter(t => t.type === 'debit')
    .forEach(t => {
      categoryBreakdown[t.category] = (categoryBreakdown[t.category] || 0) + t.amount;
    });
  
  // Hourly trend for today
  const hourlyTrend: { hour: string; amount: number; count: number }[] = [];
  for (let hour = 0; hour < 24; hour++) {
    const hourTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.timestamp);
      return transactionDate >= todayStart && 
             transactionDate.getHours() === hour;
    });
    
    const hourAmount = hourTransactions.reduce((sum, t) => 
      sum + (t.type === 'credit' ? t.amount : -t.amount), 0
    );
    
    hourlyTrend.push({
      hour: `${hour.toString().padStart(2, '0')}:00`,
      amount: hourAmount,
      count: hourTransactions.length
    });
  }
  
  return {
    totalTransactions,
    totalAmount,
    todayTransactions,
    todayAmount,
    recentTransactions,
    categoryBreakdown,
    hourlyTrend
  };
};

// Format currency for UPI transactions
export const formatUPIAmount = (amount: number, type: 'credit' | 'debit' = 'debit'): string => {
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  
  return type === 'credit' ? `+${formatted}` : `-${formatted}`;
};

// Get transaction status color
export const getTransactionStatusColor = (status: string) => {
  switch (status) {
    case 'success':
      return 'text-green-600 bg-green-50';
    case 'pending':
      return 'text-yellow-600 bg-yellow-50';
    case 'failed':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};