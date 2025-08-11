
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const insights = [
  {
    id: 1,
    type: 'opportunity',
    title: 'Revenue Diversification Opportunity',
    description: 'Your top 2 clients represent 60% of revenue. Consider expanding your client base to reduce dependency risk.',
    impact: 'High',
    icon: TrendingUp,
    color: 'text-success',
    bgColor: 'bg-success/10'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Server Costs Above Industry Average',
    description: 'Your infrastructure costs are 18% higher than similar-sized companies. Review optimization strategies.',
    impact: 'Medium',
    icon: AlertTriangle,
    color: 'text-warning',
    bgColor: 'bg-warning/10'
  },
  {
    id: 3,
    type: 'achievement',
    title: 'Customer Retention Improving',
    description: 'Your customer retention rate has improved by 12% this quarter. Great work on customer satisfaction!',
    impact: 'High',
    icon: CheckCircle,
    color: 'text-success',
    bgColor: 'bg-success/10'
  }
];

const AIInsights = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          <span>AI-Powered Insights</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => {
          const IconComponent = insight.icon;
          return (
            <div 
              key={insight.id} 
              className={`p-4 rounded-lg border transition-all hover:shadow-md ${insight.bgColor}`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full bg-background`}>
                  <IconComponent className={`h-4 w-4 ${insight.color}`} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm">{insight.title}</h4>
                    <Badge variant={insight.impact === 'High' ? 'default' : 'secondary'}>
                      {insight.impact} Impact
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {insight.description}
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Learn More
                    </Button>
                    <Button size="sm" variant="ghost">
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default AIInsights;
