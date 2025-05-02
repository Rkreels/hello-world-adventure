
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const StartExploring = () => {
  return (
    <div className="bg-white rounded-md shadow hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-2 p-4">
        <h2 className="text-lg font-medium text-gray-800">Gaming accessories</h2>
        <Link to="/category/accessories" className="text-blue-600 text-sm hover:underline">
          See more
        </Link>
      </div>
      
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="group">
          <div className="bg-gray-50 p-2 rounded-md flex flex-col items-center">
            <div className="h-32 mb-1 overflow-hidden flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=2070&auto=format&fit=crop" 
                alt="Headset" 
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-xs font-medium text-gray-800">Headsets</span>
          </div>
        </div>
        <div className="group">
          <div className="bg-gray-50 p-2 rounded-md flex flex-col items-center">
            <div className="h-32 mb-1 overflow-hidden flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1623820919239-0d0ff10797a1?q=80&w=2070&auto=format&fit=crop" 
                alt="Mouse" 
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-xs font-medium text-gray-800">Mouse</span>
          </div>
        </div>
        <div className="group">
          <div className="bg-gray-50 p-2 rounded-md flex flex-col items-center">
            <div className="h-32 mb-1 overflow-hidden flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1606318801954-d46d46d3360a?q=80&w=2070&auto=format&fit=crop" 
                alt="Controller" 
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-xs font-medium text-gray-800">Controller</span>
          </div>
        </div>
        <div className="group">
          <div className="bg-gray-50 p-2 rounded-md flex flex-col items-center">
            <div className="h-32 mb-1 overflow-hidden flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=2070&auto=format&fit=crop" 
                alt="Chair" 
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-xs font-medium text-gray-800">Chair</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartExploring;
