import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Building, Target, DollarSign, Upload } from 'lucide-react';
import CompanyInfoStep from '@/components/onboarding/CompanyInfoStep';
import FinancialDataStep from '@/components/onboarding/FinancialDataStep';
import GoalsVisionStep from '@/components/onboarding/GoalsVisionStep';
import CompletionStep from '@/components/onboarding/CompletionStep';
import AdBanner from '@/components/advertisements/AdBanner';
import ReferralStep from '@/components/onboarding/ReferralStep';

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    monthlyRevenue: '',
    goals: '',
    challenges: '',
    referralCode: ''
  });

  const steps = [
    { id: 1, title: 'Referral Code', icon: Building },
    { id: 2, title: 'Company Info', icon: Building },
    { id: 3, title: 'Financial Data', icon: DollarSign },
    { id: 4, title: 'Goals & Vision', icon: Target },
    { id: 5, title: 'Complete Setup', icon: Upload }
  ];

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data });
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
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
        return <ReferralStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <CompanyInfoStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <FinancialDataStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <GoalsVisionStep formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <CompletionStep />;
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

        <AdBanner />

        <div className="mb-8">
          <Progress value={(currentStep / 5) * 100} className="h-2" />
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
            <CardTitle>Step {currentStep} of 5: {steps[currentStep - 1].title}</CardTitle>
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
                {currentStep === 5 ? 'Get Started' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
