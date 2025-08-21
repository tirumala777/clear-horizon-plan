
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import GrowthOverview from '@/components/dashboard/GrowthOverview';
import FinancialHealthMap from '@/components/dashboard/FinancialHealthMap';
import AIInsights from '@/components/dashboard/AIInsights';
import WhatIfScenarios from '@/components/dashboard/WhatIfScenarios';
import MilestoneTracker from '@/components/dashboard/MilestoneTracker';
import AdBanner from '@/components/advertisements/AdBanner';
import { TrendingUp, Brain, Shield, Zap } from 'lucide-react';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-success/10 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-4 border-primary/20 border-t-primary"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-32 w-32 border-4 border-primary/10"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-success/5">
      <DashboardHeader />
      
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center text-white">
            <div className="flex justify-center mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 animate-pulse">
                  <TrendingUp className="w-10 h-10" />
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 animate-bounce">
                  <Brain className="w-10 h-10" />
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 animate-ping">
                  <Shield className="w-10 h-10" />
                </div>
                <div className="bg-white/25 backdrop-blur-sm rounded-2xl p-4 animate-pulse">
                  <Zap className="w-10 h-10" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Business Intelligence Hub
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Welcome back! Monitor your business performance with real-time analytics and AI-powered insights
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">₹24.5L</div>
                <div className="text-xs text-white/80">Monthly Revenue</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">+18%</div>
                <div className="text-xs text-white/80">Growth Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">847</div>
                <div className="text-xs text-white/80">Active Clients</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">94%</div>
                <div className="text-xs text-white/80">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <AdBanner />
        <GrowthOverview />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FinancialHealthMap />
          <AIInsights />
        </div>
        <WhatIfScenarios />
        <MilestoneTracker />
      </main>
    </div>
  );
};

export default Dashboard;
