
import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  readOnly?: boolean;
  onRatingChange?: (rating: number) => void;
}

const RatingStars = ({ 
  rating, 
  maxRating = 5, 
  size = 4, 
  readOnly = true, 
  onRatingChange 
}: RatingStarsProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  
  const handleClick = (value: number) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(value);
    }
  };
  
  return (
    <div className="flex">
      {Array(maxRating).fill(0).map((_, index) => {
        const starValue = index + 1;
        const isActive = hoverRating !== null 
          ? starValue <= hoverRating 
          : starValue <= rating;
          
        return (
          <Star 
            key={index} 
            className={`h-${size} w-${size} ${
              isActive 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
            } ${!readOnly ? 'cursor-pointer' : ''}`}
            onMouseEnter={() => !readOnly && setHoverRating(starValue)}
            onMouseLeave={() => !readOnly && setHoverRating(null)}
            onClick={() => handleClick(starValue)}
          />
        );
      })}
    </div>
  );
};

export default RatingStars;
