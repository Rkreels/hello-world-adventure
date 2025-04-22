
import { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal, Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Stats data
  const statsCards = [
    {
      title: 'Total Orders',
      value: '1,240',
      percentage: '+14.4%',
      period: 'Last 7 days'
    },
    {
      title: 'New Orders',
      value: '240',
      percentage: '+20%',
      period: 'Last 7 days'
    },
    {
      title: 'Completed Orders',
      value: '960',
      percentage: '85%',
      period: 'Last 7 days'
    },
    {
      title: 'Canceled Orders',
      value: '87',
      percentage: '5%',
      percentageDown: true,
      period: 'Last 7 days'
    }
  ];

  // Orders data
  const orders = [
    { 
      id: '#ORD0001', 
      product: 'Wireless Bluetooth Headphones', 
      productImage: '🎧',
      date: '01-01-2025', 
      price: '49.99', 
      payment: 'Paid', 
      status: 'Delivered' 
    },
    { 
      id: '#ORD0001', 
      product: 'Men\'s T-Shirt', 
      productImage: '👕',
      date: '01-01-2025', 
      price: '14.99', 
      payment: 'Unpaid', 
      status: 'Pending' 
    },
    { 
      id: '#ORD0001', 
      product: 'Men\'s Leather Wallet', 
      productImage: '👛',
      date: '01-01-2025', 
      price: '49.99', 
      payment: 'Paid', 
      status: 'Delivered' 
    },
    { 
      id: '#ORD0001', 
      product: 'Memory Foam Pillow', 
      productImage: '🛏️',
      date: '01-01-2025', 
      price: '39.99', 
      payment: 'Paid', 
      status: 'Shipped' 
    },
    { 
      id: '#ORD0001', 
      product: 'Adjustable Dumbbells', 
      productImage: '🏋️',
      date: '01-01-2025', 
      price: '14.99', 
      payment: 'Unpaid', 
      status: 'Pending' 
    },
    { 
      id: '#ORD0001', 
      product: 'Coffee Maker', 
      productImage: '☕',
      date: '01-01-2025', 
      price: '79.99', 
      payment: 'Unpaid', 
      status: 'Cancelled' 
    },
    { 
      id: '#ORD0001', 
      product: 'Casual Baseball Cap', 
      productImage: '🧢',
      date: '01-01-2025', 
      price: '49.99', 
      payment: 'Paid', 
      status: 'Delivered' 
    },
    { 
      id: '#ORD0001', 
      product: 'Full HD Webcam', 
      productImage: '📹',
      date: '01-01-2025', 
      price: '39.99', 
      payment: 'Paid', 
      status: 'Delivered' 
    },
    { 
      id: '#ORD0001', 
      product: 'Smart LED Color Bulb', 
      productImage: '💡',
      date: '01-01-2025', 
      price: '79.99', 
      payment: 'Unpaid', 
      status: 'Delivered' 
    },
    { 
      id: '#ORD0001', 
      product: 'Men\'s T-Shirt', 
      productImage: '👕',
      date: '01-01-2025', 
      price: '14.99', 
      payment: 'Unpaid', 
      status: 'Delivered' 
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Order Management</h1>
      
      <h2 className="text-xl font-medium mb-4">Order List</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {statsCards.map((card, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-sm text-gray-500">{card.title}</h3>
                  <p className="text-sm text-gray-500">{card.period}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center">
                <div className="text-2xl font-semibold">{card.value}</div>
                <span className={`ml-2 text-xs ${card.percentageDown ? 'text-red-500' : 'text-green-500'}`}>
                  {card.percentageDown ? '▼' : '▲'} {card.percentage}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Orders Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex overflow-x-auto bg-gray-50 rounded-md">
              <button 
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'all' ? 'bg-white rounded-md shadow' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All order (240)
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'completed' ? 'bg-white rounded-md shadow' : ''}`}
                onClick={() => setActiveTab('completed')}
              >
                Completed
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'pending' ? 'bg-white rounded-md shadow' : ''}`}
                onClick={() => setActiveTab('pending')}
              >
                Pending
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'canceled' ? 'bg-white rounded-md shadow' : ''}`}
                onClick={() => setActiveTab('canceled')}
              >
                Canceled
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button 
                className="bg-emerald-500 hover:bg-emerald-600 text-white flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Order
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
                More Action
              </Button>
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className="flex justify-end items-center mb-4">
            <div className="relative max-w-md mr-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search order report"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
              </Button>
              <Button variant="ghost" size="sm">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              </Button>
              <Button variant="ghost" size="sm">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </Button>
            </div>
          </div>
          
          {/* Table */}
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[50px]">No.</TableHead>
                <TableHead className="w-[100px]">Order Id</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-md overflow-hidden bg-gray-100 mr-2 flex items-center justify-center">
                        <span className="text-lg">{order.productImage}</span>
                      </div>
                      <span>{order.product}</span>
                    </div>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.price}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      order.payment === 'Paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        order.payment === 'Paid' ? 'bg-green-600' : 'bg-red-600'
                      }`}></span>
                      {order.payment}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'Shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          order.status === 'Delivered' 
                            ? 'bg-green-600' 
                            : order.status === 'Shipped'
                              ? 'bg-blue-600'
                              : order.status === 'Pending'
                                ? 'bg-yellow-600'
                                : 'bg-red-600'
                        }`}></span>
                        {order.status}
                      </span>
                      <Button variant="link" className="text-blue-500 ml-2 p-0 h-auto text-xs">
                        View Details
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <Button variant="outline" size="sm" className="flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              <Button variant="outline" size="sm" className="bg-emerald-50 text-emerald-600 border-emerald-200">1</Button>
              <Button variant="ghost" size="sm">2</Button>
              <Button variant="ghost" size="sm">3</Button>
              <Button variant="ghost" size="sm">4</Button>
              <Button variant="ghost" size="sm">5</Button>
              <span>.....</span>
              <Button variant="ghost" size="sm">24</Button>
            </div>
            <Button variant="outline" size="sm" className="flex items-center">
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderManagement;
