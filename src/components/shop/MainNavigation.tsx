
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X, MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const MainNavigation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      {/* Top Navigation Bar */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-green-600">DEALPORT</span>
              </Link>
            </div>
            
            {/* Address, Language, Search Bar */}
            <div className="hidden md:flex items-center flex-1 mx-8 space-x-4">
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-gray-600">Deliver to</span>
                <span className="font-semibold ml-1">Your address</span>
              </div>
              
              <div className="flex items-center text-sm mx-4">
                <div className="flex items-center border rounded p-1">
                  <span className="mr-1">🇺🇸</span>
                  <span>EN</span>
                  <ChevronDown className="h-3 w-3 ml-1" />
                </div>
              </div>
              
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative flex items-center">
                  <Input
                    type="text"
                    placeholder="What you're looking for"
                    className="pl-4 pr-12 py-2 w-full bg-gray-50 border-gray-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button 
                    type="submit" 
                    size="sm"
                    className="absolute right-0 rounded-l-none bg-gray-100 hover:bg-gray-200 text-gray-700"
                  >
                    <Search className="h-4 w-4" />
                    <span className="ml-1">Search</span>
                  </Button>
                </div>
              </form>
            </div>
            
            {/* User and Cart */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-1">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.photoURL || undefined} alt={user?.name || "User"} />
                        <AvatarFallback>{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 z-50 bg-white">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        {user?.name && <p className="font-medium">{user.name}</p>}
                        {user?.email && <p className="w-[200px] truncate text-sm text-gray-500">{user.email}</p>}
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    {user?.role === 'admin' && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin/dashboard" className="cursor-pointer">Admin Dashboard</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/orders" className="cursor-pointer">Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="cursor-pointer text-red-600 focus:text-red-600" 
                      onClick={() => logout()}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="flex items-center">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              )}
              
              <Link to="/cart">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                    3
                  </span>
                  <span className="ml-2">Cart</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Menu */}
      <div className="container mx-auto px-4">
        <div className="flex items-center h-12">
          {/* Menu Button for Mobile */}
          <Button variant="ghost" size="sm" className="md:flex items-center mr-4" onClick={toggleMobileMenu}>
            <Menu className="h-5 w-5 mr-2" />
            <span>Menu</span>
          </Button>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/explore" className="text-gray-700 hover:text-green-600 transition-colors px-2 py-1">
              Explore
            </Link>
            <Link to="/deals" className="text-gray-700 hover:text-green-600 transition-colors px-2 py-1">
              Deals
            </Link>
            <Link to="/saved" className="text-gray-700 hover:text-green-600 transition-colors px-2 py-1">
              Saved
            </Link>
          </nav>
          
          {/* Right Side Links */}
          <nav className="ml-auto hidden md:flex space-x-6">
            <Link to="/" className="text-green-600 border-b-2 border-green-600 font-medium px-2 py-1">
              Home
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-green-600 transition-colors px-2 py-1">
              Product
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600 transition-colors px-2 py-1">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-600 transition-colors px-2 py-1">
              Contact
            </Link>
          </nav>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden py-3 border-t">
          <form onSubmit={handleSearch} className="mb-4 px-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          <nav className="flex flex-col space-y-3 px-4">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors py-1">Home</Link>
            <Link to="/shop" className="text-gray-700 hover:text-green-600 transition-colors py-1">Product</Link>
            <Link to="/explore" className="text-gray-700 hover:text-green-600 transition-colors py-1">Explore</Link>
            <Link to="/deals" className="text-gray-700 hover:text-green-600 transition-colors py-1">Deals</Link>
            <Link to="/saved" className="text-gray-700 hover:text-green-600 transition-colors py-1">Saved</Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600 transition-colors py-1">About Us</Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-600 transition-colors py-1">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default MainNavigation;
