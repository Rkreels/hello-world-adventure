import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, MapPin, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const footerLinks = {
  companyInfo: [
    { name: 'About Us', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
  ],
  customerSupport: [
    { name: 'Contact Us', path: '/contact' },
    { name: 'Help Center (FAQ)', path: '/faq' },
    { name: 'Returns & Refunds', path: '/returns' },
    { name: 'Shipping Information', path: '/shipping-information' },
  ],
  explore: [
    { name: 'Categories', path: '/categories' },
    { name: 'Deals', path: '/deals' },
    { name: 'New Arrivals', path: '/new-arrivals' },
  ],
  legal: [
    { name: 'Terms & Conditions', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Cookie Policy', path: '/cookie' },
    { name: 'Accessibility', path: '/accessibility' },
  ],
};

const ShopLayout = () => {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  
  // Reset scroll position when navigating to a new page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Top bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3">
            <div className="flex items-center justify-between md:justify-start md:space-x-6">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-green-600">DEALPORT</span>
              </Link>
              <div className="hidden md:flex md:items-center md:space-x-1 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Deliver to</span>
                <span className="font-medium">United States</span>
                <ChevronDown className="h-3 w-3" />
              </div>
              <div className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 max-w-2xl mx-0 md:mx-6 mt-3 md:mt-0">
              <div className="relative">
                <div className="flex">
                  <div className="relative z-10 hidden sm:block">
                    <Button variant="outline" size="sm" className="flex items-center h-10 rounded-r-none border-r-0">
                      <span className="mr-1">All</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </div>
                  <input
                    type="text"
                    placeholder="Search DEALPORT"
                    className="w-full pl-4 pr-10 py-2 h-10 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary rounded-l-md sm:rounded-l-none rounded-r-none"
                  />
                  <Button size="sm" className="h-10 rounded-l-none bg-green-600 hover:bg-green-700">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-5">
              <div className="flex items-center space-x-1 text-sm">
                <div className="flex items-center">
                  <div className="w-5 h-4 bg-blue-900 relative mr-1">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-[6px]">US</div>
                    </div>
                  </div>
                  <span>EN</span>
                  <ChevronDown className="h-3 w-3 ml-1" />
                </div>
              </div>
              
              <Link to="/login" className="flex flex-col items-center text-sm">
                <span className="text-xs text-gray-500">Hello, Sign in</span>
                <div className="flex items-center font-medium">
                  <span>Account</span>
                  <ChevronDown className="h-3 w-3 ml-1" />
                </div>
              </Link>
              
              <Link to="/cart" className="flex flex-col items-center">
                <div className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                </div>
                <span className="text-xs font-medium mt-1">Cart</span>
              </Link>
            </div>
          </div>
          
          {/* Main navigation */}
          <div className="flex items-center overflow-x-auto py-2 bg-gray-100 text-sm">
            <Button variant="ghost" size="sm" className="flex items-center mr-4 font-medium min-w-max">
              <Menu className="h-5 w-5 mr-2" />
              <span>All Categories</span>
            </Button>
            
            <nav className="flex items-center space-x-6 min-w-max">
              <Link to="/" className="font-medium hover:text-green-600">Home</Link>
              <Link to="/deals" className="hover:text-green-600">Today's Deals</Link>
              <Link to="/new-arrivals" className="hover:text-green-600">New Arrivals</Link>
              <Link to="/best-selling" className="hover:text-green-600">Best Sellers</Link>
              <Link to="/shop" className="hover:text-green-600">Shop All</Link>
              <Link to="/contact" className="hover:text-green-600">Customer Service</Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      <footer className="bg-[#f8f9f6]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h3 className="font-semibold mb-4 capitalize">{section.replace(/([A-Z])/g, ' $1').trim()}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.path}>
                      <Link to={link.path} className="text-sm text-gray-600 hover:text-gray-900">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <Link to="/" className="flex items-center mb-4 md:mb-0">
                <span className="text-xl font-bold text-green-600">DEALPORT</span>
              </Link>
              
              <div className="space-x-4">
                <Link to="/" className="text-gray-600 hover:text-gray-900">
                  <svg className="inline-block h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10zm-10 6a6 6 0 100-12 6 6 0 000 12z" />
                  </svg>
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
            
            <div className="text-center mt-6 text-sm text-gray-600">
              © {new Date().getFullYear()} Dealport. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShopLayout;
