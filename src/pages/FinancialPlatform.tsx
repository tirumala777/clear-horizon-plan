
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
  DollarSign,
  PieChart
} from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import FinancialDataManager from '@/components/financial/FinancialDataManager';
import FinancialAnalytics from '@/components/financial/FinancialAnalytics';
import SecuritySettings from '@/components/financial/SecuritySettings';
import AdBanner from '@/components/advertisements/AdBanner';

const FinancialPlatform = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

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
      title: 'Analytics & Insights',
      description: 'Get detailed reports and financial recommendations',
      icon: BarChart3,
      color: 'text-success',
      bgColor: 'bg-success/10',
      tab: 'analytics'
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

  const quickStats = [
    { label: 'Total Balance', value: '$12,450.00', change: '+5.2%', icon: DollarSign, trend: 'up' },
    { label: 'Monthly Spending', value: '$2,840.00', change: '-8.1%', icon: TrendingUp, trend: 'down' },
    { label: 'Categories', value: '8 Active', change: '+2', icon: PieChart, trend: 'up' }
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
              Financial Management Platform
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Take control of your finances with our comprehensive suite of tools designed to help you 
              track, analyze, and optimize your financial health.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <Badge variant={stat.trend === 'up' ? 'default' : 'secondary'} className="mt-1">
                          {stat.change}
                        </Badge>
                      </div>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Main Platform Interface */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <div className="flex items-center justify-between">
              <TabsList className="grid w-full max-w-md grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
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

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Features</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Real-time transaction tracking and categorization</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Advanced analytics and financial insights</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Bank-level security and data encryption</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Goal setting and progress tracking</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Personalized financial recommendations</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Getting Started</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-primary/10 text-primary">1</Badge>
                        <span>Add your first transaction to get started</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-primary/10 text-primary">2</Badge>
                        <span>Set up your financial categories</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-primary/10 text-primary">3</Badge>
                        <span>Review your analytics and insights</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-primary/10 text-primary">4</Badge>
                        <span>Configure security settings</span>
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

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <FinancialAnalytics />
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
