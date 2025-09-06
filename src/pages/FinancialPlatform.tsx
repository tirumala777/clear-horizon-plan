
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  CreditCard, 
  Shield, 
  Target, 
  Settings,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  Calculator,
  Users,
  FileText
} from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import FinancialDataManager from '@/components/financial/FinancialDataManager';
import FinancialAnalytics from '@/components/financial/FinancialAnalytics';
import SecuritySettings from '@/components/financial/SecuritySettings';
import InsuranceManager from '@/components/financial/InsuranceManager';
import TaxPlanner from '@/components/financial/TaxPlanner';
import PortfolioTracker from '@/components/financial/PortfolioTracker';
import RealTimePortfolioTracker from '@/components/financial/RealTimePortfolioTracker';
import CollaborationHub from '@/components/financial/CollaborationHub';
import AdBanner from '@/components/advertisements/AdBanner';
import UPITransactionDashboard from '@/components/financial/UPITransactionDashboard';
import { formatINR, formatINRLarge } from '@/services/financialDataService';
import { useQuery } from '@tanstack/react-query';
import { getBusinessMetrics } from '@/services/businessIntelligenceService';

const FinancialPlatform = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch real-time business metrics
  const { data: metrics = [], isLoading: metricsLoading } = useQuery({
    queryKey: ['financial-platform-metrics'],
    queryFn: () => getBusinessMetrics(),
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const platformFeatures = [
    {
      title: 'Transaction Management',
      description: 'Track and categorize all your financial transactions',
      icon: CreditCard,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      tab: 'transactions'
    },
    {
      title: 'Portfolio Tracking',
      description: 'Monitor your investment portfolio performance',
      icon: PieChart,
      color: 'text-success',
      bgColor: 'bg-success/10',
      tab: 'portfolio'
    },
    {
      title: 'Analytics & Insights',
      description: 'Get detailed reports and financial recommendations',
      icon: BarChart3,
      color: 'text-success',
      bgColor: 'bg-success/10',
      tab: 'analytics'
    },
    {
      title: 'Tax Planning',
      description: 'Optimize your tax strategy and maximize deductions',
      icon: Calculator,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      tab: 'tax'
    },
    {
      title: 'Insurance Management',
      description: 'Manage and track your insurance policies',
      icon: Shield,
      color: 'text-info',
      bgColor: 'bg-info/10',
      tab: 'insurance'
    },
    {
      title: 'Team Collaboration',
      description: 'Collaborate with advisors and team members',
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100',
      tab: 'collaboration'
    },
    {
      title: 'Goal Tracking',
      description: 'Set and monitor your financial goals',
      icon: Target,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      tab: 'goals'
    },
    {
      title: 'Security & Privacy',
      description: 'Advanced security features to protect your data',
      icon: Shield,
      color: 'text-danger',
      bgColor: 'bg-danger/10',
      tab: 'security'
    }
  ];

  // Real-time quick stats with live data
  const latestMetric = metrics[0];
  const hasRealData = !metricsLoading && latestMetric;

  const quickStats = [
    { 
      label: 'Total Portfolio Value', 
      value: hasRealData ? formatINR(latestMetric.revenue || 0) : '₹78,75,000', 
      change: hasRealData && latestMetric.growth_rate ? `+${latestMetric.growth_rate}%` : '+8.2%', 
      icon: DollarSign, 
      trend: 'up',
      isLive: hasRealData
    },
    { 
      label: 'Monthly Spending', 
      value: hasRealData ? formatINR(latestMetric.expenses || 0) : '₹2,36,320', 
      change: '-8.1%', 
      icon: TrendingUp, 
      trend: 'down',
      isLive: hasRealData
    },
    { 
      label: 'Profit Margin', 
      value: hasRealData && latestMetric.profit_margin ? `${latestMetric.profit_margin}%` : '15.3%', 
      change: '+15.3%', 
      icon: Calculator, 
      trend: 'up',
      isLive: hasRealData
    },
    { 
      label: 'Cash Flow', 
      value: hasRealData ? formatINR(latestMetric.cash_flow || 0) : '₹4.58Cr', 
      change: 'Live', 
      icon: Shield, 
      trend: 'neutral',
      isLive: hasRealData
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <AdBanner />
        
        <div className="space-y-8">
          {/* Platform Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Comprehensive Financial Management Platform
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Your complete financial ecosystem - from investment tracking and tax planning to team collaboration 
              and insurance management. Everything you need to achieve your financial goals.
            </p>
          </div>

          {/* Real-Time Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className={`hover:shadow-lg transition-all duration-300 relative overflow-hidden ${stat.isLive ? 'ring-2 ring-green-500/20' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                          {stat.isLive && (
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        {stat.trend !== 'neutral' && (
                          <Badge variant={stat.trend === 'up' ? 'default' : 'secondary'} className="mt-1">
                            {stat.isLive && stat.trend === 'up' && <TrendingUp className="w-3 h-3 mr-1" />}
                            {stat.isLive && stat.trend === 'down' && <TrendingDown className="w-3 h-3 mr-1" />}
                            {stat.change}
                          </Badge>
                        )}
                        {stat.trend === 'neutral' && (
                          <Badge variant="outline" className="mt-1">
                            {stat.isLive && <Target className="w-3 h-3 mr-1" />}
                            {stat.change}
                          </Badge>
                        )}
                        {stat.isLive && (
                          <p className="text-xs text-green-600 mt-1">Live Data</p>
                        )}
                      </div>
                      <div className={`w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center ${stat.isLive ? 'animate-pulse' : ''}`}>
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                  {stat.isLive && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500 animate-pulse"></div>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Main Platform Interface */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <div className="flex items-center justify-between">
              <TabsList className="grid w-full max-w-5xl grid-cols-9">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="upi">UPI Live</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="tax">Tax Planning</TabsTrigger>
                <TabsTrigger value="insurance">Insurance</TabsTrigger>
                <TabsTrigger value="collaboration">Team</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {platformFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <Card 
                      key={index} 
                      className="hover:shadow-lg transition-all cursor-pointer group"
                      onClick={() => setActiveTab(feature.tab)}
                    >
                      <CardHeader>
                        <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <IconComponent className={`w-6 h-6 ${feature.color}`} />
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Platform Benefits */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Comprehensive financial data management and analytics</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Real-time portfolio tracking and performance monitoring</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Advanced tax planning and optimization tools</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Integrated insurance policy management</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Team collaboration and advisor communication</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Bank-level security and data encryption</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Getting Started Guide</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-primary/10 text-primary">1</Badge>
                        <span>Connect your financial accounts and add transactions</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-primary/10 text-primary">2</Badge>
                        <span>Set up your investment portfolio tracking</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-primary/10 text-primary">3</Badge>
                        <span>Input your tax information for optimization</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-primary/10 text-primary">4</Badge>
                        <span>Add your insurance policies for comprehensive coverage</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-primary/10 text-primary">5</Badge>
                        <span>Invite team members and financial advisors</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-primary/10 text-primary">6</Badge>
                        <span>Configure security settings and data protection</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Transactions Tab */}
            <TabsContent value="transactions">
              <FinancialDataManager />
            </TabsContent>

            {/* UPI Live Transactions Tab */}
            <TabsContent value="upi">
              <UPITransactionDashboard />
            </TabsContent>

            {/* Portfolio Tab */}
            <TabsContent value="portfolio">
              <RealTimePortfolioTracker />
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <FinancialAnalytics />
            </TabsContent>

            {/* Tax Planning Tab */}
            <TabsContent value="tax">
              <TaxPlanner />
            </TabsContent>

            {/* Insurance Tab */}
            <TabsContent value="insurance">
              <InsuranceManager />
            </TabsContent>

            {/* Collaboration Tab */}
            <TabsContent value="collaboration">
              <CollaborationHub />
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <SecuritySettings />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default FinancialPlatform;
