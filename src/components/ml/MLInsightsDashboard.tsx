
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Star, AlertTriangle, TrendingUp, CheckCircle } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMLInsights, updateInsightFeedback } from '@/services/businessIntelligenceService';
import { toast } from 'sonner';

const MLInsightsDashboard = () => {
  const queryClient = useQueryClient();
  
  const { data: insights = [], isLoading } = useQuery({
    queryKey: ['ml-insights'],
    queryFn: getMLInsights,
  });

  const feedbackMutation = useMutation({
    mutationFn: ({ insightId, feedback }: { insightId: string; feedback: number }) =>
      updateInsightFeedback(insightId, feedback),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ml-insights'] });
      toast.success('Feedback submitted successfully');
    },
  });

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'financial_forecast':
        return TrendingUp;
      case 'risk_assessment':
        return AlertTriangle;
      case 'growth_opportunity':
        return CheckCircle;
      case 'cost_optimization':
        return Brain;
      default:
        return Brain;
    }
  };

  const getImpactColor = (level?: string) => {
    switch (level) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'default';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-blue-600" />
            AI-Powered Insights
          </div>
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            {insights.length} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.length === 0 ? (
          <div className="text-center py-8">
            <Brain className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Insights Available</h3>
            <p className="text-muted-foreground">
              Add more business data to generate AI-powered insights and recommendations.
            </p>
          </div>
        ) : (
          insights.map((insight) => {
            const IconComponent = getInsightIcon(insight.insight_type);
            
            return (
              <div 
                key={insight.id} 
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold">{insight.title}</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    {insight.confidence_score && (
                      <Badge variant="outline" className="text-xs">
                        {(insight.confidence_score * 100).toFixed(0)}% Confident
                      </Badge>
                    )}
                    <Badge variant={getImpactColor(insight.impact_level)}>
                      {insight.impact_level} Impact
                    </Badge>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-3">
                  {insight.description}
                </p>
                
                {insight.recommendation && (
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-md mb-3">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      Recommendation: {insight.recommendation}
                    </p>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Was this helpful?</span>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Button
                        key={rating}
                        size="sm"
                        variant="ghost"
                        className="p-1"
                        onClick={() => feedbackMutation.mutate({ insightId: insight.id, feedback: rating })}
                        disabled={feedbackMutation.isPending}
                      >
                        <Star 
                          className={`w-4 h-4 ${
                            insight.user_feedback && rating <= insight.user_feedback
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground'
                          }`}
                        />
                      </Button>
                    ))}
                  </div>
                  
                  {insight.data_sources && insight.data_sources.length > 0 && (
                    <div className="text-xs text-muted-foreground">
                      Sources: {insight.data_sources.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};

export default MLInsightsDashboard;
