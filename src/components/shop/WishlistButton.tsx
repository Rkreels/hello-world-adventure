import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

interface WishlistButtonProps {
  productId: string | number;
  productName: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

const WishlistButton = ({ 
  productId, 
  productName, 
  variant = 'outline', 
  size = 'sm',
  className = '' 
}: WishlistButtonProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      toast.success(`${productName} added to wishlist`);
    } else {
      toast.info(`${productName} removed from wishlist`);
    }
  };

  return (
    <Button 
      variant={variant}
      size={size}
      className={`${isWishlisted ? 'text-red-500 border-red-500' : ''} ${className}`}
      onClick={handleWishlistToggle}
    >
      <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
    </Button>
  );
};

export default WishlistButton;