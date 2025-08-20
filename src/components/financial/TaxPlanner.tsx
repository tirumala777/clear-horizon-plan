
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calculator, FileText, TrendingUp, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatINR, formatINRLarge } from '@/services/financialDataService';

const TaxPlanner = () => {
  const [taxData, setTaxData] = useState({
    income: 1500000, // 15 lakh INR
    deductions: 250000, // 2.5 lakh INR
    investments: 150000, // 1.5 lakh INR under 80C
    pf: 180000, // 1.8 lakh PF contribution
    healthInsurance: 25000 // 25k health insurance premium
  });

  const [filingStatus, setFilingStatus] = useState('individual');

  // Indian Income Tax slabs for FY 2024-25 (New Tax Regime)
  const taxBrackets = [
    { min: 0, max: 300000, rate: 0 }, // No tax up to 3 lakh
    { min: 300000, max: 700000, rate: 5 }, // 5% for 3-7 lakh
    { min: 700000, max: 1000000, rate: 10 }, // 10% for 7-10 lakh
    { min: 1000000, max: 1200000, rate: 15 }, // 15% for 10-12 lakh
    { min: 1200000, max: 1500000, rate: 20 }, // 20% for 12-15 lakh
    { min: 1500000, max: Infinity, rate: 30 } // 30% for above 15 lakh
  ];

  const calculateTax = () => {
    const taxableIncome = Math.max(0, taxData.income - taxData.deductions - taxData.investments);
    let tax = 0;

    for (const bracket of taxBrackets) {
      if (taxableIncome > bracket.min) {
        const taxableAtThisBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
        tax += taxableAtThisBracket * (bracket.rate / 100);
      }
    }

    // Add 4% Health and Education Cess on total tax
    const cess = tax * 0.04;
    const totalTax = tax + cess;

    return {
      taxableIncome,
      totalTax,
      effectiveRate: (totalTax / taxData.income) * 100,
      marginalRate: getMarginalRate(taxableIncome),
      afterTaxIncome: taxData.income - totalTax,
      totalDeductions: taxData.deductions + taxData.investments + taxData.healthInsurance
    };
  };

  const getMarginalRate = (income: number) => {
    for (const bracket of taxBrackets) {
      if (income >= bracket.min && income < bracket.max) {
        return bracket.rate;
      }
    }
    return taxBrackets[taxBrackets.length - 1].rate;
  };

  const taxResults = calculateTax();

  const taxOptimizationSuggestions = [
    {
      title: 'Maximize 80C Deductions',
      description: 'Increase investments under Section 80C to ₹1.5 lakh limit (EPF, PPF, ELSS, etc.)',
      potentialSavings: 46500, // 31% of 1.5L
      category: 'investment'
    },
    {
      title: 'Health Insurance Premium',
      description: 'Claim up to ₹25,000 for health insurance premium under Section 80D',
      potentialSavings: 7750,
      category: 'health'
    },
    {
      title: 'House Rent Allowance',
      description: 'Claim HRA exemption if you are paying rent',
      potentialSavings: 36000,
      category: 'allowance'
    },
    {
      title: 'National Pension System',
      description: 'Additional ₹50,000 deduction under Section 80CCD(1B)',
      potentialSavings: 15500,
      category: 'retirement'
    }
  ];

  const chartData = [
    { name: 'Gross Income', amount: taxData.income },
    { name: 'Deductions', amount: taxResults.totalDeductions },
    { name: 'Taxable Income', amount: taxResults.taxableIncome },
    { name: 'Tax Owed', amount: taxResults.totalTax },
    { name: 'After-Tax Income', amount: taxResults.afterTaxIncome }
  ];

  return (
    <div className="space-y-6">
      {/* Tax Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tax Owed</p>
                <p className="text-2xl font-bold text-danger">{formatINR(taxResults.totalTax)}</p>
              </div>
              <FileText className="w-8 h-8 text-danger" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Effective Rate</p>
                <p className="text-2xl font-bold">{taxResults.effectiveRate.toFixed(1)}%</p>
              </div>
              <Calculator className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Marginal Rate</p>
                <p className="text-2xl font-bold">{taxResults.marginalRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">After-Tax Income</p>
                <p className="text-2xl font-bold text-success">{formatINRLarge(taxResults.afterTaxIncome)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tax Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Tax Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Annual Income (₹)</Label>
              <Input
                type="number"
                value={taxData.income}
                onChange={(e) => setTaxData({...taxData, income: parseFloat(e.target.value) || 0})}
              />
            </div>
            
            <div>
              <Label>Standard Deduction (₹)</Label>
              <Input
                type="number"
                value={taxData.deductions}
                onChange={(e) => setTaxData({...taxData, deductions: parseFloat(e.target.value) || 0})}
              />
            </div>
            
            <div>
              <Label>80C Investments (₹)</Label>
              <Input
                type="number"
                value={taxData.investments}
                onChange={(e) => setTaxData({...taxData, investments: parseFloat(e.target.value) || 0})}
              />
              <Progress value={(taxData.investments / 150000) * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {formatINR(taxData.investments)} / ₹1,50,000 (2024-25 limit)
              </p>
            </div>
            
            <div>
              <Label>Health Insurance Premium (₹)</Label>
              <Input
                type="number"
                value={taxData.healthInsurance}
                onChange={(e) => setTaxData({...taxData, healthInsurance: parseFloat(e.target.value) || 0})}
              />
              <Progress value={(taxData.healthInsurance / 25000) * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {formatINR(taxData.healthInsurance)} / ₹25,000 (80D limit)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tax Visualization */}
        <Card>
          <CardHeader>
            <CardTitle>Tax Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip formatter={(value) => [formatINR(Number(value)), 'Amount']} />
                <Bar dataKey="amount" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tax Optimization Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-warning" />
            Tax Optimization Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {taxOptimizationSuggestions.map((suggestion, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold">{suggestion.title}</h4>
                  <Badge variant="outline">
                    Save {formatINR(suggestion.potentialSavings)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {suggestion.description}
                </p>
                <Button size="sm" variant="outline">
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tax Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Important Tax Dates (India)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded">
              <div>
                <p className="font-medium">ITR Filing Deadline</p>
                <p className="text-sm text-muted-foreground">File your Income Tax Return for FY 2023-24</p>
              </div>
              <Badge>July 31, 2024</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded">
              <div>
                <p className="font-medium">Q1 Advance Tax</p>
                <p className="text-sm text-muted-foreground">First installment for FY 2024-25</p>
              </div>
              <Badge>June 15, 2024</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded">
              <div>
                <p className="font-medium">Q2 Advance Tax</p>
                <p className="text-sm text-muted-foreground">Second installment for FY 2024-25</p>
              </div>
              <Badge>September 15, 2024</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxPlanner;
