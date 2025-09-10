import React, { useState, useCallback } from 'react';
import { Upload, Brain, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  parseCSV, 
  analyzeDataWithML, 
  convertToBusinessInsights, 
  generateBusinessMetricsFromDataset,
  ProcessedDataset 
} from '@/services/dataProcessingService';
import { useQueryClient } from '@tanstack/react-query';

interface ProcessingStep {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
}

const RealTimeDataProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([]);
  const [processedDatasets, setProcessedDatasets] = useState<ProcessedDataset[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateStep = useCallback((stepId: string, updates: Partial<ProcessingStep>) => {
    setProcessingSteps(prev => 
      prev.map(step => step.id === stepId ? { ...step, ...updates } : step)
    );
  }, []);

  const processFile = useCallback(async (file: File) => {
    setIsProcessing(true);
    
    const steps: ProcessingStep[] = [
      { id: 'parse', name: 'Parsing Data', status: 'pending', progress: 0 },
      { id: 'analyze', name: 'ML Analysis', status: 'pending', progress: 0 },
      { id: 'insights', name: 'Generating Insights', status: 'pending', progress: 0 },
      { id: 'metrics', name: 'Creating Business Metrics', status: 'pending', progress: 0 }
    ];
    
    setProcessingSteps(steps);
    
    try {
      // Step 1: Parse data
      updateStep('parse', { status: 'processing', progress: 25 });
      
      const content = await file.text();
      let rows: any[] = [];
      
      if (file.name.endsWith('.csv')) {
        rows = parseCSV(content);
      } else {
        throw new Error('Unsupported file format. Please upload CSV files.');
      }
      
      if (rows.length === 0) {
        throw new Error('No data found in file');
      }
      
      const columns = Object.keys(rows[0]);
      
      const dataset: ProcessedDataset = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        columns,
        rows,
        metadata: {
          rowCount: rows.length,
          columnCount: columns.length,
          processedAt: new Date(),
          fileSize: file.size
        }
      };
      
      updateStep('parse', { status: 'completed', progress: 100 });
      
      // Step 2: ML Analysis
      updateStep('analyze', { status: 'processing', progress: 50 });
      
      const predictions = analyzeDataWithML(dataset);
      
      updateStep('analyze', { status: 'completed', progress: 100 });
      
      // Step 3: Generate insights
      updateStep('insights', { status: 'processing', progress: 75 });
      
      await convertToBusinessInsights(predictions, file.name);
      
      updateStep('insights', { status: 'completed', progress: 100 });
      
      // Step 4: Generate business metrics
      updateStep('metrics', { status: 'processing', progress: 90 });
      
      await generateBusinessMetricsFromDataset(dataset);
      
      updateStep('metrics', { status: 'completed', progress: 100 });
      
      setProcessedDatasets(prev => [...prev, dataset]);
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['ml-insights'] });
      queryClient.invalidateQueries({ queryKey: ['business-metrics'] });
      
      toast({
        title: "Data Processing Complete",
        description: `Successfully processed ${file.name} with ${rows.length} records and generated ${predictions.length} ML insights.`,
      });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      // Mark current step as error
      const currentStep = processingSteps.find(step => step.status === 'processing');
      if (currentStep) {
        updateStep(currentStep.id, { status: 'error', progress: 0 });
      }
      
      toast({
        title: "Processing Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [updateStep, toast, queryClient]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const getStepIcon = (status: ProcessingStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'processing':
        return <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <div className="h-4 w-4 border-2 border-muted-foreground rounded-full" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Real-Time ML Data Processor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* File Upload */}
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-medium mb-2">Upload Dataset for ML Analysis</p>
          <p className="text-xs text-muted-foreground mb-4">
            CSV files with business data (revenue, expenses, dates, etc.)
          </p>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            className="hidden"
            id="ml-file-upload"
            disabled={isProcessing}
          />
          <Button asChild variant="outline" disabled={isProcessing}>
            <label htmlFor="ml-file-upload" className="cursor-pointer">
              Choose CSV File
            </label>
          </Button>
        </div>

        {/* Processing Steps */}
        {processingSteps.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              ML Processing Pipeline
            </h4>
            {processingSteps.map((step) => (
              <div key={step.id} className="flex items-center gap-3 p-3 border rounded-lg">
                {getStepIcon(step.status)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{step.name}</span>
                    <Badge 
                      variant={step.status === 'completed' ? 'default' : step.status === 'error' ? 'destructive' : 'secondary'}
                    >
                      {step.status}
                    </Badge>
                  </div>
                  {step.status === 'processing' && (
                    <Progress value={step.progress} className="h-1" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Processed Datasets */}
        {processedDatasets.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Processed Datasets</h4>
            {processedDatasets.map((dataset) => (
              <div key={dataset.id} className="flex items-center justify-between p-3 border rounded-lg bg-card">
                <div>
                  <p className="text-sm font-medium">{dataset.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {dataset.metadata.rowCount} rows × {dataset.metadata.columnCount} columns
                  </p>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-200">
                  Processed
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RealTimeDataProcessor;