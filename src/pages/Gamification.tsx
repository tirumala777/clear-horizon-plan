
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import AchievementBadges from '@/components/gamification/AchievementBadges';
import AdBanner from '@/components/advertisements/AdBanner';

const Gamification = () => {
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
          <h1 className="text-3xl font-bold">Achievement Center</h1>
          <p className="text-muted-foreground">
            Track your progress, earn badges, and celebrate your business milestones
          </p>
        </div>
        
        <AchievementBadges />
      </main>
    </div>
  );
};

export default Gamification;
