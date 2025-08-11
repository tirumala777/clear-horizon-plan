
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, TrendingDown } from 'lucide-react';

const WhatIfScenarios = () => {
  const [adSpendChange, setAdSpendChange] = useState([0]);
  const [staffingChange, setStaffingChange] = useState([0]);
  const [pricingChange, setPricingChange] = useState([0]);

  const calculateImpact = () => {
    const baseRevenue = 67000;
    const baseProfit = 27000;
    
    // Simple calculations for demo
    const revenueImpact = (adSpendChange[0] * 0.8) + (pricingChange[0] * 1.2);
    const profitImpact = revenueImpact - (staffingChange[0] * 0.5) - (adSpendChange[0] * 0.3);
    
    return {
      newRevenue: baseRevenue + (baseRevenue * revenueImpact / 100),
      newProfit: baseProfit + (baseProfit * profitImpact / 100),
      revenueChange: revenueImpact,
      profitChange: profitImpact
    };
  };

  const impact = calculateImpact();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calculator className="h-5 w-5 text-primary" />
          <span>What-If Scenario Simulator</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-medium">Ad Spend Change</label>
            <Slider
              value={adSpendChange}
              onValueChange={setAdSpendChange}
              min={-50}
              max={50}
              step={5}
              className="w-full"
            />
            <div className="text-center text-sm text-muted-foreground">
              {adSpendChange[0] > 0 ? '+' : ''}{adSpendChange[0]}%
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Staffing Change</label>
            <Slider
              value={staffingChange}
              onValueChange={setStaffingChange}
              min={-30}
              max={50}
              step={5}
              className="w-full"
            />
            <div className="text-center text-sm text-muted-foreground">
              {staffingChange[0] > 0 ? '+' : ''}{staffingChange[0]}%
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Pricing Change</label>
            <Slider
              value={pricingChange}
              onValueChange={setPricingChange}
              min={-25}
              max={25}
              step={2}
              className="w-full"
            />
            <div className="text-center text-sm text-muted-foreground">
              {pricingChange[0] > 0 ? '+' : ''}{pricingChange[0]}%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-muted/50 rounded-lg">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Projected Revenue</span>
              <div className="flex items-center space-x-2">
                {impact.revenueChange > 0 ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : impact.revenueChange < 0 ? (
                  <TrendingDown className="h-4 w-4 text-danger" />
                ) : null}
                <Badge variant={impact.revenueChange > 0 ? 'default' : impact.revenueChange < 0 ? 'destructive' : 'secondary'}>
                  {impact.revenueChange > 0 ? '+' : ''}{impact.revenueChange.toFixed(1)}%
                </Badge>
              </div>
            </div>
            <p className="text-2xl font-bold">
              ${impact.newRevenue.toLocaleString()}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Projected Profit</span>
              <div className="flex items-center space-x-2">
                {impact.profitChange > 0 ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : impact.profitChange < 0 ? (
                  <TrendingDown className="h-4 w-4 text-danger" />
                ) : null}
                <Badge variant={impact.profitChange > 0 ? 'default' : impact.profitChange < 0 ? 'destructive' : 'secondary'}>
                  {impact.profitChange > 0 ? '+' : ''}{impact.profitChange.toFixed(1)}%
                </Badge>
              </div>
            </div>
            <p className="text-2xl font-bold">
              ${impact.newProfit.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex space-x-3">
          <Button>Save Scenario</Button>
          <Button variant="outline">Generate Report</Button>
          <Button variant="ghost">Reset</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatIfScenarios;
