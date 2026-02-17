
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Eye, Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useAdminStore } from '@/stores/adminStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const OrderManagement = () => {
  const { orders, updateOrderStatus, initializeData } = useAdminStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  useEffect(() => { initializeData(); }, [initializeData]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <Clock className="h-4 w-4" />;
      case 'Processing': return <Package className="h-4 w-4" />;
      case 'Shipped': return <Truck className="h-4 w-4" />;
      case 'Delivered': return <CheckCircle className="h-4 w-4" />;
      case 'Cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const configs: Record<string, string> = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Processing: 'bg-blue-100 text-blue-800',
      Shipped: 'bg-purple-100 text-purple-800',
      Delivered: 'bg-green-100 text-green-800',
      Cancelled: 'bg-red-100 text-red-800',
    };
    return (
      <Badge className={`flex items-center gap-1 w-fit ${configs[status] || ''}`}>
        {getStatusIcon(status)}
        {status}
      </Badge>
    );
  };

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsDetailDialogOpen(true);
  };

  const handleViewFullOrder = (orderId: string) => {
    setIsDetailDialogOpen(false);
    navigate(`/admin/orders/${orderId}`);
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus as any);
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    toast.success(`Order #${orderId} updated to ${newStatus}`);
  };

  const ordersByStatus = {
    all: orders.length,
    Pending: orders.filter(o => o.status === 'Pending').length,
    Processing: orders.filter(o => o.status === 'Processing').length,
    Shipped: orders.filter(o => o.status === 'Shipped').length,
    Delivered: orders.filter(o => o.status === 'Delivered').length,
    Cancelled: orders.filter(o => o.status === 'Cancelled').length,
  };

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
        <h1 className="text-2xl lg:text-3xl font-bold">Order Management</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search orders..."
              className="pl-10 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-0 sm:p-6">
          <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
            <div className="px-4 sm:px-0 pt-4 sm:pt-0">
              <TabsList className="w-full sm:w-auto flex flex-wrap mb-4">
                <TabsTrigger value="all" className="text-xs sm:text-sm">All ({ordersByStatus.all})</TabsTrigger>
                <TabsTrigger value="Pending" className="text-xs sm:text-sm">Pending ({ordersByStatus.Pending})</TabsTrigger>
                <TabsTrigger value="Processing" className="text-xs sm:text-sm">Processing ({ordersByStatus.Processing})</TabsTrigger>
                <TabsTrigger value="Shipped" className="text-xs sm:text-sm">Shipped ({ordersByStatus.Shipped})</TabsTrigger>
                <TabsTrigger value="Delivered" className="text-xs sm:text-sm">Delivered ({ordersByStatus.Delivered})</TabsTrigger>
                <TabsTrigger value="Cancelled" className="text-xs sm:text-sm">Cancelled ({ordersByStatus.Cancelled})</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={selectedStatus} className="mt-0">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <p className="text-muted-foreground text-lg">No orders found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Tracking</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono text-xs font-medium">#{order.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{order.customer}</p>
                              <p className="text-xs text-muted-foreground">{order.email}</p>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">${order.amount}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell className="text-sm">{order.paymentMethod}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>
                            {order.trackingNumber ? (
                              <code className="text-xs bg-muted px-2 py-1 rounded">{order.trackingNumber}</code>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button size="sm" variant="ghost" onClick={() => handleViewOrder(order)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleViewFullOrder(order.id)}>
                                Details
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick View Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Order #{selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{selectedOrder.customer}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.email}</p>
                </div>
                {getStatusBadge(selectedOrder.status)}
              </div>

              <div className="border rounded-lg p-3 space-y-2">
                <p className="text-sm font-medium">Items</p>
                {selectedOrder.items.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>{item.name} × {item.qty}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between font-medium">
                  <span>Total</span>
                  <span>${selectedOrder.amount}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p><strong>Shipping:</strong> {selectedOrder.shippingAddress}</p>
                <p><strong>Payment:</strong> {selectedOrder.paymentMethod}</p>
                {selectedOrder.trackingNumber && <p><strong>Tracking:</strong> {selectedOrder.trackingNumber}</p>}
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                    <Button
                      key={s}
                      size="sm"
                      variant={selectedOrder.status === s ? 'default' : 'outline'}
                      onClick={() => handleStatusUpdate(selectedOrder.id, s)}
                      disabled={selectedOrder.status === s}
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>

              <Button className="w-full" onClick={() => handleViewFullOrder(selectedOrder.id)}>
                View Full Details
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderManagement;
