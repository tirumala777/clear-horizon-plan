
-- Create user profiles table with comprehensive business information
CREATE TABLE public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  company_name TEXT,
  industry TEXT,
  company_size TEXT,
  founded_date DATE,
  business_stage TEXT CHECK (business_stage IN ('startup', 'growth', 'mature', 'enterprise')),
  monthly_revenue DECIMAL(15,2),
  employee_count INTEGER,
  location TEXT,
  website_url TEXT,
  business_model TEXT,
  target_market TEXT,
  journey_started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  onboarding_completed BOOLEAN DEFAULT false,
  current_step INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create financial data sources table to track connected integrations
CREATE TABLE public.financial_data_sources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  source_type TEXT NOT NULL, -- 'tally_erp', 'bank_account', 'accounting_software', 'crm'
  source_name TEXT NOT NULL,
  connection_status TEXT DEFAULT 'pending' CHECK (connection_status IN ('pending', 'connected', 'error', 'disconnected')),
  api_credentials JSONB, -- encrypted credentials
  last_sync_at TIMESTAMP WITH TIME ZONE,
  sync_frequency TEXT DEFAULT 'daily',
  data_points_collected INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create business metrics tracking table
CREATE TABLE public.business_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  metric_date DATE NOT NULL,
  revenue DECIMAL(15,2),
  expenses DECIMAL(15,2),
  profit_margin DECIMAL(5,2),
  customer_acquisition_cost DECIMAL(10,2),
  customer_lifetime_value DECIMAL(10,2),
  cash_flow DECIMAL(15,2),
  inventory_turnover DECIMAL(8,2),
  debt_to_equity_ratio DECIMAL(8,4),
  working_capital DECIMAL(15,2),
  growth_rate DECIMAL(5,2),
  market_share DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create ML insights and recommendations table
CREATE TABLE public.ml_insights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  insight_type TEXT NOT NULL, -- 'financial_forecast', 'risk_assessment', 'growth_opportunity', 'cost_optimization'
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  confidence_score DECIMAL(3,2), -- 0.00 to 1.00
  impact_level TEXT CHECK (impact_level IN ('low', 'medium', 'high', 'critical')),
  recommendation TEXT,
  data_sources TEXT[], -- array of source types used for this insight
  model_version TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  user_feedback INTEGER, -- 1-5 rating
  action_taken BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user journey tracking table
CREATE TABLE public.user_journey_steps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  step_name TEXT NOT NULL,
  step_category TEXT, -- 'onboarding', 'data_connection', 'analysis', 'optimization'
  completed_at TIMESTAMP WITH TIME ZONE,
  time_spent_seconds INTEGER,
  data_collected JSONB,
  success BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create external data integrations table for API connections
CREATE TABLE public.external_integrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  integration_type TEXT NOT NULL, -- 'market_data', 'industry_reports', 'competitor_analysis', 'economic_indicators'
  provider_name TEXT NOT NULL, -- 'alpha_vantage', 'yahoo_finance', 'fred', 'census_api'
  api_endpoint TEXT,
  last_updated TIMESTAMP WITH TIME ZONE,
  data_quality_score DECIMAL(3,2),
  usage_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'error')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_data_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ml_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_journey_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.external_integrations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_profiles
CREATE POLICY "Users can view their own profile" ON public.user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own profile" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for financial_data_sources
CREATE POLICY "Users can manage their own data sources" ON public.financial_data_sources FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for business_metrics
CREATE POLICY "Users can manage their own metrics" ON public.business_metrics FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for ml_insights
CREATE POLICY "Users can view their own insights" ON public.ml_insights FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update insight feedback" ON public.ml_insights FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for user_journey_steps
CREATE POLICY "Users can manage their own journey" ON public.user_journey_steps FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for external_integrations
CREATE POLICY "Users can manage their own integrations" ON public.external_integrations FOR ALL USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_user_profiles_user_id ON public.user_profiles(user_id);
CREATE INDEX idx_business_metrics_user_date ON public.business_metrics(user_id, metric_date DESC);
CREATE INDEX idx_ml_insights_user_type ON public.ml_insights(user_id, insight_type);
CREATE INDEX idx_journey_steps_user_category ON public.user_journey_steps(user_id, step_category);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_financial_data_sources_updated_at BEFORE UPDATE ON public.financial_data_sources FOR EACH ROW EXECUTE FUNCTION  update_updated_at_column();
