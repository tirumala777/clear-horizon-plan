
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Brain, 
  Shield, 
  Users, 
  Zap, 
  Target,
  BarChart3,
  PieChart,
  LineChart,
  ArrowRight,
  CheckCircle,
  Sparkles
} from "lucide-react";

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Get intelligent recommendations and predictions to optimize your business performance.",
      benefits: ["Predictive Analytics", "Smart Recommendations", "Automated Reports"],
      color: "text-primary",
      bgColor: "bg-primary/10",
      gradient: "from-primary/20 to-primary/5"
    },
    {
      icon: TrendingUp,
      title: "Growth Analytics",
      description: "Track your business metrics with advanced analytics and beautiful visualizations.",
      benefits: ["Real-time Dashboards", "Custom KPIs", "Growth Forecasting"],
      color: "text-success",
      bgColor: "bg-success/10",
      gradient: "from-success/20 to-success/5"
    },
    {
      icon: Target,
      title: "Goal Management",
      description: "Set, track, and achieve your business goals with milestone tracking and progress insights.",
      benefits: ["SMART Goals", "Progress Tracking", "Team Alignment"],
      color: "text-warning",
      bgColor: "bg-warning/10",
      gradient: "from-warning/20 to-warning/5"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together seamlessly with shared dashboards and collaborative planning tools.",
      benefits: ["Shared Workspaces", "Team Analytics", "Role-based Access"],
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      gradient: "from-secondary/20 to-secondary/5"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption and compliance standards.",
      benefits: ["256-bit Encryption", "SOC 2 Compliant", "Regular Audits"],
      color: "text-danger",
      bgColor: "bg-danger/10",
      gradient: "from-danger/20 to-danger/5"
    },
    {
      icon: Zap,
      title: "Automation Tools",
      description: "Automate repetitive tasks and workflows to focus on growing your business.",
      benefits: ["Workflow Automation", "Smart Notifications", "Task Scheduling"],
      color: "text-primary",
      bgColor: "bg-primary/10",
      gradient: "from-primary/20 to-primary/5"
    }
  ];

  const stats = [
    { icon: BarChart3, value: "500%", label: "Average ROI Increase" },
    { icon: PieChart, value: "24/7", label: "Real-time Monitoring" },
    { icon: LineChart, value: "99.9%", label: "Uptime Guarantee" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">
            <Sparkles className="w-4 h-4 mr-2" />
            Powerful Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Scale Your Business
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From AI-powered insights to enterprise security, we've built the complete platform 
            to accelerate your business growth and success.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-card/50 backdrop-blur-sm border rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const isHovered = hoveredCard === index;
            
            return (
              <Card 
                key={index}
                className={`group cursor-pointer transition-all duration-500 hover:shadow-xl border-2 hover:border-primary/20 bg-gradient-to-br ${feature.gradient} ${
                  isHovered ? 'scale-105 shadow-2xl' : ''
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardHeader className="pb-4">
                  <div className={`w-14 h-14 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="group/btn hover:bg-primary/10 mt-4"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Interactive Feature Showcase */}
        <div className="bg-card/30 backdrop-blur-sm border rounded-3xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold">
                See Catalyst in Action
              </h3>
              <p className="text-muted-foreground text-lg">
                Experience the power of our platform with interactive demos and real-world examples.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="group">
                  Try Free Demo
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg">
                  Schedule Call
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card/80 rounded-lg p-4">
                    <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center mb-2">
                      <TrendingUp className="w-4 h-4 text-success" />
                    </div>
                    <div className="text-2xl font-bold">+45%</div>
                    <div className="text-xs text-muted-foreground">Revenue Growth</div>
                  </div>
                  <div className="bg-card/80 rounded-lg p-4">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mb-2">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-2xl font-bold">2.4K</div>
                    <div className="text-xs text-muted-foreground">Active Users</div>
                  </div>
                  <div className="bg-card/80 rounded-lg p-4">
                    <div className="w-8 h-8 bg-warning/20 rounded-lg flex items-center justify-center mb-2">
                      <Target className="w-4 h-4 text-warning" />
                    </div>
                    <div className="text-2xl font-bold">87%</div>
                    <div className="text-xs text-muted-foreground">Goals Achieved</div>
                  </div>
                  <div className="bg-card/80 rounded-lg p-4">
                    <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center mb-2">
                      <Brain className="w-4 h-4 text-secondary" />
                    </div>
                    <div className="text-2xl font-bold">1.2M</div>
                    <div className="text-xs text-muted-foreground">AI Insights</div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-primary rounded-full opacity-20 blur-xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
