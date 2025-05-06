
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
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
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <ShoppingBag className="h-6 w-6 text-green-600" />
              <span className="ml-2 text-lg font-bold">Dealport</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/shop" className="text-gray-700 hover:text-green-600 transition-colors">Shop</Link>
            <Link to="/categories" className="text-gray-700 hover:text-green-600 transition-colors">Categories</Link>
            <Link to="/deals" className="text-gray-700 hover:text-green-600 transition-colors">Deals</Link>
            <Link to="/new-arrivals" className="text-gray-700 hover:text-green-600 transition-colors">New Arrivals</Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-600 transition-colors">Contact</Link>
          </nav>
          
          {/* Search, User and Cart */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="pl-8 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            
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
                  <span className="ml-2">Login</span>
                </Button>
              </Link>
            )}
            
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute top-0 right-0 bg-green-600 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                  3
                </span>
              </Button>
            </Link>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <Button variant="ghost" className="p-1" onClick={toggleMobileMenu}>
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t">
            <form onSubmit={handleSearch} className="mb-4">
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
            <nav className="flex flex-col space-y-3">
              <Link to="/shop" className="text-gray-700 hover:text-green-600 transition-colors py-1">Shop</Link>
              <Link to="/categories" className="text-gray-700 hover:text-green-600 transition-colors py-1">Categories</Link>
              <Link to="/deals" className="text-gray-700 hover:text-green-600 transition-colors py-1">Deals</Link>
              <Link to="/new-arrivals" className="text-gray-700 hover:text-green-600 transition-colors py-1">New Arrivals</Link>
              <Link to="/contact" className="text-gray-700 hover:text-green-600 transition-colors py-1">Contact</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default MainNavigation;
