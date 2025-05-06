
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Edit, Trash, Star, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { Brand, brandService } from '@/services/brandService';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const Brands = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentBrand, setCurrentBrand] = useState<Brand | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    featured: false,
    status: 'active' as const
  });
  
  useEffect(() => {
    fetchBrands();
  }, [activeFilter]);
  
  const fetchBrands = async () => {
    setIsLoading(true);
    try {
      const filters: { status?: string, search?: string } = {};
      if (activeFilter !== 'all') {
        filters.status = activeFilter;
      }
      if (searchQuery) {
        filters.search = searchQuery;
      }
      
      const data = await brandService.getAll(filters);
      setBrands(data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBrands();
  };
  
  const handleAddBrand = async () => {
    try {
      if (!formData.name.trim()) {
        toast.error('Brand name is required');
        return;
      }
      
      const newBrand = await brandService.create({
        name: formData.name,
        logo: formData.logo || '🏢',
        featured: formData.featured,
        products: 0,
        status: formData.status
      });
      
      setBrands(prevBrands => [...prevBrands, newBrand]);
      setOpenAddDialog(false);
      resetForm();
    } catch (error) {
      console.error('Error adding brand:', error);
    }
  };
  
  const handleEditClick = (brand: Brand) => {
    setCurrentBrand(brand);
    setFormData({
      name: brand.name,
      logo: brand.logo,
      featured: brand.featured,
      status: brand.status || 'active'
    });
    setOpenEditDialog(true);
  };
  
  const handleEditBrand = async () => {
    if (!currentBrand) return;
    
    try {
      if (!formData.name.trim()) {
        toast.error('Brand name is required');
        return;
      }
      
      const updatedBrand = await brandService.update(currentBrand.id, {
        name: formData.name,
        logo: formData.logo,
        featured: formData.featured,
        status: formData.status
      });
      
      setBrands(prevBrands => 
        prevBrands.map(brand => 
          brand.id === currentBrand.id ? { ...brand, ...updatedBrand } : brand
        )
      );
      
      setOpenEditDialog(false);
      resetForm();
    } catch (error) {
      console.error('Error updating brand:', error);
    }
  };
  
  const handleToggleFeatured = async (id: number | string, currentState: boolean) => {
    try {
      const result = await brandService.toggleFeatured(id, !currentState);
      setBrands(prevBrands => 
        prevBrands.map(brand => 
          brand.id === id ? { ...brand, featured: !currentState } : brand
        )
      );
    } catch (error) {
      console.error('Error updating brand featured status:', error);
    }
  };
  
  const handleDeleteClick = (brand: Brand) => {
    setCurrentBrand(brand);
    setOpenDeleteDialog(true);
  };
  
  const handleDeleteBrand = async () => {
    if (!currentBrand) return;
    
    try {
      await brandService.delete(currentBrand.id);
      setBrands(prevBrands => prevBrands.filter(brand => brand.id !== currentBrand.id));
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting brand:', error);
    }
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      logo: '',
      featured: false,
      status: 'active'
    });
    setCurrentBrand(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Brand Management</h1>
        
        <Button 
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
          onClick={() => setOpenAddDialog(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Brand
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-grow">
          <Tabs 
            defaultValue="all" 
            value={activeFilter} 
            onValueChange={setActiveFilter} 
            className="w-full"
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <form onSubmit={handleSearch} className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search brands"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-medium">All Brands</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={fetchBrands}>
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-14 bg-gray-100 animate-pulse rounded"></div>
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Brand</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brands.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No brands found. Create your first brand.
                    </TableCell>
                  </TableRow>
                ) : (
                  brands.map((brand) => (
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
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          brand.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {brand.status || 'active'}
                        </span>
                      </TableCell>
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
                          onClick={() => handleEditClick(brand)}
                        >
                          <Edit className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteClick(brand)}
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      {/* Add Brand Dialog */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Brand</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-3">
            <div>
              <label className="text-sm font-medium">Brand Name</label>
              <Input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter brand name"
                className="mt-1"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Logo (Emoji)</label>
              <Input 
                value={formData.logo}
                onChange={(e) => setFormData({...formData, logo: e.target.value})}
                placeholder="Brand logo or emoji"
                className="mt-1"
              />
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="featured" 
                checked={formData.featured}
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                className="h-4 w-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
              />
              <label htmlFor="featured" className="ml-2 text-sm">Featured Brand</label>
            </div>
            
            <div>
              <label className="text-sm font-medium">Status</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({
                  ...formData, 
                  status: e.target.value as 'active' | 'inactive'
                })}
                className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div className="flex justify-end gap-3 pt-3">
              <Button variant="outline" onClick={() => setOpenAddDialog(false)}>Cancel</Button>
              <Button onClick={handleAddBrand}>Add Brand</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Edit Brand Dialog */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Brand</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-3">
            <div>
              <label className="text-sm font-medium">Brand Name</label>
              <Input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter brand name"
                className="mt-1"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Logo (Emoji)</label>
              <Input 
                value={formData.logo}
                onChange={(e) => setFormData({...formData, logo: e.target.value})}
                placeholder="Brand logo or emoji"
                className="mt-1"
              />
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="edit-featured" 
                checked={formData.featured}
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                className="h-4 w-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
              />
              <label htmlFor="edit-featured" className="ml-2 text-sm">Featured Brand</label>
            </div>
            
            <div>
              <label className="text-sm font-medium">Status</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({
                  ...formData, 
                  status: e.target.value as 'active' | 'inactive'
                })}
                className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div className="flex justify-end gap-3 pt-3">
              <Button variant="outline" onClick={() => setOpenEditDialog(false)}>Cancel</Button>
              <Button onClick={handleEditBrand}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Delete Brand Confirmation */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Brand</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {currentBrand?.name}? This action cannot be undone.
              {currentBrand?.products ? (
                <div className="mt-2 text-red-500">
                  Warning: This brand is associated with {currentBrand.products} products.
                </div>
              ) : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteBrand} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Brands;
