
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, ChevronLeft, ShoppingCart, Users, Tag, FileText } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [activeTab, setActiveTab] = useState('all');
  
  const [results, setResults] = useState({
    products: [],
    customers: [],
    orders: [],
    transactions: []
  });
  
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API search
    setIsLoading(true);
    
    // Mock data
    const mockProducts = [
      { id: 1, name: 'iPhone 13', price: '$999', category: 'Electronics', stock: 42 },
      { id: 2, name: 'MacBook Pro', price: '$1,299', category: 'Electronics', stock: 23 },
      { id: 3, name: 'AirPods Pro', price: '$249', category: 'Electronics', stock: 78 }
    ];
    
    const mockCustomers = [
      { id: 1, name: 'John Smith', email: 'john@example.com', orders: 7, spent: '$1,245' },
      { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', orders: 12, spent: '$3,478' }
    ];
    
    const mockOrders = [
      { id: 'ORD-2345', customer: 'John Smith', date: '2023-05-12', status: 'Delivered', total: '$799' },
      { id: 'ORD-2341', customer: 'Sarah Johnson', date: '2023-05-10', status: 'Processing', total: '$142' }
    ];
    
    const mockTransactions = [
      { id: 'TRX-4567', date: '2023-05-12', amount: '$799', status: 'Completed', method: 'Credit Card' },
      { id: 'TRX-4562', date: '2023-05-10', amount: '$142', status: 'Completed', method: 'PayPal' }
    ];
    
    // Simple filter based on query
    const filteredProducts = mockProducts.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );
    
    const filteredCustomers = mockCustomers.filter(c => 
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase())
    );
    
    const filteredOrders = mockOrders.filter(o => 
      o.id.toLowerCase().includes(query.toLowerCase()) ||
      o.customer.toLowerCase().includes(query.toLowerCase()) ||
      o.status.toLowerCase().includes(query.toLowerCase())
    );
    
    const filteredTransactions = mockTransactions.filter(t => 
      t.id.toLowerCase().includes(query.toLowerCase()) ||
      t.status.toLowerCase().includes(query.toLowerCase()) ||
      t.method.toLowerCase().includes(query.toLowerCase())
    );
    
    // Simulate API delay
    setTimeout(() => {
      setResults({
        products: filteredProducts,
        customers: filteredCustomers,
        orders: filteredOrders,
        transactions: filteredTransactions
      });
      setIsLoading(false);
    }, 500);
  }, [query]);
  
  const totalResults = 
    results.products.length + 
    results.customers.length + 
    results.orders.length + 
    results.transactions.length;
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/admin/dashboard">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        
        <h1 className="text-2xl font-semibold mb-2">Search Results</h1>
        <p className="text-gray-500">
          {isLoading 
            ? 'Searching...' 
            : `Found ${totalResults} results for "${query}"`
          }
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">
            All Results ({totalResults})
          </TabsTrigger>
          <TabsTrigger value="products">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Products ({results.products.length})
          </TabsTrigger>
          <TabsTrigger value="customers">
            <Users className="h-4 w-4 mr-2" />
            Customers ({results.customers.length})
          </TabsTrigger>
          <TabsTrigger value="orders">
            <Tag className="h-4 w-4 mr-2" />
            Orders ({results.orders.length})
          </TabsTrigger>
          <TabsTrigger value="transactions">
            <FileText className="h-4 w-4 mr-2" />
            Transactions ({results.transactions.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 gap-6">
            {results.products.length > 0 && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Products</CardTitle>
                  {results.products.length > 3 && (
                    <Button variant="ghost" asChild>
                      <Link to={`/admin/products/list?q=${query}`}>
                        View All
                      </Link>
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Stock</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.products.slice(0, 3).map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
            
            {results.customers.length > 0 && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Customers</CardTitle>
                  {results.customers.length > 3 && (
                    <Button variant="ghost" asChild>
                      <Link to={`/admin/customers?q=${query}`}>
                        View All
                      </Link>
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead>Total Spent</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.customers.slice(0, 3).map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell className="font-medium">{customer.name}</TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>{customer.orders}</TableCell>
                          <TableCell>{customer.spent}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
            
            {results.orders.length > 0 && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Orders</CardTitle>
                  {results.orders.length > 3 && (
                    <Button variant="ghost" asChild>
                      <Link to={`/admin/orders?q=${query}`}>
                        View All
                      </Link>
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.orders.slice(0, 3).map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.status}</TableCell>
                          <TableCell>{order.total}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
            
            {results.transactions.length > 0 && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Transactions</CardTitle>
                  {results.transactions.length > 3 && (
                    <Button variant="ghost" asChild>
                      <Link to={`/admin/transactions?q=${query}`}>
                        View All
                      </Link>
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.transactions.slice(0, 3).map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.amount}</TableCell>
                          <TableCell>{transaction.status}</TableCell>
                          <TableCell>{transaction.method}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
            
            {totalResults === 0 && !isLoading && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold mb-2">No results found</h2>
                <p className="text-gray-500 mb-4">
                  We couldn't find anything matching "{query}". Try different keywords.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="products">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stock</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                    </TableRow>
                  ))}
                  {results.products.length === 0 && !isLoading && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                        No products found matching "{query}"
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>{customer.spent}</TableCell>
                    </TableRow>
                  ))}
                  {results.customers.length === 0 && !isLoading && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                        No customers found matching "{query}"
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>{order.total}</TableCell>
                    </TableRow>
                  ))}
                  {results.orders.length === 0 && !isLoading && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No orders found matching "{query}"
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{transaction.status}</TableCell>
                      <TableCell>{transaction.method}</TableCell>
                    </TableRow>
                  ))}
                  {results.transactions.length === 0 && !isLoading && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No transactions found matching "{query}"
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchResults;
