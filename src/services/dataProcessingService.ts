import { supabase } from '@/integrations/supabase/client';
import { BusinessMetric, MLInsight } from './businessIntelligenceService';

export interface DatasetRow {
  [key: string]: string | number | Date;
}

export interface ProcessedDataset {
  id: string;
  name: string;
  columns: string[];
  rows: DatasetRow[];
  metadata: {
    rowCount: number;
    columnCount: number;
    processedAt: Date;
    fileSize: number;
  };
}

export interface MLPrediction {
  type: 'trend' | 'anomaly' | 'forecast' | 'classification';
  confidence: number;
  value: number | string;
  description: string;
}

// File parsing utilities
export const parseCSV = (content: string): DatasetRow[] => {
  const lines = content.split('\n').filter(line => line.trim());
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  const rows: DatasetRow[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
    const row: DatasetRow = {};
    
    headers.forEach((header, index) => {
      const value = values[index] || '';
      // Try to parse as number
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && value !== '') {
        row[header] = numValue;
      } else if (value.match(/^\d{4}-\d{2}-\d{2}/)) {
        // Try to parse as date
        row[header] = new Date(value);
      } else {
        row[header] = value;
      }
    });
    
    rows.push(row);
  }
  
  return rows;
};

// ML-powered data analysis
export const analyzeDataWithML = (dataset: ProcessedDataset): MLPrediction[] => {
  const predictions: MLPrediction[] = [];
  const { rows, columns } = dataset;
  
  // Revenue trend analysis
  const revenueColumn = columns.find(col => 
    col.toLowerCase().includes('revenue') || 
    col.toLowerCase().includes('income') || 
    col.toLowerCase().includes('sales')
  );
  
  if (revenueColumn) {
    const revenueData = rows
      .map(row => typeof row[revenueColumn] === 'number' ? row[revenueColumn] as number : 0)
      .filter(val => val > 0);
    
    if (revenueData.length > 2) {
      const trend = calculateTrend(revenueData);
      predictions.push({
        type: 'trend',
        confidence: 0.85,
        value: trend.slope,
        description: trend.slope > 0 
          ? `Revenue showing upward trend of ${(trend.slope * 100).toFixed(1)}% per period`
          : `Revenue showing downward trend of ${(Math.abs(trend.slope) * 100).toFixed(1)}% per period`
      });
    }
  }
  
  // Expense analysis
  const expenseColumn = columns.find(col =>
    col.toLowerCase().includes('expense') ||
    col.toLowerCase().includes('cost') ||
    col.toLowerCase().includes('expenditure')
  );
  
  if (expenseColumn && revenueColumn) {
    const expenses = rows.map(row => typeof row[expenseColumn] === 'number' ? row[expenseColumn] as number : 0);
    const revenues = rows.map(row => typeof row[revenueColumn] === 'number' ? row[revenueColumn] as number : 0);
    
    const avgExpenseRatio = expenses.reduce((sum, exp, i) => {
      if (revenues[i] > 0) return sum + (exp / revenues[i]);
      return sum;
    }, 0) / expenses.length;
    
    predictions.push({
      type: 'classification',
      confidence: 0.78,
      value: avgExpenseRatio,
      description: avgExpenseRatio > 0.8 
        ? `High expense ratio detected (${(avgExpenseRatio * 100).toFixed(1)}%). Cost optimization recommended.`
        : `Healthy expense ratio (${(avgExpenseRatio * 100).toFixed(1)}%).`
    });
  }
  
  // Anomaly detection
  const numericColumns = columns.filter(col => 
    rows.some(row => typeof row[col] === 'number')
  );
  
  numericColumns.forEach(col => {
    const values = rows
      .map(row => typeof row[col] === 'number' ? row[col] as number : 0)
      .filter(val => val > 0);
    
    if (values.length > 5) {
      const anomalies = detectAnomalies(values);
      if (anomalies.length > 0) {
        predictions.push({
          type: 'anomaly',
          confidence: 0.72,
          value: anomalies.length,
          description: `${anomalies.length} anomalies detected in ${col}. Values: ${anomalies.join(', ')}`
        });
      }
    }
  });
  
  return predictions;
};

// Statistical functions
const calculateTrend = (data: number[]) => {
  const n = data.length;
  const x = Array.from({ length: n }, (_, i) => i);
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = data.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * data[i], 0);
  const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  
  return { slope, intercept };
};

const detectAnomalies = (data: number[]): number[] => {
  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  const stdDev = Math.sqrt(data.reduce((sum, val) => sum + (val - mean) ** 2, 0) / data.length);
  const threshold = 2 * stdDev;
  
  return data.filter(val => Math.abs(val - mean) > threshold);
};

// Convert ML predictions to business insights
export const convertToBusinessInsights = async (
  predictions: MLPrediction[], 
  datasetName: string
): Promise<MLInsight[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  
  const insights = predictions.map((prediction) => ({
    user_id: user.id,
    insight_type: prediction.type,
    title: `ML Analysis: ${prediction.type.charAt(0).toUpperCase() + prediction.type.slice(1)} Detection`,
    description: prediction.description,
    confidence_score: prediction.confidence,
    impact_level: prediction.confidence > 0.8 ? 'high' : prediction.confidence > 0.6 ? 'medium' : 'low',
    recommendation: generateRecommendation(prediction),
    data_sources: [datasetName],
    model_version: 'v1.0',
    action_taken: false
  }));
  
  // Save insights to database
  const { data, error } = await supabase
    .from('ml_insights')
    .insert(insights)
    .select();
  
  if (error) {
    console.error('Error saving ML insights:', error);
    return [];
  }
  
  return data as MLInsight[];
};

const generateRecommendation = (prediction: MLPrediction): string => {
  switch (prediction.type) {
    case 'trend':
      return prediction.value as number > 0 
        ? 'Continue current strategies and consider scaling successful initiatives.'
        : 'Investigate causes of decline and implement corrective measures immediately.';
    
    case 'anomaly':
      return 'Review data quality and investigate unusual patterns. Consider data validation processes.';
    
    case 'classification':
      return prediction.value as number > 0.8 
        ? 'Focus on cost reduction strategies and operational efficiency improvements.'
        : 'Maintain current operational efficiency while exploring growth opportunities.';
    
    case 'forecast':
      return 'Use this forecast data for strategic planning and resource allocation decisions.';
    
    default:
      return 'Monitor this metric closely and consider additional data collection for better insights.';
  }
};

// Generate business metrics from dataset
export const generateBusinessMetricsFromDataset = async (dataset: ProcessedDataset): Promise<BusinessMetric[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  
  const { rows, columns } = dataset;
  const metrics: Array<{
    user_id: string;
    metric_date: string;
    revenue?: number;
    expenses?: number;
    profit_margin?: number;
    cash_flow?: number;
  }> = [];
  
  // Group data by date if date column exists
  const dateColumn = columns.find(col => 
    col.toLowerCase().includes('date') || 
    col.toLowerCase().includes('time') ||
    col.toLowerCase().includes('day') ||
    col.toLowerCase().includes('month')
  );
  
  if (dateColumn) {
    const groupedData = new Map<string, DatasetRow[]>();
    
    rows.forEach(row => {
      const dateValue = row[dateColumn];
      let dateKey: string;
      
      if (dateValue instanceof Date) {
        dateKey = dateValue.toISOString().split('T')[0];
      } else {
        dateKey = new Date().toISOString().split('T')[0];
      }
      
      if (!groupedData.has(dateKey)) {
        groupedData.set(dateKey, []);
      }
      groupedData.get(dateKey)?.push(row);
    });
    
    // Create metrics for each date group
    for (const [date, dateRows] of groupedData) {
      const metric = {
        user_id: user.id,
        metric_date: date
      } as any;
      
      // Calculate revenue
      const revenueColumn = columns.find(col => 
        col.toLowerCase().includes('revenue') || 
        col.toLowerCase().includes('income') || 
        col.toLowerCase().includes('sales')
      );
      
      if (revenueColumn) {
        metric.revenue = dateRows.reduce((sum, row) => {
          const val = typeof row[revenueColumn] === 'number' ? row[revenueColumn] as number : 0;
          return sum + val;
        }, 0);
      }
      
      // Calculate expenses
      const expenseColumn = columns.find(col =>
        col.toLowerCase().includes('expense') ||
        col.toLowerCase().includes('cost')
      );
      
      if (expenseColumn) {
        metric.expenses = dateRows.reduce((sum, row) => {
          const val = typeof row[expenseColumn] === 'number' ? row[expenseColumn] as number : 0;
          return sum + val;
        }, 0);
      }
      
      // Calculate profit margin
      if (metric.revenue && metric.expenses) {
        metric.profit_margin = ((metric.revenue - metric.expenses) / metric.revenue) * 100;
        metric.cash_flow = metric.revenue - metric.expenses;
      }
      
      metrics.push(metric);
    }
  } else {
    // If no date column, create a single metric for today
    const metric = {
      user_id: user.id,
      metric_date: new Date().toISOString().split('T')[0]
    } as any;
    
    // Calculate revenue
    const revenueColumn = columns.find(col => 
      col.toLowerCase().includes('revenue') || 
      col.toLowerCase().includes('income') || 
      col.toLowerCase().includes('sales')
    );
    
    if (revenueColumn) {
      metric.revenue = rows.reduce((sum, row) => {
        const val = typeof row[revenueColumn] === 'number' ? row[revenueColumn] as number : 0;
        return sum + val;
      }, 0);
    }
    
    // Calculate expenses
    const expenseColumn = columns.find(col =>
      col.toLowerCase().includes('expense') ||
      col.toLowerCase().includes('cost')
    );
    
    if (expenseColumn) {
      metric.expenses = rows.reduce((sum, row) => {
        const val = typeof row[expenseColumn] === 'number' ? row[expenseColumn] as number : 0;
        return sum + val;
      }, 0);
    }
    
    // Calculate profit margin
    if (metric.revenue && metric.expenses) {
      metric.profit_margin = ((metric.revenue - metric.expenses) / metric.revenue) * 100;
      metric.cash_flow = metric.revenue - metric.expenses;
    }
    
    metrics.push(metric);
  }
  
  if (metrics.length === 0) return [];
  
  // Save metrics to database
  const { data, error } = await supabase
    .from('business_metrics')
    .insert(metrics)
    .select();
  
  if (error) {
    console.error('Error saving business metrics:', error);
    return [];
  }
  
  return data as BusinessMetric[];
};