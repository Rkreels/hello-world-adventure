
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShoppingCart,
  Menu,
  MapPin,
  ChevronDown,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState("Your address");
  const searchRef = useRef<HTMLDivElement>(null);
  
  const categories = [
    { name: 'Explore', path: '/categories' },
    { name: 'Deals', path: '/deals' },
    { name: 'Saved', path: '/saved' },
  ];
  
  const mainCategories = [
    { name: 'Men', path: '/category/men' },
    { name: 'Women', path: '/category/women' },
    { name: 'Baby', path: '/category/baby' },
    { name: 'Grocery & Essentials', path: '/category/grocery' },
    { name: 'Streetwear', path: '/category/streetwear' },
    { name: 'Shoes', path: '/category/shoes' },
    { name: 'Accessories', path: '/category/accessories' },
    { name: 'Beauty', path: '/category/beauty' },
    { name: 'Electronics', path: '/category/electronics' },
    { name: 'Industrial equipment', path: '/category/industrial' },
  ];

  const searchSuggestions = [
    "Electronics",
    "Smartphones",
    "Laptops",
    "Fashion",
    "Home Decor",
    "Kitchen Appliances",
    "Sports Gear",
  ];

  const filteredSuggestions = searchSuggestions.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const locations = [
    "Your address",
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan"
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <Link to="/" className="flex items-center">
                  <span className="text-xl font-bold text-green-600">DEALP<span className="text-green-700 font-extrabold">●</span>RT</span>
                </Link>
                
                <div className="flex items-center text-sm ml-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="mr-1">Deliver to</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="font-medium flex items-center">
                      {deliveryLocation}
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      {locations.map((location) => (
                        <DropdownMenuItem 
                          key={location}
                          onClick={() => setDeliveryLocation(location)}
                          className="cursor-pointer"
                        >
                          {location}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="flex-1 max-w-3xl mx-10 relative" ref={searchRef}>
                <form onSubmit={handleSearchSubmit} className="flex">
                  <input
                    type="text"
                    placeholder="What you're looking for"
                    className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-l-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-green-50/30"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowSuggestions(e.target.value.length > 0);
                    }}
                  />
                  <Button type="submit" className="rounded-l-none bg-white border border-gray-200 border-l-0 hover:bg-gray-50 text-gray-700">
                    <Search className="h-4 w-4" />
                    <span className="ml-2">Search</span>
                  </Button>
                </form>

                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-md z-30 mt-1 border border-gray-200">
                    {filteredSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          setSearchTerm(suggestion);
                          setShowSuggestions(false);
                          navigate(`/search?q=${encodeURIComponent(suggestion)}`);
                        }}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-6">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center text-sm">
                    <img src="/lovable-uploads/36d681be-b2a9-4d5a-9475-971eca401ba5.png" alt="EN flag" className="h-4 w-6 mr-1" />
                    <span>EN</span>
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem className="cursor-pointer">
                      <img src="/lovable-uploads/36d681be-b2a9-4d5a-9475-971eca401ba5.png" alt="EN flag" className="h-4 w-6 mr-2" />
                      English
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <img src="https://placehold.co/20x15" alt="ES flag" className="h-4 w-6 mr-2" />
                      Español
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <img src="https://placehold.co/20x15" alt="FR flag" className="h-4 w-6 mr-2" />
                      Français
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex items-center space-x-1">
                  <User className="h-5 w-5" />
                </div>

                <Link to="/cart" className="flex items-center space-x-1">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="text-sm">Cart</span>
                  {cartCount > 0 && (
                    <span className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 py-2">
            <div className="flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="mr-4">
                    <Menu className="h-5 w-5 mr-2" />
                    <span>Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px]">
                  <nav className="space-y-2 mt-4">
                    {mainCategories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.path}
                        className="block p-2 hover:bg-gray-50 rounded"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>

              {categories.map((category) => (
                <Link 
                  key={category.name}
                  to={category.path}
                  className="px-4 py-2 text-sm hover:text-green-600"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-sm text-green-600 border-b-2 border-green-600 py-2">Home</Link>
              <Link to="/products" className="text-sm hover:text-green-600 py-2">Product</Link>
              <Link to="/about" className="text-sm hover:text-green-600 py-2">About Us</Link>
              <Link to="/contact" className="text-sm hover:text-green-600 py-2">Contact</Link>
            </nav>
          </div>

          <nav className="flex items-center space-x-6 py-2 text-sm overflow-x-auto border-t border-gray-100">
            {mainCategories.map((category) => (
              <Link 
                key={category.name}
                to={category.path}
                className="whitespace-nowrap hover:text-green-600"
              >
                {category.name}
              </Link>
            ))}
            <Link to="/categories" className="whitespace-nowrap text-blue-600">See more</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-[#f8f9f6] mt-8">
        <div className="container mx-auto px-4">
          <div className="py-10 border-b border-gray-200">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-xl font-bold mb-2">Subscribe to our newsletter</h3>
              <p className="text-gray-600 mb-6">Get the latest updates on new products and upcoming sales</p>
              
              <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <Button className="bg-green-600 hover:bg-green-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-12">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h3 className="font-semibold text-lg mb-4 capitalize">{section.replace(/([A-Z])/g, ' $1').trim()}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.path}>
                      <Link to={link.path} className="text-gray-600 hover:text-gray-900 hover:underline">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 py-8">
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <img src="https://placehold.co/60x30" alt="Visa" className="h-8" />
              <img src="https://placehold.co/60x30" alt="MasterCard" className="h-8" />
              <img src="https://placehold.co/60x30" alt="American Express" className="h-8" />
              <img src="https://placehold.co/60x30" alt="PayPal" className="h-8" />
              <img src="https://placehold.co/60x30" alt="Apple Pay" className="h-8" />
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center">
              <Link to="/" className="flex items-center mb-4 md:mb-0">
                <span className="text-xl font-bold text-green-600">DEALPORT</span>
              </Link>
              
              <div className="flex space-x-4">
                <Link to="/" className="text-gray-600 hover:text-gray-900 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10zm-10 6a6 6 0 100-12 6 6 0 000 12z" />
                  </svg>
                </Link>
                <Link to="#" className="text-gray-600 hover:text-gray-900 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10zm-10 6a6 6 0 100-12 6 6 0 000 12z" /></svg>
                </Link>
                <Link to="#" className="text-gray-600 hover:text-gray-900 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10zm-10 6a6 6 0 100-12 6 6 0 000 12z" /></svg>
                </Link>
                <Link to="#" className="text-gray-600 hover:text-gray-900 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10zm-10 6a6 6 0 100-12 6 6 0 000 12z" /></svg>
                </Link>
              </div>
            </div>
            
            <div className="text-center mt-8 text-sm text-gray-600">
              <p>© {new Date().getFullYear()} Dealport. All rights reserved.</p>
              <p className="mt-2">
                <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
                {" • "}
                <Link to="/terms" className="hover:underline">Terms of Service</Link>
                {" • "}
                <Link to="/cookie" className="hover:underline">Cookie Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShopLayout;
