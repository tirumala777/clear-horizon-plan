
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, DollarSign, Users, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Updated mock data with INR values
const mockData = [
  { month: 'Jan', revenue: 3750000, expenses: 2650000, growth: 12 }, // 37.5L revenue, 26.5L expenses
  { month: 'Feb', revenue: 4300000, expenses: 2900000, growth: 15 }, // 43L revenue, 29L expenses
  { month: 'Mar', revenue: 4000000, expenses: 2750000, growth: 8 },  // 40L revenue, 27.5L expenses
  { month: 'Apr', revenue: 5100000, expenses: 3150000, growth: 22 }, // 51L revenue, 31.5L expenses
  { month: 'May', revenue: 4600000, expenses: 3000000, growth: 18 }, // 46L revenue, 30L expenses
  { month: 'Jun', revenue: 5600000, expenses: 3300000, growth: 25 }, // 56L revenue, 33L expenses
];

const GrowthOverview = () => {
  const [viewMode, setViewMode] = useState<'revenue' | 'growth'>('revenue');

  const formatINR = (value: number) => {
    if (value >= 10000000) { // 1 crore
      return `₹${(value / 10000000).toFixed(1)}Cr`;
    } else if (value >= 100000) { // 1 lakh
      return `₹${(value / 100000).toFixed(1)}L`;
    }
    return `₹${(value / 1000).toFixed(0)}K`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Growth Overview</h2>
        <div className="flex space-x-2">
          <Button 
            variant={viewMode === 'revenue' ? 'default' : 'outline'}
            onClick={() => setViewMode('revenue')}
          >
            Revenue
          </Button>
          <Button 
            variant={viewMode === 'growth' ? 'default' : 'outline'}
            onClick={() => setViewMode('growth')}
          >
            Growth Rate
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-success">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-success-foreground/80 text-sm">Monthly Revenue</p>
                <p className="text-2xl font-bold text-success-foreground">₹56,00,000</p>
                <p className="text-success-foreground/80 text-sm">+25% from last month</p>
              </div>
              <DollarSign className="h-8 w-8 text-success-foreground/80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Active Customers</p>
                <p className="text-2xl font-bold">1,240</p>
                <p className="text-success text-sm">+15% growth</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Profit Margin</p>
                <p className="text-2xl font-bold">40.3%</p>
                <p className="text-success text-sm">+2.1% improved</p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Goal Progress</p>
                <p className="text-2xl font-bold">78%</p>
                <p className="text-warning text-sm">₹83L target</p>
              </div>
              <Target className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>6-Month Performance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {viewMode === 'revenue' ? (
                <AreaChart data={mockData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={formatINR} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    fill="url(#revenueGradient)"
                    strokeWidth={3}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke="hsl(var(--warning))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </AreaChart>
              ) : (
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Line 
                    type="monotone" 
                    dataKey="growth" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrowthOverview;
