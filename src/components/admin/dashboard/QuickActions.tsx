
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Download, Upload, Settings, BarChart3, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Add Product',
      icon: Plus,
      action: () => {
        navigate('/admin/products/add');
        toast.success('Navigating to Add Product');
      },
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      label: 'View Reports',
      icon: BarChart3,
      action: () => {
        navigate('/admin/reports');
        toast.success('Opening Reports Dashboard');
      },
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      label: 'Import Products',
      icon: Upload,
      action: () => toast.info('Import functionality coming soon'),
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      label: 'Export Data',
      icon: Download,
      action: () => toast.info('Export functionality coming soon'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      label: 'Manage Customers',
      icon: Users,
      action: () => {
        navigate('/admin/customer-management');
        toast.success('Opening Customer Management');
      },
      color: 'bg-indigo-500 hover:bg-indigo-600'
    },
    {
      label: 'Settings',
      icon: Settings,
      action: () => {
        navigate('/admin/settings');
        toast.info('Settings page coming soon');
      },
      color: 'bg-gray-500 hover:bg-gray-600'
    }
  ];

  return (
    <Card data-testid="quick-actions">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className={`h-auto p-4 flex flex-col items-center gap-2 ${action.color} text-white border-none transition-all duration-200 hover:scale-105 focus:scale-105`}
              onClick={action.action}
              aria-label={`${action.label} - Quick action button`}
            >
              <action.icon className="h-5 w-5" />
              <span className="text-xs font-medium text-center">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
