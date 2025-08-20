
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface FinancialDataStepProps {
  formData: {
    monthlyRevenue: string;
  };
  updateFormData: (data: Partial<any>) => void;
}

const FinancialDataStep = ({ formData, updateFormData }: FinancialDataStepProps) => {
  const handleConnect = (service: string) => {
    toast.success(`${service} connection initiated! (Demo mode)`);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="monthlyRevenue">Monthly Revenue (INR)</Label>
        <Input
          id="monthlyRevenue"
          type="number"
          value={formData.monthlyRevenue}
          onChange={(e) => updateFormData({ monthlyRevenue: e.target.value })}
          placeholder="e.g., 4100000 (41 lakh)"
        />
        <p className="text-sm text-muted-foreground">
          Enter your monthly revenue in Indian Rupees
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <h4 className="font-semibold mb-2">Tally ERP</h4>
          <p className="text-sm text-muted-foreground mb-3">Connect your accounting data</p>
          <Button variant="outline" size="sm" onClick={() => handleConnect('Tally ERP')}>
            Connect
          </Button>
        </Card>
        <Card className="p-4">
          <h4 className="font-semibold mb-2">Bank Account</h4>
          <p className="text-sm text-muted-foreground mb-3">Sync transaction data</p>
          <Button variant="outline" size="sm" onClick={() => handleConnect('Bank Account')}>
            Connect
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default FinancialDataStep;
