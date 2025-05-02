
import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Search, Sun, ChevronLeft, LogOut } from 'lucide-react';
import Sidebar from './Sidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import NotificationsDropdown from '@/components/admin/NotificationsDropdown';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Persist sidebar state in localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState) {
      setSidebarCollapsed(JSON.parse(savedState));
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      toast.info(`Searching for: ${searchQuery}`);
      // Navigate to search results
      navigate(`/admin/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Update document title based on current route
  useEffect(() => {
    const path = location.pathname;
    let title = "Dashboard";
    
    if (path.includes('/admin/orders')) title = "Order Management";
    else if (path.includes('/admin/customers')) title = "Customers";
    else if (path.includes('/admin/coupons')) title = "Coupon Code";
    else if (path.includes('/admin/categories')) title = "Categories";
    else if (path.includes('/admin/transactions')) title = "Transactions";
    else if (path.includes('/admin/brands')) title = "Brands";
    else if (path.includes('/admin/products/add')) title = "Add Products";
    else if (path.includes('/admin/products/media')) title = "Product Media";
    else if (path.includes('/admin/products/list')) title = "Product List";
    else if (path.includes('/admin/products/reviews')) title = "Product Reviews";
    else if (path.includes('/admin/role')) title = "Admin Role";
    else if (path.includes('/admin/authority')) title = "Control Authority";
    
    document.title = `Admin | ${title}`;
  }, [location]);
  
  return (
    <div className="flex h-screen">
      <Sidebar collapsed={sidebarCollapsed} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-white border-b border-gray-100 h-16 flex items-center justify-between px-4">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mr-2 text-gray-500"
              onClick={toggleSidebar}
            >
              <ChevronLeft className={`h-5 w-5 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
            </Button>
          </div>
          
          <div className="flex-1 max-w-lg mx-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search data, users, or reports"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
          
          <div className="flex items-center space-x-3">
            <NotificationsDropdown />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                document.documentElement.classList.toggle('dark');
                toast.success('Theme toggled');
              }}
            >
              <Sun className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden cursor-pointer">
                  <img src="/avatar.png" alt="User" className="w-full h-full object-cover" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.name || 'Admin'}</DropdownMenuLabel>
                <DropdownMenuLabel className="text-xs text-gray-500">
                  {user?.email || 'admin@example.com'}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/admin/role')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
