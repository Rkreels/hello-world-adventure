
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BestSellingProducts = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Best selling product</h2>
        <Link to="/best-selling" className="text-sm hover:text-primary">
          View All
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Main Featured Product */}
        <div className="md:col-span-6 relative group">
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            <div className="absolute top-4 left-0 bg-red-600 text-white text-xs font-bold px-4 py-1 uppercase z-10">
              Deal
            </div>
            <img 
              src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2042&auto=format&fit=crop" 
              alt="Computer Accessories" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-white text-xl font-bold mb-2">Computer Accessories</h3>
              <Link 
                to="/category/computer-accessories"
                className="text-white bg-green-500 hover:bg-green-600 px-6 py-2 rounded-md inline-block w-max"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Secondary Products Grid */}
        <div className="md:col-span-6 grid grid-cols-2 gap-4">
          {/* Black Fashion */}
          <div className="relative group h-[190px]">
            <img 
              src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop" 
              alt="Black Fashion" 
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/40 p-4 rounded-lg">
              <span className="text-white font-semibold">Black Fashion</span>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-sm">Starting from</span>
                <p className="font-bold">$50.00</p>
              </div>
            </div>
          </div>

          {/* Dog Food */}
          <div className="relative group h-[190px] bg-blue-500 rounded-lg overflow-hidden">
            <div className="absolute top-4 left-0 bg-white text-blue-600 text-xs font-bold px-4 py-1 uppercase z-10">
              Sale
            </div>
            <img 
              src="https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=1971&auto=format&fit=crop" 
              alt="Dog Food" 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              <h3 className="text-white font-bold">DOG FOOD</h3>
              <div className="text-white">
                <p className="text-sm">40% OFF</p>
                <span className="text-xs">Made with love</span>
              </div>
            </div>
          </div>

          {/* Cameras */}
          <div className="relative group h-[190px]">
            <img 
              src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=2070&auto=format&fit=crop" 
              alt="Cameras" 
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button className="bg-white text-gray-800 hover:bg-gray-100">
                Shop Now
              </Button>
            </div>
          </div>

          {/* We Love Dogs */}
          <div className="relative group h-[190px] bg-blue-600 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2064&auto=format&fit=crop" 
              alt="We Love Dogs" 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 p-4 flex flex-col justify-end">
              <div className="text-white">
                <h3 className="font-bold text-lg">WE LOVE DOGS</h3>
                <p className="text-sm">Treats, toys & more</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellingProducts;
