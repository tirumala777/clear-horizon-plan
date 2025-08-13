
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  company: string;
}

const AdBanner = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Mock ads data - in production, you'd fetch from a real ad service
  const mockAds: Ad[] = [
    {
      id: '1',
      title: 'Boost Your Business Growth',
      description: 'Get 50% off premium analytics tools',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=150&fit=crop',
      link: '#',
      company: 'Analytics Pro'
    },
    {
      id: '2',
      title: 'Free Marketing Consultation',
      description: 'Expert advice to grow your revenue',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=150&fit=crop',
      link: '#',
      company: 'Growth Partners'
    },
    {
      id: '3',
      title: 'Cloud Storage Solution',
      description: 'Secure your business data today',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=150&fit=crop',
      link: '#',
      company: 'CloudSecure'
    }
  ];

  useEffect(() => {
    setAds(mockAds);
  }, []);

  useEffect(() => {
    if (ads.length > 1) {
      const interval = setInterval(() => {
        setCurrentAdIndex((prev) => (prev + 1) % ads.length);
      }, 10000); // Change ad every 10 seconds

      return () => clearInterval(interval);
    }
  }, [ads.length]);

  if (!isVisible || ads.length === 0) return null;

  const currentAd = ads[currentAdIndex];

  return (
    <Card className="relative p-4 mb-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-6 w-6"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
      </Button>
      
      <div className="flex items-center space-x-4">
        <img
          src={currentAd.image}
          alt={currentAd.title}
          className="w-20 h-12 object-cover rounded"
        />
        <div className="flex-1">
          <h4 className="font-semibold text-sm">{currentAd.title}</h4>
          <p className="text-xs text-muted-foreground">{currentAd.description}</p>
          <p className="text-xs text-primary font-medium">{currentAd.company}</p>
        </div>
        <Button size="sm" variant="outline">
          Learn More
        </Button>
      </div>
      
      {ads.length > 1 && (
        <div className="flex justify-center mt-3 space-x-1">
          {ads.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentAdIndex ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      )}
    </Card>
  );
};

export default AdBanner;
