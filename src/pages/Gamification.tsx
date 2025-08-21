
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import AchievementBadges from '@/components/gamification/AchievementBadges';
import AdBanner from '@/components/advertisements/AdBanner';
import { Trophy, Award, Star, Target, Zap } from 'lucide-react';

const Gamification = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warning/5 via-background to-success/5 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-warning"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warning/5 via-background to-success/5">
      <DashboardHeader />
      
      {/* Hero Section with Achievement Theme */}
      <div className="relative overflow-hidden bg-gradient-to-r from-warning via-warning/80 to-success">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z" fill-rule="nonzero"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center text-white">
            <div className="flex justify-center items-center mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 mr-4 animate-pulse">
                <Trophy className="w-16 h-16" />
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-full p-4 animate-bounce">
                <Award className="w-12 h-12" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 ml-4 animate-ping">
                <Star className="w-8 h-8" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Achievement Center
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
              Celebrate your business milestones and unlock new levels of success with our gamified achievement system
            </p>
            
            {/* Achievement Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <Target className="w-12 h-12 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">87%</div>
                <div className="text-white/80">Goals Completed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <Zap className="w-12 h-12 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">42</div>
                <div className="text-white/80">Badges Earned</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <Star className="w-12 h-12 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">15,430</div>
                <div className="text-white/80">Total XP Points</div>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-success/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white/5 rounded-full animate-ping"></div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <AdBanner />
        <AchievementBadges />
      </main>
    </div>
  );
};

export default Gamification;
