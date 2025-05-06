
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Search, Loader2, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface SearchResult {
  id: string;
  title: string;
  type: 'product' | 'order' | 'customer' | 'coupon';
  description?: string;
  status?: string;
  date?: string;
  value?: string;
  image?: string;
}

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState(query);
  
  // Number of items to display per page
  const itemsPerPage = 10;
  
  // Fetch search results when query or active tab changes
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate mock search results
        const mockResults: SearchResult[] = [];
        
        // Products
        for (let i = 0; i < 15; i++) {
          mockResults.push({
            id: `prod-${i + 1}`,
            title: `Product matching "${query}" - ${i + 1}`,
            type: 'product',
            description: `This is a product description for item ${i + 1}`,
            status: i % 5 === 0 ? 'Out of stock' : 'In stock',
            value: `$${(Math.random() * 100 + 10).toFixed(2)}`,
            image: 'https://placehold.co/60x60'
          });
        }
        
        // Orders
        for (let i = 0; i < 8; i++) {
          mockResults.push({
            id: `ord-${1000 + i}`,
            title: `Order #${1000 + i}`,
            type: 'order',
            status: ['Processing', 'Shipped', 'Delivered', 'Cancelled'][i % 4],
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
            value: `$${(Math.random() * 300 + 50).toFixed(2)}`
          });
        }
        
        // Customers
        for (let i = 0; i < 6; i++) {
          mockResults.push({
            id: `cust-${i + 1}`,
            title: `Customer ${i + 1}`,
            type: 'customer',
            description: `customer${i + 1}@example.com`,
            date: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            status: ['Active', 'Inactive'][i % 2]
          });
        }
        
        // Coupons
        for (let i = 0; i < 4; i++) {
          mockResults.push({
            id: `coup-${i + 1}`,
            title: `COUPON${i + 1}`,
            type: 'coupon',
            description: `${(i + 1) * 10}% off`,
            status: ['Active', 'Expired', 'Upcoming'][i % 3],
            date: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
          });
        }
        
        setResults(mockResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (query) {
      fetchResults();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);
  
  // Filter results based on active tab
  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredResults(results);
    } else {
      const filtered = results.filter(result => result.type === activeTab);
      setFilteredResults(filtered);
    }
    
    // Reset to first page when changing tabs
    setCurrentPage(1);
  }, [activeTab, results]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="flex items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <Button type="submit" className="ml-2 bg-emerald-600 hover:bg-emerald-700">
              Search
            </Button>
          </form>
          
          {query && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-1">Search Results</h2>
              <p className="text-gray-600">
                Showing results for "{query}" {filteredResults.length > 0 && `(${filteredResults.length} results)`}
              </p>
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl font-medium">No results found</p>
              <p className="text-gray-600 mt-2">Try searching for something else</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full md:w-auto">
                    <TabsTrigger value="all" className="flex-1 md:flex-none">
                      All ({results.length})
                    </TabsTrigger>
                    <TabsTrigger value="product" className="flex-1 md:flex-none">
                      Products ({results.filter(r => r.type === 'product').length})
                    </TabsTrigger>
                    <TabsTrigger value="order" className="flex-1 md:flex-none">
                      Orders ({results.filter(r => r.type === 'order').length})
                    </TabsTrigger>
                    <TabsTrigger value="customer" className="flex-1 md:flex-none">
                      Customers ({results.filter(r => r.type === 'customer').length})
                    </TabsTrigger>
                    <TabsTrigger value="coupon" className="flex-1 md:flex-none">
                      Coupons ({results.filter(r => r.type === 'coupon').length})
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Name/Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            {result.image && (
                              <img src={result.image} alt={result.title} className="w-10 h-10 rounded object-cover" />
                            )}
                            <span>{result.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="capitalize">{result.type}</span>
                        </TableCell>
                        <TableCell>
                          {result.description || result.value || '-'}
                        </TableCell>
                        <TableCell>
                          {result.status ? (
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              result.status.includes('stock') ? (
                                result.status === 'In stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              ) : result.status === 'Active' ? 'bg-green-100 text-green-800'
                              : result.status === 'Shipped' ? 'bg-blue-100 text-blue-800'
                              : result.status === 'Processing' ? 'bg-yellow-100 text-yellow-800'
                              : result.status === 'Delivered' ? 'bg-green-100 text-green-800'
                              : result.status === 'Cancelled' ? 'bg-red-100 text-red-800'
                              : result.status === 'Upcoming' ? 'bg-purple-100 text-purple-800'
                              : 'bg-gray-100 text-gray-800'
                            }`}>
                              {result.status}
                            </span>
                          ) : '-'}
                        </TableCell>
                        <TableCell>{result.date || '-'}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="sm">View</Button>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => paginate(Math.max(1, currentPage - 1))}
                          className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalPages }).map((_, index) => {
                        // Display first page, last page, and pages around current page
                        if (
                          index === 0 ||
                          index === totalPages - 1 ||
                          (index >= currentPage - 2 && index <= currentPage + 2)
                        ) {
                          return (
                            <PaginationItem key={index}>
                              <PaginationLink
                                isActive={currentPage === index + 1}
                                onClick={() => paginate(index + 1)}
                              >
                                {index + 1}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                        
                        // Add ellipsis if there's a gap
                        if (index === 1 || index === totalPages - 2) {
                          return (
                            <PaginationItem key={index}>
                              <span className="flex h-9 w-9 items-center justify-center">...</span>
                            </PaginationItem>
                          );
                        }
                        
                        return null;
                      })}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchResults;
