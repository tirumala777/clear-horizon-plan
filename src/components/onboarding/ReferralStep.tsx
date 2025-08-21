
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Gift, Users } from 'lucide-react';
import { toast } from 'sonner';

interface ReferralStepProps {
  formData: {
    referralCode: string;
  };
  updateFormData: (data: Partial<any>) => void;
}

const ReferralStep = ({ formData, updateFormData }: ReferralStepProps) => {
  const [hasReferral, setHasReferral] = useState(false);

  useEffect(() => {
    // Check for referral code in URL
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    
    if (refCode) {
      updateFormData({ referralCode: refCode });
      setHasReferral(true);
      toast.success('Referral code applied! You and your friend will both get rewards.');
    }
  }, [updateFormData]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Gift className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Got a Referral Code?</h3>
        <p className="text-muted-foreground">
          Enter your friend's referral code to get exclusive bonuses for both of you!
        </p>
      </div>

      <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="referralCode">Referral Code (Optional)</Label>
            <Input
              id="referralCode"
              value={formData.referralCode}
              onChange={(e) => updateFormData({ referralCode: e.target.value.toUpperCase() })}
              placeholder="Enter referral code"
              className="text-center font-mono"
            />
          </div>

          {formData.referralCode && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center gap-2 text-success">
                <Gift className="w-5 h-5" />
                <span className="font-semibold">Great! You'll get rewards:</span>
              </div>
              <ul className="mt-2 text-sm text-success/80 space-y-1">
                <li>• ₹100 bonus on account creation</li>
                <li>• 1 month premium features free</li>
                <li>• Access to exclusive investment tips</li>
              </ul>
            </div>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-4 bg-muted/30 rounded-lg">
          <Users className="w-8 h-8 text-primary mx-auto mb-2" />
          <h4 className="font-semibold">You Get</h4>
          <p className="text-sm text-muted-foreground">₹100 + Premium Access</p>
        </div>
        <div className="p-4 bg-muted/30 rounded-lg">
          <Gift className="w-8 h-8 text-secondary mx-auto mb-2" />
          <h4 className="font-semibold">Friend Gets</h4>
          <p className="text-sm text-muted-foreground">₹300 Referral Reward</p>
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Don't have a referral code? No worries! You can still join our amazing community.
      </div>
    </div>
  );
};

export default ReferralStep;
