import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const TrendingProducts = () => {
  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8 pl-2">
          <h2 className="text-2xl font-semibold">Trending Product</h2>
          <Link to="/shop" className="text-sm border border-gray-300 rounded px-4 py-1 hover:bg-gray-50">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Radiant Glow Hydrating Serum */}
          <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="h-full shadow hover:shadow-lg">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <Link to="/products/1">
                    <img 
                      src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1974&auto=format&fit=crop" 
                      alt="Radiant Glow Hydrating Serum" 
                      className="w-full h-48 object-cover rounded"
                    />
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    New
                  </div>
                </div>
                
                <div className="mb-2">
                  <Link to="/category/skincare" className="text-xs text-gray-500">
                    Dermalogical Certified by SaltForm
                  </Link>
                  <div className="flex text-yellow-400 mb-1">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <span className="text-xs text-gray-500 ml-1">(287)</span>
                  </div>
                  <Link to="/products/1" className="font-medium block">
                    Radiant Glow Hydrating Serum
                  </Link>
                </div>
                
                <div className="flex items-center mb-3">
                  <span className="text-lg font-semibold">$29.99</span>
                  <span className="text-sm text-gray-500 line-through ml-2">$39.99</span>
                  <span className="text-xs text-green-600 ml-2">-25% OFF</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Link to="/products/1">View Details</Link>
                  </Button>
                  <Button className="bg-green-500 hover:bg-green-600">
                    Add to cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Modern Minimalist Vase */}
          <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="h-full shadow hover:shadow-lg">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <Link to="/products/2">
                    <img 
                      src="https://images.unsplash.com/photo-1602746588630-8ce6147c406c?q=80&w=1964&auto=format&fit=crop" 
                      alt="Modern Minimalist Vase" 
                      className="w-full h-48 object-cover rounded"
                    />
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mb-2">
                  <Link to="/category/home-decor" className="text-xs text-gray-500">
                    Design in Denmark, Minted in Germany
                  </Link>
                  <div className="flex text-yellow-400 mb-1">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4" />
                    <span className="text-xs text-gray-500 ml-1">(186)</span>
                  </div>
                  <Link to="/products/2" className="font-medium block">
                    Modern Minimalist Vase
                  </Link>
                </div>
                
                <div className="flex items-center mb-3">
                  <span className="text-lg font-semibold">$49.99</span>
                  <span className="text-sm text-gray-500 line-through ml-2">$69.99</span>
                  <span className="text-xs text-green-600 ml-2">-30% OFF</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Link to="/products/2">View Details</Link>
                  </Button>
                  <Button className="bg-green-500 hover:bg-green-600">
                    Add to cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* FitPro Smartwatch */}
          <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="h-full shadow hover:shadow-lg">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <Link to="/products/3">
                    <img 
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop" 
                      alt="FitPro 3000 Smartwatch" 
                      className="w-full h-48 object-cover rounded"
                    />
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    Popular
                  </div>
                </div>
                
                <div className="mb-2">
                  <Link to="/category/wearables" className="text-xs text-gray-500">
                    Leading Fitness Tech by GadgetPro
                  </Link>
                  <div className="flex text-yellow-400 mb-1">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <span className="text-xs text-gray-500 ml-1">(152)</span>
                  </div>
                  <Link to="/products/3" className="font-medium block">
                    FitPro 3000 Smartwatch
                  </Link>
                </div>
                
                <div className="flex items-center mb-3">
                  <span className="text-lg font-semibold">$119.99</span>
                  <span className="text-sm text-gray-500 line-through ml-2">$149.99</span>
                  <span className="text-xs text-green-600 ml-2">-20% OFF</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Link to="/products/3">View Details</Link>
                  </Button>
                  <Button className="bg-green-500 hover:bg-green-600">
                    Add to cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Trend collection for men */}
          <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="h-full shadow hover:shadow-lg">
              <CardContent className="p-4">
                <div className="h-full flex flex-col">
                  <h3 className="font-medium mb-3">Trend collection for men</h3>
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    <div>
                      <img 
                        src="https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=1974&auto=format&fit=crop" 
                        alt="Pants" 
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <div className="text-sm">
                        <div className="flex items-center">
                          <span className="font-medium mr-1">$54.99</span>
                          <span className="text-xs text-green-600">-25%</span>
                        </div>
                        <span className="text-xs text-gray-500 line-through">$73.32</span>
                      </div>
                    </div>
                    <div>
                      <img 
                        src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=2015&auto=format&fit=crop" 
                        alt="Shirt" 
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <div className="text-sm">
                        <div className="flex items-center">
                          <span className="font-medium mr-1">$34.99</span>
                          <span className="text-xs text-green-600">-30%</span>
                        </div>
                        <span className="text-xs text-gray-500 line-through">$49.99</span>
                      </div>
                    </div>
                    <div>
                      <img 
                        src="https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1974&auto=format&fit=crop" 
                        alt="Hat" 
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <div className="text-sm">
                        <div className="flex items-center">
                          <span className="font-medium mr-1">$19.99</span>
                          <span className="text-xs text-green-600">-15%</span>
                        </div>
                        <span className="text-xs text-gray-500 line-through">$23.49</span>
                      </div>
                    </div>
                    <div>
                      <img 
                        src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=2080&auto=format&fit=crop" 
                        alt="Shoes" 
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <div className="text-sm">
                        <div className="flex items-center">
                          <span className="font-medium mr-1">$89.99</span>
                          <span className="text-xs text-green-600">-40%</span>
                        </div>
                        <span className="text-xs text-gray-500 line-through">$149.99</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4 w-full"
                  >
                    <Link to="/category/mens">See All</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;
