
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  ShoppingCart, 
  Users, 
  Tag, 
  Layers, 
  Star, 
  PlusCircle, 
  Image, 
  List, 
  FileText,
  Settings, 
  Shield,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed?: boolean;
}

interface MenuItem {
  name: string;
  icon: React.ElementType;
  path: string;
  submenu?: MenuItem[];
}

interface MenuSection {
  section: string;
  items: MenuItem[];
}

const Sidebar = ({ collapsed = false }: SidebarProps) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>(['Main menu', 'Product']);
  
  const menuItems: MenuSection[] = [
    { section: 'Main menu', items: [
      { name: 'Dashboard', icon: Home, path: '/admin/dashboard' },
      { name: 'Order Management', icon: ShoppingCart, path: '/admin/orders' },
      { name: 'Customers', icon: Users, path: '/admin/customers' },
      { name: 'Coupon Code', icon: Tag, path: '/admin/coupons' },
      { name: 'Categories', icon: Layers, path: '/admin/categories' },
      { name: 'Transaction', icon: ShoppingCart, path: '/admin/transactions' },
      { name: 'Brand', icon: Star, path: '/admin/brands' },
    ]},
    { section: 'Product', items: [
      { name: 'Add Products', icon: PlusCircle, path: '/admin/products/add' },
      { name: 'Product Media', icon: Image, path: '/admin/products/media' },
      { name: 'Product List', icon: List, path: '/admin/products/list' },
      { name: 'Product Reviews', icon: FileText, path: '/admin/products/reviews' },
    ]},
    { section: 'Admin', items: [
      { name: 'Admin role', icon: Settings, path: '/admin/role' },
      { name: 'Control Authority', icon: Shield, path: '/admin/authority' },
    ]},
  ];

  const userInfo = {
    name: 'Dealport',
    email: 'Mark@thedesigner.com'
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section) 
        : [...prev, section]
    );
  };
  
  const isSectionExpanded = (section: string) => {
    return expandedSections.includes(section);
  };

  return (
    <div className={cn(
      "flex flex-col h-screen bg-white border-r border-gray-100",
      collapsed ? "w-[60px]" : "w-[220px]"
    )}>
      <div className="p-4 border-b">
        <Link to="/" className="flex items-center">
          <img src="/logo.svg" alt="Dealport" className="h-7" />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto">
        {menuItems.map((section, idx) => (
          <div key={idx} className="mt-4">
            {!collapsed && (
              <div 
                className="px-4 py-1 flex justify-between items-center cursor-pointer group"
                onClick={() => toggleSection(section.section)}
              >
                <h2 className="text-xs font-semibold text-gray-500">{section.section}</h2>
                <ChevronDown className={cn(
                  "h-4 w-4 text-gray-400 transition-transform duration-200",
                  isSectionExpanded(section.section) ? "transform rotate-180" : ""
                )} />
              </div>
            )}
            {(collapsed || isSectionExpanded(section.section)) && (
              <ul className={cn(
                "mt-1",
                collapsed ? "" : "animate-accordion-down transition-all duration-300"
              )}>
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50",
                        isActiveLink(item.path) && "bg-gray-50 text-emerald-600 font-medium"
                      )}
                    >
                      <item.icon className={cn(
                        "w-5 h-5 mr-3",
                        isActiveLink(item.path) && "text-emerald-600"
                      )} />
                      {!collapsed && <span>{item.name}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t mt-auto">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
            <img src="/avatar.png" alt="User" className="w-full h-full object-cover" />
          </div>
          {!collapsed && (
            <div>
              <div className="font-medium text-sm">{userInfo.name}</div>
              <div className="text-xs text-gray-500">{userInfo.email}</div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t">
        <Link
          to="/shop"
          className="flex items-center text-gray-600"
        >
          <ShoppingCart className="w-5 h-5 mr-3" />
          {!collapsed && <span>Your Shop</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
