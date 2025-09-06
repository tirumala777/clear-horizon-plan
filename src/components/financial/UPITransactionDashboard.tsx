import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Smartphone, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  UPITransaction, 
  RealTimeTransactionData,
  upiTransactionStream,
  getTransactionAnalytics,
  formatUPIAmount,
  getTransactionStatusColor
} from '@/services/upiTransactionService';

const UPITransactionDashboard = () => {
  const [transactions, setTransactions] = useState<UPITransaction[]>([]);
  const [analytics, setAnalytics] = useState<RealTimeTransactionData | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // Start with some mock historical data
    const generateHistoricalData = () => {
      const historicalTransactions: UPITransaction[] = [];
      const now = new Date();
      
      for (let i = 0; i < 50; i++) {
        const timestamp = new Date(now.getTime() - (i * 3600000 * Math.random() * 24)); // Random times in last 24 hours
        const mockData = {
          id: `historical_${i}`,
          user_id: 'current_user',
          transaction_id: `UPI${timestamp.getTime()}${Math.floor(Math.random() * 1000)}`,
          type: Math.random() > 0.3 ? 'debit' : 'credit' as 'credit' | 'debit',
          amount: Math.random() > 0.5 ? Math.floor(Math.random() * 5000) + 50 : Math.floor(Math.random() * 50000) + 1000,
          description: 'Historical transaction',
          upi_id: `user@paytm`,
          status: 'success' as 'success',
          timestamp: timestamp.toISOString(),
          category: ['Food & Dining', 'Shopping', 'Transportation'][Math.floor(Math.random() * 3)],
          reference_number: `${timestamp.getTime()}`,
        };
        historicalTransactions.push(mockData);
      }
      
      return historicalTransactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    };

    const initialTransactions = generateHistoricalData();
    setTransactions(initialTransactions);
    setAnalytics(getTransactionAnalytics(initialTransactions));
  }, []);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    if (isLive) {
      upiTransactionStream.start();
      unsubscribe = upiTransactionStream.onTransaction((newTransaction) => {
        setTransactions(prev => {
          const updated = [newTransaction, ...prev].slice(0, 100); // Keep only latest 100
          setAnalytics(getTransactionAnalytics(updated));
          return updated;
        });
      });
    } else {
      upiTransactionStream.stop();
    }

    return () => {
      if (unsubscribe) unsubscribe();
      upiTransactionStream.stop();
    };
  }, [isLive]);

  const toggleLiveStream = () => {
    setIsLive(!isLive);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (!analytics) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const categoryData = Object.entries(analytics.categoryBreakdown).map(([name, value]) => ({
    name,
    value,
    percentage: ((value / Object.values(analytics.categoryBreakdown).reduce((a, b) => a + b, 0)) * 100).toFixed(1)
  }));

  return (
    <div className="space-y-6">
      {/* Header with Live Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            UPI Transaction Dashboard
          </h2>
          <p className="text-muted-foreground">Real-time payment monitoring and analytics</p>
        </div>
        
        <Button
          onClick={toggleLiveStream}
          variant={isLive ? "default" : "outline"}
          className={`${isLive ? 'animate-pulse bg-green-600 hover:bg-green-700' : ''}`}
        >
          <Activity className="w-4 h-4 mr-2" />
          {isLive ? 'Live Stream ON' : 'Start Live Stream'}
        </Button>
      </div>

      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Transactions</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.todayTransactions}</div>
            <div className="text-xs text-muted-foreground">
              Total: {analytics.totalTransactions} transactions
            </div>
          </CardContent>
          {isLive && (
            <div className="absolute top-2 right-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          )}
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Amount</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${analytics.todayAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatUPIAmount(Math.abs(analytics.todayAmount), analytics.todayAmount >= 0 ? 'credit' : 'debit')}
            </div>
            <div className="text-xs text-muted-foreground">
              Total: {formatUPIAmount(Math.abs(analytics.totalAmount), analytics.totalAmount >= 0 ? 'credit' : 'debit')}
            </div>
          </CardContent>
          {isLive && (
            <div className="absolute top-2 right-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          )}
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {transactions.length > 0 
                ? ((transactions.filter(t => t.status === 'success').length / transactions.length) * 100).toFixed(1)
                : '0'}%
            </div>
            <div className="text-xs text-muted-foreground">
              {transactions.filter(t => t.status === 'success').length} successful
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active UPI IDs</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(transactions.map(t => t.upi_id)).size}
            </div>
            <div className="text-xs text-muted-foreground">
              Unique payment sources
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>24-Hour Transaction Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.hourlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="hour" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                    fontSize={12}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      name === 'amount' ? formatUPIAmount(value) : value,
                      name === 'amount' ? 'Amount' : 'Count'
                    ]}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Spending Categories</CardTitle>
          </CardHeader>
          <CardContent>
            {categoryData.length > 0 ? (
              <div className="space-y-4">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => [formatUPIAmount(value), 'Amount']}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {categoryData.map((category, index) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <div className="text-sm font-medium">
                        {formatUPIAmount(category.value)} ({category.percentage}%)
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No spending data available
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Recent Transactions
            {isLive && (
              <Badge variant="outline" className="text-green-600 border-green-200">
                <Activity className="w-3 h-3 mr-1 animate-pulse" />
                Live
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {analytics.recentTransactions.map((transaction) => (
                <div 
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'}`}>
                      {transaction.type === 'credit' ? (
                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowDownLeft className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-sm text-muted-foreground">
                        {transaction.upi_id} • {new Date(transaction.timestamp).toLocaleTimeString()}
                      </div>
                      {transaction.merchant_name && (
                        <div className="text-xs text-muted-foreground">
                          via {transaction.merchant_name}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`font-bold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                      {formatUPIAmount(transaction.amount, transaction.type)}
                    </div>
                    <div className="flex items-center gap-1 justify-end mt-1">
                      {getStatusIcon(transaction.status)}
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getTransactionStatusColor(transaction.status)}`}
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default UPITransactionDashboard;