
import { useState } from "react";
import { Link } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TopBar from './TopBar';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

const MainNavigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      {/* Top Navigation Bar */}
      <TopBar />

      {/* Main Navigation Menu */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Menu Button for Mobile */}
          <Button variant="ghost" size="sm" className="md:flex items-center mr-4" onClick={toggleMobileMenu}>
            <Menu className="h-5 w-5 mr-2" />
            <span>Menu</span>
          </Button>
          
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 mx-8">
            <SearchBar />
          </div>
          
          {/* User and Cart */}
          <UserMenu />
        </div>
        
        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center justify-between h-12">
          <div className="flex space-x-6">
            <Link to="/explore" className="text-gray-700 hover:text-green-600 transition-colors px-2 py-1">
              Explore
            </Link>
            <Link to="/deals" className="text-gray-700 hover:text-green-600 transition-colors px-2 py-1">
              Deals
            </Link>
            <Link to="/saved" className="text-gray-700 hover:text-green-600 transition-colors px-2 py-1">
              Saved
            </Link>
          </div>
          
          {/* Right Side Links */}
          <nav className="flex space-x-6">
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
        </nav>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden py-3 border-t">
          <form className="mb-4 px-4">
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
