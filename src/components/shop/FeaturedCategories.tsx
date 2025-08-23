
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const FeaturedCategories = () => {
  const categories = [
    {
      id: 'electronics',
      name: 'Electronics',
      image: '/placeholder.svg',
      itemCount: 245
    },
    {
      id: 'fashion',
      name: 'Fashion',
      image: '/placeholder.svg',
      itemCount: 180
    },
    {
      id: 'home',
      name: 'Home & Garden',
      image: '/placeholder.svg',
      itemCount: 120
    },
    {
      id: 'sports',
      name: 'Sports',
      image: '/placeholder.svg',
      itemCount: 95
    }
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Featured Categories</h2>
        <div className="space-y-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.itemCount} items</p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedCategories;
