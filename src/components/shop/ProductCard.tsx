
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  rating: number;
  reviewsCount: number;
  inStock?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price);
  };
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }
    
    // Half star
    if (halfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
        </svg>
      );
    }
    
    // Empty stars
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }
    
    return stars;
  };
  
  const addToCart = () => {
    toast.success(`${product.name} added to cart!`);
  };
  
  const addToWishlist = () => {
    toast.success(`${product.name} added to wishlist!`);
  };

  return (
    <Card className="overflow-hidden group h-full flex flex-col">
      <div className="relative overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        
        {product.discountPrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
          </div>
        )}
        
        <button 
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100"
          onClick={addToWishlist}
        >
          <Heart className="h-4 w-4 text-gray-600" />
        </button>
      </div>
      
      <CardContent className="flex flex-col flex-grow p-4">
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        
        <div className="flex items-center mb-2">
          <div className="flex mr-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-xs text-gray-600">({product.reviewsCount})</span>
        </div>
        
        <div className="mb-3">
          {product.discountPrice ? (
            <div className="flex items-center">
              <span className="text-lg font-bold text-gray-800">{formatPrice(product.discountPrice)}</span>
              <span className="ml-2 text-sm text-gray-500 line-through">{formatPrice(product.price)}</span>
            </div>
          ) : (
            <span className="text-lg font-bold text-gray-800">{formatPrice(product.price)}</span>
          )}
        </div>
        
        <div className="mt-auto">
          <Button 
            onClick={addToCart} 
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={product.inStock === false}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            {product.inStock === false ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
