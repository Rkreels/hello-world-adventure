
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Eye, Edit, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import { useAdminStore } from '@/stores/adminStore';
import OrderStatusManager from '@/components/admin/orders/OrderStatusManager';
import { toast } from 'sonner';

const OrderManagement = () => {
  const { orders, updateOrderStatus, initializeData } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <Package className="h-4 w-4" />;
      case 'Processing': return <Package className="h-4 w-4" />;
      case 'Shipped': return <Truck className="h-4 w-4" />;
      case 'Delivered': return <CheckCircle className="h-4 w-4" />;
      case 'Cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const configs = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Processing': 'bg-blue-100 text-blue-800', 
      'Shipped': 'bg-purple-100 text-purple-800',
      'Delivered': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={`flex items-center gap-1 ${configs[status as keyof typeof configs] || ''}`}>
        {getStatusIcon(status)}
        {status}
      </Badge>
    );
  };

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsDetailDialogOpen(true);
  };

  const handleStatusUpdate = (orderId: string, status: string, trackingNumber?: string, notes?: string) => {
    updateOrderStatus(orderId, status as any, trackingNumber);
    
    // Update the selected order if it's currently being viewed
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        status,
        trackingNumber: trackingNumber || selectedOrder.trackingNumber
      });
    }
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
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6" data-testid="order-management">
      <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
        <h1 className="text-2xl lg:text-3xl font-bold">Order Management</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full sm:w-48" data-testid="order-status-filter">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders ({ordersByStatus.all})</SelectItem>
              <SelectItem value="Pending">Pending ({ordersByStatus.Pending})</SelectItem>
              <SelectItem value="Processing">Processing ({ordersByStatus.Processing})</SelectItem>
              <SelectItem value="Shipped">Shipped ({ordersByStatus.Shipped})</SelectItem>
              <SelectItem value="Delivered">Delivered ({ordersByStatus.Delivered})</SelectItem>
              <SelectItem value="Cancelled">Cancelled ({ordersByStatus.Cancelled})</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search orders..."
              className="pl-10 w-full sm:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="order-search"
            />
          </div>
        </div>
      </div>

      <Card className="w-full" data-testid="orders-table-card">
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
            <div className="px-4 sm:px-0">
              <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:flex mb-4">
                <TabsTrigger value="all" className="text-xs sm:text-sm">All ({ordersByStatus.all})</TabsTrigger>
                <TabsTrigger value="Pending" className="text-xs sm:text-sm">Pending ({ordersByStatus.Pending})</TabsTrigger>
                <TabsTrigger value="Processing" className="text-xs sm:text-sm hidden sm:inline-flex">Processing ({ordersByStatus.Processing})</TabsTrigger>
                <TabsTrigger value="Shipped" className="text-xs sm:text-sm">Shipped ({ordersByStatus.Shipped})</TabsTrigger>
                <TabsTrigger value="Delivered" className="text-xs sm:text-sm">Delivered ({ordersByStatus.Delivered})</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={selectedStatus} className="mt-0">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <p className="text-gray-500 text-lg">No orders found</p>
                  <p className="text-gray-400 text-sm mt-2">
                    {searchQuery ? 'Try adjusting your search terms' : `No ${selectedStatus === 'all' ? '' : selectedStatus.toLowerCase()} orders at the moment`}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="hidden sm:table-header-group">
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Tracking</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.map((order) => (
                        <TableRow key={order.id} className="border-b">
                          {/* Mobile layout */}
                          <TableCell className="sm:hidden p-4">
                            <div className="space-y-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-medium">#{order.id}</div>
                                  <div className="text-sm text-gray-600">{order.customer}</div>
                                  <div className="text-sm text-gray-500">{order.date}</div>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium">${order.amount}</div>
                                  {getStatusBadge(order.status)}
                                </div>
                              </div>
                              {order.trackingNumber && (
                                <div className="text-xs">
                                  <span className="text-gray-500">Tracking: </span>
                                  <code className="bg-gray-100 px-1 py-0.5 rounded">
                                    {order.trackingNumber}
                                  </code>
                                </div>
                              )}
                              <div className="flex gap-2 pt-2">
                                <Button size="sm" variant="ghost" onClick={() => handleViewOrder(order)} className="flex-1" data-testid="view-order-btn">
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => handleViewOrder(order)} className="flex-1" data-testid="edit-order-btn">
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                              </div>
                            </div>
                          </TableCell>
                          
                          {/* Desktop layout */}
                          <TableCell className="font-medium hidden sm:table-cell">#{order.id}</TableCell>
                          <TableCell className="hidden sm:table-cell">{order.customer}</TableCell>
                          <TableCell className="hidden sm:table-cell">${order.amount}</TableCell>
                          <TableCell className="hidden sm:table-cell">{order.date}</TableCell>
                          <TableCell className="hidden sm:table-cell">{getStatusBadge(order.status)}</TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {order.trackingNumber ? (
                              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {order.trackingNumber}
                              </code>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right hidden sm:table-cell">
                            <div className="flex items-center justify-end gap-2">
                              <Button size="sm" variant="ghost" onClick={() => handleViewOrder(order)} data-testid="view-order-btn">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => handleViewOrder(order)} data-testid="edit-order-btn">
                                <Edit className="h-4 w-4" />
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

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="order-detail-dialog">
          <DialogHeader>
            <DialogTitle>Order Details - #{selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Card data-testid="order-info-card">
                  <CardHeader>
                    <CardTitle className="text-sm">Order Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Order ID:</span>
                      <span className="font-medium">#{selectedOrder.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Customer:</span>
                      <span className="font-medium">{selectedOrder.customer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Date:</span>
                      <span className="font-medium">{selectedOrder.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Amount:</span>
                      <span className="font-medium text-lg">${selectedOrder.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      {getStatusBadge(selectedOrder.status)}
                    </div>
                    {selectedOrder.trackingNumber && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Tracking:</span>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {selectedOrder.trackingNumber}
                        </code>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {selectedOrder.items && (
                  <Card data-testid="order-items-card">
                    <CardHeader>
                      <CardTitle className="text-sm">Order Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedOrder.items.map((item: string, index: number) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                            <span className="text-sm">{item}</span>
                            <span className="text-sm text-gray-600">1x</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div data-testid="order-status-manager">
                <OrderStatusManager
                  orderId={selectedOrder.id}
                  currentStatus={selectedOrder.status}
                  onStatusUpdate={handleStatusUpdate}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderManagement;
