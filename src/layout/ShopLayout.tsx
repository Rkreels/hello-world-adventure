
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShoppingCart,
  Menu,
  MapPin,
  ChevronDown,
  X,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
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
  const [deliveryLocation, setDeliveryLocation] = useState("United States");
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Sample search suggestions
  const searchSuggestions = [
    "Electronics",
    "Smartphones",
    "Laptops",
    "Fashion",
    "Home Decor",
    "Kitchen Appliances",
    "Sports Gear",
  ];

  // Filtered suggestions based on search term
  const filteredSuggestions = searchSuggestions.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const locations = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan"
  ];
  
  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
  ];

  // Handle click outside of search suggestions
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
  
  // Reset scroll position when navigating to a new page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          {/* Top bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3">
            <div className="flex items-center justify-between md:justify-start md:space-x-6">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-green-600">DEALPORT</span>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="hidden md:flex md:items-center md:space-x-1 text-sm cursor-pointer">
                    <MapPin className="h-4 w-4" />
                    <span>Deliver to</span>
                    <span className="font-medium">{deliveryLocation}</span>
                    <ChevronDown className="h-3 w-3" />
                  </div>
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
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[80%] sm:w-[350px]">
                  <div className="py-4">
                    <div className="flex items-center mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">Deliver to</span>
                    </div>
                    
                    <div className="space-y-2">
                      {locations.map((loc) => (
                        <div 
                          key={loc}
                          className={`p-2 rounded cursor-pointer ${loc === deliveryLocation ? 'bg-green-50 text-green-600' : 'hover:bg-gray-50'}`}
                          onClick={() => {
                            setDeliveryLocation(loc);
                          }}
                        >
                          {loc}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t">
                      <h3 className="font-medium mb-2">Categories</h3>
                      <nav className="space-y-2">
                        <Link to="/shop" className="block p-2 hover:bg-gray-50 rounded">Shop All</Link>
                        <Link to="/deals" className="block p-2 hover:bg-gray-50 rounded">Today's Deals</Link>
                        <Link to="/new-arrivals" className="block p-2 hover:bg-gray-50 rounded">New Arrivals</Link>
                        <Link to="/category/electronics" className="block p-2 hover:bg-gray-50 rounded">Electronics</Link>
                        <Link to="/category/fashion" className="block p-2 hover:bg-gray-50 rounded">Fashion</Link>
                        <Link to="/category/home" className="block p-2 hover:bg-gray-50 rounded">Home</Link>
                      </nav>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
            <div className="flex-1 max-w-2xl mx-0 md:mx-6 mt-3 md:mt-0" ref={searchRef}>
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <div className="flex">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="hidden sm:flex items-center h-10 rounded-r-none border-r-0">
                          <span className="mr-1">All</span>
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-48">
                        <DropdownMenuItem>All Categories</DropdownMenuItem>
                        <DropdownMenuItem>Electronics</DropdownMenuItem>
                        <DropdownMenuItem>Fashion</DropdownMenuItem>
                        <DropdownMenuItem>Home & Garden</DropdownMenuItem>
                        <DropdownMenuItem>Toys & Games</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <input
                      type="text"
                      placeholder="Search DEALPORT"
                      className="w-full pl-4 pr-10 py-2 h-10 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary rounded-l-md sm:rounded-l-none rounded-r-none"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowSuggestions(e.target.value.length > 0);
                      }}
                    />
                    <Button type="submit" size="sm" className="h-10 rounded-l-none bg-green-600 hover:bg-green-700">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-md z-30 mt-1 border border-gray-200">
                      <div className="p-2">
                        {filteredSuggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="px-3 py-2 hover:bg-gray-50 cursor-pointer rounded flex items-center"
                            onClick={() => {
                              setSearchTerm(suggestion);
                              setShowSuggestions(false);
                              navigate(`/search?q=${encodeURIComponent(suggestion)}`);
                            }}
                          >
                            <Search className="h-3 w-3 mr-2 text-gray-400" />
                            <span>{suggestion}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
            
            <div className="hidden md:flex items-center space-x-5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center space-x-1 text-sm cursor-pointer">
                    <Globe className="h-4 w-4 mr-1" />
                    <span>EN</span>
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  {languages.map((lang) => (
                    <DropdownMenuItem key={lang.code} className="cursor-pointer">
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
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
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center mr-4 font-medium min-w-max">
                  <Menu className="h-5 w-5 mr-2" />
                  <span>All Categories</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[80%] sm:w-[350px]">
                <div className="py-4">
                  <h3 className="font-bold text-lg mb-4">Shop By Category</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">Electronics</h4>
                      <ul className="space-y-1">
                        <li><Link to="/category/electronics/phones" className="block p-2 hover:bg-gray-50 rounded text-sm">Phones & Tablets</Link></li>
                        <li><Link to="/category/electronics/computers" className="block p-2 hover:bg-gray-50 rounded text-sm">Computers & Laptops</Link></li>
                        <li><Link to="/category/electronics/tv-audio" className="block p-2 hover:bg-gray-50 rounded text-sm">TV & Audio</Link></li>
                        <li><Link to="/category/electronics/wearables" className="block p-2 hover:bg-gray-50 rounded text-sm">Wearables</Link></li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Fashion</h4>
                      <ul className="space-y-1">
                        <li><Link to="/category/fashion/men" className="block p-2 hover:bg-gray-50 rounded text-sm">Men's Clothing</Link></li>
                        <li><Link to="/category/fashion/women" className="block p-2 hover:bg-gray-50 rounded text-sm">Women's Clothing</Link></li>
                        <li><Link to="/category/fashion/shoes" className="block p-2 hover:bg-gray-50 rounded text-sm">Shoes</Link></li>
                        <li><Link to="/category/fashion/accessories" className="block p-2 hover:bg-gray-50 rounded text-sm">Accessories</Link></li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Home</h4>
                      <ul className="space-y-1">
                        <li><Link to="/category/home/furniture" className="block p-2 hover:bg-gray-50 rounded text-sm">Furniture</Link></li>
                        <li><Link to="/category/home/kitchen" className="block p-2 hover:bg-gray-50 rounded text-sm">Kitchen</Link></li>
                        <li><Link to="/category/home/decor" className="block p-2 hover:bg-gray-50 rounded text-sm">Home Decor</Link></li>
                        <li><Link to="/category/home/appliances" className="block p-2 hover:bg-gray-50 rounded text-sm">Appliances</Link></li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button asChild variant="default" className="w-full bg-green-600 hover:bg-green-700">
                      <Link to="/categories">View All Categories</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <nav className="flex items-center space-x-6 min-w-max">
              <Link to="/" className="font-medium hover:text-green-600">Home</Link>
              <Link to="/deals" className="hover:text-green-600">Today's Deals</Link>
              <Link to="/new-arrivals" className="hover:text-green-600">New Arrivals</Link>
              <Link to="/best-selling" className="hover:text-green-600">Best Sellers</Link>
              <Link to="/shop" className="hover:text-green-600">Shop All</Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      <footer className="bg-[#f8f9f6] mt-8">
        <div className="container mx-auto px-4">
          {/* Newsletter Section */}
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
          
          {/* Links Section */}
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
          
          {/* Payment Methods */}
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
