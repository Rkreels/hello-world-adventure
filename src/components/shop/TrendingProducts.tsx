
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart } from 'lucide-react';

const TrendingProducts = () => {
  const products = [
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: 79.99,
      originalPrice: 99.99,
      image: '/placeholder.svg',
      rating: 4.5,
      reviews: 128
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      price: 199.99,
      originalPrice: 249.99,
      image: '/placeholder.svg',
      rating: 4.8,
      reviews: 256
    },
    {
      id: '3',
      name: 'Portable Bluetooth Speaker',
      price: 49.99,
      originalPrice: 69.99,
      image: '/placeholder.svg',
      rating: 4.3,
      reviews: 89
    },
    {
      id: '4',
      name: 'USB-C Fast Charger',
      price: 24.99,
      originalPrice: 34.99,
      image: '/placeholder.svg',
      rating: 4.6,
      reviews: 145
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Trending Products</h2>
        <Button variant="outline" asChild>
          <Link to="/shop">View All</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Sale
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium mb-2 line-clamp-2">{product.name}</h3>
                
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-lg font-bold">${product.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ${product.originalPrice}
                    </span>
                  </div>
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

export default TrendingProducts;
