
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Users, MessageSquare, Share2, Plus, Bell } from 'lucide-react';

const Collaboration = () => {
  const [newComment, setNewComment] = useState('');

  const teamMembers = [
    { id: 1, name: 'John Doe', role: 'CEO', initials: 'JD', status: 'online' },
    { id: 2, name: 'Sarah Smith', role: 'CFO', initials: 'SS', status: 'away' },
    { id: 3, name: 'Mike Johnson', role: 'CTO', initials: 'MJ', status: 'offline' },
    { id: 4, name: 'Emily Davis', role: 'Marketing', initials: 'ED', status: 'online' }
  ];

  const comments = [
    {
      id: 1,
      user: 'Sarah Smith',
      time: '2 hours ago',
      content: 'The Q3 revenue numbers look promising. We should focus on the customer acquisition trends.',
      metric: 'Revenue Growth'
    },
    {
      id: 2,
      user: 'Mike Johnson',
      time: '4 hours ago',
      content: 'Server costs are higher than expected. I recommend reviewing our infrastructure optimization strategy.',
      metric: 'Operational Efficiency'
    }
  ];

  const sharedReports = [
    { id: 1, title: 'Q3 Financial Summary', sharedBy: 'Sarah Smith', date: '2024-01-15' },
    { id: 2, title: 'Growth Forecast 2024', sharedBy: 'John Doe', date: '2024-01-14' },
    { id: 3, title: 'Customer Acquisition Analysis', sharedBy: 'Emily Davis', date: '2024-01-13' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Team Collaboration</h1>
            <p className="text-muted-foreground">Work together to achieve your business goals</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Invite Member
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Discussion Feed</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Textarea
                    placeholder="Share your thoughts about the latest metrics..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                  />
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">@Revenue Growth</Badge>
                    <Button size="sm">Post Comment</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border-l-4 border-primary pl-4 py-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{comment.user}</span>
                          <Badge variant="secondary">{comment.metric}</Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">{comment.time}</span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Share2 className="w-5 h-5" />
                  <span>Shared Reports</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sharedReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{report.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Shared by {report.sharedBy} on {report.date}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Team Members</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                          member.status === 'online' ? 'bg-success' : 
                          member.status === 'away' ? 'bg-warning' : 'bg-muted'
                        }`}></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-semibold">New milestone reached!</p>
                    <p className="text-muted-foreground">$75K monthly revenue achieved</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-semibold">Report shared</p>
                    <p className="text-muted-foreground">Sarah shared Q3 Financial Summary</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-semibold">Comment added</p>
                    <p className="text-muted-foreground">Mike commented on server costs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
