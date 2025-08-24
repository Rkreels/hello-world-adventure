import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu, Heart, User, ShoppingBag, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import SearchBar from './SearchBar';

interface MobileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileMenu = ({ isOpen, onOpenChange }: MobileMenuProps) => {
  const { isAuthenticated, user, logout } = useAuth();
  const { items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLinkClick = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-80 bg-white">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full mt-6">
          {/* Mobile Search */}
          <div className="mb-6">
            <SearchBar />
          </div>
          
          {/* Navigation Links */}
          <nav className="flex-1">
            <div className="space-y-4">
              <Link 
                to="/shop" 
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={handleLinkClick}
              >
                <ShoppingBag className="w-5 h-5 mr-3" />
                Shop
              </Link>
              
              <Link 
                to="/categories" 
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={handleLinkClick}
              >
                Categories
              </Link>
              
              <Link 
                to="/deals" 
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={handleLinkClick}
              >
                Deals
              </Link>
              
              <Link 
                to="/new-arrivals" 
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={handleLinkClick}
              >
                New Arrivals
              </Link>
              
              <Link 
                to="/cart" 
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={handleLinkClick}
              >
                <ShoppingBag className="w-5 h-5 mr-3" />
                Cart ({totalItems})
              </Link>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start px-4 py-3 text-gray-700 hover:bg-gray-100"
                onClick={handleLinkClick}
              >
                <Heart className="w-5 h-5 mr-3" />
                Wishlist
              </Button>
            </div>
          </nav>
          
          {/* User Section */}
          <div className="border-t pt-4 mt-4">
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="px-4 py-2">
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                
                <Link 
                  to="/profile" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={handleLinkClick}
                >
                  <User className="w-5 h-5 mr-3" />
                  Profile
                </Link>
                
                <Link 
                  to="/orders" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={handleLinkClick}
                >
                  Orders
                </Link>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start px-4 py-3 text-red-600 hover:bg-red-50"
                  onClick={() => {
                    logout();
                    handleLinkClick();
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link to="/login" onClick={handleLinkClick}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={handleLinkClick}>
                  <Button className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;