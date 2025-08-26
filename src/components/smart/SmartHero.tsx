
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Play,
  TrendingUp,
  Shield,
  Zap,
  Users,
  BarChart3,
  Brain
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedBackground from "@/components/ui/animated-background";
import VideoDemo from "@/components/VideoDemo";
import { useJourneyTracking } from "@/hooks/useJourneyTracking";
import { useAuth } from "@/contexts/AuthContext";

const SmartHero = () => {
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);
  const { user } = useAuth();
  const { hasStarted, loading, startJourney } = useJourneyTracking();

  const handleGetStarted = async () => {
    if (!user) {
      // Redirect to auth if not logged in
      return;
    }

    if (!hasStarted) {
      try {
        await startJourney();
      } catch (error) {
        console.error('Error starting journey:', error);
      }
    }
  };

  const getCallToActionText = () => {
    if (loading) return "Loading...";
    if (!user) return "Get Started Free";
    if (hasStarted) return "Continue Your Journey";
    return "Start Your Journey";
  };

  const getCallToActionLink = () => {
    if (!user) return "/auth";
    if (hasStarted) return "/dashboard";
    return "/onboarding";
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <Badge variant="secondary" className="mx-auto bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/30">
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered Financial Intelligence
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Catalyst
            </span>
            <br />
            <span className="text-foreground">Your Growth Partner</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your financial data into actionable insights with our AI-powered platform. 
            From real-time analytics to personalized growth strategies, we make complex financial planning simple.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to={getCallToActionLink()}>
              <Button 
                size="lg" 
                className="group px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={handleGetStarted}
                disabled={loading}
              >
                {getCallToActionText()}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="group px-8 py-4 text-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-400/30 hover:border-blue-400/50"
              onClick={() => setIsVideoOpen(true)}
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-blue-200/20 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
                <p className="text-muted-foreground">Machine learning algorithms analyze your data to provide personalized financial recommendations and growth strategies.</p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-2xl transition-all duration-300 border-green-200/20 bg-gradient-to-br from-green-50/50 to-blue-50/50 dark:from-green-950/20 dark:to-blue-950/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-Time Analytics</h3>
                <p className="text-muted-foreground">Connect multiple data sources for comprehensive business intelligence and real-time performance tracking.</p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-2xl transition-all duration-300 border-purple-200/20 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Growth Optimization</h3>
                <p className="text-muted-foreground">Identify opportunities, optimize costs, and scale your business with data-driven insights and actionable recommendations.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <VideoDemo 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
      />
    </section>
  );
};

export default SmartHero;
