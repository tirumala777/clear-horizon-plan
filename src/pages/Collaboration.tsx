
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import TeamActivity from '@/components/collaboration/TeamActivity';
import AdBanner from '@/components/advertisements/AdBanner';
import { Users, MessageSquare, Calendar, Briefcase } from 'lucide-react';

const Collaboration = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-background to-primary/5 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-secondary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-background to-primary/5">
      <DashboardHeader />
      
      {/* Hero Section with Team Collaboration Theme */}
      <div className="relative overflow-hidden bg-gradient-to-r from-secondary via-secondary-light to-primary">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M20 20c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm-20-18c9.941 0 18 8.059 18 18s-8.059 18-18 18-18-8.059-18-18 8.059-18 18-18z"/%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="flex items-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mr-4">
                  <Users className="w-10 h-10" />
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3">
                  <MessageSquare className="w-8 h-8" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Team Collaboration
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Empower your team with seamless collaboration tools designed for modern business success
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-sm font-medium">Real-time Updates</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-sm font-medium">Team Analytics</span>
                </div>
              </div>
            </div>
            
            {/* Business Illustration */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/20 rounded-2xl p-6 text-center">
                    <Calendar className="w-8 h-8 mx-auto mb-3 text-white" />
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="text-xs text-white/80">Active Support</div>
                  </div>
                  <div className="bg-white/20 rounded-2xl p-6 text-center">
                    <Briefcase className="w-8 h-8 mx-auto mb-3 text-white" />
                    <div className="text-2xl font-bold text-white">150+</div>
                    <div className="text-xs text-white/80">Team Projects</div>
                  </div>
                </div>
                <div className="mt-6 bg-white/20 rounded-2xl p-6 text-center">
                  <Users className="w-10 h-10 mx-auto mb-3 text-white" />
                  <div className="text-3xl font-bold text-white">5,000+</div>
                  <div className="text-sm text-white/80">Connected Teams Worldwide</div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-warning/20 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-success/20 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <AdBanner />
        <TeamActivity />
      </main>
    </div>
  );
};

export default Collaboration;
