
import { Link } from 'react-router-dom';

const CategoryBanners = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <Link to="/category/clothing" className="relative h-32 rounded-md overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop" 
            alt="Clothing" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="text-white font-medium text-lg">CLOTHING</span>
          </div>
        </Link>
        
        <Link to="/category/watches" className="relative h-32 rounded-md overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2099&auto=format&fit=crop" 
            alt="Men's Fashion" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="text-white font-medium text-lg">MEN'S FASHION</span>
          </div>
        </Link>
        
        <Link to="/category/denim" className="relative h-32 rounded-md overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=2070&auto=format&fit=crop" 
            alt="Denim" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="text-white font-medium text-lg">DENIM</span>
          </div>
        </Link>
        
        <Link to="/category/appliances" className="relative h-32 rounded-md overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1563245738-1a179bb42db4?q=80&w=1932&auto=format&fit=crop" 
            alt="Philips Appliances" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="text-white font-medium text-lg">PHILIPS APPLIANCES</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CategoryBanners;
