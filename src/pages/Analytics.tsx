
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Download, Filter, Calendar } from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const revenueData = [
    { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000 },
    { month: 'Feb', revenue: 52000, expenses: 35000, profit: 17000 },
    { month: 'Mar', revenue: 48000, expenses: 33000, profit: 15000 },
    { month: 'Apr', revenue: 61000, expenses: 38000, profit: 23000 },
    { month: 'May', revenue: 55000, expenses: 36000, profit: 19000 },
    { month: 'Jun', revenue: 67000, expenses: 40000, profit: 27000 }
  ];

  const customerData = [
    { segment: 'Enterprise', value: 45, color: '#22c55e' },
    { segment: 'SMB', value: 35, color: '#3b82f6' },
    { segment: 'Startup', value: 20, color: '#f59e0b' }
  ];

  const cohortData = [
    { week: 'Week 1', retention: 100 },
    { week: 'Week 2', retention: 85 },
    { week: 'Week 3', retention: 78 },
    { week: 'Week 4', retention: 72 },
    { week: 'Week 8', retention: 68 },
    { week: 'Week 12', retention: 65 }
  ];

  const channelData = [
    { channel: 'Organic Search', customers: 340, cost: 0, cac: 0 },
    { channel: 'Paid Ads', customers: 180, cost: 15000, cac: 83 },
    { channel: 'Social Media', customers: 95, cost: 3000, cac: 32 },
    { channel: 'Referrals', customers: 120, cost: 2000, cac: 17 },
    { channel: 'Email', customers: 65, cost: 800, cac: 12 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Advanced Analytics</h1>
            <p className="text-muted-foreground">Deep insights into your business performance</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">1 Month</SelectItem>
                <SelectItem value="3months">3 Months</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Revenue vs Expenses Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--success))" 
                      fill="url(#revenueGradient)"
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="expenses" 
                      stroke="hsl(var(--warning))" 
                      fill="url(#expenseGradient)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Segments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ segment, value }) => `${segment}: ${value}%`}
                    >
                      {customerData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Customer Retention Cohort</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cohortData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Line 
                      type="monotone" 
                      dataKey="retention" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Acquisition by Channel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={channelData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                    <YAxis type="category" dataKey="channel" stroke="hsl(var(--muted-foreground))" width={100} />
                    <Bar dataKey="customers" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Marketing Channel Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Channel</th>
                    <th className="text-left p-2">Customers</th>
                    <th className="text-left p-2">Spend</th>
                    <th className="text-left p-2">CAC</th>
                    <th className="text-left p-2">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {channelData.map((channel, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2 font-medium">{channel.channel}</td>
                      <td className="p-2">{channel.customers}</td>
                      <td className="p-2">${channel.cost.toLocaleString()}</td>
                      <td className="p-2">${channel.cac}</td>
                      <td className="p-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-muted rounded-full h-2">
                            <div 
                              className="bg-success h-2 rounded-full" 
                              style={{ width: `${Math.min((channel.customers / 340) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {Math.round((channel.customers / 340) * 100)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
