
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const StartExploring = () => {
  const categories = [
    { name: 'Grocery', icon: '🛒', path: '/category/grocery' },
    { name: 'Home', icon: '🏠', path: '/category/home' },
    { name: 'Fashion', icon: '👔', path: '/category/fashion' },
    { name: 'Electronics', icon: '📱', path: '/category/electronics' },
    { name: 'Toys', icon: '🧸', path: '/category/toys' },
    { name: 'Gifts', icon: '🎁', path: '/category/gifts' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Start exploring now</h2>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link 
            key={category.name}
            to={category.path}
            className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <span className="text-4xl mb-2">{category.icon}</span>
            <span className="text-sm text-gray-600">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StartExploring;
