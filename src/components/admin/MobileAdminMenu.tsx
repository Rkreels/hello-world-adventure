import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { 
  Menu, 
  BarChart3, 
  Package, 
  Users, 
  ShoppingCart, 
  Settings, 
  Tags,
  TrendingUp,
  FileText,
  Gift,
  UserCheck,
  Shield
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface MobileAdminMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileAdminMenu = ({ isOpen, onOpenChange }: MobileAdminMenuProps) => {
  const { user } = useAuth();
  const location = useLocation();

  const handleLinkClick = () => {
    onOpenChange(false);
  };

  const menuItems = [
    {
      title: 'Dashboard',
      href: '/admin/dashboard',
      icon: BarChart3
    },
    {
      title: 'Products',
      href: '/admin/products',
      icon: Package
    },
    {
      title: 'Orders',
      href: '/admin/orders',
      icon: ShoppingCart
    },
    {
      title: 'Customers',
      href: '/admin/customers',
      icon: Users
    },
    {
      title: 'Categories',
      href: '/admin/categories',
      icon: Tags
    },
    {
      title: 'Marketing',
      href: '/admin/marketing',
      icon: TrendingUp
    },
    {
      title: 'Reports',
      href: '/admin/reports',
      icon: FileText
    },
    {
      title: 'Coupons',
      href: '/admin/coupons',
      icon: Gift
    },
    {
      title: 'Admin Role',
      href: '/admin/admin-role',
      icon: UserCheck
    },
    {
      title: 'Admin Authority',
      href: '/admin/admin-authority',
      icon: Shield
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: Settings
    }
  ];

  const isActiveLink = (href: string) => {
    return location.pathname === href || 
           (href === '/admin/dashboard' && location.pathname === '/admin');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-80 bg-white">
        <SheetHeader>
          <SheetTitle className="text-left">Admin Panel</SheetTitle>
          <div className="text-sm text-gray-600 text-left">
            Welcome, {user?.name || 'Admin'}
          </div>
        </SheetHeader>
        
        <nav className="mt-6">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveLink(item.href);
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={handleLinkClick}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.title}
                </Link>
              );
            })}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileAdminMenu;