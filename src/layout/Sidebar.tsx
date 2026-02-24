
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings, 
  Tag,
  Folder,
  Star,
  CreditCard,
  UserCheck,
  Shield,
  PlusCircle,
  TrendingUp,
  Percent,
  MessageSquare,
  FileText,
  Palette,
  Search,
  Bell,
  Camera,
  ChevronDown,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const Sidebar = () => {
  const location = useLocation();
  const [openSections, setOpenSections] = useState<string[]>(['products', 'orders']);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isParentActive = (basePath: string) => location.pathname.startsWith(basePath);

  const menuItems = [
    {
      title: 'Dashboard',
      icon: Home,
      path: '/admin/dashboard',
      badge: null
    },
    {
      title: 'Products',
      icon: Package,
      section: 'products',
      children: [
        { title: 'All Products', path: '/admin/products', icon: Package },
        { title: 'Add Product', path: '/admin/products/add', icon: PlusCircle },
        { title: 'Categories', path: '/admin/categories', icon: Folder },
        { title: 'Brands', path: '/admin/brands', icon: Tag },
        { title: 'Product Media', path: '/admin/product-media', icon: Camera },
        { title: 'Inventory', path: '/admin/inventory', icon: TrendingUp },
        { title: 'Reviews', path: '/admin/product-reviews', icon: MessageSquare, badge: '12' }
      ]
    },
    {
      title: 'Orders',
      icon: ShoppingCart,
      section: 'orders',
      children: [
        { title: 'Order Management', path: '/admin/order-management', icon: ShoppingCart, badge: '8' },
        { title: 'Transactions', path: '/admin/transactions', icon: CreditCard }
      ]
    },
    {
      title: 'Customers',
      icon: Users,
      path: '/admin/customers',
      badge: null
    },
    {
      title: 'Marketing',
      icon: TrendingUp,
      path: '/admin/marketing',
      badge: null
    },
    {
      title: 'Analytics',
      icon: BarChart3,
      path: '/admin/reports',
      badge: null
    },
    {
      title: 'Administration',
      icon: Shield,
      section: 'admin',
      children: [
        { title: 'Admin Roles', path: '/admin/admin-role', icon: Shield },
        { title: 'Admin Authority', path: '/admin/admin-authority', icon: UserCheck },
        { title: 'Settings', path: '/admin/settings', icon: Settings }
      ]
    }
  ];

  const NavItem = ({ item, isChild = false }: { item: any, isChild?: boolean }) => {
    if (item.children) {
      const isOpen = openSections.includes(item.section);
      const hasActiveChild = item.children.some((child: any) => isActive(child.path));
      
      return (
        <Collapsible open={isOpen} onOpenChange={() => toggleSection(item.section)}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-between h-10 px-3 mb-1 transition-all duration-200',
                (hasActiveChild || isParentActive(`/admin/${item.section}`)) 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-4 w-4" />
                <span className="font-medium">{item.title}</span>
              </div>
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 ml-4">
            {item.children.map((child: any, index: number) => (
              <NavItem key={index} item={child} isChild={true} />
            ))}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <NavLink
        to={item.path}
        className={({ isActive: linkActive }) =>
          cn(
            'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group',
            isChild ? 'ml-2 py-1.5' : 'mb-1',
            linkActive
              ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-500'
              : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
          )
        }
      >
        <item.icon className={cn('h-4 w-4', isChild ? 'h-3 w-3' : '')} />
        <span className="flex-1">{item.title}</span>
        {item.badge && (
          <Badge variant="secondary" className="ml-auto h-5 px-1.5 text-xs">
            {item.badge}
          </Badge>
        )}
      </NavLink>
    );
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Package className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
            <p className="text-xs text-gray-500">E-commerce CMS</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <NavLink 
            to="/admin/search"
            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors block"
          >
            Search...
          </NavLink>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item, index) => (
          <NavItem key={index} item={item} />
        ))}
      </nav>

      {/* Footer with Logout */}
      <div className="p-4 border-t border-gray-200 space-y-3">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-medium">A</span>
          </div>
          <div className="flex-1">
            <p className="font-medium">Admin User</p>
            <p className="text-xs text-gray-500">administrator@cms.com</p>
          </div>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 h-9 px-3"
          onClick={() => {
            window.location.href = '/';
          }}
        >
          <LogOut className="h-4 w-4 mr-3" />
          <span className="font-medium text-sm">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
