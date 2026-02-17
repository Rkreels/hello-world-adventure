
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { shopProducts } from '@/data/shopProducts';

const LimitedTimeDeals = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Pick highest discount products as deals
  const deals = shopProducts
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 2)
    .map(p => ({ ...p, stock: Math.floor(Math.random() * 10) + 3 }));

  const handleGrabDeal = (name: string) => {
    toast.success(`${name} added to cart!`);
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">⚡ Limited Time Deals</h2>
        <div className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-full">
          <Clock className="w-4 h-4" />
          <span className="font-mono font-bold">
            {String(timeLeft.hours).padStart(2, '0')}:
            {String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deals.map((deal) => (
          <Card key={deal.id} className="overflow-hidden border-2 border-red-200">
            <CardContent className="p-0">
              <div className="relative">
                <div className="aspect-video bg-gray-100">
                  <Link to={`/products/${deal.id}`}>
                    <img src={deal.image} alt={deal.name} className="w-full h-full object-cover" />
                  </Link>
                </div>
                <div className="absolute top-2 left-2">
                  <Badge className="bg-red-500">{deal.discount}% OFF</Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary">Only {deal.stock} left!</Badge>
                </div>
              </div>
              
              <div className="p-4">
                <Link to={`/products/${deal.id}`}>
                  <h3 className="font-bold text-lg mb-2 hover:text-blue-600">{deal.name}</h3>
                </Link>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-red-600">${deal.price}</span>
                    <span className="text-lg text-gray-500 line-through ml-2">${deal.oldPrice}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">You save</div>
                    <div className="font-bold text-green-600">${(deal.oldPrice - deal.price).toFixed(2)}</div>
                  </div>
                </div>
                
                <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => handleGrabDeal(deal.name)}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Grab This Deal
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LimitedTimeDeals;
