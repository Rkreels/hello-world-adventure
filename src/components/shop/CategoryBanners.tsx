
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoryBanners = () => {
  return (
    <div className="container mx-auto px-6 py-4">
      <div className="pl-2 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Popular Categories</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/category/clothing" className="relative h-32 rounded-md overflow-hidden group block shadow hover:shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop" 
              alt="Clothing" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="text-white font-medium text-lg">CLOTHING</span>
            </div>
          </Link>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/category/watches" className="relative h-32 rounded-md overflow-hidden group block shadow hover:shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2099&auto=format&fit=crop" 
              alt="Men's Fashion" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="text-white font-medium text-lg">MEN'S FASHION</span>
            </div>
          </Link>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/category/denim" className="relative h-32 rounded-md overflow-hidden group block shadow hover:shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=2070&auto=format&fit=crop" 
              alt="Denim" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="text-white font-medium text-lg">DENIM</span>
            </div>
          </Link>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/category/appliances" className="relative h-32 rounded-md overflow-hidden group block shadow hover:shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1563245738-1a179bb42db4?q=80&w=1932&auto=format&fit=crop" 
              alt="Philips Appliances" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="text-white font-medium text-lg">PHILIPS APPLIANCES</span>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryBanners;
