
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ShopLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          {/* Top bar */}
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Deliver to</span>
              </div>
              <span>EN</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>Sign in</span>
              </Link>
              <Link to="/cart" className="flex items-center">
                <ShoppingCart className="h-4 w-4 mr-1" />
                <span>Cart</span>
              </Link>
            </div>
          </div>
          
          {/* Main header */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-green-600">DEALPORT</span>
              </Link>
            </div>
            
            <div className="flex-1 max-w-2xl mx-4 hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="What're you looking for?"
                  className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Button size="sm" className="absolute right-0 top-0 h-full rounded-l-none">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-6">
              <Link to="/" className="text-sm font-medium">Home</Link>
              <Link to="/products" className="text-sm font-medium">Product</Link>
              <Link to="/about" className="text-sm font-medium">About Us</Link>
              <Link to="/contact" className="text-sm font-medium">Contact</Link>
            </div>
          </div>
          
          {/* Category nav - visible on smaller screens */}
          <div className="md:hidden py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="What're you looking for?"
                className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Button size="sm" className="absolute right-0 top-0 h-full rounded-l-none">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Category nav */}
          <nav className="flex justify-between items-center overflow-x-auto py-3 text-sm border-t border-gray-100">
            <button className="flex items-center px-3 py-1">
              <Menu className="h-4 w-4 mr-1" />
              <span>Menu</span>
            </button>
            <Link to="/category/explore" className="px-3 py-1 whitespace-nowrap">Explore</Link>
            <Link to="/category/deals" className="px-3 py-1 whitespace-nowrap">Deals</Link>
            <Link to="/category/saved" className="px-3 py-1 whitespace-nowrap">Saved</Link>
            
            <div className="flex items-center space-x-6">
              <Link to="/" className="font-medium text-green-600">Home</Link>
              <Link to="/products" className="font-medium">Product</Link>
              <Link to="/about" className="font-medium">About Us</Link>
              <Link to="/contact" className="font-medium">Contact</Link>
              <Link to="/see-all-categories" className="font-medium text-green-600">See more</Link>
            </div>
          </nav>
          
          {/* Subcategories */}
          <div className="overflow-x-auto py-2 text-xs border-t border-gray-100">
            <div className="flex space-x-5">
              <Link to="/category/price" className="whitespace-nowrap">Price</Link>
              <Link to="/category/deliver" className="whitespace-nowrap">Deliver</Link>
              <Link to="/category/rating" className="whitespace-nowrap">Rating</Link>
              <Link to="/category/grocery" className="whitespace-nowrap">Grocery & Fresh Foods</Link>
              <Link to="/category/electronics" className="whitespace-nowrap">Electronics</Link>
              <Link to="/category/shoes" className="whitespace-nowrap">Shoes</Link>
              <Link to="/category/account" className="whitespace-nowrap">Account Sales</Link>
              <Link to="/category/health" className="whitespace-nowrap">Health</Link>
              <Link to="/category/fashionable" className="whitespace-nowrap">Fashionable accessories</Link>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      <footer className="bg-[#f8f9f6] pt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10">
            <div>
              <h3 className="font-semibold mb-4">Company Info</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-sm text-gray-600 hover:text-gray-900">About Us</Link></li>
                <li><Link to="/blog" className="text-sm text-gray-600 hover:text-gray-900">Blog</Link></li>
                <li><Link to="/careers" className="text-sm text-gray-600 hover:text-gray-900">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Customer Support</h3>
              <ul className="space-y-2">
                <li><Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact Us</Link></li>
                <li><Link to="/faq" className="text-sm text-gray-600 hover:text-gray-900">Help Center (FAQ)</Link></li>
                <li><Link to="/returns" className="text-sm text-gray-600 hover:text-gray-900">Returns & Refunds</Link></li>
                <li><Link to="/shipping-information" className="text-sm text-gray-600 hover:text-gray-900">Shipping Information</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Explore</h3>
              <ul className="space-y-2">
                <li><Link to="/categories" className="text-sm text-gray-600 hover:text-gray-900">Categories</Link></li>
                <li><Link to="/deals" className="text-sm text-gray-600 hover:text-gray-900">Deals</Link></li>
                <li><Link to="/new-arrivals" className="text-sm text-gray-600 hover:text-gray-900">New Arrivals</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900">Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
                <li><Link to="/cookie" className="text-sm text-gray-600 hover:text-gray-900">Cookie Policy</Link></li>
                <li><Link to="/accessibility" className="text-sm text-gray-600 hover:text-gray-900">Accessibility Statement</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="py-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <span className="text-xl font-bold text-green-600">DEALPORT</span>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="#" className="text-gray-600 hover:text-gray-900">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10zm-10 6a6 6 0 100-12 6 6 0 000 12z" /></svg>
                </Link>
                <Link to="#" className="text-gray-600 hover:text-gray-900">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10zm-10 6a6 6 0 100-12 6 6 0 000 12z" /></svg>
                </Link>
                <Link to="#" className="text-gray-600 hover:text-gray-900">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10zm-10 6a6 6 0 100-12 6 6 0 000 12z" /></svg>
                </Link>
                <Link to="#" className="text-gray-600 hover:text-gray-900">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10zm-10 6a6 6 0 100-12 6 6 0 000 12z" /></svg>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="py-4 text-sm text-center text-gray-600 border-t border-gray-200">
            © 2023 Dealport. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShopLayout;
