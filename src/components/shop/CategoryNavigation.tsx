
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CategoryNavigation = () => {
  const categories = [
    { id: 'electronics', name: 'Electronics', path: '/category/electronics' },
    { id: 'fashion', name: 'Fashion', path: '/category/fashion' },
    { id: 'home', name: 'Home & Garden', path: '/category/home' },
    { id: 'sports', name: 'Sports & Outdoors', path: '/category/sports' },
    { id: 'books', name: 'Books', path: '/category/books' },
    { id: 'toys', name: 'Toys & Games', path: '/category/toys' },
    { id: 'beauty', name: 'Beauty', path: '/category/beauty' },
    { id: 'automotive', name: 'Automotive', path: '/category/automotive' }
  ];

  return (
    <div className="bg-gray-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-1 py-3 overflow-x-auto">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/deals" className="whitespace-nowrap">
              🔥 Deals
            </Link>
          </Button>
          
          {categories.map((category) => (
            <Button key={category.id} variant="ghost" size="sm" asChild>
              <Link to={category.path} className="whitespace-nowrap">
                {category.name}
              </Link>
            </Button>
          ))}
          
          <Button variant="ghost" size="sm" asChild>
            <Link to="/new-arrivals" className="whitespace-nowrap">
              ✨ New Arrivals
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryNavigation;
