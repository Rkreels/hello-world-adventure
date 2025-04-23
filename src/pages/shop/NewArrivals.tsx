
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const NewArrivals = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">New Arrivals</h1>
      <p className="text-gray-600 mb-6">Check out our newest products and latest additions</p>
      <Separator className="mb-8" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Product 1 */}
        <Card>
          <CardContent className="p-4">
            <div className="relative mb-4">
              <img 
                src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2070&auto=format&fit=crop" 
                alt="Smartwatch Pro" 
                className="w-full h-48 object-contain rounded"
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                NEW
              </div>
            </div>
            
            <div className="mb-2">
              <div className="flex text-yellow-400 mb-1">
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <span className="text-xs text-gray-500 ml-1">(12)</span>
              </div>
              <h3 className="font-medium">Smartwatch Pro X1</h3>
              <p className="text-xs text-gray-500">
                Color: <span className="text-black">Black</span> | Type: <span className="text-black">Sport</span>
              </p>
            </div>
            
            <div className="flex items-center mb-3">
              <span className="text-lg font-semibold">$249.99</span>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Link to="/products/smartwatch-pro-x1">View Details</Link>
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
                src="https://images.unsplash.com/photo-1585298723682-7115561c51b7?q=80&w=2036&auto=format&fit=crop" 
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
              <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                NEW
              </div>
            </div>
            
            <div className="mb-2">
              <div className="flex text-yellow-400 mb-1">
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4" />
                <span className="text-xs text-gray-500 ml-1">(8)</span>
              </div>
              <h3 className="font-medium">Noise-Cancelling Headphones</h3>
              <p className="text-xs text-gray-500">
                Color: <span className="text-black">Silver</span> | Type: <span className="text-black">Over-ear</span>
              </p>
            </div>
            
            <div className="flex items-center mb-3">
              <span className="text-lg font-semibold">$179.99</span>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Link to="/products/noise-cancelling-headphones">View Details</Link>
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
                src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=2065&auto=format&fit=crop" 
                alt="Laptop Ultra" 
                className="w-full h-48 object-contain rounded"
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                NEW
              </div>
            </div>
            
            <div className="mb-2">
              <div className="flex text-yellow-400 mb-1">
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <span className="text-xs text-gray-500 ml-1">(23)</span>
              </div>
              <h3 className="font-medium">UltraBook Pro 16"</h3>
              <p className="text-xs text-gray-500">
                Color: <span className="text-black">Space Gray</span> | RAM: <span className="text-black">16GB</span>
              </p>
            </div>
            
            <div className="flex items-center mb-3">
              <span className="text-lg font-semibold">$1,299.99</span>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Link to="/products/ultrabook-pro">View Details</Link>
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
                src="https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?q=80&w=1973&auto=format&fit=crop" 
                alt="Sneakers" 
                className="w-full h-48 object-contain rounded"
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                NEW
              </div>
            </div>
            
            <div className="mb-2">
              <div className="flex text-yellow-400 mb-1">
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4" />
                <span className="text-xs text-gray-500 ml-1">(17)</span>
              </div>
              <h3 className="font-medium">Athletic Performance Sneakers</h3>
              <p className="text-xs text-gray-500">
                Color: <span className="text-black">Black/Red</span> | Size: <span className="text-black">Multiple</span>
              </p>
            </div>
            
            <div className="flex items-center mb-3">
              <span className="text-lg font-semibold">$129.99</span>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Link to="/products/athletic-sneakers">View Details</Link>
              </Button>
              <Button className="bg-green-500 hover:bg-green-600">
                Add to cart
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Product 5 */}
        <Card>
          <CardContent className="p-4">
            <div className="relative mb-4">
              <img 
                src="https://images.unsplash.com/photo-1668722044732-a3712e77395c?q=80&w=2070&auto=format&fit=crop" 
                alt="Drone" 
                className="w-full h-48 object-contain rounded"
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                NEW
              </div>
            </div>
            
            <div className="mb-2">
              <div className="flex text-yellow-400 mb-1">
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <span className="text-xs text-gray-500 ml-1">(31)</span>
              </div>
              <h3 className="font-medium">SkyMaster 4K Drone</h3>
              <p className="text-xs text-gray-500">
                Color: <span className="text-black">White</span> | Camera: <span className="text-black">4K Ultra HD</span>
              </p>
            </div>
            
            <div className="flex items-center mb-3">
              <span className="text-lg font-semibold">$699.99</span>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Link to="/products/skymaster-drone">View Details</Link>
              </Button>
              <Button className="bg-green-500 hover:bg-green-600">
                Add to cart
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Product 6 */}
        <Card>
          <CardContent className="p-4">
            <div className="relative mb-4">
              <img 
                src="https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=2070&auto=format&fit=crop" 
                alt="Smart TV" 
                className="w-full h-48 object-contain rounded"
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                NEW
              </div>
            </div>
            
            <div className="mb-2">
              <div className="flex text-yellow-400 mb-1">
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4" />
                <span className="text-xs text-gray-500 ml-1">(14)</span>
              </div>
              <h3 className="font-medium">65" QLED Smart TV</h3>
              <p className="text-xs text-gray-500">
                Resolution: <span className="text-black">4K Ultra HD</span> | HDR: <span className="text-black">Yes</span>
              </p>
            </div>
            
            <div className="flex items-center mb-3">
              <span className="text-lg font-semibold">$899.99</span>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Link to="/products/qled-smart-tv">View Details</Link>
              </Button>
              <Button className="bg-green-500 hover:bg-green-600">
                Add to cart
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Product 7 */}
        <Card>
          <CardContent className="p-4">
            <div className="relative mb-4">
              <img 
                src="https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=2065&auto=format&fit=crop" 
                alt="Coffee Maker" 
                className="w-full h-48 object-contain rounded"
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                NEW
              </div>
            </div>
            
            <div className="mb-2">
              <div className="flex text-yellow-400 mb-1">
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <span className="text-xs text-gray-500 ml-1">(42)</span>
              </div>
              <h3 className="font-medium">Smart Coffee Maker</h3>
              <p className="text-xs text-gray-500">
                Color: <span className="text-black">Stainless Steel</span> | Capacity: <span className="text-black">12 Cup</span>
              </p>
            </div>
            
            <div className="flex items-center mb-3">
              <span className="text-lg font-semibold">$149.99</span>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Link to="/products/smart-coffee-maker">View Details</Link>
              </Button>
              <Button className="bg-green-500 hover:bg-green-600">
                Add to cart
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Product 8 */}
        <Card>
          <CardContent className="p-4">
            <div className="relative mb-4">
              <img 
                src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2069&auto=format&fit=crop" 
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
              <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                NEW
              </div>
            </div>
            
            <div className="mb-2">
              <div className="flex text-yellow-400 mb-1">
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4" />
                <span className="text-xs text-gray-500 ml-1">(19)</span>
              </div>
              <h3 className="font-medium">Premium Noise-Cancelling Earbuds</h3>
              <p className="text-xs text-gray-500">
                Color: <span className="text-black">Black</span> | Battery: <span className="text-black">24 Hour</span>
              </p>
            </div>
            
            <div className="flex items-center mb-3">
              <span className="text-lg font-semibold">$129.99</span>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Link to="/products/noise-cancelling-earbuds">View Details</Link>
              </Button>
              <Button className="bg-green-500 hover:bg-green-600">
                Add to cart
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewArrivals;
