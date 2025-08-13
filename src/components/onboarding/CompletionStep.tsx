
import React from 'react';
import { CheckCircle } from 'lucide-react';

const CompletionStep = () => {
  return (
    <div className="space-y-6 text-center">
      <CheckCircle className="w-16 h-16 text-success mx-auto" />
      <h3 className="text-2xl font-bold">You're All Set!</h3>
      <p className="text-muted-foreground">
        Your Catalyst workspace is ready. Our AI is already analyzing your data to provide personalized insights.
      </p>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold">Dashboard Ready</h4>
          <p className="text-muted-foreground">Personalized for your business</p>
        </div>
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold">AI Insights</h4>
          <p className="text-muted-foreground">Generating recommendations</p>
        </div>
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold">Growth Tracking</h4>
          <p className="text-muted-foreground">Monitoring your progress</p>
        </div>
      </div>
    </div>
  );
};

export default CompletionStep;
