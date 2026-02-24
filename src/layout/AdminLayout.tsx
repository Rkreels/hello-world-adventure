
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import VoiceTrainer from '@/components/admin/VoiceTrainer';
import MobileAdminMenu from '@/components/admin/MobileAdminMenu';

const AdminLayout = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Sidebar with responsive design */}
      <div className="hidden md:block md:w-64 lg:w-72">
        <Sidebar />
      </div>
      
      {/* Mobile Menu */}
      <MobileAdminMenu 
        isOpen={isMobileMenuOpen} 
        onOpenChange={setIsMobileMenuOpen}
      />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header bar for mobile */}
        <div className="md:hidden bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsMobileMenuOpen(true)}
                className="mr-2"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-lg font-semibold">Admin Panel</h1>
            </div>
            <div className="text-sm text-gray-600">
              Welcome, {user?.name || 'Admin'}
            </div>
          </div>
        </div>
        
        {/* Desktop Header with Master Dashboard */}
        <div className="hidden md:block bg-white border-b border-gray-200 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between gap-4">
              <a href="https://careertodo.com/practice-lab">
                <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">
                  Lab Dashboard
                </Button>
              </a>
              <div className="text-sm text-gray-600">
                Welcome, {user?.name || 'Admin'}
              </div>
            </div>
          </div>
        </div>
        
        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Voice trainer component */}
      <VoiceTrainer />
    </div>
  );
};

export default AdminLayout;
