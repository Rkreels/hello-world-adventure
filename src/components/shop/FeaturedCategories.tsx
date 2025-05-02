
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const FeaturedCategories = () => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden shadow hover:shadow-lg transition-all duration-300 bg-white">
        <CardContent className="p-0">
          <div className="relative h-64 bg-gray-100">
            <img 
              src="/lovable-uploads/01c6fb91-b0da-4976-81df-07a0dacddee3.png"
              alt="New Year! New Fashion" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="font-semibold text-xl mb-2">New Year! New Fashion</h3>
              <Button 
                asChild
                size="sm" 
                className="bg-transparent border border-white hover:bg-white/20 text-white"
              >
                <Link to="/category/fashion">Shop Now</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeaturedCategories;
