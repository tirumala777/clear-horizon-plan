
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Shield, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Insurance {
  id: string;
  type: string;
  provider: string;
  premium: number;
  coverage: number;
  deductible: number;
  expiryDate: string;
  status: 'active' | 'expired' | 'pending';
}

const InsuranceManager = () => {
  const [insurances, setInsurances] = useState<Insurance[]>([
    {
      id: '1',
      type: 'Life Insurance',
      provider: 'MetLife',
      premium: 250,
      coverage: 500000,
      deductible: 0,
      expiryDate: '2025-12-31',
      status: 'active'
    },
    {
      id: '2',
      type: 'Health Insurance',
      provider: 'Blue Cross',
      premium: 450,
      coverage: 50000,
      deductible: 2500,
      expiryDate: '2024-06-30',
      status: 'active'
    }
  ]);

  const [newInsurance, setNewInsurance] = useState({
    type: '',
    provider: '',
    premium: '',
    coverage: '',
    deductible: '',
    expiryDate: ''
  });

  const insuranceTypes = [
    'Life Insurance',
    'Health Insurance',
    'Auto Insurance',
    'Home Insurance',
    'Disability Insurance',
    'Travel Insurance'
  ];

  const addInsurance = () => {
    if (!newInsurance.type || !newInsurance.provider || !newInsurance.premium) {
      toast.error('Please fill in required fields');
      return;
    }

    const insurance: Insurance = {
      id: Date.now().toString(),
      type: newInsurance.type,
      provider: newInsurance.provider,
      premium: parseFloat(newInsurance.premium),
      coverage: parseFloat(newInsurance.coverage) || 0,
      deductible: parseFloat(newInsurance.deductible) || 0,
      expiryDate: newInsurance.expiryDate,
      status: new Date(newInsurance.expiryDate) > new Date() ? 'active' : 'expired'
    };

    setInsurances([...insurances, insurance]);
    setNewInsurance({ type: '', provider: '', premium: '', coverage: '', deductible: '', expiryDate: '' });
    toast.success('Insurance policy added successfully');
  };

  const deleteInsurance = (id: string) => {
    setInsurances(insurances.filter(ins => ins.id !== id));
    toast.success('Insurance policy removed');
  };

  const getTotalPremiums = () => {
    return insurances.reduce((sum, ins) => sum + ins.premium, 0);
  };

  const getTotalCoverage = () => {
    return insurances.reduce((sum, ins) => sum + ins.coverage, 0);
  };

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
                <p className="text-2xl font-bold">${getTotalPremiums().toLocaleString()}</p>
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
                <p className="text-2xl font-bold">${getTotalCoverage().toLocaleString()}</p>
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
              <Label>Insurance Type *</Label>
              <Select onValueChange={(value) => setNewInsurance({...newInsurance, type: value})}>
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
            <div>
              <Label>Provider *</Label>
              <Input
                value={newInsurance.provider}
                onChange={(e) => setNewInsurance({...newInsurance, provider: e.target.value})}
                placeholder="Insurance provider"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Monthly Premium *</Label>
              <Input
                type="number"
                value={newInsurance.premium}
                onChange={(e) => setNewInsurance({...newInsurance, premium: e.target.value})}
                placeholder="250"
              />
            </div>
            <div>
              <Label>Coverage Amount</Label>
              <Input
                type="number"
                value={newInsurance.coverage}
                onChange={(e) => setNewInsurance({...newInsurance, coverage: e.target.value})}
                placeholder="500000"
              />
            </div>
            <div>
              <Label>Deductible</Label>
              <Input
                type="number"
                value={newInsurance.deductible}
                onChange={(e) => setNewInsurance({...newInsurance, deductible: e.target.value})}
                placeholder="2500"
              />
            </div>
          </div>
          
          <div>
            <Label>Expiry Date</Label>
            <Input
              type="date"
              value={newInsurance.expiryDate}
              onChange={(e) => setNewInsurance({...newInsurance, expiryDate: e.target.value})}
            />
          </div>
          
          <Button onClick={addInsurance} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Insurance Policy
          </Button>
        </CardContent>
      </Card>

      {/* Insurance Policies List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Insurance Policies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insurances.map(insurance => (
              <div key={insurance.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold">{insurance.type}</h4>
                    <Badge variant={insurance.status === 'active' ? 'default' : 'destructive'}>
                      {insurance.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => deleteInsurance(insurance.id)}>
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
                    <p className="text-muted-foreground">Premium</p>
                    <p className="font-medium">${insurance.premium}/month</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Coverage</p>
                    <p className="font-medium">${insurance.coverage.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Expires</p>
                    <p className="font-medium">{insurance.expiryDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsuranceManager;
