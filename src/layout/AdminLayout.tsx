
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Toaster } from '@/components/ui/sonner';
import VoiceTrainer from '@/components/admin/VoiceTrainer';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      <VoiceTrainer />
      <Toaster />
    </div>
  );
};

export default AdminLayout;
