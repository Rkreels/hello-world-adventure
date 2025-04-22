
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
              <Link to="/account" className="flex items-center">
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
                <img src="/logo.svg" alt="Dealport" className="h-7" />
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
              <Link to="/shop" className="text-sm font-medium">Shop</Link>
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
          <nav className="flex items-center justify-between overflow-x-auto py-2 text-sm hidden md:flex">
            <Link to="/category/all" className="px-3 py-1 whitespace-nowrap">All</Link>
            <Link to="/category/fashion" className="px-3 py-1 whitespace-nowrap">Fashion</Link>
            <Link to="/category/deals" className="px-3 py-1 whitespace-nowrap">Deals</Link>
            <Link to="/category/beauty" className="px-3 py-1 whitespace-nowrap">Beauty & Personal Care</Link>
            <Link to="/category/electronics" className="px-3 py-1 whitespace-nowrap">Electronics</Link>
            <Link to="/category/home" className="px-3 py-1 whitespace-nowrap">Home</Link>
            <Link to="/category/kitchen" className="px-3 py-1 whitespace-nowrap">Kitchen</Link>
            <Link to="/category/books" className="px-3 py-1 whitespace-nowrap">Books</Link>
            <Link to="/category/toys" className="px-3 py-1 whitespace-nowrap">Toys</Link>
            <Link to="/category/furniture" className="px-3 py-1 whitespace-nowrap">Furniture</Link>
            <Link to="/category/sports" className="px-3 py-1 whitespace-nowrap">Sports</Link>
            <Link to="/category/automotive" className="px-3 py-1 whitespace-nowrap">Automotive</Link>
            <Link to="/category/see-all" className="px-3 py-1 whitespace-nowrap text-emerald-600">See All</Link>
          </nav>
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
              </ul>
            </div>
          </div>
          
          <div className="py-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <img src="/logo.svg" alt="Dealport" className="h-6" />
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
