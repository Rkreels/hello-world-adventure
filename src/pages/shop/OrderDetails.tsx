
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Loader2, Search, FileText, Package, Truck } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: string;
  items: OrderItem[];
  shippingAddress: Address;
  shippingMethod: string;
  trackingNumber?: string;
}

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const OrderDetails = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generate mock orders
        const mockOrders: Order[] = Array.from({ length: 15 }, (_, i) => {
          const statuses: ('Processing' | 'Shipped' | 'Delivered' | 'Cancelled')[] = [
            'Processing', 'Shipped', 'Delivered', 'Cancelled'
          ];
          const status = statuses[Math.floor(Math.random() * statuses.length)];
          const orderDate = new Date();
          orderDate.setDate(orderDate.getDate() - i * 3); // Orders from different dates
          
          return {
            id: `ORD${202500 + i}`,
            date: orderDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            status,
            total: `$${(Math.random() * 300 + 50).toFixed(2)}`,
            items: Array.from({ length: Math.floor(Math.random() * 4) + 1 }, (_, j) => ({
              id: j + 1,
              name: `Product ${j + 1}`,
              price: +(Math.random() * 100 + 10).toFixed(2),
              quantity: Math.floor(Math.random() * 3) + 1,
              image: 'https://placehold.co/100x100',
            })),
            shippingAddress: {
              name: 'John Doe',
              street: '123 Main St',
              city: 'Anytown',
              state: 'CA',
              zipCode: '12345',
              country: 'USA',
            },
            shippingMethod: 'Standard Shipping',
            trackingNumber: status !== 'Processing' ? `TRK${10000000 + i}` : undefined,
          };
        });
        
        setOrders(mockOrders);
        setFilteredOrders(mockOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);
  
  useEffect(() => {
    filterOrders(activeTab, searchQuery);
  }, [activeTab, searchQuery, orders]);
  
  // Filter orders based on status tab and search query
  const filterOrders = (tab: string, query: string) => {
    let filtered = orders;
    
    // Filter by tab/status
    if (tab !== 'all') {
      filtered = filtered.filter(order => {
        if (tab === 'processing') return order.status === 'Processing';
        if (tab === 'shipped') return order.status === 'Shipped';
        if (tab === 'delivered') return order.status === 'Delivered';
        if (tab === 'cancelled') return order.status === 'Cancelled';
        return true;
      });
    }
    
    // Filter by search query
    if (query.trim()) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(lowercaseQuery) ||
        order.date.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    setFilteredOrders(filtered);
    setCurrentPage(1); // Reset pagination when filtering
  };
  
  // View order details
  const viewOrder = (order: Order) => {
    setSelectedOrder(order);
  };
  
  // Calculate total for items in an order
  const calculateSubtotal = (items: OrderItem[]) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };
  
  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  const renderStatusBadge = (status: string) => {
    let color = '';
    if (status === 'Delivered') color = 'bg-green-100 text-green-800';
    else if (status === 'Shipped') color = 'bg-blue-100 text-blue-800';
    else if (status === 'Processing') color = 'bg-yellow-100 text-yellow-800';
    else if (status === 'Cancelled') color = 'bg-red-100 text-red-800';
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      
      {selectedOrder ? (
        <div>
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => setSelectedOrder(null)}
          >
            &larr; Back to Orders
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Order Summary */}
            <div className="col-span-2">
              <Card>
                <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b">
                  <div>
                    <CardTitle>Order #{selectedOrder.id}</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">{selectedOrder.date}</p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    {renderStatusBadge(selectedOrder.status)}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Order Status */}
                    <div>
                      <h3 className="font-semibold mb-4">Order Status</h3>
                      <div className="relative">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            selectedOrder.status !== 'Cancelled' ? 'bg-green-100 text-green-600' : 'bg-gray-100'
                          }`}>
                            <FileText className="h-4 w-4" />
                          </div>
                          <div className="ml-4">
                            <p className="font-medium">Order Placed</p>
                            <p className="text-sm text-gray-500">{selectedOrder.date}</p>
                          </div>
                        </div>
                        
                        <div className={`h-12 ml-4 border-l-2 ${
                          selectedOrder.status !== 'Cancelled' ? 'border-green-200' : 'border-gray-200'
                        }`} />
                        
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            selectedOrder.status !== 'Processing' && selectedOrder.status !== 'Cancelled' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-gray-100'
                          }`}>
                            <Package className="h-4 w-4" />
                          </div>
                          <div className="ml-4">
                            <p className="font-medium">Processing</p>
                            <p className="text-sm text-gray-500">
                              {selectedOrder.status === 'Processing' ? 'In progress' : 
                               selectedOrder.status === 'Cancelled' ? 'Cancelled' : 'Completed'}
                            </p>
                          </div>
                        </div>
                        
                        <div className={`h-12 ml-4 border-l-2 ${
                          selectedOrder.status === 'Shipped' || selectedOrder.status === 'Delivered' 
                            ? 'border-green-200' 
                            : 'border-gray-200'
                        }`} />
                        
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            selectedOrder.status === 'Shipped' || selectedOrder.status === 'Delivered' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-gray-100'
                          }`}>
                            <Truck className="h-4 w-4" />
                          </div>
                          <div className="ml-4">
                            <p className="font-medium">Shipped</p>
                            <p className="text-sm text-gray-500">
                              {selectedOrder.status === 'Shipped' || selectedOrder.status === 'Delivered' 
                                ? selectedOrder.trackingNumber 
                                : 'Pending'}
                            </p>
                          </div>
                        </div>
                        
                        <div className={`h-12 ml-4 border-l-2 ${
                          selectedOrder.status === 'Delivered' ? 'border-green-200' : 'border-gray-200'
                        }`} />
                        
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            selectedOrder.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-gray-100'
                          }`}>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <p className="font-medium">Delivered</p>
                            <p className="text-sm text-gray-500">
                              {selectedOrder.status === 'Delivered' ? 'Completed' : 'Pending'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Order Items */}
                    <div>
                      <h3 className="font-semibold mb-4">Order Items</h3>
                      <div className="border rounded-md divide-y">
                        {selectedOrder.items.map((item) => (
                          <div key={item.id} className="flex items-center p-4">
                            <div className="w-16 h-16 flex-shrink-0">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="ml-4 flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <div className="flex justify-between mt-1 text-sm text-gray-500">
                                <div>
                                  <p>Quantity: {item.quantity}</p>
                                </div>
                                <div>
                                  <p>${item.price.toFixed(2)} each</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Order Summary and Shipping */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="border-b">
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${calculateSubtotal(selectedOrder.items)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>$9.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span>$4.99</span>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>{selectedOrder.total}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="border-b">
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">Address</h4>
                      <p className="text-gray-600">{selectedOrder.shippingAddress.name}</p>
                      <p className="text-gray-600">{selectedOrder.shippingAddress.street}</p>
                      <p className="text-gray-600">
                        {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                      </p>
                      <p className="text-gray-600">{selectedOrder.shippingAddress.country}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Method</h4>
                      <p className="text-gray-600">{selectedOrder.shippingMethod}</p>
                    </div>
                    
                    {selectedOrder.trackingNumber && (
                      <div>
                        <h4 className="font-medium mb-1">Tracking</h4>
                        <p className="text-gray-600">{selectedOrder.trackingNumber}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Tabs and Search */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <Tabs 
              defaultValue="all" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full md:w-auto"
            >
              <TabsList className="grid grid-cols-2 sm:grid-cols-5 w-full md:w-auto">
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="shipped">Shipped</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search orders..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0 overflow-hidden">
              {loading ? (
                <div className="flex justify-center items-center py-16">
                  <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-xl font-medium">No orders found</p>
                  <p className="text-gray-600 mt-2">
                    {searchQuery ? 'Try a different search term' : 'You haven\'t placed any orders yet'}
                  </p>
                  <Button className="mt-4 bg-green-600 hover:bg-green-700" asChild>
                    <Link to="/shop">Start Shopping</Link>
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order ID
                          </th>
                          <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                          <th className="py-4 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {currentOrders.map((order) => (
                          <tr key={order.id}>
                            <td className="py-4 px-6 whitespace-nowrap">
                              <span className="font-medium">#{order.id}</span>
                            </td>
                            <td className="py-4 px-6 whitespace-nowrap">
                              {order.date}
                            </td>
                            <td className="py-4 px-6 whitespace-nowrap">
                              {renderStatusBadge(order.status)}
                            </td>
                            <td className="py-4 px-6 whitespace-nowrap">
                              {order.total}
                            </td>
                            <td className="py-4 px-6 whitespace-nowrap text-right">
                              <Button 
                                variant="ghost" 
                                className="text-blue-600 hover:text-blue-800"
                                onClick={() => viewOrder(order)}
                              >
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="p-4 border-t">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious 
                              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                            />
                          </PaginationItem>
                          
                          {Array.from({ length: totalPages }).map((_, index) => (
                            <PaginationItem key={index}>
                              <PaginationLink
                                isActive={currentPage === index + 1}
                                onClick={() => paginate(index + 1)}
                              >
                                {index + 1}
                              </PaginationLink>
                            </PaginationItem>
                          ))}
                          
                          <PaginationItem>
                            <PaginationNext 
                              onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
