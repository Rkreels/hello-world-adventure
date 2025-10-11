
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, AlertTriangle, Package } from 'lucide-react';
import { useAdminStore } from '@/stores/adminStore';
import { toast } from 'sonner';

const InventoryManagement = () => {
  const { inventory, updateInventory } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading inventory data
    setTimeout(() => {
      const mockInventory = [
        {
          productId: '1',
          productName: 'Wireless Earbuds Pro',
          currentStock: 15,
          lowStockThreshold: 20,
          isLowStock: true,
          lastRestocked: '2025-01-15'
        },
        {
          productId: '2',
          productName: 'Smart Watch Series X',
          currentStock: 45,
          lowStockThreshold: 25,
          isLowStock: false,
          lastRestocked: '2025-01-10'
        },
        {
          productId: '3',
          productName: 'USB-C Cable',
          currentStock: 8,
          lowStockThreshold: 15,
          isLowStock: true,
          lastRestocked: '2025-01-05'
        },
        {
          productId: '4',
          productName: 'Laptop Stand',
          currentStock: 32,
          lowStockThreshold: 20,
          isLowStock: false,
          lastRestocked: '2025-01-12'
        }
      ];
      updateInventory(mockInventory);
      setIsLoading(false);
    }, 1000);
  }, [updateInventory]);

  const filteredInventory = inventory.filter(item =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRestockProduct = (productId: string, productName: string) => {
    // Simulate restocking
    const updatedInventory = inventory.map(item => 
      item.productId === productId 
        ? { 
            ...item, 
            currentStock: item.currentStock + 50,
            isLowStock: (item.currentStock + 50) <= item.lowStockThreshold,
            lastRestocked: new Date().toISOString().split('T')[0]
          }
        : item
    );
    updateInventory(updatedInventory);
    toast.success(`${productName} restocked successfully`);
  };

  const getStockStatus = (item: any) => {
    if (item.isLowStock) {
      return <Badge variant="destructive" className="flex items-center gap-1">
        <AlertTriangle className="h-3 w-3" />
        Low Stock
      </Badge>;
    }
    return <Badge variant="default" className="bg-green-500">In Stock</Badge>;
  };

  const handleAddStock = () => {
    toast.info('Add stock functionality - Coming soon');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Inventory Management</h2>
        <Button onClick={handleAddStock}>
          <Plus className="h-4 w-4 mr-2" />
          Add Stock
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Stock Levels
            </CardTitle>
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-100 animate-pulse rounded"></div>
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Low Stock Threshold</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Restocked</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No inventory items found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInventory.map((item) => (
                    <TableRow key={item.productId}>
                      <TableCell className="font-medium">{item.productName}</TableCell>
                      <TableCell>{item.currentStock} units</TableCell>
                      <TableCell>{item.lowStockThreshold} units</TableCell>
                      <TableCell>{getStockStatus(item)}</TableCell>
                      <TableCell>{item.lastRestocked}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRestockProduct(item.productId, item.productName)}
                        >
                          Restock
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryManagement;
