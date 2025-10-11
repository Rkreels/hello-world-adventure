
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Package, CheckCircle } from 'lucide-react';
import { useAdminStore } from '@/stores/adminStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const LowStockAlerts = () => {
  const navigate = useNavigate();
  const { lowStockAlerts, removeLowStockAlert } = useAdminStore();

  const handleRestock = (productId: string, productName: string) => {
    removeLowStockAlert(productId);
    toast.success(`${productName} restocked successfully`, {
      description: 'Stock levels have been updated and alert resolved'
    });
  };

  const handleViewAllAlerts = () => {
    navigate('/admin/inventory');
    toast.info('Viewing all inventory alerts');
  };

  if (lowStockAlerts.length === 0) {
    return (
      <Card data-testid="low-stock-alerts">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Inventory Status
          </CardTitle>
          <CardDescription>All products are well stocked</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-green-600">
            <CheckCircle className="h-12 w-12 mx-auto mb-3 opacity-75" />
            <p className="font-medium">No low stock alerts</p>
            <p className="text-sm text-gray-500 mt-1">All inventory levels are adequate</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-testid="low-stock-alerts">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Low Stock Alerts
          <span className="ml-auto bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
            {lowStockAlerts.length}
          </span>
        </CardTitle>
        <CardDescription>Products that need immediate restocking</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {lowStockAlerts.slice(0, 5).map((item) => (
            <div 
              key={item.productId} 
              className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200 transition-all duration-200 hover:bg-orange-100"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.productName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-orange-700 bg-orange-200 px-2 py-1 rounded">
                    {item.currentStock} left
                  </span>
                  <span className="text-xs text-gray-500">
                    Threshold: {item.lowStockThreshold}
                  </span>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleRestock(item.productId, item.productName)}
                className="ml-3 bg-white hover:bg-orange-50 border-orange-300 text-orange-700 hover:text-orange-800 transition-all duration-200"
                aria-label={`Restock ${item.productName}`}
              >
                Restock
              </Button>
            </div>
          ))}
          {lowStockAlerts.length > 5 && (
            <div className="text-center pt-2 border-t border-orange-200">
              <p className="text-sm text-gray-500">
                +{lowStockAlerts.length - 5} more items need restocking
              </p>
              <Button 
                variant="link" 
                size="sm" 
                className="text-orange-600 hover:text-orange-700"
                onClick={handleViewAllAlerts}
              >
                View all alerts
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LowStockAlerts;
