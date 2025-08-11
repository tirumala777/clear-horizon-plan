
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target, Calendar, Trophy } from 'lucide-react';

const milestones = [
  {
    id: 1,
    title: 'Reach $100K Monthly Revenue',
    target: 100000,
    current: 67000,
    deadline: '2024-12-31',
    category: 'Revenue',
    status: 'in-progress'
  },
  {
    id: 2,
    title: 'Expand to 2000 Customers',
    target: 2000,
    current: 1240,
    deadline: '2024-11-30',
    category: 'Growth',
    status: 'in-progress'
  },
  {
    id: 3,
    title: 'Achieve 45% Profit Margin',
    target: 45,
    current: 40.3,
    deadline: '2024-10-31',
    category: 'Efficiency',
    status: 'at-risk'
  },
  {
    id: 4,
    title: 'Launch Product V2',
    target: 100,
    current: 85,
    deadline: '2024-09-15',
    category: 'Product',
    status: 'on-track'
  }
];

const MilestoneTracker = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'on-track': return 'bg-primary text-primary-foreground';
      case 'at-risk': return 'bg-warning text-warning-foreground';
      case 'in-progress': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-primary" />
          <span>Milestone Tracker</span>
          <Trophy className="h-5 w-5 text-warning" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {milestones.map((milestone) => {
            const progress = getProgressPercentage(milestone.current, milestone.target);
            const daysRemaining = getDaysRemaining(milestone.deadline);
            
            return (
              <div key={milestone.id} className="space-y-3 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{milestone.title}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(milestone.status)}>
                      {milestone.status.replace('-', ' ')}
                    </Badge>
                    <Badge variant="outline">{milestone.category}</Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress: {progress.toFixed(1)}%</span>
                    <span>
                      {milestone.category === 'Revenue' ? 
                        `$${milestone.current.toLocaleString()} / $${milestone.target.toLocaleString()}` :
                        `${milestone.current} / ${milestone.target}`
                      }
                    </span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {milestone.deadline}</span>
                  </div>
                  <span className={daysRemaining < 30 ? 'text-warning' : 'text-muted-foreground'}>
                    {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Overdue'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MilestoneTracker;
