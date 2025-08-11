
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Target, Zap, Award, Gift } from 'lucide-react';

const Gamification = () => {
  const achievements = [
    { id: 1, title: 'First Revenue', description: 'Recorded your first $1K revenue', icon: Trophy, earned: true, points: 100 },
    { id: 2, title: 'Growth Streak', description: '5 consecutive months of growth', icon: Star, earned: true, points: 250 },
    { id: 3, title: 'Efficiency Master', description: 'Improved profit margin by 10%', icon: Zap, earned: false, points: 300 },
    { id: 4, title: 'Team Builder', description: 'Added 5 team members', icon: Award, earned: false, points: 200 }
  ];

  const challenges = [
    {
      id: 1,
      title: 'Reach $100K Monthly Revenue',
      description: 'Break through the six-figure monthly revenue milestone',
      progress: 67,
      target: 100,
      reward: '500 points + Revenue Champion badge',
      timeLeft: '45 days',
      difficulty: 'Hard'
    },
    {
      id: 2,
      title: 'Reduce Customer Acquisition Cost',
      description: 'Lower your CAC by 20% compared to last quarter',
      progress: 35,
      target: 100,
      reward: '300 points + Efficiency badge',
      timeLeft: '62 days',
      difficulty: 'Medium'
    },
    {
      id: 3,
      title: 'Improve Customer Retention',
      description: 'Achieve 95% customer retention rate',
      progress: 78,
      target: 100,
      reward: '400 points + Loyalty Master badge',
      timeLeft: '30 days',
      difficulty: 'Medium'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'TechFlow Solutions', points: 2450, badge: 'Growth Champion' },
    { rank: 2, name: 'Digital Dynamics', points: 2380, badge: 'Revenue Master' },
    { rank: 3, name: 'Your Company', points: 2250, badge: 'Rising Star' },
    { rank: 4, name: 'Innovation Labs', points: 2100, badge: 'Efficiency Expert' },
    { rank: 5, name: 'Startup Hub', points: 1950, badge: 'Team Builder' }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success text-success-foreground';
      case 'Medium': return 'bg-warning text-warning-foreground';
      case 'Hard': return 'bg-danger text-danger-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Growth Challenges</h1>
            <p className="text-muted-foreground">Level up your business with gamified goals</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">2,250</div>
              <div className="text-sm text-muted-foreground">Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">3rd</div>
              <div className="text-sm text-muted-foreground">Rank</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-primary" />
                  <span>Active Challenges</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {challenges.map((challenge) => (
                  <div key={challenge.id} className="border rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{challenge.title}</h3>
                      <Badge className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{challenge.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress: {challenge.progress}%</span>
                        <span>{challenge.timeLeft} remaining</span>
                      </div>
                      <Progress value={challenge.progress} className="h-3" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Gift className="w-4 h-4 text-warning" />
                        <span className="text-sm">{challenge.reward}</span>
                      </div>
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-warning" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => {
                    const IconComponent = achievement.icon;
                    return (
                      <div key={achievement.id} className={`p-4 border rounded-lg ${
                        achievement.earned ? 'bg-success/10 border-success' : 'bg-muted/50'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${
                            achievement.earned ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                          }`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{achievement.title}</h4>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            <div className="text-xs text-primary font-medium mt-1">
                              {achievement.points} points
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-warning" />
                  <span>Leaderboard</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((entry) => (
                    <div key={entry.rank} className={`flex items-center space-x-3 p-3 rounded-lg ${
                      entry.name === 'Your Company' ? 'bg-primary/10 border border-primary' : 'bg-muted/50'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        entry.rank === 1 ? 'bg-warning text-warning-foreground' :
                        entry.rank === 2 ? 'bg-muted text-muted-foreground' :
                        entry.rank === 3 ? 'bg-warning/70 text-warning-foreground' :
                        'bg-secondary text-secondary-foreground'
                      }`}>
                        {entry.rank}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{entry.name}</h4>
                        <p className="text-xs text-muted-foreground">{entry.badge}</p>
                      </div>
                      <div className="text-sm font-bold text-primary">
                        {entry.points.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next Rewards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Premium Analytics</span>
                    <span className="text-sm text-primary">2,500 pts</span>
                  </div>
                  <Progress value={90} className="h-2" />
                  <span className="text-xs text-muted-foreground">250 points to go</span>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Custom Dashboard</span>
                    <span className="text-sm text-primary">3,000 pts</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <span className="text-xs text-muted-foreground">750 points to go</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamification;
