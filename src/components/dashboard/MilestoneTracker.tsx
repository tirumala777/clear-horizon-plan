
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Calendar, Plus, TrendingUp } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  category: 'revenue' | 'users' | 'growth' | 'efficiency';
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  status: 'in-progress' | 'completed' | 'overdue';
}

const MilestoneTracker = () => {
  const [milestones] = useState<Milestone[]>([
    {
      id: '1',
      title: 'Reach ₹1Cr Monthly Revenue',
      description: 'Achieve monthly recurring revenue of ₹1 crore',
      targetValue: 10000000, // 1 crore
      currentValue: 5600000, // 56 lakh
      unit: '₹',
      category: 'revenue',
      deadline: '2024-12-31',
      priority: 'high',
      status: 'in-progress'
    },
    {
      id: '2',
      title: 'Scale to 5,000 Active Users',
      description: 'Expand user base to 5,000 monthly active users',
      targetValue: 5000,
      currentValue: 3200,
      unit: 'users',
      category: 'users',
      deadline: '2024-10-31',
      priority: 'high',
      status: 'in-progress'
    },
    {
      id: '3',
      title: 'Achieve 15% Profit Margin',
      description: 'Optimize operations to reach 15% profit margin',
      targetValue: 15,
      currentValue: 12.8,
      unit: '%',
      category: 'efficiency',
      deadline: '2024-09-30',
      priority: 'medium',
      status: 'in-progress'
    },
    {
      id: '4',
      title: 'Launch Premium Features',
      description: 'Release advanced analytics and AI insights',
      targetValue: 100,
      currentValue: 85,
      unit: '%',
      category: 'growth',
      deadline: '2024-08-15',
      priority: 'high',
      status: 'in-progress'
    }
  ]);

  const formatValue = (value: number, unit: string) => {
    if (unit === '₹') {
      if (value >= 10000000) {
        return `₹${(value / 10000000).toFixed(1)}Cr`;
      } else if (value >= 100000) {
        return `₹${(value / 100000).toFixed(1)}L`;
      }
      return `₹${(value / 1000).toFixed(0)}K`;
    }
    return `${value.toLocaleString()}${unit}`;
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'overdue':
        return 'bg-danger text-danger-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-danger text-danger-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'revenue':
        return TrendingUp;
      case 'users':
        return Target;
      case 'growth':
        return Trophy;
      default:
        return Target;
    }
  };

  const isOverdue = (deadline: string) => {
    return new Date(deadline) < new Date();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-primary" />
            <span>Milestone Tracker</span>
          </CardTitle>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Milestone
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {milestones.map((milestone) => {
          const progress = getProgressPercentage(milestone.currentValue, milestone.targetValue);
          const IconComponent = getCategoryIcon(milestone.category);
          const overdue = isOverdue(milestone.deadline);
          
          return (
            <div key={milestone.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{milestone.title}</h4>
                    <p className="text-muted-foreground text-sm">{milestone.description}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Badge className={getPriorityColor(milestone.priority)}>
                    {milestone.priority}
                  </Badge>
                  <Badge className={getStatusColor(overdue ? 'overdue' : milestone.status)}>
                    {overdue ? 'Overdue' : milestone.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress: {progress.toFixed(1)}%</span>
                  <span>
                    {formatValue(milestone.currentValue, milestone.unit)} / {formatValue(milestone.targetValue, milestone.unit)}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Due: {new Date(milestone.deadline).toLocaleDateString()}</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          );
        })}

        <div className="text-center pt-4">
          <div className="bg-muted/50 rounded-lg p-6">
            <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Keep Pushing Forward!</h3>
            <p className="text-muted-foreground text-sm">
              You're making great progress on your goals. Stay focused and achieve your milestones.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MilestoneTracker;
