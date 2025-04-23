
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Edit, Trash, Star } from 'lucide-react';
import { toast } from 'sonner';

const Brands = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const brands = [
    { id: 1, name: 'Apple', products: 56, featured: true, logo: '🍎' },
    { id: 2, name: 'Samsung', products: 42, featured: true, logo: '📱' },
    { id: 3, name: 'Nike', products: 78, featured: true, logo: '👟' },
    { id: 4, name: 'Adidas', products: 63, featured: false, logo: '👕' },
    { id: 5, name: 'Sony', products: 37, featured: false, logo: '🎧' },
    { id: 6, name: 'Microsoft', products: 25, featured: true, logo: '💻' },
  ];
  
  const handleEdit = (id: number) => {
    toast.success(`Edit brand with ID: ${id}`);
  };
  
  const handleDelete = (id: number) => {
    toast.error(`Delete brand with ID: ${id}`);
  };
  
  const handleAddBrand = () => {
    toast.success("Add new brand clicked");
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(`Searching for: ${searchQuery}`);
  };
  
  const handleToggleFeatured = (id: number, currentState: boolean) => {
    toast.success(`Brand ID ${id} featured status set to ${!currentState}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Brand Management</h1>
        
        <Button 
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
          onClick={handleAddBrand}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Brand
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-medium">All Brands</div>
            <form onSubmit={handleSearch} className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search brands"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3 text-xl">
                        {brand.logo}
                      </div>
                      <span className="font-medium">{brand.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{brand.products}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={brand.featured ? "text-yellow-500" : "text-gray-400"}
                      onClick={() => handleToggleFeatured(brand.id, brand.featured)}
                    >
                      <Star className={`h-5 w-5 ${brand.featured ? "fill-yellow-400" : ""}`} />
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEdit(brand.id)}
                    >
                      <Edit className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(brand.id)}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Brands;
