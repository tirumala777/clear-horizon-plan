
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, MessageSquare, Share2, Calendar, Video, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  type: 'message' | 'document' | 'meeting';
}

interface SharedDocument {
  id: string;
  name: string;
  type: string;
  sharedBy: string;
  sharedAt: Date;
  size: string;
}

const CollaborationHub = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Sarah Johnson (Advisor)',
      content: 'I\'ve reviewed your portfolio allocation and have some recommendations for optimization.',
      timestamp: new Date(Date.now() - 3600000),
      type: 'message'
    },
    {
      id: '2',
      sender: 'You',
      content: 'Great! I\'m particularly interested in increasing my tech exposure.',
      timestamp: new Date(Date.now() - 2400000),
      type: 'message'
    },
    {
      id: '3',
      sender: 'Sarah Johnson (Advisor)',
      content: 'Meeting scheduled: Portfolio Review - Tomorrow at 2:00 PM',
      timestamp: new Date(Date.now() - 1800000),
      type: 'meeting'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  
  const [sharedDocuments] = useState<SharedDocument[]>([
    {
      id: '1',
      name: 'Q3 Portfolio Performance Report.pdf',
      type: 'PDF',
      sharedBy: 'Sarah Johnson',
      sharedAt: new Date(Date.now() - 86400000),
      size: '2.3 MB'
    },
    {
      id: '2',
      name: 'Tax Optimization Strategy.xlsx',
      type: 'Excel',
      sharedBy: 'Mike Chen',
      sharedAt: new Date(Date.now() - 172800000),
      size: '1.8 MB'
    },
    {
      id: '3',
      name: 'Investment Recommendations 2024.docx',
      type: 'Word',
      sharedBy: 'Sarah Johnson',
      sharedAt: new Date(Date.now() - 259200000),
      size: '945 KB'
    }
  ]);

  const [collaborators] = useState([
    { name: 'Sarah Johnson', role: 'Financial Advisor', status: 'online' },
    { name: 'Mike Chen', role: 'Tax Specialist', status: 'away' },
    { name: 'Emily Davis', role: 'Investment Analyst', status: 'offline' }
  ]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'You',
      content: newMessage,
      timestamp: new Date(),
      type: 'message'
    };

    setMessages([...messages, message]);
    setNewMessage('');
    toast.success('Message sent');
  };

  const scheduleVideoCall = () => {
    toast.success('Video call scheduled for tomorrow at 2:00 PM');
  };

  const shareDocument = () => {
    toast.success('Document sharing initiated');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'away': return 'bg-warning';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Collaboration Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Collaborators</p>
                <p className="text-2xl font-bold">{collaborators.length}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Messages Today</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Shared Documents</p>
                <p className="text-2xl font-bold">{sharedDocuments.length}</p>
              </div>
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Upcoming Meetings</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Members */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Your Financial Team
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {collaborators.map((collaborator, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {collaborator.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div 
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(collaborator.status)}`}
                    />
                  </div>
                  <div>
                    <p className="font-medium">{collaborator.name}</p>
                    <p className="text-sm text-muted-foreground">{collaborator.role}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={scheduleVideoCall}>
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            <Button className="w-full" variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Invite Team Member
            </Button>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Team Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
              {messages.map(message => (
                <div key={message.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {message.sender.split(' ')[0][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm">{message.sender}</p>
                      <p className="text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                      {message.type === 'meeting' && (
                        <Badge variant="outline" className="text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          Meeting
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shared Documents */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Shared Documents
            </CardTitle>
            <Button onClick={shareDocument}>
              <Share2 className="w-4 h-4 mr-2" />
              Share Document
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sharedDocuments.map(doc => (
              <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Shared by {doc.sharedBy} • {doc.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{doc.type}</Badge>
                  <p className="text-xs text-muted-foreground">
                    {doc.sharedAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Meetings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Upcoming Meetings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Portfolio Review Session</p>
                <p className="text-sm text-muted-foreground">
                  Tomorrow at 2:00 PM • with Sarah Johnson
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Video className="w-4 h-4 mr-1" />
                  Join
                </Button>
                <Button size="sm" variant="ghost">Edit</Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Tax Planning Discussion</p>
                <p className="text-sm text-muted-foreground">
                  Friday at 10:00 AM • with Mike Chen
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Calendar className="w-4 h-4 mr-1" />
                  Add to Calendar
                </Button>
                <Button size="sm" variant="ghost">Edit</Button>
              </div>
            </div>
          </div>
          
          <Button className="w-full mt-4" variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule New Meeting
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollaborationHub;
