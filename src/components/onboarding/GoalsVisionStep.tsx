
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface GoalsVisionStepProps {
  formData: {
    goals: string;
    challenges: string;
  };
  updateFormData: (data: Partial<any>) => void;
}

const GoalsVisionStep = ({ formData, updateFormData }: GoalsVisionStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="goals">Primary Business Goals</Label>
        <Textarea
          id="goals"
          value={formData.goals}
          onChange={(e) => updateFormData({ goals: e.target.value })}
          placeholder="e.g., Reach $100K monthly revenue, expand to new markets..."
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="challenges">Current Challenges</Label>
        <Textarea
          id="challenges"
          value={formData.challenges}
          onChange={(e) => updateFormData({ challenges: e.target.value })}
          placeholder="e.g., High customer acquisition costs, cash flow management..."
          rows={4}
        />
      </div>
    </div>
  );
};

export default GoalsVisionStep;
