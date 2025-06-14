
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import VoiceTrainer from '@/components/admin/VoiceTrainer';

const AdminLayout = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Sidebar with responsive design */}
      <div className="hidden md:block md:w-64 lg:w-72">
        <Sidebar />
      </div>
      
      {/* Mobile sidebar overlay - add this for mobile responsiveness */}
      <div className="md:hidden">
        {/* Mobile menu button and overlay would go here */}
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header bar for mobile */}
        <div className="md:hidden bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Admin Panel</h1>
            <div className="text-sm text-gray-600">
              Welcome, {user?.name || 'Admin'}
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
