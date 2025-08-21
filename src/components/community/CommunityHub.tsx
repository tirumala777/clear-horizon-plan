
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, Users, Star, Trophy, Heart } from 'lucide-react';

interface UserStory {
  id: string;
  user: {
    name: string;
    avatar: string;
    achievement: string;
  };
  story: string;
  amount: string;
  timeframe: string;
  likes: number;
}

const CommunityHub = () => {
  const successStories: UserStory[] = [
    {
      id: '1',
      user: {
        name: 'Priya Sharma',
        avatar: '/placeholder.svg',
        achievement: '6-Month Streak'
      },
      story: 'I saved ₹1,00,000 in 6 months using the automated savings feature. The goal tracking kept me motivated every single day!',
      amount: '₹1,00,000',
      timeframe: '6 months',
      likes: 24
    },
    {
      id: '2',
      user: {
        name: 'Rahul Patel',
        avatar: '/placeholder.svg',
        achievement: 'Debt Free'
      },
      story: 'Used the debt payoff calculator and paid off my credit card debt 2 years ahead of schedule. Game changer!',
      amount: '₹2,50,000',
      timeframe: '18 months',
      likes: 31
    },
    {
      id: '3',
      user: {
        name: 'Anita Desai',
        avatar: '/placeholder.svg',
        achievement: 'Investment Pro'
      },
      story: 'Started with zero investment knowledge. Now I have a diversified portfolio worth ₹5 lakhs!',
      amount: '₹5,00,000',
      timeframe: '2 years',
      likes: 18
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Financial Freedom Community</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join thousands of members sharing their success stories, tips, and supporting each other 
          on their financial journey.
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">12,500+</div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold">₹50Cr+</div>
            <div className="text-sm text-muted-foreground">Total Saved</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold">8,200+</div>
            <div className="text-sm text-muted-foreground">Goals Achieved</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <MessageCircle className="w-8 h-8 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold">24/7</div>
            <div className="text-sm text-muted-foreground">Community Support</div>
          </CardContent>
        </Card>
      </div>

      {/* Success Stories */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-center">Success Stories</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {successStories.map((story) => (
            <Card key={story.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={story.user.avatar} />
                    <AvatarFallback>{story.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{story.user.name}</div>
                    <Badge variant="secondary" className="text-xs">
                      {story.user.achievement}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-4">
                  "{story.story}"
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <div className="font-bold text-success">{story.amount}</div>
                    <div className="text-muted-foreground">in {story.timeframe}</div>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Heart className="w-4 h-4" />
                    <span>{story.likes}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Community Features */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Discussion Forums
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Connect with like-minded individuals, ask questions, and share your financial wins.
            </p>
            <Button variant="outline" className="w-full">Join Discussions</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Accountability Groups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Join small groups for daily check-ins and mutual support on your financial goals.
            </p>
            <Button variant="outline" className="w-full">Find Your Group</Button>
          </CardContent>
        </Card>
      </div>

      {/* Join CTA */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold mb-4">Share Your Success Story</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Inspire others with your financial journey and become part of our success stories.
          </p>
          <Button size="lg">Submit Your Story</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityHub;
