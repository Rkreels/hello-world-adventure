
import React, { useState, useEffect } from 'react';
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
  const [currentRating, setCurrentRating] = useState<number>(rating);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  
  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);
  
  const handleClick = (value: number) => {
    if (!readOnly && onRatingChange) {
      setCurrentRating(value);
      onRatingChange(value);
    }
  };

  const sizeClasses = {
    1: 'h-1 w-1',
    2: 'h-2 w-2',
    3: 'h-3 w-3',
    4: 'h-4 w-4',
    5: 'h-5 w-5',
    6: 'h-6 w-6',
    8: 'h-8 w-8',
  };
  
  const starSize = sizeClasses[size as keyof typeof sizeClasses] || 'h-4 w-4';
  
  return (
    <div className="flex">
      {Array(maxRating).fill(0).map((_, index) => {
        const starValue = index + 1;
        const isActive = hoverRating !== null 
          ? starValue <= hoverRating 
          : starValue <= currentRating;
          
        return (
          <Star 
            key={index} 
            className={`${starSize} ${
              isActive 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
            } ${!readOnly ? 'cursor-pointer' : ''} transition-colors duration-150`}
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
