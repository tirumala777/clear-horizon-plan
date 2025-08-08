import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Brain } from "lucide-react";
import heroImage from "@/assets/finance-hero.jpg";

const Hero = () => {
  return (
    <section className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Take Control of Your{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Financial Future
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Smart budgeting, AI-powered investment advice, and personalized financial planning. 
                All in one beautiful platform designed to help you achieve your financial goals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                Start Your Journey
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <span className="text-sm text-muted-foreground">Smart Investing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-success" />
                </div>
                <span className="text-sm text-muted-foreground">Bank-Level Security</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                  <Brain className="w-4 h-4 text-success" />
                </div>
                <span className="text-sm text-muted-foreground">AI Insights</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="WealthWise Dashboard showing financial analytics and investment tracking" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-success rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-primary rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;