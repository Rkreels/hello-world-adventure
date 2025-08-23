
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: '/placeholder.svg',
      rating: 5,
      comment: 'Amazing products and fast delivery! Highly recommend this store.',
      product: 'Wireless Headphones',
      date: '2 days ago'
    },
    {
      id: 2,
      name: 'Mike Chen',
      avatar: '/placeholder.svg',
      rating: 5,
      comment: 'Great customer service and quality products. Will shop again!',
      product: 'Smart Watch',
      date: '1 week ago'
    },
    {
      id: 3,
      name: 'Emily Davis',
      avatar: '/placeholder.svg',
      rating: 4,
      comment: 'Good value for money. The item arrived exactly as described.',
      product: 'Bluetooth Speaker',
      date: '2 weeks ago'
    }
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">What Our Customers Say</h2>
          <p className="text-gray-600">Real reviews from real customers</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{review.name}</h3>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-3">"{review.comment}"</p>
                
                <div className="text-sm text-gray-500">
                  <div>Product: {review.product}</div>
                  <div>{review.date}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
