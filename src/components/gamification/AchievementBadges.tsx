
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Target, Zap } from 'lucide-react';

const achievements = [
  {
    id: 1,
    title: 'Revenue Rockstar',
    description: 'Exceeded monthly revenue target by 20%',
    icon: Trophy,
    earned: true,
    points: 500
  },
  {
    id: 2,
    title: 'Goal Getter',
    description: 'Complete 10 business milestones',
    icon: Target,
    earned: true,
    points: 300
  },
  {
    id: 3,
    title: 'Innovation Leader',
    description: 'Launch 3 new features or products',
    icon: Zap,
    earned: false,
    points: 750,
    progress: 2
  },
  {
    id: 4,
    title: 'Team Player',
    description: 'Collaborate on 50 team activities',
    icon: Star,
    earned: false,
    points: 400,
    progress: 32
  }
];

const AchievementBadges = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievement Badges</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {achievements.map((achievement) => {
          const IconComponent = achievement.icon;
          
          return (
            <div 
              key={achievement.id} 
              className={`p-4 rounded-lg border transition-all ${
                achievement.earned 
                  ? 'bg-success/10 border-success/20' 
                  : 'bg-muted/50 border-muted'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    achievement.earned 
                      ? 'bg-success text-success-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    {!achievement.earned && achievement.progress && (
                      <p className="text-xs text-primary">
                        Progress: {achievement.progress}/50
                      </p>
                    )}
                  </div>
                </div>
                <Badge variant={achievement.earned ? 'default' : 'outline'}>
                  {achievement.points} pts
                </Badge>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default AchievementBadges;
