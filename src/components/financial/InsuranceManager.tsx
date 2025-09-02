
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Shield, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getInsurancePolicies,
  createInsurancePolicy,
  InsurancePolicy,
  formatINR
} from '@/services/financialDataService';

const InsuranceManager = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const [newInsurance, setNewInsurance] = useState({
    policy_name: '',
    provider: '',
    policy_type: '',
    premium_amount: '',
    coverage_amount: '',
    start_date: '',
    end_date: ''
  });

  const insuranceTypes = [
    'Life Insurance',
    'Health Insurance',
    'Auto Insurance',
    'Home Insurance',
    'Disability Insurance',
    'Travel Insurance'
  ];

  // Query for insurance policies
  const { data: insurances = [], isLoading, error } = useQuery({
    queryKey: ['insurance_policies'],
    queryFn: getInsurancePolicies,
    enabled: !!user,
  });

  // Mutation for creating insurance policies
  const createInsuranceMutation = useMutation({
    mutationFn: createInsurancePolicy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['insurance_policies'] });
      setNewInsurance({ 
        policy_name: '', 
        provider: '', 
        policy_type: '', 
        premium_amount: '', 
        coverage_amount: '', 
        start_date: '', 
        end_date: '' 
      });
      toast.success('Insurance policy added successfully');
    },
    onError: (error: Error) => {
      console.error('Error creating insurance policy:', error);
      toast.error('Failed to add insurance policy');
    },
  });

  const handleAddInsurance = () => {
    if (!user) {
      toast.error('Please sign in to add insurance policies');
      return;
    }

    if (!newInsurance.policy_name.trim() || !newInsurance.provider.trim() || !newInsurance.policy_type) {
      toast.error('Please fill in required fields (Policy Name, Provider, Type)');
      return;
    }

    const premiumAmount = parseFloat(newInsurance.premium_amount);
    const coverageAmount = parseFloat(newInsurance.coverage_amount);

    if (newInsurance.premium_amount && (isNaN(premiumAmount) || premiumAmount < 0)) {
      toast.error('Premium amount must be a valid positive number');
      return;
    }

    if (newInsurance.coverage_amount && (isNaN(coverageAmount) || coverageAmount < 0)) {
      toast.error('Coverage amount must be a valid positive number');
      return;
    }

    const insuranceData = {
      policy_name: newInsurance.policy_name.trim(),
      provider: newInsurance.provider.trim(),
      policy_type: newInsurance.policy_type,
      premium_amount: premiumAmount || 0,
      coverage_amount: coverageAmount || 0,
      start_date: newInsurance.start_date || new Date().toISOString().split('T')[0],
      end_date: newInsurance.end_date,
      status: 'active' as const
    };

    createInsuranceMutation.mutate(insuranceData);
  };

  const getTotalPremiums = () => {
    return insurances.reduce((sum, ins) => sum + (ins.premium_amount || 0), 0);
  };

  const getTotalCoverage = () => {
    return insurances.reduce((sum, ins) => sum + (ins.coverage_amount || 0), 0);
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            Please sign in to access your insurance policies.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-destructive">
            Error loading insurance policies. Please try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Insurance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Policies</p>
                <p className="text-2xl font-bold">{insurances.length}</p>
              </div>
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Premiums</p>
                <p className="text-2xl font-bold">{formatINR(getTotalPremiums())}</p>
              </div>
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Coverage</p>
                <p className="text-2xl font-bold">{formatINR(getTotalCoverage())}</p>
              </div>
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Insurance */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Insurance Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Policy Name *</Label>
              <Input
                value={newInsurance.policy_name}
                onChange={(e) => setNewInsurance({...newInsurance, policy_name: e.target.value})}
                placeholder="Policy name"
                maxLength={200}
              />
            </div>
            <div>
              <Label>Provider *</Label>
              <Input
                value={newInsurance.provider}
                onChange={(e) => setNewInsurance({...newInsurance, provider: e.target.value})}
                placeholder="Insurance provider"
                maxLength={200}
              />
            </div>
          </div>

          <div>
            <Label>Insurance Type *</Label>
            <Select onValueChange={(value) => setNewInsurance({...newInsurance, policy_type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {insuranceTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Monthly Premium</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                max="999999"
                value={newInsurance.premium_amount}
                onChange={(e) => setNewInsurance({...newInsurance, premium_amount: e.target.value})}
                placeholder="250"
              />
            </div>
            <div>
              <Label>Coverage Amount</Label>
              <Input
                type="number"
                min="0"
                max="99999999999"
                value={newInsurance.coverage_amount}
                onChange={(e) => setNewInsurance({...newInsurance, coverage_amount: e.target.value})}
                placeholder="500000"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Input
                type="date"
                value={newInsurance.start_date}
                onChange={(e) => setNewInsurance({...newInsurance, start_date: e.target.value})}
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                type="date"
                value={newInsurance.end_date}
                onChange={(e) => setNewInsurance({...newInsurance, end_date: e.target.value})}
              />
            </div>
          </div>
          
          <Button 
            onClick={handleAddInsurance} 
            className="w-full"
            disabled={createInsuranceMutation.isPending}
          >
            <Plus className="w-4 h-4 mr-2" />
            {createInsuranceMutation.isPending ? 'Adding...' : 'Add Insurance Policy'}
          </Button>
        </CardContent>
      </Card>

      {/* Insurance Policies List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Insurance Policies</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading insurance policies...</div>
          ) : (
            <div className="space-y-4">
              {insurances.map(insurance => (
                <div key={insurance.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold">{insurance.policy_name}</h4>
                      <Badge variant={insurance.status === 'active' ? 'default' : 'destructive'}>
                        {insurance.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Provider</p>
                      <p className="font-medium">{insurance.provider}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Type</p>
                      <p className="font-medium">{insurance.policy_type}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Premium</p>
                      <p className="font-medium">
                        {insurance.premium_amount ? `${formatINR(insurance.premium_amount)}/month` : 'Not set'}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Coverage</p>
                      <p className="font-medium">
                        {insurance.coverage_amount ? formatINR(insurance.coverage_amount) : 'Not set'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {insurances.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No insurance policies yet. Add your first policy above.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InsuranceManager;
