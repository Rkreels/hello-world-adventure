
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Filter, Download, MoreHorizontal } from 'lucide-react';

// Order status badge component
const OrderStatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor()}`}>
      {status}
    </span>
  );
};

// Order table component
const OrderTable = ({ orders }: { orders: any[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <th className="p-4">Order ID</th>
            <th className="p-4">Date</th>
            <th className="p-4">Customer</th>
            <th className="p-4">Status</th>
            <th className="p-4">Amount</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="p-4 text-sm">#{order.id}</td>
              <td className="p-4 text-sm">{order.date}</td>
              <td className="p-4 text-sm">{order.customer}</td>
              <td className="p-4">
                <OrderStatusBadge status={order.status} />
              </td>
              <td className="p-4 text-sm">${order.amount}</td>
              <td className="p-4">
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Order filtering toolbox
const OrderFilterToolbar = ({ onFilterChange }: { onFilterChange: (filter: string) => void }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
      <div className="flex gap-4 w-full lg:w-auto">
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search orders..." 
            className="pl-10" 
          />
        </div>
        
        <Button variant="outline" className="flex gap-2 items-center">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </div>
      
      <div className="flex gap-4 w-full lg:w-auto">
        <Select defaultValue="today">
          <SelectTrigger className="w-full lg:w-40">
            <SelectValue placeholder="Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline" className="flex gap-2 items-center">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </Button>
      </div>
    </div>
  );
};

const OrderManagement = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Sample order data
  const orders = [
    { id: '1001', date: 'Apr 21, 2025', customer: 'John Doe', status: 'Completed', amount: '120.50' },
    { id: '1002', date: 'Apr 20, 2025', customer: 'Jane Smith', status: 'Processing', amount: '85.20' },
    { id: '1003', date: 'Apr 20, 2025', customer: 'Robert Johnson', status: 'Pending', amount: '220.00' },
    { id: '1004', date: 'Apr 19, 2025', customer: 'Emily Wilson', status: 'Completed', amount: '44.95' },
    { id: '1005', date: 'Apr 18, 2025', customer: 'Michael Brown', status: 'Cancelled', amount: '112.30' },
    { id: '1006', date: 'Apr 18, 2025', customer: 'Sarah Davis', status: 'Processing', amount: '175.60' },
    { id: '1007', date: 'Apr 17, 2025', customer: 'David Miller', status: 'Completed', amount: '62.75' },
    { id: '1008', date: 'Apr 16, 2025', customer: 'Lisa Garcia', status: 'Pending', amount: '145.00' }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Order Management</h1>
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid grid-cols-5 w-full md:w-auto">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <OrderFilterToolbar onFilterChange={setActiveFilter} />
      
      <Card>
        <CardContent className="p-0">
          <OrderTable orders={orders} />
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderManagement;
