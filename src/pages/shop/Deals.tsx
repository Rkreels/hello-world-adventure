
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Deals = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Deals & Promotions</h1>
      <p className="text-gray-600 mb-6">Browse our best offers, discounts, and promotions</p>
      <Separator className="mb-8" />
      
      <Tabs defaultValue="all" className="mb-10">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Deals</TabsTrigger>
          <TabsTrigger value="flash">Flash Deals</TabsTrigger>
          <TabsTrigger value="clearance">Clearance</TabsTrigger>
          <TabsTrigger value="bundle">Bundle Offers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-8">
          {/* Featured Deal Banner */}
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop"
              alt="End of Season Sale" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center px-8">
              <h2 className="text-3xl font-bold text-white mb-4">End of Season Sale</h2>
              <p className="text-xl text-white mb-6">Up to 70% Off on Selected Items</p>
              <Button className="bg-green-500 hover:bg-green-600 w-max">
                <Link to="/category/sale">Shop Now</Link>
              </Button>
            </div>
          </div>
          
          {/* Deal Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-500 text-xl font-bold">50%</span>
                </div>
                <h3 className="font-medium">50% Off & Above</h3>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="bg-orange-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-500 text-xl font-bold">40%</span>
                </div>
                <h3 className="font-medium">40% Off & Above</h3>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="bg-yellow-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-yellow-500 text-xl font-bold">30%</span>
                </div>
                <h3 className="font-medium">30% Off & Above</h3>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-500 text-xl font-bold">20%</span>
                </div>
                <h3 className="font-medium">20% Off & Above</h3>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-500 text-xl font-bold">10%</span>
                </div>
                <h3 className="font-medium">10% Off & Above</h3>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="bg-purple-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-500 text-xl font-bold">All</span>
                </div>
                <h3 className="font-medium">All Deals</h3>
              </CardContent>
            </Card>
          </div>
          
          {/* Deal Products */}
          <h2 className="text-2xl font-semibold mb-6">Today's Best Deals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product 1 */}
            <Card>
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop" 
                    alt="Wireless Headphones" 
                    className="w-full h-48 object-contain rounded"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    -55% OFF
                  </div>
                </div>
                
                <div className="mb-2">
                  <div className="flex text-yellow-400 mb-1">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <span className="text-xs text-gray-500 ml-1">(128)</span>
                  </div>
                  <h3 className="font-medium">Premium Wireless Headphones</h3>
                  <p className="text-xs text-gray-500">
                    Color: <span className="text-black">Black</span> | Type: <span className="text-black">Over-ear</span>
                  </p>
                </div>
                
                <div className="flex items-center mb-3">
                  <span className="text-lg font-semibold">$89.99</span>
                  <span className="text-sm text-gray-500 line-through ml-2">$199.99</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Link to="/products/headphones">View Details</Link>
                  </Button>
                  <Button className="bg-green-500 hover:bg-green-600">
                    Add to cart
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Product 2 */}
            <Card>
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=1974&auto=format&fit=crop" 
                    alt="Smart Watch" 
                    className="w-full h-48 object-contain rounded"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    -40% OFF
                  </div>
                </div>
                
                <div className="mb-2">
                  <div className="flex text-yellow-400 mb-1">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4" />
                    <span className="text-xs text-gray-500 ml-1">(95)</span>
                  </div>
                  <h3 className="font-medium">SmartFit Pro Watch</h3>
                  <p className="text-xs text-gray-500">
                    Color: <span className="text-black">Silver</span> | Size: <span className="text-black">One Size</span>
                  </p>
                </div>
                
                <div className="flex items-center mb-3">
                  <span className="text-lg font-semibold">$119.99</span>
                  <span className="text-sm text-gray-500 line-through ml-2">$199.99</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Link to="/products/smartwatch">View Details</Link>
                  </Button>
                  <Button className="bg-green-500 hover:bg-green-600">
                    Add to cart
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Product 3 */}
            <Card>
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1964&auto=format&fit=crop" 
                    alt="Wireless Earbuds" 
                    className="w-full h-48 object-contain rounded"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    -60% OFF
                  </div>
                </div>
                
                <div className="mb-2">
                  <div className="flex text-yellow-400 mb-1">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <span className="text-xs text-gray-500 ml-1">(212)</span>
                  </div>
                  <h3 className="font-medium">TrueSound Wireless Earbuds</h3>
                  <p className="text-xs text-gray-500">
                    Color: <span className="text-black">White</span> | Type: <span className="text-black">In-ear</span>
                  </p>
                </div>
                
                <div className="flex items-center mb-3">
                  <span className="text-lg font-semibold">$59.99</span>
                  <span className="text-sm text-gray-500 line-through ml-2">$149.99</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Link to="/products/earbuds">View Details</Link>
                  </Button>
                  <Button className="bg-green-500 hover:bg-green-600">
                    Add to cart
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Product 4 */}
            <Card>
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1607435097405-db48f377bff6?q=80&w=1931&auto=format&fit=crop" 
                    alt="Smart Speaker" 
                    className="w-full h-48 object-contain rounded"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    -45% OFF
                  </div>
                </div>
                
                <div className="mb-2">
                  <div className="flex text-yellow-400 mb-1">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4" />
                    <span className="text-xs text-gray-500 ml-1">(78)</span>
                  </div>
                  <h3 className="font-medium">EchoSphere Smart Speaker</h3>
                  <p className="text-xs text-gray-500">
                    Color: <span className="text-black">Black</span> | Type: <span className="text-black">Portable</span>
                  </p>
                </div>
                
                <div className="flex items-center mb-3">
                  <span className="text-lg font-semibold">$82.99</span>
                  <span className="text-sm text-gray-500 line-through ml-2">$149.99</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Link to="/products/speaker">View Details</Link>
                  </Button>
                  <Button className="bg-green-500 hover:bg-green-600">
                    Add to cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="flash">
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">Flash Deals Coming Soon</h3>
            <p className="text-gray-600">Check back at 12 PM daily for new flash deals</p>
          </div>
        </TabsContent>
        
        <TabsContent value="clearance">
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">Clearance Items</h3>
            <p className="text-gray-600">End of season clearance items will be listed here</p>
          </div>
        </TabsContent>
        
        <TabsContent value="bundle">
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">Bundle Offers</h3>
            <p className="text-gray-600">Special bundle deals will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Deals;
