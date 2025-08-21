import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Play,
  Sparkles,
  TrendingUp,
  Users,
  Target,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6" variant="outline">
            <Sparkles className="w-4 h-4 mr-2" />
            Advanced Financial Analytics Platform
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Your Financial Future Starts Here
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Take control with smart budgeting, AI-powered investment advice, and 
            personalized financial planning. Build wealth with confidence using our 
            comprehensive platform designed for Indian investors.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/onboarding">
              <Button size="lg" className="group px-8 py-4 text-lg">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/3d-dashboard">
              <Button variant="outline" size="lg" className="group px-8 py-4 text-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-400/30 hover:border-blue-400/50">
                <Play className="w-5 h-5 mr-2" />
                Explore 3D Analytics
              </Button>
            </Link>
          </div>

          {/* Key Metrics Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
                <div className="text-2xl font-bold mb-2">₹25,00,000+</div>
                <div className="text-muted-foreground">Average Portfolio Value</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold mb-2">50,000+</div>
                <div className="text-muted-foreground">Active Investors</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-warning" />
                </div>
                <div className="text-2xl font-bold mb-2">18.5%</div>
                <div className="text-muted-foreground">Average Annual Returns</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 animate-bounce delay-300">
        <div className="w-4 h-4 bg-primary/30 rounded-full"></div>
      </div>
      <div className="absolute top-1/3 right-16 animate-bounce delay-700">
        <div className="w-3 h-3 bg-secondary/30 rounded-full"></div>
      </div>
      <div className="absolute bottom-1/4 left-1/4 animate-bounce delay-500">
        <div className="w-2 h-2 bg-success/30 rounded-full"></div>
      </div>
    </section>
  );
};

export default Hero;
