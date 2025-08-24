
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <>
      {/* Hero Banner */}
      <div className="relative bg-teal-900 text-white">
        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold mb-4">
              Discover the Latest Deals – <br />
              <span className="text-5xl">Up to 50% Off!</span>
            </h1>
            <Button asChild className="mt-4 bg-white text-teal-900 hover:bg-gray-100">
              <Link to="/shop">Shop Now</Link>
            </Button>
          </div>
          
          {/* Navigation buttons */}
          <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 text-black">
            <ChevronLeft size={24} />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 text-black">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      
      {/* Category Cards */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Fashion Card */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <h2 className="text-xl font-bold">New Year! New Fashion</h2>
            </div>
            <div className="relative h-64 bg-gray-100">
              <img 
                src="/lovable-uploads/01c6fb91-b0da-4976-81df-07a0dacddee3.png"
                alt="Fashion collection" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4">
                <Button variant="secondary" size="sm" className="bg-white">
                  Shop Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Gaming Accessories */}
        <Card className="overflow-hidden md:col-span-2">
          <CardContent className="p-0">
            <div className="p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Gaming accessories</h2>
              <Link to="/category/electronics" className="text-purple-600 text-sm">
                See more
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 p-4">
              <div className="bg-gray-50 rounded p-4 text-center">
                <img 
                  src="https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_UY218_.jpg"
                  alt="Headsets" 
                  className="w-full h-32 object-contain mb-2"
                />
                <span className="text-sm">Headsets</span>
              </div>
              <div className="bg-gray-50 rounded p-4 text-center">
                <img 
                  src="https://m.media-amazon.com/images/I/61zpVYX+L9L._AC_UY218_.jpg"
                  alt="Mouse" 
                  className="w-full h-32 object-contain mb-2"
                />
                <span className="text-sm">Mouse</span>
              </div>
              <div className="bg-gray-50 rounded p-4 text-center">
                <img 
                  src="https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_UY218_.jpg"
                  alt="Controller" 
                  className="w-full h-32 object-contain mb-2"
                />
                <span className="text-sm">Controller</span>
              </div>
              <div className="bg-gray-50 rounded p-4 text-center">
                <img 
                  src="https://m.media-amazon.com/images/I/71-NXGWfYML._AC_UY218_.jpg"
                  alt="Chair" 
                  className="w-full h-32 object-contain mb-2"
                />
                <span className="text-sm">Chair</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Electronics Deals Cards */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 bg-red-50 relative">
              <div className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded-bl">
                SAVE $$$
              </div>
              <h3 className="font-bold">WIN THE WIFI</h3>
              <p className="text-red-600 font-semibold mt-1">$1599</p>
              <p className="text-xs mt-1">Gaming Laptop Deal</p>
              <Button variant="link" size="sm" className="text-xs mt-1 p-0">
                More details
              </Button>
            </div>
            <div className="h-32 bg-red-50 flex justify-center">
              <img 
                src="https://m.media-amazon.com/images/I/71lPDuOqgKL._AC_UY218_.jpg"
                alt="Gaming Laptop" 
                className="h-full object-contain"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Product Showcase */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 bg-gray-100 rounded-lg p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg">Trousers</h3>
            <h2 className="text-2xl font-bold mt-1">Fashion!</h2>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1473966968600-fa801b869a1a"
            alt="Trousers" 
            className="mt-4 w-full h-48 object-cover rounded"
          />
        </div>
        
        <div className="md:col-span-1 bg-gray-100 rounded-lg p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold">MEN'S FASHION</h2>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1509228627152-72ae9ae6848d"
            alt="Men's Watch" 
            className="mt-4 w-full h-48 object-cover rounded"
          />
          <Button className="mt-4 bg-gray-800 text-white hover:bg-gray-700 w-full">
            Shop Now
          </Button>
        </div>
        
        <div className="md:col-span-1 bg-gray-100 rounded-lg p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold">DENIM</h2>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1542272604-787c3835535d"
            alt="Denim collection" 
            className="mt-4 w-full h-48 object-cover rounded"
          />
          <Button variant="link" className="mt-4 text-blue-800">
            See more
          </Button>
        </div>
        
        <div className="md:col-span-1 bg-gray-100 rounded-lg p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-700">PHILIPS</h2>
            <p className="text-gray-600">Domestic Appliances</p>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1574269909862-7e1d70bb8078"
            alt="Philips appliances" 
            className="mt-4 w-full h-48 object-cover rounded"
          />
          <Button className="mt-4 bg-gray-800 text-white hover:bg-gray-700">
            Shop Now
          </Button>
        </div>
      </div>
    </>
  );
};

export default Index;
