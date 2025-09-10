import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { TrendingUp, Activity, DollarSign, PieChart as PieChartIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getBusinessMetrics } from '@/services/businessIntelligenceService';

interface MetricDataPoint {
  date: string;
  revenue: number;
  expenses: number;
  profit: number;
  profitMargin: number;
}

const LiveMetricsChart = () => {
  const [liveData, setLiveData] = useState<MetricDataPoint[]>([]);
  const [isLive, setIsLive] = useState(true);

  const { data: businessMetrics = [] } = useQuery({
    queryKey: ['business-metrics-live'],
    queryFn: () => getBusinessMetrics(),
    refetchInterval: isLive ? 5000 : false, // Refetch every 5 seconds when live
  });

  useEffect(() => {
    if (businessMetrics.length > 0) {
      const processedData = businessMetrics
        .slice(-30) // Last 30 data points
        .map(metric => ({
          date: new Date(metric.metric_date).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          }),
          revenue: metric.revenue || 0,
          expenses: metric.expenses || 0,
          profit: (metric.revenue || 0) - (metric.expenses || 0),
          profitMargin: metric.profit_margin || 0
        }));

      setLiveData(processedData);
    }
  }, [businessMetrics]);

  // Generate some real-time mock data for demo purposes if no data exists
  useEffect(() => {
    if (liveData.length === 0 && isLive) {
      const generateMockData = () => {
        const now = new Date();
        const mockData: MetricDataPoint[] = [];
        
        for (let i = 29; i >= 0; i--) {
          const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
          const baseRevenue = 50000 + Math.random() * 20000;
          const baseExpenses = 30000 + Math.random() * 15000;
          
          mockData.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            revenue: Math.round(baseRevenue),
            expenses: Math.round(baseExpenses),
            profit: Math.round(baseRevenue - baseExpenses),
            profitMargin: Math.round(((baseRevenue - baseExpenses) / baseRevenue) * 100)
          });
        }
        
        setLiveData(mockData);
      };

      generateMockData();
      
      const interval = setInterval(() => {
        if (isLive) {
          setLiveData(prev => {
            const newData = [...prev.slice(1)]; // Remove first element
            const lastData = prev[prev.length - 1];
            const baseRevenue = 50000 + Math.random() * 20000;
            const baseExpenses = 30000 + Math.random() * 15000;
            
            newData.push({
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              revenue: Math.round(baseRevenue),
              expenses: Math.round(baseExpenses),
              profit: Math.round(baseRevenue - baseExpenses),
              profitMargin: Math.round(((baseRevenue - baseExpenses) / baseRevenue) * 100)
            });
            
            return newData;
          });
        }
      }, 3000); // Update every 3 seconds

      return () => clearInterval(interval);
    }
  }, [liveData.length, isLive]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const pieData = liveData.length > 0 ? [
    {
      name: 'Revenue',
      value: liveData[liveData.length - 1]?.revenue || 0,
      color: '#10B981'
    },
    {
      name: 'Expenses',
      value: liveData[liveData.length - 1]?.expenses || 0,
      color: '#F59E0B'
    }
  ] : [];

  const COLORS = ['#10B981', '#F59E0B'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue vs Expenses Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Revenue vs Expenses Trend
            </div>
            <Badge 
              variant={isLive ? "default" : "secondary"}
              className={isLive ? "animate-pulse" : ""}
            >
              {isLive ? "🔴 LIVE" : "Paused"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={liveData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                fontSize={12}
                tick={{ fill: 'hsl(var(--foreground))' }}
              />
              <YAxis 
                fontSize={12}
                tick={{ fill: 'hsl(var(--foreground))' }}
                tickFormatter={formatCurrency}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [formatCurrency(value), name]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.3}
                name="Revenue"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stackId="2"
                stroke="#F59E0B"
                fill="#F59E0B"
                fillOpacity={0.3}
                name="Expenses"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Profit Margin Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Profit Margin Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={liveData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                fontSize={12}
                tick={{ fill: 'hsl(var(--foreground))' }}
              />
              <YAxis 
                fontSize={12}
                tick={{ fill: 'hsl(var(--foreground))' }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Profit Margin']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="profitMargin"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={{ fill: '#8B5CF6', strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Current Revenue Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5 text-primary" />
            Current Revenue Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Profit Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Daily Profit Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={liveData.slice(-7)}> {/* Last 7 days */}
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                fontSize={12}
                tick={{ fill: 'hsl(var(--foreground))' }}
              />
              <YAxis 
                fontSize={12}
                tick={{ fill: 'hsl(var(--foreground))' }}
                tickFormatter={formatCurrency}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), 'Profit']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Bar 
                dataKey="profit" 
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveMetricsChart;