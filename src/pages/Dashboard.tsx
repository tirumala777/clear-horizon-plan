
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import GrowthOverview from '@/components/dashboard/GrowthOverview';
import RevenueChart from '@/components/dashboard/RevenueChart';
import AIInsights from '@/components/dashboard/AIInsights';
import MilestoneTracker from '@/components/dashboard/MilestoneTracker';
import RealTimeMetrics from '@/components/dashboard/RealTimeMetrics';
import MLInsightsDashboard from '@/components/ml/MLInsightsDashboard';
import FileUpload from '@/components/dashboard/FileUpload';
import RealTimeDataProcessor from '@/components/dashboard/RealTimeDataProcessor';
import LiveMetricsChart from '@/components/dashboard/LiveMetricsChart';
import { useJourneyTracking } from '@/hooks/useJourneyTracking';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const { updateJourneyStep } = useJourneyTracking();

  React.useEffect(() => {
    if (user) {
      updateJourneyStep('dashboard_visit');
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
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
        {/* Real-Time Metrics */}
        <RealTimeMetrics />
        
        {/* Growth Overview and Revenue Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GrowthOverview />
          <RevenueChart />
        </div>
        
        {/* ML Data Processing */}
        <RealTimeDataProcessor />
        
        {/* Live Metrics Charts */}
        <LiveMetricsChart />
        
        {/* File Upload and ML Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FileUpload />
          <MLInsightsDashboard />
        </div>
        
        {/* AI Insights */}
        <AIInsights />
        
        {/* Milestone Tracker */}
        <MilestoneTracker />
      </main>
    </div>
  );
};

export default Dashboard;
