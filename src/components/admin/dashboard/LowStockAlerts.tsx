
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Package } from 'lucide-react';
import { useAdminStore } from '@/stores/adminStore';
import { toast } from 'sonner';

const LowStockAlerts = () => {
  const { lowStockAlerts, removeLowStockAlert } = useAdminStore();

  const handleRestock = (productId: string, productName: string) => {
    removeLowStockAlert(productId);
    toast.success(`${productName} restocked successfully`);
  };

  if (lowStockAlerts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Inventory Status
          </CardTitle>
          <CardDescription>All products are well stocked</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-green-600">
            <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No low stock alerts</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Low Stock Alerts
        </CardTitle>
        <CardDescription>Products that need restocking</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {lowStockAlerts.slice(0, 5).map((item) => (
            <div key={item.productId} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div>
                <p className="font-medium text-sm">{item.productName}</p>
                <p className="text-xs text-gray-500">
                  {item.currentStock} left (threshold: {item.lowStockThreshold})
                </p>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleRestock(item.productId, item.productName)}
              >
                Restock
              </Button>
            </div>
          ))}
          {lowStockAlerts.length > 5 && (
            <p className="text-sm text-gray-500 text-center">
              +{lowStockAlerts.length - 5} more items need restocking
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LowStockAlerts;
