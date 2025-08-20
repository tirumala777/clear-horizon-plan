
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Updated revenue data with INR values (in lakhs for easier reading)
const revenueData = [
  { month: 'Jan', revenue: 3750000, profit: 1500000 }, // 37.5L revenue, 15L profit
  { month: 'Feb', revenue: 4300000, profit: 1800000 }, // 43L revenue, 18L profit
  { month: 'Mar', revenue: 4000000, profit: 1600000 }, // 40L revenue, 16L profit
  { month: 'Apr', revenue: 5100000, profit: 2300000 }, // 51L revenue, 23L profit
  { month: 'May', revenue: 4600000, profit: 2100000 }, // 46L revenue, 21L profit
  { month: 'Jun', revenue: 5600000, profit: 2700000 }, // 56L revenue, 27L profit
];

const RevenueChart = () => {
  const formatINR = (value: number) => {
    if (value >= 10000000) { // 1 crore
      return `₹${(value / 10000000).toFixed(1)}Cr`;
    } else if (value >= 100000) { // 1 lakh
      return `₹${(value / 100000).toFixed(1)}L`;
    }
    return `₹${(value / 1000).toFixed(0)}K`;
  };

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
            <YAxis tickFormatter={formatINR} />
            <Tooltip formatter={(value) => [formatINR(Number(value)), '']} />
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
