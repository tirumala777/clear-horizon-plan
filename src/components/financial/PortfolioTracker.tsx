
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Plus, Target, PieChart } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface Holding {
  id: string;
  symbol: string;
  name: string;
  shares: number;
  currentPrice: number;
  purchasePrice: number;
  sector: string;
  type: 'stock' | 'etf' | 'bond' | 'crypto';
}

const PortfolioTracker = () => {
  const [holdings, setHoldings] = useState<Holding[]>([
    {
      id: '1',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      shares: 50,
      currentPrice: 175.50,
      purchasePrice: 165.00,
      sector: 'Technology',
      type: 'stock'
    },
    {
      id: '2',
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      shares: 25,
      currentPrice: 245.80,
      purchasePrice: 220.00,
      sector: 'Technology',
      type: 'stock'
    },
    {
      id: '3',
      symbol: 'VOO',
      name: 'Vanguard S&P 500 ETF',
      shares: 100,
      currentPrice: 410.30,
      purchasePrice: 395.00,
      sector: 'Diversified',
      type: 'etf'
    },
    {
      id: '4',
      symbol: 'BND',
      name: 'Vanguard Bond Index',
      shares: 150,
      currentPrice: 78.90,
      purchasePrice: 82.00,
      sector: 'Bonds',
      type: 'bond'
    }
  ]);

  const calculatePortfolioMetrics = () => {
    const totalValue = holdings.reduce((sum, holding) => sum + (holding.shares * holding.currentPrice), 0);
    const totalCost = holdings.reduce((sum, holding) => sum + (holding.shares * holding.purchasePrice), 0);
    const totalGainLoss = totalValue - totalCost;
    const totalGainLossPercent = ((totalGainLoss / totalCost) * 100);

    return {
      totalValue,
      totalCost,
      totalGainLoss,
      totalGainLossPercent
    };
  };

  const getAssetAllocation = () => {
    const totalValue = holdings.reduce((sum, holding) => sum + (holding.shares * holding.currentPrice), 0);
    
    const allocation = holdings.reduce((acc, holding) => {
      const value = holding.shares * holding.currentPrice;
      const percentage = (value / totalValue) * 100;
      
      if (acc[holding.type]) {
        acc[holding.type] += percentage;
      } else {
        acc[holding.type] = percentage;
      }
      
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(allocation).map(([type, percentage], index) => ({
      name: type.toUpperCase(),
      value: percentage,
      color: `hsl(${index * 60}, 70%, 50%)`
    }));
  };

  const getSectorAllocation = () => {
    const totalValue = holdings.reduce((sum, holding) => sum + (holding.shares * holding.currentPrice), 0);
    
    const allocation = holdings.reduce((acc, holding) => {
      const value = holding.shares * holding.currentPrice;
      const percentage = (value / totalValue) * 100;
      
      if (acc[holding.sector]) {
        acc[holding.sector] += percentage;
      } else {
        acc[holding.sector] = percentage;
      }
      
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(allocation).map(([sector, percentage], index) => ({
      name: sector,
      value: percentage,
      color: `hsl(${index * 90}, 60%, 55%)`
    }));
  };

  const metrics = calculatePortfolioMetrics();
  const assetAllocation = getAssetAllocation();
  const sectorAllocation = getSectorAllocation();

  // Mock performance data
  const performanceData = [
    { date: '2024-01', value: 85000 },
    { date: '2024-02', value: 87500 },
    { date: '2024-03', value: 86200 },
    { date: '2024-04', value: 89800 },
    { date: '2024-05', value: 92100 },
    { date: '2024-06', value: metrics.totalValue }
  ];

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">${metrics.totalValue.toLocaleString()}</p>
              </div>
              <PieChart className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Cost</p>
                <p className="text-2xl font-bold">${metrics.totalCost.toLocaleString()}</p>
              </div>
              <Target className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Gain/Loss</p>
                <p className={`text-2xl font-bold ${metrics.totalGainLoss >= 0 ? 'text-success' : 'text-danger'}`}>
                  ${metrics.totalGainLoss.toLocaleString()}
                </p>
              </div>
              {metrics.totalGainLoss >= 0 ? 
                <TrendingUp className="w-8 h-8 text-success" /> : 
                <TrendingDown className="w-8 h-8 text-danger" />
              }
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Return %</p>
                <p className={`text-2xl font-bold ${metrics.totalGainLossPercent >= 0 ? 'text-success' : 'text-danger'}`}>
                  {metrics.totalGainLossPercent.toFixed(2)}%
                </p>
              </div>
              {metrics.totalGainLossPercent >= 0 ? 
                <TrendingUp className="w-8 h-8 text-success" /> : 
                <TrendingDown className="w-8 h-8 text-danger" />
              }
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Value']} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Asset Allocation */}
        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RechartsPieChart>
                <Pie
                  data={assetAllocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {assetAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {assetAllocation.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Holdings Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Holdings</CardTitle>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Holding
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {holdings.map(holding => {
              const currentValue = holding.shares * holding.currentPrice;
              const costBasis = holding.shares * holding.purchasePrice;
              const gainLoss = currentValue - costBasis;
              const gainLossPercent = ((gainLoss / costBasis) * 100);

              return (
                <div key={holding.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div>
                        <h4 className="font-semibold">{holding.symbol}</h4>
                        <p className="text-sm text-muted-foreground">{holding.name}</p>
                      </div>
                      <Badge variant="outline">{holding.type.toUpperCase()}</Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${currentValue.toLocaleString()}</p>
                      <div className="flex items-center gap-1">
                        {gainLoss >= 0 ? 
                          <TrendingUp className="w-3 h-3 text-success" /> : 
                          <TrendingDown className="w-3 h-3 text-danger" />
                        }
                        <span className={`text-sm ${gainLoss >= 0 ? 'text-success' : 'text-danger'}`}>
                          {gainLossPercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Shares</p>
                      <p className="font-medium">{holding.shares}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Current Price</p>
                      <p className="font-medium">${holding.currentPrice}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Purchase Price</p>
                      <p className="font-medium">${holding.purchasePrice}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Gain/Loss</p>
                      <p className={`font-medium ${gainLoss >= 0 ? 'text-success' : 'text-danger'}`}>
                        ${gainLoss.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Sector</p>
                      <p className="font-medium">{holding.sector}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Sector Allocation */}
      <Card>
        <CardHeader>
          <CardTitle>Sector Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sectorAllocation.map((sector, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{sector.name}</span>
                  <span className="text-sm">{sector.value.toFixed(1)}%</span>
                </div>
                <Progress value={sector.value} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioTracker;
