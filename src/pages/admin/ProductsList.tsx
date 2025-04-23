
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronLeft, ChevronRight, Edit, Eye, Plus, Search, Trash } from 'lucide-react';

const ProductsList = () => {
  const products = [
    { id: 'P001', name: 'Wireless Bluetooth Headphones', category: 'Electronics', price: '$49.99', stock: 120, status: 'Active' },
    { id: 'P002', name: 'Men\'s T-Shirt', category: 'Fashion', price: '$14.99', stock: 250, status: 'Active' },
    { id: 'P003', name: 'Men\'s Leather Wallet', category: 'Fashion', price: '$29.99', stock: 85, status: 'Active' },
    { id: 'P004', name: 'Memory Foam Pillow', category: 'Home', price: '$39.99', stock: 60, status: 'Active' },
    { id: 'P005', name: 'Adjustable Dumbbells', category: 'Sports', price: '$149.99', stock: 30, status: 'Active' },
    { id: 'P006', name: 'Coffee Maker', category: 'Home', price: '$79.99', stock: 45, status: 'Active' },
    { id: 'P007', name: 'Casual Baseball Cap', category: 'Fashion', price: '$19.99', stock: 200, status: 'Out of Stock' },
    { id: 'P008', name: 'Full HD Webcam', category: 'Electronics', price: '$59.99', stock: 0, status: 'Out of Stock' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Product List</h1>
        
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-medium">All Products</div>
            <div className="flex items-center space-x-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search products"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <select className="border rounded-md p-2">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home</option>
                <option>Sports</option>
              </select>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      product.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        product.status === 'Active' ? 'bg-green-600' : 'bg-red-600'
                      }`}></span>
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4 text-green-500" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash className="h-4 w-4 text-red-500" />
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
              <span>...</span>
              <Button variant="ghost" size="sm">8</Button>
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

export default ProductsList;
