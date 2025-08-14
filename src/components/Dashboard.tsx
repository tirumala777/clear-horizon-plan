
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  BarChart3,
  ArrowRight,
  Play,
  Sparkles
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [currentMetric, setCurrentMetric] = useState(0);

  const mockData = [
    { month: 'Jan', revenue: 45000, users: 1200 },
    { month: 'Feb', revenue: 52000, users: 1380 },
    { month: 'Mar', revenue: 48000, users: 1250 },
    { month: 'Apr', revenue: 61000, users: 1590 },
    { month: 'May', revenue: 55000, users: 1420 },
    { month: 'Jun', revenue: 67000, users: 1740 },
  ];

  const metrics = [
    { 
      title: "Monthly Revenue", 
      value: 67000, 
      change: "+25%", 
      icon: DollarSign,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    { 
      title: "Active Users", 
      value: 1740, 
      change: "+18%", 
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    { 
      title: "Conversion Rate", 
      value: 3.4, 
      change: "+12%", 
      icon: Target,
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    { 
      title: "Growth Rate", 
      value: 28, 
      change: "+8%", 
      icon: TrendingUp,
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length);
    }, 3000);

    // Animate revenue counter
    const revenueInterval = setInterval(() => {
      setAnimatedValue((prev) => {
        if (prev < 67000) {
          return prev + 2000;
        }
        return 67000;
      });
    }, 50);

    return () => {
      clearInterval(interval);
      clearInterval(revenueInterval);
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">
            <Sparkles className="w-4 h-4 mr-2" />
            Live Dashboard Preview
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your Business Dashboard{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Comes Alive
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Experience real-time analytics, beautiful visualizations, and actionable insights 
            that drive your business forward.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/onboarding">
              <Button size="lg" className="group">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="group">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Interactive Dashboard */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border-2 rounded-3xl p-8 shadow-2xl">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {metrics.map((metric, index) => {
                const IconComponent = metric.icon;
                const isActive = index === currentMetric;
                
                return (
                  <Card 
                    key={index}
                    className={`transition-all duration-500 hover:shadow-lg ${
                      isActive ? 'ring-2 ring-primary/20 scale-105' : ''
                    }`}
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {metric.title}
                      </CardTitle>
                      <div className={`w-8 h-8 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                        <IconComponent className={`w-4 h-4 ${metric.color}`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {metric.title === "Monthly Revenue" 
                          ? `$${animatedValue.toLocaleString()}`
                          : metric.value.toLocaleString()
                        }
                        {metric.title === "Conversion Rate" && "%"}
                        {metric.title === "Growth Rate" && "%"}
                      </div>
                      <p className={`text-xs ${metric.color} flex items-center mt-1`}>
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {metric.change} from last month
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Revenue Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockData}>
                        <defs>
                          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Area 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="hsl(var(--primary))" 
                          fill="url(#revenueGradient)"
                          strokeWidth={3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-success" />
                    User Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockData}>
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Line 
                          type="monotone" 
                          dataKey="users" 
                          stroke="hsl(var(--success))" 
                          strokeWidth={3}
                          dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
                <p className="text-muted-foreground mb-6">
                  Join thousands of successful businesses using Catalyst to accelerate their growth.
                </p>
                <div className="flex justify-center gap-4">
                  <Link to="/onboarding">
                    <Button size="lg">
                      Get Started Free
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg">
                    Contact Sales
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
