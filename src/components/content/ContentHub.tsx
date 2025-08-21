
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, TrendingUp, Calculator, PiggyBank, Target, Shield } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  icon: any;
  featured?: boolean;
}

const ContentHub = () => {
  const articles: Article[] = [
    {
      id: '1',
      title: 'How Much Should You Save in Your 20s?',
      excerpt: 'A comprehensive guide to building your financial foundation early in your career.',
      category: 'Savings',
      readTime: '5 min',
      icon: PiggyBank,
      featured: true
    },
    {
      id: '2',
      title: 'Best Budget Tracker Methods for Indian Families',
      excerpt: 'Discover effective budgeting strategies tailored for Indian households.',
      category: 'Budgeting',
      readTime: '7 min',
      icon: Calculator
    },
    {
      id: '3',
      title: '5 Steps to Retire Early at 40',
      excerpt: 'Learn the FIRE movement principles adapted for the Indian financial landscape.',
      category: 'Retirement',
      readTime: '10 min',
      icon: Target
    },
    {
      id: '4',
      title: 'Emergency Fund Calculator: How Much Do You Need?',
      excerpt: 'Calculate the perfect emergency fund size based on your lifestyle and expenses.',
      category: 'Emergency Fund',
      readTime: '4 min',
      icon: Shield
    },
    {
      id: '5',
      title: 'Investment Strategies for Young Professionals',
      excerpt: 'Start your investment journey with these beginner-friendly strategies.',
      category: 'Investing',
      readTime: '8 min',
      icon: TrendingUp
    },
    {
      id: '6',
      title: 'Tax Saving Investments in India: Complete Guide',
      excerpt: 'Maximize your tax savings with Section 80C and other investment options.',
      category: 'Tax Planning',
      readTime: '12 min',
      icon: BookOpen
    }
  ];

  const categories = ['All', 'Savings', 'Budgeting', 'Investing', 'Retirement', 'Tax Planning'];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Financial Education Hub</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Master your finances with our comprehensive guides, calculators, and expert insights 
          tailored for the Indian market.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={category === 'All' ? 'default' : 'outline'}
            size="sm"
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Featured Article */}
      {articles.filter(article => article.featured).map((article) => {
        const IconComponent = article.icon;
        return (
          <Card key={article.id} className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <Badge variant="secondary" className="mb-2">Featured</Badge>
                    <CardTitle className="text-xl">{article.title}</CardTitle>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{article.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <Badge variant="outline">{article.category}</Badge>
                  <span>{article.readTime} read</span>
                </div>
                <Button>Read Article</Button>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.filter(article => !article.featured).map((article) => {
          const IconComponent = article.icon;
          return (
            <Card key={article.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-xs">{article.category}</Badge>
                </div>
                <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{article.readTime} read</span>
                  <Button variant="outline" size="sm">Read More</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-secondary/10 to-primary/10 border-primary/20">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold mb-4">Ready to Take Control of Your Finances?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Join thousands of Indians who are building wealth with our personalized financial platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Start Your Journey</Button>
            <Button variant="outline" size="lg">Download Free Guide</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentHub;
