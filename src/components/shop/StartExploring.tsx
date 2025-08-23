
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';

const StartExploring = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Fast Delivery',
      description: 'Get your orders delivered within 24 hours'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure Payment',
      description: 'Your payments are safe and secure with us'
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $50'
    }
  ];

  return (
    <Card className="h-full">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Start Exploring</h2>
          <p className="text-gray-600">
            Discover thousands of products from top brands and sellers worldwide.
            Get the best deals and fastest delivery right to your door.
          </p>
        </div>
        
        <div className="space-y-4 mb-6 flex-1">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="text-blue-600 mt-1">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link to="/shop">
              Start Shopping
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="w-full">
            <Link to="/categories">
              Browse Categories
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StartExploring;
