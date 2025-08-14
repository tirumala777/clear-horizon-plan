
import React from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Brain, Play, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import heroImage from "@/assets/finance-hero.jpg";

const Hero = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    { label: "Active Users", value: "50,000+", icon: TrendingUp },
    { label: "Revenue Tracked", value: "$2.5B+", icon: Shield },
    { label: "AI Insights", value: "1M+", icon: Brain }
  ];

  const testimonials = [
    { name: "Sarah Chen", role: "CEO, TechStart", text: "Increased our revenue by 40% in 6 months!" },
    { name: "Mike Rodriguez", role: "Founder, GrowthCo", text: "The AI insights are game-changing for our business." },
    { name: "Emily Watson", role: "CFO, ScaleUp", text: "Best financial platform we've ever used." }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getCurrentStatIcon = () => {
    const IconComponent = stats[currentStat].icon;
    return <IconComponent className="w-6 h-6 text-primary" />;
  };

  return (
    <section className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-success rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-primary rounded-full opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-warning/20 rounded-full animate-bounce delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-success/10 rounded-full text-success text-sm font-medium animate-fade-in">
                <Star className="w-4 h-4 mr-2" />
                #1 Business Growth Platform
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Take Control of Your{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent animate-pulse">
                  Business Growth
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Smart analytics, AI-powered insights, and personalized growth strategies. 
                Transform your business with data-driven decisions and achieve unprecedented growth.
              </p>
            </div>

            {/* Dynamic Stats */}
            <div className="bg-card/50 backdrop-blur-sm border rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-primary">
                    {stats[currentStat].value}
                  </p>
                  <p className="text-muted-foreground">{stats[currentStat].label}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  {getCurrentStatIcon()}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/onboarding">
                <Button size="lg" className="text-lg px-8 py-6 group hover:scale-105 transition-transform">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 group hover:bg-muted/50">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Smart Analytics</span>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield className="w-4 h-4 text-success" />
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Secure Platform</span>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Brain className="w-4 h-4 text-success" />
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">AI Powered</span>
              </div>
            </div>
          </div>

          <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            {/* Interactive Dashboard Preview */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img 
                src={heroImage} 
                alt="Catalyst Dashboard showing business analytics and growth tracking" 
                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent group-hover:from-primary/20 transition-all duration-300"></div>
              
              {/* Floating Elements */}
              <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 animate-bounce">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium">Live Data</span>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3">
                <div className="text-xs text-muted-foreground">Monthly Growth</div>
                <div className="text-lg font-bold text-success">+32.5%</div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-success rounded-full opacity-20 blur-xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-primary rounded-full opacity-20 blur-xl animate-pulse delay-1000"></div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-8">Trusted by growing businesses worldwide</p>
          <div className="flex justify-center overflow-hidden">
            <div className="flex gap-8 animate-pulse">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 min-w-80 hover:shadow-lg transition-all duration-300">
                  <p className="text-sm italic mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
