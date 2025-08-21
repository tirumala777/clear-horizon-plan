
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import MetricsGrid from '@/components/analytics/MetricsGrid';
import RevenueChart from '@/components/dashboard/RevenueChart';
import AdBanner from '@/components/advertisements/AdBanner';
import { TrendingUp, BarChart3, Target, Users } from 'lucide-react';

const Analytics = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <DashboardHeader />
      
      {/* Hero Section with Business Theme */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary via-primary-light to-secondary">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <BarChart3 className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Business Analytics
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Transform your data into actionable insights with our comprehensive analytics dashboard
            </p>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-warning/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-success/20 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-ping"></div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <AdBanner />
        
        {/* Business Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: TrendingUp, title: "Revenue Growth", value: "+24.5%", color: "success" },
            { icon: Users, title: "Active Clients", value: "2,847", color: "primary" },
            { icon: Target, title: "Conversion Rate", value: "18.2%", color: "warning" },
            { icon: BarChart3, title: "Market Share", value: "12.8%", color: "secondary" }
          ].map((metric, index) => (
            <div key={index} className="group">
              <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className={`w-12 h-12 bg-${metric.color}/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-${metric.color}/20 transition-colors`}>
                  <metric.icon className={`w-6 h-6 text-${metric.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{metric.value}</h3>
                <p className="text-muted-foreground">{metric.title}</p>
              </div>
            </div>
          ))}
        </div>
        
        <MetricsGrid />
        <RevenueChart />
      </main>
    </div>
  );
};

export default Analytics;
