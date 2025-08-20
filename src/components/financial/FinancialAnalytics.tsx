
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie } from 'recharts';
import { formatINR, formatINRLarge } from '@/services/financialDataService';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

interface AnalyticsData {
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  categories: { [key: string]: number };
  monthlyTrend: { month: string; income: number; expenses: number; net: number }[];
}

const FinancialAnalytics = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalIncome: 0,
    totalExpenses: 0,
    netIncome: 0,
    categories: {},
    monthlyTrend: []
  });

  useEffect(() => {
    const savedTransactions = localStorage.getItem('financial_transactions');
    if (savedTransactions) {
      const parsedTransactions = JSON.parse(savedTransactions);
      setTransactions(parsedTransactions);
      calculateAnalytics(parsedTransactions);
    }
  }, []);

  const calculateAnalytics = (transactionData: Transaction[]) => {
    const totalIncome = transactionData
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactionData
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const netIncome = totalIncome - totalExpenses;

    // Category breakdown
    const categories: { [key: string]: number } = {};
    transactionData.forEach(t => {
      if (t.type === 'expense') {
        categories[t.category] = (categories[t.category] || 0) + t.amount;
      }
    });

    // Monthly trend (last 6 months)
    const monthlyData: { [key: string]: { income: number; expenses: number } } = {};
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return date.toISOString().slice(0, 7); // YYYY-MM format
    }).reverse();

    last6Months.forEach(month => {
      monthlyData[month] = { income: 0, expenses: 0 };
    });

    transactionData.forEach(t => {
      const month = t.date.slice(0, 7);
      if (monthlyData[month]) {
        if (t.type === 'income') {
          monthlyData[month].income += t.amount;
        } else {
          monthlyData[month].expenses += t.amount;
        }
      }
    });

    const monthlyTrend = last6Months.map(month => ({
      month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      income: monthlyData[month].income,
      expenses: monthlyData[month].expenses,
      net: monthlyData[month].income - monthlyData[month].expenses
    }));

    setAnalytics({
      totalIncome,
      totalExpenses,
      netIncome,
      categories,
      monthlyTrend
    });
  };

  const categoryData = Object.entries(analytics.categories).map(([name, value]) => ({
    name,
    value,
    percentage: ((value / analytics.totalExpenses) * 100).toFixed(1)
  }));

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff7f', '#ff6b6b', '#4ecdc4', '#45b7d1'];

  const getFinancialHealth = () => {
    const savingsRate = analytics.totalIncome > 0 ? (analytics.netIncome / analytics.totalIncome) * 100 : 0;
    if (savingsRate >= 20) return { status: 'Excellent', color: 'text-success', bgColor: 'bg-success/10' };
    if (savingsRate >= 10) return { status: 'Good', color: 'text-warning', bgColor: 'bg-warning/10' };
    if (savingsRate >= 0) return { status: 'Fair', color: 'text-warning', bgColor: 'bg-warning/10' };
    return { status: 'Needs Attention', color: 'text-danger', bgColor: 'bg-danger/10' };
  };

  const health = getFinancialHealth();
  const savingsRate = analytics.totalIncome > 0 ? (analytics.netIncome / analytics.totalIncome) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Income</p>
                <p className="text-2xl font-bold text-success">{formatINRLarge(analytics.totalIncome)}</p>
              </div>
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold text-danger">{formatINRLarge(analytics.totalExpenses)}</p>
              </div>
              <div className="w-10 h-10 bg-danger/10 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-danger" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Net Income</p>
                <p className={`text-2xl font-bold ${analytics.netIncome >= 0 ? 'text-success' : 'text-danger'}`}>
                  {formatINRLarge(analytics.netIncome)}
                </p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Financial Health</p>
                <Badge className={`${health.bgColor} ${health.color} border-0`}>
                  {health.status}
                </Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  {savingsRate.toFixed(1)}% savings rate
                </p>
              </div>
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Monthly Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    tickFormatter={(value) => formatINRLarge(value)}
                  />
                  <Tooltip 
                    formatter={(value) => [formatINR(Number(value)), '']}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="income" stroke="hsl(var(--success))" strokeWidth={2} name="Income" />
                  <Line type="monotone" dataKey="expenses" stroke="hsl(var(--danger))" strokeWidth={2} name="Expenses" />
                  <Line type="monotone" dataKey="net" stroke="hsl(var(--primary))" strokeWidth={2} name="Net" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Expense Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            {categoryData.length > 0 ? (
              <div className="space-y-4">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
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
                        formatter={(value: number) => [formatINR(value), 'Amount']}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                    </RechartsPieChart>
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
                        {formatINR(category.value)} ({category.percentage}%)
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No expense data available
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Financial Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.netIncome < 0 && (
              <div className="p-4 bg-danger/10 border border-danger/20 rounded-lg">
                <h4 className="font-semibold text-danger mb-2">⚠️ Spending Alert</h4>
                <p className="text-sm">Your expenses exceed your income. Consider reducing discretionary spending or finding additional income sources.</p>
              </div>
            )}
            
            {savingsRate < 10 && analytics.netIncome > 0 && (
              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <h4 className="font-semibold text-warning mb-2">💡 Savings Opportunity</h4>
                <p className="text-sm">Your savings rate is {savingsRate.toFixed(1)}%. Consider aiming for at least 10-20% of your income.</p>
              </div>
            )}

            {savingsRate >= 20 && (
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <h4 className="font-semibold text-success mb-2">🎉 Great Job!</h4>
                <p className="text-sm">You're saving {savingsRate.toFixed(1)}% of your income. Keep up the excellent financial habits!</p>
              </div>
            )}

            {categoryData.length > 0 && (
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">📊 Category Insights</h4>
                <p className="text-sm">
                  Your highest expense category is {categoryData[0]?.name} at {formatINR(categoryData[0]?.value)} 
                  ({categoryData[0]?.percentage}% of total expenses).
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialAnalytics;
