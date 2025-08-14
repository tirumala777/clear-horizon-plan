
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, Key, Eye, EyeOff, Smartphone, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const SecuritySettings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [dataEncryption, setDataEncryption] = useState(true);
  const [loginNotifications, setLoginNotifications] = useState(true);

  const securitySettings = [
    {
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      enabled: twoFactorEnabled,
      onToggle: setTwoFactorEnabled,
      icon: Smartphone,
      status: twoFactorEnabled ? 'Enabled' : 'Disabled',
      statusColor: twoFactorEnabled ? 'text-success' : 'text-warning'
    },
    {
      title: 'Data Encryption',
      description: 'Encrypt your financial data at rest and in transit',
      enabled: dataEncryption,
      onToggle: setDataEncryption,
      icon: Shield,
      status: dataEncryption ? 'Active' : 'Inactive',
      statusColor: dataEncryption ? 'text-success' : 'text-danger'
    },
    {
      title: 'Login Notifications',
      description: 'Get notified when someone signs into your account',
      enabled: loginNotifications,
      onToggle: setLoginNotifications,
      icon: AlertTriangle,
      status: loginNotifications ? 'Enabled' : 'Disabled',
      statusColor: loginNotifications ? 'text-success' : 'text-muted-foreground'
    }
  ];

  const recentActivities = [
    { action: 'Password changed', time: '2 hours ago', location: 'New York, US', status: 'success' },
    { action: 'Login attempt', time: '1 day ago', location: 'San Francisco, US', status: 'success' },
    { action: 'Data export', time: '3 days ago', location: 'New York, US', status: 'success' },
    { action: 'Failed login', time: '5 days ago', location: 'Unknown location', status: 'warning' }
  ];

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    // Simulate password change
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    toast.success('Password changed successfully');
  };

  const handleSessionTimeoutChange = () => {
    const timeout = parseInt(sessionTimeout);
    if (timeout < 5 || timeout > 120) {
      toast.error('Session timeout must be between 5 and 120 minutes');
      return;
    }
    toast.success(`Session timeout set to ${timeout} minutes`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Security Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {securitySettings.map((setting, index) => {
              const IconComponent = setting.icon;
              return (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{setting.title}</h4>
                      <Badge variant="outline" className={setting.statusColor}>
                        {setting.status}
                      </Badge>
                    </div>
                  </div>
                  <Switch
                    checked={setting.enabled}
                    onCheckedChange={setting.onToggle}
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Password Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            Password Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPasswords ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
              </div>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => setShowPasswords(!showPasswords)}
                className="flex items-center gap-2"
              >
                {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showPasswords ? 'Hide' : 'Show'} Passwords
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type={showPasswords ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type={showPasswords ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button onClick={handlePasswordChange}>
              Change Password
            </Button>
            <div className="text-sm text-muted-foreground">
              Password must be at least 8 characters long
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Session Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                min="5"
                max="120"
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="w-32"
              />
            </div>
            <Button variant="outline" onClick={handleSessionTimeoutChange}>
              Update Timeout
            </Button>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Active Sessions</h4>
              <p className="text-sm text-muted-foreground">Manage your active login sessions</p>
            </div>
            <Button variant="outline">
              End All Sessions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Security Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Security Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(activity.status)}
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.location}</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Privacy */}
      <Card>
        <CardHeader>
          <CardTitle>Data Privacy & Export</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline">
              Export My Data
            </Button>
            <Button variant="outline">
              Delete My Account
            </Button>
            <Button variant="outline">
              Privacy Settings
            </Button>
          </div>
          
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Data Retention Policy</h4>
            <p className="text-sm text-muted-foreground">
              Your financial data is encrypted and stored securely. Transaction data is retained for 7 years 
              for tax purposes, after which it can be permanently deleted upon request.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;
