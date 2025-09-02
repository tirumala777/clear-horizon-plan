
import { supabase } from '@/integrations/supabase/client';

export interface BusinessMetric {
  id: string;
  user_id: string;
  metric_date: string;
  revenue?: number;
  expenses?: number;
  profit_margin?: number;
  customer_acquisition_cost?: number;
  customer_lifetime_value?: number;
  cash_flow?: number;
  inventory_turnover?: number;
  debt_to_equity_ratio?: number;
  working_capital?: number;
  growth_rate?: number;
  market_share?: number;
}

export interface MLInsight {
  id: string;
  user_id: string;
  insight_type: string;
  title: string;
  description: string;
  confidence_score?: number;
  impact_level?: string;
  recommendation?: string;
  data_sources?: string[];
  model_version?: string;
  expires_at?: string;
  user_feedback?: number;
  action_taken: boolean;
}

export interface ExternalIntegration {
  id: string;
  user_id: string;
  integration_type: string;
  provider_name: string;
  api_endpoint?: string;
  last_updated?: string;
  data_quality_score?: number;
  usage_count: number;
  status: string;
}

// Business Metrics Management
export const createBusinessMetric = async (metric: Omit<BusinessMetric, 'id' | 'user_id'>): Promise<BusinessMetric> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('business_metrics')
    .insert({
      ...metric,
      user_id: user.id
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getBusinessMetrics = async (startDate?: string, endDate?: string): Promise<BusinessMetric[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  let query = supabase
    .from('business_metrics')
    .select('*')
    .eq('user_id', user.id)
    .order('metric_date', { ascending: false });

  if (startDate) {
    query = query.gte('metric_date', startDate);
  }
  if (endDate) {
    query = query.lte('metric_date', endDate);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
};

// ML Insights Management
export const getMLInsights = async (): Promise<MLInsight[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('ml_insights')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const updateInsightFeedback = async (insightId: string, feedback: number): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { error } = await supabase
    .from('ml_insights')
    .update({ user_feedback: feedback })
    .eq('id', insightId)
    .eq('user_id', user.id);

  if (error) throw error;
};

// External Integrations Management
export const getExternalIntegrations = async (): Promise<ExternalIntegration[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('external_integrations')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const createExternalIntegration = async (integration: Omit<ExternalIntegration, 'id' | 'user_id'>): Promise<ExternalIntegration> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('external_integrations')
    .insert({
      ...integration,
      user_id: user.id
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// AI-Powered Business Analysis
export const generateBusinessInsights = async (metrics: BusinessMetric[]): Promise<MLInsight[]> => {
  // This would typically connect to your ML service or API
  // For now, returning mock insights based on business rules
  
  const insights: Partial<MLInsight>[] = [];
  
  if (metrics.length > 0) {
    const latestMetric = metrics[0];
    
    // Revenue Growth Analysis
    if (metrics.length > 1) {
      const previousMetric = metrics[1];
      if (latestMetric.revenue && previousMetric.revenue) {
        const growthRate = ((latestMetric.revenue - previousMetric.revenue) / previousMetric.revenue) * 100;
        
        if (growthRate > 20) {
          insights.push({
            insight_type: 'growth_opportunity',
            title: 'Exceptional Revenue Growth Detected',
            description: `Your revenue has grown by ${growthRate.toFixed(1)}% compared to the previous period. Consider scaling your successful strategies.`,
            confidence_score: 0.95,
            impact_level: 'high',
            recommendation: 'Analyze which channels are driving this growth and allocate more resources to them.',
            action_taken: false
          });
        } else if (growthRate < -10) {
          insights.push({
            insight_type: 'risk_assessment',
            title: 'Revenue Decline Alert',
            description: `Revenue has decreased by ${Math.abs(growthRate).toFixed(1)}%. Immediate attention required.`,
            confidence_score: 0.90,
            impact_level: 'critical',
            recommendation: 'Review marketing spend, customer retention strategies, and market conditions.',
            action_taken: false
          });
        }
      }
    }
    
    // Profit Margin Analysis
    if (latestMetric.profit_margin !== undefined) {
      if (latestMetric.profit_margin < 5) {
        insights.push({
          insight_type: 'cost_optimization',
          title: 'Low Profit Margins Detected',
          description: `Current profit margin is ${latestMetric.profit_margin}%. Industry average is typically 10-20%.`,
          confidence_score: 0.85,
          impact_level: 'medium',
          recommendation: 'Review operational costs and pricing strategies to improve margins.',
          action_taken: false
        });
      }
    }
  }
  
  return insights as MLInsight[];
};
