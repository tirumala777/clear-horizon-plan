
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import TeamActivity from '@/components/collaboration/TeamActivity';
import AdBanner from '@/components/advertisements/AdBanner';

const Collaboration = () => {
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
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Team Collaboration</h1>
          <p className="text-muted-foreground">
            Work together to achieve your business goals and track team progress
          </p>
        </div>
        
        <TeamActivity />
      </main>
    </div>
  );
};

export default Collaboration;
