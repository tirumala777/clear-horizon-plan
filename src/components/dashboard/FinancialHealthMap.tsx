
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const healthMetrics = [
  { category: 'Revenue Growth', value: 85, color: 'bg-success' },
  { category: 'Cash Flow', value: 72, color: 'bg-warning' },
  { category: 'Profit Margin', value: 90, color: 'bg-success' },
  { category: 'Customer Acquisition', value: 65, color: 'bg-warning' },
  { category: 'Market Position', value: 78, color: 'bg-success' },
  { category: 'Operational Efficiency', value: 45, color: 'bg-danger' },
];

const FinancialHealthMap = () => {
  const getHealthColor = (value: number) => {
    if (value >= 80) return 'bg-success';
    if (value >= 60) return 'bg-warning';
    return 'bg-danger';
  };

  const getHealthLabel = (value: number) => {
    if (value >= 80) return 'Excellent';
    if (value >= 60) return 'Good';
    return 'Needs Attention';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Financial Health Heatmap</span>
          <div className="flex space-x-2 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-success rounded"></div>
              <span>Healthy</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-warning rounded"></div>
              <span>Moderate</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-danger rounded"></div>
              <span>Risk</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {healthMetrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{metric.category}</span>
                <span className="text-xs text-muted-foreground">
                  {getHealthLabel(metric.value)}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${getHealthColor(metric.value)}`}
                  style={{ width: `${metric.value}%` }}
                ></div>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                {metric.value}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialHealthMap;
