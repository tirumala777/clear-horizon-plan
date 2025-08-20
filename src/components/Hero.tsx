
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <Badge className="mb-6 animate-pulse" variant="outline">
          <Sparkles className="w-4 h-4 mr-2" />
          #1 Business Growth Platform
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
          Take Control of Your
          <br />
          Business Growth
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
          Smart analytics, AI-powered insights, and personalized growth strategies. 
          Transform your business with data-driven decisions and achieve unprecedented growth.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/onboarding">
            <Button size="lg" className="group text-lg px-8 py-6">
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="group text-lg px-8 py-6">
            <Play className="w-5 h-5 mr-2" />
            Watch Demo
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">₹25Cr+</div>
            <div className="text-muted-foreground">Revenue Tracked</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border">
            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-success" />
            </div>
            <div className="text-3xl font-bold text-success mb-2">10K+</div>
            <div className="text-muted-foreground">Businesses Accelerated</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-secondary" />
            </div>
            <div className="text-3xl font-bold text-secondary mb-2">40%</div>
            <div className="text-muted-foreground">Average Growth Increase</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
