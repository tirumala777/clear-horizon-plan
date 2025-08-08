import { TrendingUp } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">WealthWise</span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Empowering your financial future with intelligent budgeting, investment tracking, and AI-powered insights.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Product</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-fast">Features</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-fast">Pricing</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-fast">Security</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-fast">API</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Company</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-fast">About</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-fast">Blog</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-fast">Careers</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-fast">Contact</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Support</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-fast">Help Center</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-fast">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-fast">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-fast">Status</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2024 WealthWise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;