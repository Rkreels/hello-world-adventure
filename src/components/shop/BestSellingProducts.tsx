
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { shopProducts } from '@/data/shopProducts';

const BestSellingProducts = () => {
  // Pick most-reviewed products as best sellers
  const products = shopProducts
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 3)
    .map((p, i) => ({
      ...p,
      badge: i === 0 ? '#1 Best Seller' : i === 1 ? 'Popular' : 'Top Rated'
    }));

  const handleAddToCart = (name: string) => {
    toast.success(`${name} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Best Selling Products</h2>
        <Button variant="outline" asChild>
          <Link to="/shop?sort=bestselling">View All</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
            <CardContent className="p-0">
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </Link>
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary">{product.badge}</Badge>
                </div>
              </div>
              
              <div className="p-4">
                <Link to={`/products/${product.id}`}>
                  <h3 className="font-medium mb-2 hover:text-blue-600">{product.name}</h3>
                </Link>
                
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm ml-1">{product.rating}</span>
                  <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold">${product.price}</span>
                  <span className="text-sm text-gray-500 line-through">${product.oldPrice}</span>
                </div>
                
                <Button className="w-full" size="sm" onClick={() => handleAddToCart(product.name)}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BestSellingProducts;
