
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const StartExploring = () => {
  const items = [
    {
      id: 1,
      name: "Headsets",
      image: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=2070&auto=format&fit=crop",
      link: "/category/headsets"
    },
    {
      id: 2,
      name: "Mouse",
      image: "https://images.unsplash.com/photo-1623820919239-0d0ff10797a1?q=80&w=2070&auto=format&fit=crop",
      link: "/category/mouse"
    },
    {
      id: 3,
      name: "Controller",
      image: "https://images.unsplash.com/photo-1606318801954-d46d46d3360a?q=80&w=2070&auto=format&fit=crop",
      link: "/category/controller"
    },
    {
      id: 4,
      name: "Chair",
      image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=2070&auto=format&fit=crop",
      link: "/category/chair"
    }
  ];
  
  return (
    <div className="bg-white rounded-md shadow hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-medium text-gray-800">Gaming accessories</h2>
        <Link to="/category/accessories" className="text-blue-600 text-sm hover:underline">
          See more
        </Link>
      </div>
      
      <div className="grid grid-cols-2 gap-4 p-4">
        {items.map(item => (
          <Link key={item.id} to={item.link} className="group">
            <motion.div 
              className="bg-gray-50 p-3 rounded-md flex flex-col items-center"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <div className="h-32 mb-1 overflow-hidden flex items-center justify-center">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-xs font-medium text-gray-800">{item.name}</span>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StartExploring;
