
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BestSellingProducts = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Best selling product</h2>
        <Link to="/best-selling" className="text-sm border border-gray-300 rounded px-4 py-1 hover:bg-gray-50">
          View All
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="relative rounded-md overflow-hidden md:col-span-2 md:row-span-2 group h-[500px]">
          <div className="absolute top-4 left-0 bg-red-600 text-white text-xs font-bold px-4 py-1 uppercase z-10">
            Hot Deal
          </div>
          <img 
            src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2042&auto=format&fit=crop" 
            alt="Computer Accessories" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
            <h3 className="text-white text-xl font-bold mb-2">Computer Accessories</h3>
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
              </div>
              <span className="text-white text-sm">(5.0)</span>
            </div>
            <div className="flex justify-between items-center">
              <Button className="bg-white text-gray-800 hover:bg-gray-100">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Shop Now
              </Button>
              <div className="text-white">
                <span className="text-xl font-bold mr-2">$50</span>
                <span className="text-sm line-through">$75</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative rounded-md overflow-hidden bg-black group h-60">
          <img 
            src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop" 
            alt="Men's Fashion" 
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 p-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <span className="text-white font-semibold">Men's Fashion</span>
              <div className="text-white bg-gray-800 bg-opacity-50 rounded-md px-2 py-1 text-xs">
                1,200+
              </div>
            </div>
            <div className="text-white">
              <span className="text-sm font-medium mr-2">From</span>
              <span className="text-lg font-bold">$50</span>
            </div>
          </div>
        </div>
        
        <div className="relative rounded-md overflow-hidden bg-red-600 group h-60">
          <div className="absolute top-4 left-0 bg-white text-red-600 text-xs font-bold px-4 py-1 uppercase z-10">
            Deal
          </div>
          <img 
            src="https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=1971&auto=format&fit=crop" 
            alt="Dog Food" 
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-red-600 to-transparent">
            <div className="text-white">
              <div className="text-lg font-bold">DOG FOOD SALE 40% OFF</div>
              <div className="text-sm">Made with love</div>
            </div>
          </div>
        </div>
        
        <div className="relative rounded-md overflow-hidden h-60 bg-blue-500 group">
          <img 
            src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=2070&auto=format&fit=crop" 
            alt="Cameras" 
            className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button className="bg-white text-gray-800 hover:bg-gray-100">
              Shop Now
            </Button>
          </div>
        </div>
        
        <div className="relative rounded-md overflow-hidden h-60 bg-blue-600 group md:col-span-2">
          <img 
            src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2064&auto=format&fit=crop" 
            alt="We Love Dogs" 
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 p-4 flex flex-col justify-end">
            <div className="text-white mb-2">
              <div className="text-2xl font-bold">WE LOVE DOGS</div>
              <div className="text-sm">Treats, toys, accessories and more</div>
            </div>
            <Button className="bg-blue-500 text-white hover:bg-blue-600 w-max">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellingProducts;
