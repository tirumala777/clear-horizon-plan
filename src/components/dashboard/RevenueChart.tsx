
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 45000, profit: 18000 },
  { month: 'Feb', revenue: 52000, profit: 22000 },
  { month: 'Mar', revenue: 48000, profit: 19000 },
  { month: 'Apr', revenue: 61000, profit: 28000 },
  { month: 'May', revenue: 55000, profit: 25000 },
  { month: 'Jun', revenue: 67000, profit: 32000 },
];

const RevenueChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue & Profit Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              name="Revenue"
            />
            <Line 
              type="monotone" 
              dataKey="profit" 
              stroke="hsl(var(--success))" 
              strokeWidth={3}
              name="Profit"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
