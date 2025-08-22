
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AdBanner from '@/components/advertisements/AdBanner';
import { TrendingUp, BarChart3, Target, Users, Brain, FileText, Download, Share2, ArrowRight, ArrowLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const { user, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    marketConditions: '',
    regions: '',
    financialStatement: null as File | null,
    analysisReady: false,
    shareDays: '10',
    shareEmail: 'hello@catalyst.com'
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const financialData = [
    { year: '2026', revenue: 120000, expenses: 80000, netIncome: 40000, assets: 15000, liabilities: 5000, equity: 10000 },
    { year: '2027', revenue: 140000, expenses: 85000, netIncome: 55000, assets: 20000, liabilities: 7000, equity: 13000 },
    { year: '2028', revenue: 160000, expenses: 90000, netIncome: 70000, assets: 25000, liabilities: 8000, equity: 17000 },
    { year: '2029', revenue: 180000, expenses: 95000, netIncome: 85000, assets: 30000, liabilities: 10000, equity: 20000 },
    { year: '2030', revenue: 200000, expenses: 100000, netIncome: 100000, assets: 35000, liabilities: 12000, equity: 23000 },
    { year: '2031', revenue: 220000, expenses: 160000, netIncome: 60000, assets: 40000, liabilities: 15000, equity: 25000 },
    { year: '2032', revenue: 240000, expenses: 110000, netIncome: 130000, assets: 45000, liabilities: 18000, equity: 27000 }
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Give an instruction</h2>
              <p className="text-muted-foreground text-lg">Provide required information.</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <Label htmlFor="marketConditions" className="text-lg font-medium">Market Conditions</Label>
                <Textarea
                  id="marketConditions"
                  placeholder="Energy Crisis, Interest Rate Hike Cycle"
                  value={formData.marketConditions}
                  onChange={(e) => setFormData({ ...formData, marketConditions: e.target.value })}
                  className="mt-2 bg-card border-border text-foreground"
                />
              </div>

              <div>
                <Label htmlFor="regions" className="text-lg font-medium">Regions</Label>
                <Textarea
                  id="regions"
                  placeholder="Sub Saharan Africa, Middle East and North Africa, Asia-Pacific, Latin America"
                  value={formData.regions}
                  onChange={(e) => setFormData({ ...formData, regions: e.target.value })}
                  className="mt-2 bg-card border-border text-foreground"
                />
              </div>

              <div>
                <Label htmlFor="financialStatement" className="text-lg font-medium">Financial Statement *</Label>
                <div className="mt-2 flex">
                  <Input
                    type="file"
                    id="financialStatement"
                    onChange={(e) => setFormData({ ...formData, financialStatement: e.target.files?.[0] || null })}
                    className="bg-card border-border text-foreground flex-1"
                    accept=".pdf,.xlsx,.xls,.csv"
                  />
                  <Button className="ml-2">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button 
                onClick={() => setCurrentStep(2)}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg"
                disabled={!formData.marketConditions || !formData.regions}
              >
                Continue <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Receive your analysis</h2>
              <p className="text-muted-foreground text-lg">Receive a report ready to be shared.</p>
            </div>

            <div className="max-w-6xl mx-auto">
              <Card className="bg-card border-border">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">AI Financial Forecast</CardTitle>
                  <div className="flex justify-center gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-success rounded-sm"></div>
                      <span>Revenue</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-danger rounded-sm"></div>
                      <span>Expenses</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-success rounded-sm"></div>
                      <span>Net Income</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-warning rounded-sm"></div>
                      <span>Assets</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-danger rounded-sm"></div>
                      <span>Liabilities</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-sm"></div>
                      <span>Equity</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={financialData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Line type="monotone" dataKey="revenue" stroke="hsl(var(--success))" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="expenses" stroke="hsl(var(--danger))" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="netIncome" stroke="hsl(var(--success))" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="assets" stroke="hsl(var(--warning))" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="liabilities" stroke="hsl(var(--danger))" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="equity" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-8 bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-6 h-6" />
                    Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg leading-relaxed">
                    Catalyst AI's revenue projections show a steady increase, with 
                    assets expected to double over the next 6 years. Meanwhile, 
                    liabilities are predicted to decrease, indicating a strong 
                    financial position.
                  </p>
                </CardContent>
              </Card>

              <div className="flex gap-4 mt-8">
                <Button 
                  onClick={() => setCurrentStep(1)}
                  variant="outline"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" /> Back
                </Button>
                <Button 
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Share Analysis <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Share</h2>
              <p className="text-muted-foreground text-lg">Grant access to analysis.</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <Label htmlFor="days" className="text-lg font-medium">Days *</Label>
                <Input
                  id="days"
                  type="number"
                  value={formData.shareDays}
                  onChange={(e) => setFormData({ ...formData, shareDays: e.target.value })}
                  className="mt-2 bg-card border-border text-foreground"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-lg font-medium">Email *</Label>
                <div className="flex mt-2">
                  <Input
                    id="email"
                    type="email"
                    value={formData.shareEmail}
                    onChange={(e) => setFormData({ ...formData, shareEmail: e.target.value })}
                    className="bg-card border-border text-foreground flex-1"
                  />
                  <Button className="ml-2">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="text-center py-12">
                <h3 className="text-2xl font-bold mb-4">Generative Tools</h3>
                <p className="text-muted-foreground text-lg mb-8">
                  More than 10 ai tools to perform costly and time consuming finance tasks.
                </p>

                <div className="grid gap-4 text-left">
                  {[
                    { icon: BarChart3, title: 'Balance Sheet Analysis' },
                    { icon: FileText, title: 'Cash Flow Analysis' },
                    { icon: Target, title: 'Credit Analysis' },
                    { icon: TrendingUp, title: 'Diversification Strategy' },
                    { icon: Users, title: 'Equity Research' },
                    { icon: Brain, title: 'Exchange Rate Analysis' },
                    { icon: Target, title: 'Fundraising Strategy' },
                    { icon: BarChart3, title: 'Hedging Strategy' }
                  ].map((tool, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <tool.icon className="w-5 h-5 text-primary" />
                      <span className="font-medium">{tool.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={() => setCurrentStep(2)}
                  variant="outline"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" /> Back
                </Button>
                <Button 
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Start New Analysis
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary via-primary to-secondary">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center text-white max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              <Brain className="w-4 h-4 mr-2" />
              Harnessing AI for Smarter Financial Planning
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Make Financial Data a Story Worth Telling.
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Catalyst combines the power of generative AI with financial data, 
              charts, and expert knowledge to empower your financial decision-making.
            </p>

            <div className="text-sm text-white/80 mb-8">
              Used by finance and investment teams in 3.6K enterprises.
            </div>

            <div className="text-center">
              <p className="text-lg font-semibold mb-4">How it works</p>
              <p className="text-white/90">Financial analysis and insights in three easy steps.</p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <AdBanner />
        
        <div className="mt-12">
          {renderStep()}
        </div>

        {/* Ready to get started section */}
        <div className="text-center py-20">
          <div className="inline-block bg-success text-success-foreground px-6 py-2 rounded-full text-sm font-medium mb-6">
            Join us
          </div>
          <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-muted-foreground mb-8">Create an account in seconds.</p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
            Get started
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
