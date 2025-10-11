
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, ShoppingCart } from 'lucide-react';

const LimitedTimeDeals = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const deals = [
    {
      id: '8',
      name: 'Gaming Laptop RTX 4060',
      price: 899.99,
      originalPrice: 1299.99,
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80',
      discount: 31,
      stock: 5
    },
    {
      id: '9',
      name: '4K Webcam Pro',
      price: 129.99,
      originalPrice: 199.99,
      image: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=800&q=80',
      discount: 35,
      stock: 12
    }
  ];

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
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-2 left-2">
                  <Badge className="bg-red-500">{deal.discount}% OFF</Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary">Only {deal.stock} left!</Badge>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{deal.name}</h3>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-red-600">${deal.price}</span>
                    <span className="text-lg text-gray-500 line-through ml-2">
                      ${deal.originalPrice}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">You save</div>
                    <div className="font-bold text-green-600">
                      ${(deal.originalPrice - deal.price).toFixed(2)}
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-red-600 hover:bg-red-700">
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
