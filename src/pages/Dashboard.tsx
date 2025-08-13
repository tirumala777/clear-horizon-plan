
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

const Dashboard = () => {
  const { user, loading } = useAuth();

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

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
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
