
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronLeft, ChevronRight, Search, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';

interface Transaction {
  id: string;
  name: string;
  date: string;
  total: string;
  method: string;
  status: string;
}

const TransactionTable = ({ transactions }: { transactions: Transaction[] }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleViewDetails = (id: string) => {
    toast.info(`Viewing transaction details for ${id}`);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(`Searching for: ${searchQuery}`);
  };

  return (
    <>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
                <Button 
                  variant="link" 
                  className="text-blue-500 p-0 h-auto"
                  onClick={() => handleViewDetails(transaction.id)}
                >
                  View Details
                </Button>
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
    </>
  );
};

export default TransactionTable;
