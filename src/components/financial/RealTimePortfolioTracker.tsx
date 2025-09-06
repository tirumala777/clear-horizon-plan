import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  BarChart3, 
  Activity,
  Eye,
  EyeOff,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts';
import { formatINR, formatINRLarge } from '@/services/financialDataService';
import { useQuery } from '@tanstack/react-query';
import { getPortfolioHoldings } from '@/services/financialDataService';

interface RealTimeHolding {
  id: string;
  symbol: string;
  name: string;
  shares: number;
  purchasePrice: number;
  currentPrice: number;
  sector: string;
  type: 'stock' | 'mutual_fund' | 'bond' | 'crypto';
  lastUpdated: string;
}

// Mock real-time price generator
const generateRealTimePrice = (basePrice: number): number => {
  const volatility = 0.02; // 2% volatility
  const change = (Math.random() - 0.5) * 2 * volatility;
  return Math.max(basePrice * (1 + change), 1);
};

const RealTimePortfolioTracker = () => {
  const [holdings, setHoldings] = useState<RealTimeHolding[]>([]);
  const [isLiveUpdates, setIsLiveUpdates] = useState(false);
  const [showValues, setShowValues] = useState(true);
  const [performanceData, setPerformanceData] = useState<any[]>([]);

  // Fetch portfolio holdings from database
  const { data: dbHoldings = [], isLoading, refetch } = useQuery({
    queryKey: ['portfolio-holdings'],
    queryFn: getPortfolioHoldings,
    refetchInterval: isLiveUpdates ? 5000 : false, // Real-time updates when enabled
  });

  useEffect(() => {
    // Transform DB holdings to real-time holdings format
    const realTimeHoldings: RealTimeHolding[] = dbHoldings.map(holding => ({
      id: holding.id,
      symbol: holding.symbol,
      name: holding.name,
      shares: Number(holding.shares),
      purchasePrice: Number(holding.purchase_price),
      currentPrice: Number(holding.current_price || holding.purchase_price),
      sector: 'Technology', // Default sector - would come from external API
      type: 'stock' as const,
      lastUpdated: new Date().toISOString()
    }));

    // Add some mock holdings if no real data
    if (realTimeHoldings.length === 0) {
      const mockHoldings: RealTimeHolding[] = [
        {
          id: '1',
          symbol: 'RELIANCE',
          name: 'Reliance Industries',
          shares: 50,
          purchasePrice: 2400,
          currentPrice: 2520,
          sector: 'Energy',
          type: 'stock',
          lastUpdated: new Date().toISOString()
        },
        {
          id: '2',
          symbol: 'TCS',
          name: 'Tata Consultancy Services',
          shares: 25,
          purchasePrice: 3800,
          currentPrice: 3950,
          sector: 'Technology',
          type: 'stock',
          lastUpdated: new Date().toISOString()
        },
        {
          id: '3',
          symbol: 'HDFCBANK',
          name: 'HDFC Bank',
          shares: 40,
          purchasePrice: 1600,
          currentPrice: 1720,
          sector: 'Banking',
          type: 'stock',
          lastUpdated: new Date().toISOString()
        },
        {
          id: '4',
          symbol: 'INFY',
          name: 'Infosys',
          shares: 30,
          purchasePrice: 1500,
          currentPrice: 1580,
          sector: 'Technology',
          type: 'stock',
          lastUpdated: new Date().toISOString()
        }
      ];
      setHoldings(mockHoldings);
    } else {
      setHoldings(realTimeHoldings);
    }
  }, [dbHoldings]);

  useEffect(() => {
    if (!isLiveUpdates) return;

    const interval = setInterval(() => {
      setHoldings(prev => prev.map(holding => ({
        ...holding,
        currentPrice: generateRealTimePrice(holding.currentPrice),
        lastUpdated: new Date().toISOString()
      })));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [isLiveUpdates]);

  // Generate performance data for the last 24 hours
  useEffect(() => {
    const generatePerformanceData = () => {
      const data = [];
      const now = new Date();
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        const totalValue = holdings.reduce((sum, holding) => {
          const randomPrice = holding.currentPrice * (0.95 + Math.random() * 0.1);
          return sum + (holding.shares * randomPrice);
        }, 0);
        
        data.push({
          time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          value: totalValue,
          timestamp: time.getTime()
        });
      }
      return data;
    };

    setPerformanceData(generatePerformanceData());
  }, [holdings]);

  const calculatePortfolioMetrics = () => {
    const totalValue = holdings.reduce((sum, holding) => sum + (holding.shares * holding.currentPrice), 0);
    const totalCost = holdings.reduce((sum, holding) => sum + (holding.shares * holding.purchasePrice), 0);
    const totalGainLoss = totalValue - totalCost;
    const returnPercentage = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0;

    return { totalValue, totalCost, totalGainLoss, returnPercentage };
  };

  const getAssetAllocation = () => {
    const totalValue = holdings.reduce((sum, holding) => sum + (holding.shares * holding.currentPrice), 0);
    const allocationMap: { [key: string]: number } = {};
    
    holdings.forEach(holding => {
      const value = holding.shares * holding.currentPrice;
      const percentage = (value / totalValue) * 100;
      allocationMap[holding.type] = (allocationMap[holding.type] || 0) + percentage;
    });

    return Object.entries(allocationMap).map(([name, percentage]) => ({
      name: name.replace('_', ' ').toUpperCase(),
      value: percentage,
      color: getTypeColor(name)
    }));
  };

  const getSectorAllocation = () => {
    const sectorMap: { [key: string]: number } = {};
    const totalValue = holdings.reduce((sum, holding) => sum + (holding.shares * holding.currentPrice), 0);
    
    holdings.forEach(holding => {
      const value = holding.shares * holding.currentPrice;
      sectorMap[holding.sector] = (sectorMap[holding.sector] || 0) + value;
    });

    return Object.entries(sectorMap).map(([sector, value]) => ({
      sector,
      value,
      percentage: (value / totalValue) * 100
    }));
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      stock: '#3b82f6',
      mutual_fund: '#10b981',
      bond: '#f59e0b',
      crypto: '#8b5cf6'
    };
    return colors[type] || '#6b7280';
  };

  const metrics = calculatePortfolioMetrics();
  const assetAllocation = getAssetAllocation();
  const sectorAllocation = getSectorAllocation();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Real-Time Portfolio Tracker
          </h2>
          <p className="text-muted-foreground">Live market data and portfolio performance</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowValues(!showValues)}
            className="flex items-center gap-2"
          >
            {showValues ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showValues ? 'Hide Values' : 'Show Values'}
          </Button>
          
          <Button
            variant={isLiveUpdates ? "default" : "outline"}
            size="sm"
            onClick={() => setIsLiveUpdates(!isLiveUpdates)}
            className={`flex items-center gap-2 ${isLiveUpdates ? 'animate-pulse' : ''}`}
          >
            <Activity className="w-4 h-4" />
            {isLiveUpdates ? 'Live ON' : 'Enable Live'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className={`relative overflow-hidden ${isLiveUpdates ? 'ring-2 ring-green-500/20' : ''}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-primary">
                  {showValues ? formatINRLarge(metrics.totalValue) : '••••••'}
                </p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
            </div>
            {isLiveUpdates && (
              <div className="absolute top-2 right-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Cost</p>
                <p className="text-2xl font-bold">
                  {showValues ? formatINRLarge(metrics.totalCost) : '••••••'}
                </p>
              </div>
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Gain/Loss</p>
                <p className={`text-2xl font-bold ${metrics.totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {showValues ? (
                    <>
                      {metrics.totalGainLoss >= 0 ? '+' : ''}
                      {formatINRLarge(metrics.totalGainLoss)}
                    </>
                  ) : '••••••'}
                </p>
              </div>
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                {metrics.totalGainLoss >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-green-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Return %</p>
                <p className={`text-2xl font-bold ${metrics.returnPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {showValues ? (
                    <>
                      {metrics.returnPercentage >= 0 ? '+' : ''}
                      {metrics.returnPercentage.toFixed(2)}%
                    </>
                  ) : '••••'}
                </p>
              </div>
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <PieChart className="w-5 h-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Portfolio Performance (24h)
            {isLiveUpdates && (
              <Badge variant="outline" className="text-green-600 border-green-200">
                <Activity className="w-3 h-3 mr-1 animate-pulse" />
                Live
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  tickFormatter={(value) => showValues ? formatINRLarge(value) : '••••'}
                />
                <Tooltip 
                  formatter={(value: number) => [
                    showValues ? formatINR(value) : '••••••',
                    'Portfolio Value'
                  ]}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Holdings Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Individual Holdings
            {isLiveUpdates && (
              <Badge variant="outline" className="text-green-600 border-green-200">
                <Activity className="w-3 h-3 mr-1 animate-pulse" />
                Real-time prices
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Symbol</th>
                  <th className="text-left p-2">Name</th>
                  <th className="text-right p-2">Shares</th>
                  <th className="text-right p-2">Avg Cost</th>
                  <th className="text-right p-2">Current Price</th>
                  <th className="text-right p-2">Market Value</th>
                  <th className="text-right p-2">Gain/Loss</th>
                  <th className="text-right p-2">%</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding) => {
                  const marketValue = holding.shares * holding.currentPrice;
                  const costBasis = holding.shares * holding.purchasePrice;
                  const gainLoss = marketValue - costBasis;
                  const gainLossPercent = ((gainLoss / costBasis) * 100);
                  
                  return (
                    <tr key={holding.id} className="border-b hover:bg-muted/50">
                      <td className="p-2 font-mono font-bold">{holding.symbol}</td>
                      <td className="p-2">{holding.name}</td>
                      <td className="p-2 text-right">{holding.shares}</td>
                      <td className="p-2 text-right">
                        {showValues ? formatINR(holding.purchasePrice) : '••••'}
                      </td>
                      <td className="p-2 text-right font-medium">
                        {showValues ? formatINR(holding.currentPrice) : '••••'}
                        {isLiveUpdates && (
                          <div className="w-1 h-1 bg-green-500 rounded-full mx-auto mt-1 animate-pulse"></div>
                        )}
                      </td>
                      <td className="p-2 text-right font-bold">
                        {showValues ? formatINR(marketValue) : '••••••'}
                      </td>
                      <td className={`p-2 text-right font-bold ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {showValues ? (
                          <>
                            {gainLoss >= 0 ? '+' : ''}
                            {formatINR(gainLoss)}
                          </>
                        ) : '••••••'}
                      </td>
                      <td className={`p-2 text-right font-bold ${gainLossPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {showValues ? (
                          <>
                            {gainLossPercent >= 0 ? '+' : ''}
                            {gainLossPercent.toFixed(2)}%
                          </>
                        ) : '•••'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimePortfolioTracker;