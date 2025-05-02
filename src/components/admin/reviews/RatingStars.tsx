
import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
}

const RatingStars = ({ rating }: RatingStarsProps) => {
  return (
    <div className="flex">
      {Array(5).fill(0).map((_, index) => (
        <Star 
          key={index} 
          className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
        />
      ))}
    </div>
  );
};

export default RatingStars;
