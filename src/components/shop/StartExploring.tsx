
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const StartExploring = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl overflow-hidden">
        <div className="py-14 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
          <div className="text-white text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Exploring Now</h2>
            <p className="text-white/80 text-lg max-w-md">
              Discover thousands of products with amazing deals and discounts. Shop with confidence!
            </p>
          </div>
          <div>
            <Button 
              asChild
              size="lg" 
              variant="outline" 
              className="bg-white text-blue-600 hover:bg-blue-50 border-none text-lg px-8 py-6 h-auto"
            >
              <Link to="/shop" className="flex items-center">
                Explore All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartExploring;
