
import { useState } from 'react';
import { Search, ChevronRight, ChevronLeft, MoreHorizontal, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Customers = () => {
  const [activeTab, setActiveTab] = useState('this');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  
  // Stats data
  const statsCards = [
    {
      title: 'Total Customers',
      value: '11,040',
      percentage: '+14.4%',
      period: 'Last 7 days'
    },
    {
      title: 'New Customers',
      value: '2,370',
      percentage: '+20%',
      period: 'Last 7 days'
    },
    {
      title: 'Visitor',
      value: '250k',
      percentage: '+20%',
      period: 'Last 7 days'
    }
  ];

  // Overview stats
  const overviewStats = [
    { label: 'Active Customers', value: '25k' },
    { label: 'Repeat Customers', value: '5.6k' },
    { label: 'Shop Visitor', value: '250k' },
    { label: 'Conversion Rate', value: '5.5%' }
  ];

  // Customer data
  const customers = [
    { id: '#CUST001', name: 'John Doe', phone: '+1234567890', orders: 25, spend: '3,450.00', status: 'Active' },
    { id: '#CUST001', name: 'John Doe', phone: '+1234567890', orders: 25, spend: '3,450.00', status: 'Active' },
    { id: '#CUST001', name: 'John Doe', phone: '+1234567890', orders: 25, spend: '3,450.00', status: 'Active' },
    { id: '#CUST001', name: 'John Doe', phone: '+1234567890', orders: 25, spend: '3,450.00', status: 'Active' },
    { id: '#CUST001', name: 'Jane Smith', phone: '+1234567890', orders: 5, spend: '250.00', status: 'Inactive' },
    { id: '#CUST001', name: 'Emily Davis', phone: '+1234567890', orders: 30, spend: '4,600.00', status: 'VIP' },
    { id: '#CUST001', name: 'Jane Smith', phone: '+1234567890', orders: 5, spend: '250.00', status: 'Inactive' },
    { id: '#CUST001', name: 'John Doe', phone: '+1234567890', orders: 25, spend: '3,450.00', status: 'Active' },
    { id: '#CUST001', name: 'Emily Davis', phone: '+1234567890', orders: 30, spend: '4,600.00', status: 'VIP' },
    { id: '#CUST001', name: 'Jane Smith', phone: '+1234567890', orders: 5, spend: '250.00', status: 'Inactive' }
  ];

  // Selected customer details (sample)
  const customerDetails = {
    avatar: '/avatar.png',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    address: '123 Main St, NY',
    social: ['facebook', 'whatsapp', 'twitter', 'linkedin', 'instagram'],
    registration: '15.01.2025',
    lastPurchase: '10.01.2025',
    orders: {
      total: 150,
      completed: 140,
      canceled: 10
    }
  };

  const handleCustomerSelect = (index) => {
    // Simulate selecting a customer
    setSelectedCustomer(customerDetails);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Customers</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
                <span className="ml-2 text-xs text-green-500">
                  {card.percentage}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Customer Overview */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Customer Overview</h3>
            <div className="flex items-center space-x-2">
              <Button 
                variant={activeTab === 'this' ? 'outline' : 'ghost'} 
                size="sm"
                className={activeTab === 'this' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : ''}
                onClick={() => setActiveTab('this')}
              >
                This week
              </Button>
              <Button 
                variant={activeTab === 'last' ? 'outline' : 'ghost'} 
                size="sm"
                className={activeTab === 'last' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : ''}
                onClick={() => setActiveTab('last')}
              >
                Last week
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-between items-center border-b pb-4 mb-4">
            {overviewStats.map((stat, index) => (
              <div key={index} className="text-center p-4">
                <div className="text-xl font-semibold">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="h-64 w-full bg-gradient-to-b from-emerald-50 to-emerald-100 rounded-md relative">
            {/* Chart placeholder */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-emerald-600">
              Customer Growth Chart
            </div>
            <div className="absolute top-12 right-1/4 bg-emerald-100 px-2 py-1 rounded-md text-xs">
              <div className="text-emerald-700">Thursday</div>
              <div className="text-emerald-700 font-semibold">25,409</div>
            </div>
          </div>
          
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span className="text-emerald-700 font-semibold">Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>
        </CardContent>
      </Card>
      
      {/* Customer Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Customer Details</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Table - Takes 3 columns */}
            <div className="lg:col-span-3">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="w-[100px]">Customer Id</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Order Count</TableHead>
                    <TableHead>Total Spend</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer, index) => (
                    <TableRow key={index} onClick={() => handleCustomerSelect(index)} className="cursor-pointer hover:bg-gray-50">
                      <TableCell className="font-medium">{customer.id}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>{customer.spend}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          customer.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : customer.status === 'VIP'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            customer.status === 'Active' 
                              ? 'bg-green-600' 
                              : customer.status === 'VIP'
                                ? 'bg-yellow-600'
                                : 'bg-red-600'
                          }`}></span>
                          {customer.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
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
            </div>
            
            {/* Customer Details Sidebar */}
            {selectedCustomer && (
              <div className="bg-white rounded-md border p-4">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-2">
                    <img 
                      src={selectedCustomer.avatar} 
                      alt={selectedCustomer.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <h4 className="font-medium text-lg">{selectedCustomer.name}</h4>
                  <p className="text-sm text-gray-500">{selectedCustomer.email}</p>
                  <Button variant="link" size="sm" className="mt-1">
                    <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </Button>
                </div>
                
                <div className="mb-4">
                  <h5 className="text-sm font-medium mb-2">Customer Info</h5>
                  <div className="flex items-center mb-2">
                    <svg className="mr-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-sm">{selectedCustomer.phone}</span>
                  </div>
                  <div className="flex items-start mb-2">
                    <svg className="mr-2 h-4 w-4 text-gray-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{selectedCustomer.address}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h5 className="text-sm font-medium mb-2">Social Media</h5>
                  <div className="flex space-x-2">
                    {selectedCustomer.social.map((social, index) => (
                      <Button key={index} variant="outline" size="sm" className="h-8 w-8 p-0 rounded-full">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h5 className="text-sm font-medium mb-2">Activity</h5>
                  <div className="text-sm mb-1">Registration: {selectedCustomer.registration}</div>
                  <div className="text-sm">Last purchase: {selectedCustomer.lastPurchase}</div>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium mb-2">Order overview</h5>
                  <div className="flex justify-between text-center space-x-2 mb-2">
                    <div className="flex-1 bg-gray-50 rounded-md p-2">
                      <div className="text-blue-600 font-semibold">{selectedCustomer.orders.total}</div>
                      <div className="text-xs">Total order</div>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-md p-2">
                      <div className="text-green-600 font-semibold">{selectedCustomer.orders.completed}</div>
                      <div className="text-xs">Completed</div>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-md p-2">
                      <div className="text-red-600 font-semibold">{selectedCustomer.orders.canceled}</div>
                      <div className="text-xs">Canceled</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Customers;
