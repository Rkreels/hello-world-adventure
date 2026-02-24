
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu,
  Phone,
  Mail,
  X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

const MainNavigation = () => {
  console.log('🧭 MainNavigation: Rendering...');
  
  // Add error boundary for auth context
  let authData;
  try {
    authData = useAuth();
  } catch (error) {
    console.error('❌ MainNavigation: Auth context error:', error);
    // Fallback when auth context is not available
    authData = {
      user: null,
      isAuthenticated: false,
      isAdmin: false
    };
  }

  const { isAuthenticated, user } = authData;
  
  let cartData;
  try {
    cartData = useCart();
  } catch (error) {
    console.error('❌ MainNavigation: Cart hook error:', error);
    cartData = { items: [] };
  }
  
  const { items } = cartData;
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="border-b">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@example.com</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>Free shipping on orders over $50!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
              <span className="text-xl font-bold">E-Commerce</span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-8 hidden md:block">
              <SearchBar />
            </div>

            {/* Right Navigation */}
            <div className="flex items-center space-x-4">
              <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 hidden md:inline-flex" asChild>
                <a href="https://careertodo.com/practice-lab">Admin Dashboard</a>
              </Button>
              
              {/* Wishlist - Hidden on mobile */}
              <Button variant="ghost" size="sm" className="relative hidden md:flex">
                <Heart className="w-5 h-5" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  0
                </Badge>
              </Button>

              {/* Cart */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative"
                onClick={() => navigate('/cart')}
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>

              {/* Desktop User Menu */}
              <div className="hidden md:block">
                <UserMenu />
              </div>

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80" aria-describedby={undefined}>
                  <div className="sr-only" id="mobile-menu-title">Navigation Menu</div>
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between pb-4 border-b">
                      <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                          <span className="text-white font-bold">E</span>
                        </div>
                        <span className="text-xl font-bold">E-Commerce</span>
                      </Link>
                    </div>
                    
                    {/* Mobile Search */}
                    <div className="py-4 border-b">
                      <SearchBar />
                    </div>
                    
                    {/* Mobile Navigation Links */}
                    <nav className="flex-1 py-4">
                      <div className="space-y-2">
                        <Link 
                          to="/shop" 
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Shop
                        </Link>
                        <Link 
                          to="/categories" 
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Categories
                        </Link>
                        <Link 
                          to="/deals" 
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Deals
                        </Link>
                        <Link 
                          to="/new-arrivals" 
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          New Arrivals
                        </Link>
                      </div>
                      
                      {/* Mobile Wishlist */}
                      <div className="mt-4 px-4 py-2 border-t">
                        <Button variant="ghost" className="w-full justify-start">
                          <Heart className="w-5 h-5 mr-2" />
                          Wishlist (0)
                        </Button>
                      </div>
                    </nav>
                    
                    {/* Mobile User Section */}
                    <div className="border-t pt-4">
                      <UserMenu />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
