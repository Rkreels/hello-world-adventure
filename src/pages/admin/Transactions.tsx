
import { useState } from 'react';
import { MoreVertical, MoreHorizontal, ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Transactions = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Data for statistics cards
  const statsCards = [
    {
      title: 'Total Revenue',
      value: '$15,045',
      percentage: '+14.4%',
      period: 'Last 7 days'
    },
    {
      title: 'Completed Transactions',
      value: '3,150',
      percentage: '+20%',
      period: 'Last 7 days'
    },
    {
      title: 'Pending Transactions',
      value: '150',
      percentage: '85%',
      period: 'Last 7 days'
    },
    {
      title: 'Failed Transactions',
      value: '75',
      percentage: '15%',
      period: 'Last 7 days',
      percentageDown: true
    }
  ];

  // Payment method data
  const paymentMethod = {
    type: 'Finocut',
    number: '2345',
    status: 'Active',
    transactions: '1,250',
    revenue: '$50,000'
  };

  // Transaction data
  const transactions = [
    { id: '#CUST001', name: 'John Doe', date: '01-01-2025', total: '$2,904', method: 'CC', status: 'Complete' },
    { id: '#CUST001', name: 'John Doe', date: '01-01-2025', total: '$2,904', method: 'PayPal', status: 'Complete' },
    { id: '#CUST001', name: 'John Doe', date: '01-01-2025', total: '$2,904', method: 'CC', status: 'Complete' },
    { id: '#CUST001', name: 'John Doe', date: '01-01-2025', total: '$2,904', method: 'Bank', status: 'Complete' },
    { id: '#CUST001', name: 'Jane Smith', date: '01-01-2025', total: '$2,904', method: 'CC', status: 'Canceled' },
    { id: '#CUST001', name: 'Emily Davis', date: '01-01-2025', total: '$2,904', method: 'PayPal', status: 'Pending' },
    { id: '#CUST001', name: 'Jane Smith', date: '01-01-2025', total: '$2,904', method: 'Bank', status: 'Canceled' },
    { id: '#CUST001', name: 'John Doe', date: '01-01-2025', total: '$2,904', method: 'CC', status: 'Complete' },
    { id: '#CUST001', name: 'Emily Davis', date: '01-01-2025', total: '$2,904', method: 'PayPal', status: 'Pending' },
    { id: '#CUST001', name: 'Jane Smith', date: '01-01-2025', total: '$2,904', method: 'Bank', status: 'Canceled' }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Transaction</h1>
      
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
                  {card.percentage}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Payment Method Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium">Payment Method</h3>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-start">
            <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 w-64 h-40 rounded-xl p-4 text-white mr-6">
              <div className="flex justify-between mb-4">
                <div className="text-lg">{paymentMethod.type}</div>
                <div className="flex space-x-1">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                  <div className="w-4 h-4 bg-white bg-opacity-70 rounded-full"></div>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex justify-between mb-1">
                  <div>•••• •••• ••••</div>
                  <div>{paymentMethod.number}</div>
                </div>
                <div className="text-xs">
                  <div>Card holder name</div>
                  <div className="font-medium">Norman Montasor</div>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="text-xs">
                  <div>Expiry Date</div>
                  <div>02/30</div>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="mb-2">
                <div className="text-sm text-gray-500">Status: <span className="text-green-500">Active</span></div>
                <div className="text-sm text-gray-500">Transactions: {paymentMethod.transactions}</div>
                <div className="text-sm text-gray-500">Revenue: {paymentMethod.revenue}</div>
              </div>
              <div className="flex space-x-2">
                <Button variant="link" className="text-blue-500 p-0 h-auto">View Transactions</Button>
              </div>
            </div>
            
            <div>
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                Deactivate
              </Button>
            </div>
          </div>
          
          <div className="mt-4">
            <Button variant="outline" size="sm" className="flex items-center">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Card
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Transactions Table */}
      <Card>
        <CardContent className="p-6">
          {/* Tabs */}
          <div className="flex overflow-x-auto mb-4 bg-gray-50 rounded-md">
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
          
          {/* Search and Filters */}
          <div className="flex justify-end items-center mb-4">
            <div className="relative max-w-md mr-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search payment history"
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
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Table */}
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[100px]">Customer Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.name}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.total}</TableCell>
                  <TableCell>{transaction.method}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      transaction.status === 'Complete' 
                        ? 'bg-green-100 text-green-800' 
                        : transaction.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        transaction.status === 'Complete' 
                          ? 'bg-green-600' 
                          : transaction.status === 'Pending'
                            ? 'bg-yellow-600'
                            : 'bg-red-600'
                      }`}></span>
                      {transaction.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="link" className="text-blue-500 p-0 h-auto">View Details</Button>
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

export default Transactions;
