import FeatureCard from "./FeatureCard";
import { 
  PiggyBank, 
  TrendingUp, 
  Target, 
  Brain, 
  Shield, 
  Smartphone,
  BarChart3,
  CreditCard 
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: PiggyBank,
      title: "Smart Budgeting",
      description: "Automated expense tracking with intelligent categorization and real-time budget monitoring."
    },
    {
      icon: TrendingUp,
      title: "Investment Tracking",
      description: "Portfolio analytics with performance insights and AI-powered rebalancing suggestions."
    },
    {
      icon: Target,
      title: "Goal Planning",
      description: "Set financial milestones and get personalized savings strategies to achieve them faster."
    },
    {
      icon: Brain,
      title: "AI Insights",
      description: "Advanced analytics that identify spending patterns and provide actionable financial advice."
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "End-to-end encryption and 2FA protection for all your sensitive financial data."
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Beautiful responsive design that works seamlessly across all your devices."
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Live dashboards with instant updates and comprehensive financial reporting."
    },
    {
      icon: CreditCard,
      title: "Bank Sync",
      description: "Secure connection to 10,000+ banks for automatic transaction import and categorization."
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            Everything You Need to{" "}
            <span className="bg-gradient-success bg-clip-text text-transparent">
              Succeed Financially
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive suite of tools empowers you to take control of your finances with confidence and intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;