
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Plus, AlertTriangle, Package } from 'lucide-react';
import { useAdminStore } from '@/stores/adminStore';
import { toast } from 'sonner';

const InventoryManagement = () => {
  const { inventory, restockProduct, initializeData } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [restockDialogOpen, setRestockDialogOpen] = useState(false);
  const [restockProductId, setRestockProductId] = useState('');
  const [restockProductName, setRestockProductName] = useState('');
  const [restockQty, setRestockQty] = useState(50);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  const filteredInventory = inventory.filter(item =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenRestock = (productId: string, productName: string) => {
    setRestockProductId(productId);
    setRestockProductName(productName);
    setRestockQty(50);
    setRestockDialogOpen(true);
  };

  const handleRestock = () => {
    if (restockQty <= 0) {
      toast.error('Please enter a valid quantity');
      return;
    }
    restockProduct(restockProductId, restockQty);
    toast.success(`${restockProductName} restocked with ${restockQty} units`);
    setRestockDialogOpen(false);
  };

  const getStockStatus = (item: { isLowStock: boolean; currentStock: number }) => {
    if (item.currentStock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    }
    if (item.isLowStock) {
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 flex items-center gap-1 w-fit">
          <AlertTriangle className="h-3 w-3" />
          Low Stock
        </Badge>
      );
    }
    return <Badge variant="default" className="bg-green-100 text-green-800">In Stock</Badge>;
  };

  const lowStockCount = inventory.filter(i => i.isLowStock).length;
  const outOfStockCount = inventory.filter(i => i.currentStock === 0).length;
  const totalUnits = inventory.reduce((sum, i) => sum + i.currentStock, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Inventory Management</h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Products</p>
            <p className="text-2xl font-bold">{inventory.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Units</p>
            <p className="text-2xl font-bold">{totalUnits.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-yellow-600">Low Stock</p>
            <p className="text-2xl font-bold text-yellow-600">{lowStockCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-destructive">Out of Stock</p>
            <p className="text-2xl font-bold text-destructive">{outOfStockCount}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Stock Levels
            </CardTitle>
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name or SKU..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Warehouse</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Threshold</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Restocked</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No inventory items found
                  </TableCell>
                </TableRow>
              ) : (
                filteredInventory.map((item) => (
                  <TableRow key={item.productId}>
                    <TableCell className="font-medium">{item.productName}</TableCell>
                    <TableCell><code className="text-xs bg-muted px-1.5 py-0.5 rounded">{item.sku}</code></TableCell>
                    <TableCell>{item.warehouse}</TableCell>
                    <TableCell>{item.currentStock} units</TableCell>
                    <TableCell>{item.lowStockThreshold} units</TableCell>
                    <TableCell>{getStockStatus(item)}</TableCell>
                    <TableCell>{item.lastRestocked}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        size="sm" 
                        variant={item.isLowStock ? 'default' : 'outline'}
                        onClick={() => handleOpenRestock(item.productId, item.productName)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Restock
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Restock Dialog */}
      <Dialog open={restockDialogOpen} onOpenChange={setRestockDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restock - {restockProductName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Quantity to add</label>
              <Input
                type="number"
                min={1}
                value={restockQty}
                onChange={(e) => setRestockQty(parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setRestockDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleRestock}>Confirm Restock</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryManagement;
