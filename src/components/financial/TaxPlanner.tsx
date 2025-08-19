
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calculator, FileText, TrendingUp, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TaxPlanner = () => {
  const [taxData, setTaxData] = useState({
    income: 75000,
    deductions: 12000,
    investments: 5000,
    retirement401k: 6000,
    healthSavings: 3000
  });

  const [filingStatus, setFilingStatus] = useState('single');

  // Tax brackets for 2024 (simplified)
  const taxBrackets = [
    { min: 0, max: 11000, rate: 10 },
    { min: 11000, max: 44725, rate: 12 },
    { min: 44725, max: 95375, rate: 22 },
    { min: 95375, max: 182050, rate: 24 },
    { min: 182050, max: 231250, rate: 32 },
    { min: 231250, max: 578125, rate: 35 },
    { min: 578125, max: Infinity, rate: 37 }
  ];

  const calculateTax = () => {
    const taxableIncome = Math.max(0, taxData.income - taxData.deductions - taxData.retirement401k);
    let tax = 0;

    for (const bracket of taxBrackets) {
      if (taxableIncome > bracket.min) {
        const taxableAtThisBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
        tax += taxableAtThisBracket * (bracket.rate / 100);
      }
    }

    return {
      taxableIncome,
      totalTax: tax,
      effectiveRate: (tax / taxData.income) * 100,
      marginalRate: getMarginalRate(taxableIncome),
      afterTaxIncome: taxData.income - tax,
      totalDeductions: taxData.deductions + taxData.retirement401k + taxData.healthSavings
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
      title: 'Maximize 401(k) Contributions',
      description: 'Increase your 401(k) contribution to $23,000 (2024 limit)',
      potentialSavings: 5520,
      category: 'retirement'
    },
    {
      title: 'Health Savings Account',
      description: 'Maximize HSA contributions to $4,150 for individuals',
      potentialSavings: 913,
      category: 'health'
    },
    {
      title: 'Tax-Loss Harvesting',
      description: 'Offset capital gains with investment losses',
      potentialSavings: 660,
      category: 'investment'
    },
    {
      title: 'Itemize Deductions',
      description: 'Consider itemizing if total exceeds standard deduction',
      potentialSavings: 840,
      category: 'deduction'
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
                <p className="text-2xl font-bold text-danger">${taxResults.totalTax.toLocaleString()}</p>
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
                <p className="text-2xl font-bold text-success">${taxResults.afterTaxIncome.toLocaleString()}</p>
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
              <Label>Annual Income</Label>
              <Input
                type="number"
                value={taxData.income}
                onChange={(e) => setTaxData({...taxData, income: parseFloat(e.target.value) || 0})}
              />
            </div>
            
            <div>
              <Label>Standard/Itemized Deductions</Label>
              <Input
                type="number"
                value={taxData.deductions}
                onChange={(e) => setTaxData({...taxData, deductions: parseFloat(e.target.value) || 0})}
              />
            </div>
            
            <div>
              <Label>401(k) Contributions</Label>
              <Input
                type="number"
                value={taxData.retirement401k}
                onChange={(e) => setTaxData({...taxData, retirement401k: parseFloat(e.target.value) || 0})}
              />
              <Progress value={(taxData.retirement401k / 23000) * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                ${taxData.retirement401k} / $23,000 (2024 limit)
              </p>
            </div>
            
            <div>
              <Label>HSA Contributions</Label>
              <Input
                type="number"
                value={taxData.healthSavings}
                onChange={(e) => setTaxData({...taxData, healthSavings: parseFloat(e.target.value) || 0})}
              />
              <Progress value={(taxData.healthSavings / 4150) * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                ${taxData.healthSavings} / $4,150 (2024 limit)
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
                <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Amount']} />
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
                    Save ${suggestion.potentialSavings}
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
          <CardTitle>Important Tax Dates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded">
              <div>
                <p className="font-medium">Tax Filing Deadline</p>
                <p className="text-sm text-muted-foreground">File your 2023 tax return</p>
              </div>
              <Badge>April 15, 2024</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded">
              <div>
                <p className="font-medium">Q1 Estimated Tax Payment</p>
                <p className="text-sm text-muted-foreground">First quarter payment for 2024</p>
              </div>
              <Badge>April 15, 2024</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded">
              <div>
                <p className="font-medium">Q2 Estimated Tax Payment</p>
                <p className="text-sm text-muted-foreground">Second quarter payment for 2024</p>
              </div>
              <Badge>June 17, 2024</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxPlanner;
