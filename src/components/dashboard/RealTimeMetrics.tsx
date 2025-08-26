
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Activity } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getBusinessMetrics } from '@/services/businessIntelligenceService';
import { formatINR } from '@/services/financialDataService';

const RealTimeMetrics = () => {
  const { data: metrics = [], isLoading } = useQuery({
    queryKey: ['business-metrics'],
    queryFn: () => getBusinessMetrics(),
    refetchInterval: 30000, // Refresh every 30 seconds for real-time feel
  });

  const latestMetric = metrics[0];
  const previousMetric = metrics[1];

  const calculateChange = (current?: number, previous?: number) => {
    if (!current || !previous) return null;
    const change = ((current - previous) / previous) * 100;
    return {
      value: change,
      isPositive: change >= 0
    };
  };

  const MetricCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    prefix = '', 
    suffix = '' 
  }: {
    title: string;
    value?: number;
    change?: { value: number; isPositive: boolean } | null;
    icon: React.ElementType;
    prefix?: string;
    suffix?: string;
  }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value !== undefined ? `${prefix}${formatINR(value)}${suffix}` : 'N/A'}
        </div>
        {change && (
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            {change.isPositive ? (
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
            )}
            <span className={change.isPositive ? 'text-green-500' : 'text-red-500'}>
              {Math.abs(change.value).toFixed(1)}%
            </span>
            <span className="ml-1">from last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Real-Time Business Metrics</h2>
        <Badge variant="outline" className="text-green-600 border-green-200">
          <Activity className="w-3 h-3 mr-1" />
          Live Data
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Monthly Revenue"
          value={latestMetric?.revenue}
          change={calculateChange(latestMetric?.revenue, previousMetric?.revenue)}
          icon={DollarSign}
        />
        
        <MetricCard
          title="Total Expenses"
          value={latestMetric?.expenses}
          change={calculateChange(latestMetric?.expenses, previousMetric?.expenses)}
          icon={TrendingDown}
        />
        
        <MetricCard
          title="Profit Margin"
          value={latestMetric?.profit_margin}
          change={calculateChange(latestMetric?.profit_margin, previousMetric?.profit_margin)}
          icon={Target}
          suffix="%"
        />
        
        <MetricCard
          title="Cash Flow"
          value={latestMetric?.cash_flow}
          change={calculateChange(latestMetric?.cash_flow, previousMetric?.cash_flow)}
          icon={Activity}
        />
      </div>

      {metrics.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Metrics Data Yet</h3>
            <p className="text-muted-foreground">
              Connect your business data sources to start seeing real-time metrics and AI-powered insights.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RealTimeMetrics;
