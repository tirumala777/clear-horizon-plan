
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const activities = [
  {
    id: 1,
    user: 'Sarah Johnson',
    action: 'Updated Q3 financial projections',
    time: '2 hours ago',
    type: 'update'
  },
  {
    id: 2,
    user: 'Mike Chen',
    action: 'Added new milestone: Product Launch',
    time: '4 hours ago',
    type: 'milestone'
  },
  {
    id: 3,
    user: 'Emily Davis',
    action: 'Shared quarterly report with team',
    time: '1 day ago',
    type: 'share'
  },
  {
    id: 4,
    user: 'Alex Wilson',
    action: 'Completed market analysis',
    time: '2 days ago',
    type: 'completion'
  }
];

const TeamActivity = () => {
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'update': return 'bg-primary text-primary-foreground';
      case 'milestone': return 'bg-success text-success-foreground';
      case 'share': return 'bg-secondary text-secondary-foreground';
      case 'completion': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg border">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {activity.user.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">{activity.user}</p>
              <p className="text-xs text-muted-foreground">{activity.action}</p>
            </div>
            <div className="text-right">
              <Badge className={getActivityColor(activity.type)}>
                {activity.type}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TeamActivity;
