
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';

const BestSellingProducts = () => {
  const products = [
    {
      id: '5',
      name: 'Premium Coffee Maker',
      price: 159.99,
      image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80',
      rating: 4.7,
      reviews: 89,
      badge: '#1 Best Seller'
    },
    {
      id: '6',
      name: 'Ergonomic Office Chair',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80',
      rating: 4.6,
      reviews: 156,
      badge: 'Popular'
    },
    {
      id: '7',
      name: 'LED Desk Lamp',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
      rating: 4.4,
      reviews: 67,
      badge: 'Top Rated'
    }
  ];

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
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary">{product.badge}</Badge>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium mb-2">{product.name}</h3>
                
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold">${product.price}</span>
                </div>
                
                <Button className="w-full" size="sm">
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
