
import { useState } from 'react';
import { Search, ChevronRight, Edit, Trash, ChevronLeft, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Categories = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Category data
  const categories = [
    { 
      name: 'Electronics', 
      icon: '💻',
      items: [
        { name: 'Wireless Bluetooth Headphones', created: '01-01-2025', orders: 25 },
        { name: 'Full HD Webcam', created: '01-01-2025', orders: 20 },
        { name: 'Smart LED Color Bulb', created: '01-01-2025', orders: 16 }
      ] 
    },
    { 
      name: 'Fashion', 
      icon: '👕',
      items: [
        { name: 'Men\'s T-Shirt', created: '01-01-2025', orders: 20 },
        { name: 'Men\'s T-Shirt', created: '01-01-2025', orders: 10 }
      ] 
    },
    { 
      name: 'Accessories', 
      icon: '🎧',
      items: [
        { name: 'Men\'s Leather Wallet', created: '01-01-2025', orders: 35 },
        { name: 'Men\'s Leather Wallet', created: '01-01-2025', orders: 35 }
      ] 
    },
    { 
      name: 'Home & Kitchen', 
      icon: '🏠',
      items: [
        { name: 'Memory Foam Pillow', created: '01-01-2025', orders: 40 },
        { name: 'Coffee Maker', created: '01-01-2025', orders: 45 }
      ] 
    },
    { 
      name: 'Sports & Outdoors', 
      icon: '⚽',
      items: [
        { name: 'Casual Baseball Cap', created: '01-01-2025', orders: 55 }
      ] 
    },
    { 
      name: 'Toys & Games', 
      icon: '🎮',
      items: [] 
    },
    { 
      name: 'Health & Fitness', 
      icon: '💪',
      items: [] 
    },
    { 
      name: 'Books', 
      icon: '📚',
      items: [] 
    }
  ];

  const allProducts = categories.flatMap((category) => 
    category.items.map((item) => ({
      ...item,
      category: category.name
    }))
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Categories</h1>
      
      {/* Categories Grid */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Discover</h2>
          <div className="flex items-center space-x-3">
            <Button 
              className="bg-emerald-500 hover:bg-emerald-600 text-white flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-md mr-3">
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <div className="font-medium">{category.name}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full w-8 h-8 p-0 absolute right-6 top-1/2 transform -translate-y-1/2 bg-white shadow-md"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Product Table */}
      <Card>
        <CardContent className="p-6">
          {/* Tabs */}
          <div className="flex overflow-x-auto mb-4 bg-gray-50 rounded-md">
            <button 
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'all' ? 'bg-white rounded-md shadow' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Product (145)
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'featured' ? 'bg-white rounded-md shadow' : ''}`}
              onClick={() => setActiveTab('featured')}
            >
              Featured Products
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'sale' ? 'bg-white rounded-md shadow' : ''}`}
              onClick={() => setActiveTab('sale')}
            >
              On Sale
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'outofstock' ? 'bg-white rounded-md shadow' : ''}`}
              onClick={() => setActiveTab('outofstock')}
            >
              Out of Stock
            </button>
          </div>
          
          {/* Search and Filters */}
          <div className="flex justify-end items-center mb-4">
            <div className="relative max-w-md mr-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search your product"
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
                <Plus className="h-5 w-5" />
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
                <TableHead className="w-[100px]">No.</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allProducts.map((product, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-md overflow-hidden bg-gray-100 mr-2">
                        <div className="w-full h-full flex items-center justify-center">
                          {product.name.charAt(0)}
                        </div>
                      </div>
                      {product.name}
                    </div>
                  </TableCell>
                  <TableCell>{product.created}</TableCell>
                  <TableCell>{product.orders}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Trash className="h-4 w-4" />
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

export default Categories;
