
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ChevronRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center px-4 max-w-3xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center h-16 w-16 bg-green-600 rounded-full shadow-lg">
            <ShoppingBag className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Welcome to Dealport Shopping</h1>
        <p className="text-xl text-gray-600 mb-8">
          Your one-stop destination for all your shopping needs with amazing deals and exclusive products.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <Link to="/shop">Start Shopping</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-1">
            <Link to="/about">
              Learn More
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center">
            <div className="bg-green-50 rounded-full p-3 mb-3">
              <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium">Fast Delivery</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-green-50 rounded-full p-3 mb-3">
              <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium">Quality Products</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-green-50 rounded-full p-3 mb-3">
              <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="text-sm font-medium">Customer Support</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-green-50 rounded-full p-3 mb-3">
              <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <span className="text-sm font-medium">Secure Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
