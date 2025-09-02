
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Target } from 'lucide-react';

const metrics = [
  {
    title: 'Total Revenue',
    value: '₹12,75,400',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign
  },
  {
    title: 'Active Customers',
    value: '2,847',
    change: '+8.2%',
    trend: 'up',
    icon: Users
  },
  {
    title: 'Conversion Rate',
    value: '3.24%',
    change: '-0.4%',
    trend: 'down',
    icon: Target
  },
  {
    title: 'Orders',
    value: '1,249',
    change: '+15.3%',
    trend: 'up',
    icon: ShoppingCart
  }
];

const MetricsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const IconComponent = metric.icon;
        const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
        
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <IconComponent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className={`flex items-center text-xs ${
                metric.trend === 'up' ? 'text-success' : 'text-danger'
              }`}>
                <TrendIcon className="h-3 w-3 mr-1" />
                {metric.change} from last month
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MetricsGrid;
