
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-6 p-6">
        <h2 className="text-2xl font-bold text-gray-800">Start exploring now</h2>
        <Button variant="ghost" size="sm" className="text-primary flex items-center group">
          View All
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
      
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 p-6">
        {categories.map((category) => (
          <Link 
            key={category.name}
            to={category.path}
            className="flex flex-col items-center p-4 bg-white hover:bg-gray-50 rounded-lg transition-all duration-300 border border-gray-100 shadow-sm hover:shadow-md transform hover:-translate-y-1"
          >
            <span className="text-4xl mb-3">{category.icon}</span>
            <span className="text-sm font-medium text-gray-800 text-center">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StartExploring;
