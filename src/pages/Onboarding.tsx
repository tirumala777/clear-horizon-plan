
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Building, Target, DollarSign, Upload } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    monthlyRevenue: '',
    goals: '',
    challenges: ''
  });

  const steps = [
    { id: 1, title: 'Company Info', icon: Building },
    { id: 2, title: 'Financial Data', icon: DollarSign },
    { id: 3, title: 'Goals & Vision', icon: Target },
    { id: 4, title: 'Data Integration', icon: Upload }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding and redirect to dashboard
      navigate('/dashboard');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="Enter your company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, companySize: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-500">201-500 employees</SelectItem>
                  <SelectItem value="500+">500+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="monthlyRevenue">Monthly Revenue (USD)</Label>
              <Input
                id="monthlyRevenue"
                type="number"
                value={formData.monthlyRevenue}
                onChange={(e) => setFormData({ ...formData, monthlyRevenue: e.target.value })}
                placeholder="e.g., 50000"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <h4 className="font-semibold mb-2">QuickBooks</h4>
                <p className="text-sm text-muted-foreground mb-3">Connect your accounting data</p>
                <Button variant="outline" size="sm">Connect</Button>
              </Card>
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Bank Account</h4>
                <p className="text-sm text-muted-foreground mb-3">Sync transaction data</p>
                <Button variant="outline" size="sm">Connect</Button>
              </Card>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="goals">Primary Business Goals</Label>
              <Textarea
                id="goals"
                value={formData.goals}
                onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                placeholder="e.g., Reach $100K monthly revenue, expand to new markets..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="challenges">Current Challenges</Label>
              <Textarea
                id="challenges"
                value={formData.challenges}
                onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                placeholder="e.g., High customer acquisition costs, cash flow management..."
                rows={4}
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 text-center">
            <CheckCircle className="w-16 h-16 text-success mx-auto" />
            <h3 className="text-2xl font-bold">You're All Set!</h3>
            <p className="text-muted-foreground">
              Your Catalyst workspace is ready. Our AI is already analyzing your data to provide personalized insights.
            </p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold">Dashboard Ready</h4>
                <p className="text-muted-foreground">Personalized for your business</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold">AI Insights</h4>
                <p className="text-muted-foreground">Generating recommendations</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold">Growth Tracking</h4>
                <p className="text-muted-foreground">Monitoring your progress</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-4">Welcome to Catalyst</h1>
          <p className="text-muted-foreground text-center">Let's set up your business growth platform</p>
        </div>

        <div className="mb-8">
          <Progress value={(currentStep / 4) * 100} className="h-2" />
          <div className="flex justify-between mt-4">
            {steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.id <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-sm mt-2">{step.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Step {currentStep} of 4: {steps[currentStep - 1].title}</CardTitle>
          </CardHeader>
          <CardContent>
            {renderStep()}
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              <Button onClick={handleNext}>
                {currentStep === 4 ? 'Get Started' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
