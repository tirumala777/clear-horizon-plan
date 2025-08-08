import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: string;
}

const FeatureCard = ({ icon: Icon, title, description, gradient = "bg-gradient-card" }: FeatureCardProps) => {
  return (
    <div className="group relative">
      <div className={`${gradient} rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-border group-hover:-translate-y-1`}>
        <div className="space-y-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-card-foreground">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;