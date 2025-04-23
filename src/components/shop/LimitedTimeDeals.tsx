
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LimitedTimeDeals = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
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
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const deals = [
    {
      id: 1,
      title: "Wireless Headphones",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
      rating: 4.5,
      reviewCount: 128,
      currentPrice: 49.99,
      originalPrice: 89.99,
      discount: 45,
    },
    {
      id: 2,
      title: "Smart Watch",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2099&auto=format&fit=crop",
      rating: 4.7,
      reviewCount: 86,
      currentPrice: 129.99,
      originalPrice: 199.99,
      discount: 35,
    },
    {
      id: 3,
      title: "Bluetooth Speaker",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2069&auto=format&fit=crop",
      rating: 4.8,
      reviewCount: 213,
      currentPrice: 79.99,
      originalPrice: 129.99,
      discount: 40,
    },
    {
      id: 4,
      title: "Digital Camera",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=2070&auto=format&fit=crop",
      rating: 4.9,
      reviewCount: 95,
      currentPrice: 399.99,
      originalPrice: 599.99,
      discount: 33,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10 bg-gray-50 my-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold">Limited Time Deals</h2>
          <div className="ml-4 flex items-center space-x-1">
            <Clock className="h-5 w-5 text-red-600" />
            <div className="flex space-x-1 text-sm font-medium">
              <div className="bg-gray-800 text-white px-2 py-1 rounded">
                {timeLeft.hours.toString().padStart(2, '0')}
              </div>
              <span className="font-bold">:</span>
              <div className="bg-gray-800 text-white px-2 py-1 rounded">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </div>
              <span className="font-bold">:</span>
              <div className="bg-gray-800 text-white px-2 py-1 rounded">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>
        <Link to="/deals" className="text-sm border border-gray-300 rounded px-4 py-1 hover:bg-gray-50">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {deals.map(deal => (
          <Link key={deal.id} to={`/products/${deal.id}`} className="bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow group">
            <div className="relative">
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-sm">
                -{deal.discount}%
              </div>
              <div className="h-48 overflow-hidden">
                <img 
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-1">{deal.title}</h3>
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400 mr-1">
                  <Star className="h-4 w-4 fill-yellow-400" />
                  <span className="text-sm ml-1">{deal.rating}</span>
                </div>
                <span className="text-xs text-gray-500">({deal.reviewCount})</span>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-bold mr-2">${deal.currentPrice}</span>
                <span className="text-sm text-gray-500 line-through">${deal.originalPrice}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LimitedTimeDeals;
