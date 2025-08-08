import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  PieChart,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const Dashboard = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            Your Financial Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get a complete overview of your financial health at a glance
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Top Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 bg-gradient-card shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Balance</p>
                  <p className="text-2xl font-bold text-foreground">$24,500</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="w-4 h-4 text-success" />
                    <span className="text-sm text-success">+12.5%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-success" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Spending</p>
                  <p className="text-2xl font-bold text-foreground">$3,240</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowDownRight className="w-4 h-4 text-danger" />
                    <span className="text-sm text-danger">+8.2%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-danger/10 rounded-xl flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-danger" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Investments</p>
                  <p className="text-2xl font-bold text-foreground">$18,750</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="w-4 h-4 text-success" />
                    <span className="text-sm text-success">+15.3%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Savings Goal</p>
                  <p className="text-2xl font-bold text-foreground">68%</p>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div className="bg-gradient-success h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </Card>
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Spending Breakdown */}
            <Card className="p-6 lg:col-span-2 bg-gradient-card shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Spending Breakdown</h3>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
              <div className="space-y-4">
                {[
                  { category: "Food & Dining", amount: "$842", percentage: 26, color: "bg-primary" },
                  { category: "Transportation", amount: "$650", percentage: 20, color: "bg-secondary" },
                  { category: "Shopping", amount: "$520", percentage: 16, color: "bg-warning" },
                  { category: "Entertainment", amount: "$380", percentage: 12, color: "bg-success" },
                  { category: "Bills & Utilities", amount: "$848", percentage: 26, color: "bg-danger" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-sm font-medium">{item.category}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold w-16 text-right">{item.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Goals Progress */}
            <Card className="p-6 bg-gradient-card shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Goals Progress</h3>
                <PieChart className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="space-y-6">
                {[
                  { goal: "Emergency Fund", current: 8500, target: 12000, color: "bg-success" },
                  { goal: "Vacation", current: 2300, target: 5000, color: "bg-warning" },
                  { goal: "New Car", current: 15000, target: 25000, color: "bg-primary" }
                ].map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{goal.goal}</span>
                      <span className="text-muted-foreground">
                        ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${goal.color}`}
                        style={{ width: `${(goal.current / goal.target) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {Math.round((goal.current / goal.target) * 100)}% complete
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;