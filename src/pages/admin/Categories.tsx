import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Search, Plus, Filter, ArrowUpDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CategoryCard from '@/components/admin/categories/CategoryCard';
import CategoryTable from '@/components/admin/categories/CategoryTable';
import CategoryForm from '@/components/admin/categories/CategoryForm';
import { toast } from 'sonner';
import { api } from '@/services/api';

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  products: number;
}

const Categories = () => {
  // State management
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'products' | 'date'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewType, setViewType] = useState('grid');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: ''
  });
  
  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);
  
  const fetchCategories = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call with mock data
      setTimeout(() => {
        setCategories([
          { 
            id: 1, 
            name: 'Electronics', 
            description: 'Electronic devices and gadgets',
            image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2070&auto=format&fit=crop',
            createdAt: '2025-01-15',
            products: 56
          },
          { 
            id: 2, 
            name: 'Fashion', 
            description: 'Clothing and accessories',
            image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop',
            createdAt: '2025-01-18',
            products: 124
          },
          { 
            id: 3, 
            name: 'Home & Kitchen', 
            description: 'Furniture and kitchen appliances',
            image: 'https://images.unsplash.com/photo-1556911220-bda9f7f7597b?q=80&w=2070&auto=format&fit=crop',
            createdAt: '2025-01-20',
            products: 89
          },
          { 
            id: 4, 
            name: 'Beauty', 
            description: 'Cosmetics and personal care',
            image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop',
            createdAt: '2025-01-22',
            products: 74
          },
          { 
            id: 5, 
            name: 'Sports & Outdoors', 
            description: 'Sports equipment and outdoor gear',
            image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop',
            createdAt: '2025-01-25',
            products: 62
          }
        ]);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
      setIsLoading(false);
    }
  };
  
  const handleSort = (field: 'name' | 'products' | 'date') => {
    if (sortBy === field) {
      // Toggle order if clicking on the same field
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortBy(field);
      setSortOrder('asc');
    }
  };
  
  // Filter and sort categories
  const processedCategories = categories
    .filter(category => 
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (sortBy === 'products') {
        return sortOrder === 'asc' 
          ? a.products - b.products 
          : b.products - a.products;
      } else { // date
        return sortOrder === 'asc' 
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() 
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  
  // Form handling
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleAddCategory = () => {
    if (!formData.name.trim()) {
      toast.error('Category name is required');
      return;
    }
    
    const newCategory = {
      id: Math.max(0, ...categories.map(c => c.id)) + 1,
      name: formData.name,
      description: formData.description,
      image: formData.image || 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2070&auto=format&fit=crop',
      createdAt: new Date().toISOString().split('T')[0],
      products: 0
    };
    
    setCategories([...categories, newCategory]);
    setFormData({ name: '', description: '', image: '' });
    setOpenAddDialog(false);
    toast.success(`Category "${newCategory.name}" has been created`);
  };
  
  const handleViewClick = (category: Category) => {
    setCurrentCategory(category);
    setOpenViewDialog(true);
  };
  
  const handleEditClick = (category: Category) => {
    setCurrentCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      image: category.image
    });
    setOpenEditDialog(true);
  };
  
  const handleEditCategory = () => {
    if (!currentCategory || !formData.name.trim()) {
      toast.error('Category name is required');
      return;
    }
    
    const updatedCategories = categories.map(cat => 
      cat.id === currentCategory.id 
        ? { 
            ...cat, 
            name: formData.name, 
            description: formData.description,
            image: formData.image
          } 
        : cat
    );
    
    setCategories(updatedCategories);
    setFormData({ name: '', description: '', image: '' });
    setOpenEditDialog(false);
    toast.success(`Category "${formData.name}" has been updated`);
  };
  
  const handleDeleteClick = (category: Category) => {
    setCurrentCategory(category);
    setOpenDeleteDialog(true);
  };
  
  const handleDeleteCategory = () => {
    if (!currentCategory) return;
    
    const updatedCategories = categories.filter(cat => cat.id !== currentCategory.id);
    setCategories(updatedCategories);
    setOpenDeleteDialog(false);
    toast.success(`Category "${currentCategory.name}" has been deleted`);
  };
  
  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-semibold">Categories</h1>
        
        <div className="flex flex-col sm:flex-row mt-4 sm:mt-0 w-full sm:w-auto space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search categories"
              className="pl-10 w-full sm:w-64"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          
          <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>
                  Create a new product category for your store.
                </DialogDescription>
              </DialogHeader>
              
              <CategoryForm 
                formData={formData}
                setFormData={setFormData}
                onSave={handleAddCategory}
                onCancel={() => setOpenAddDialog(false)}
                submitLabel="Add Category"
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSort('name')}
            className="flex gap-1 items-center"
          >
            Name
            <ArrowUpDown className="h-3 w-3" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSort('products')}
            className="flex gap-1 items-center"
          >
            Products
            <ArrowUpDown className="h-3 w-3" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSort('date')}
            className="flex gap-1 items-center"
          >
            Date
            <ArrowUpDown className="h-3 w-3" />
          </Button>
          
          <Button variant="outline" size="sm" onClick={fetchCategories}>
            Refresh
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 animate-pulse">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-md"></div>
          ))}
        </div>
      ) : processedCategories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No categories found</p>
          <Button 
            onClick={() => setOpenAddDialog(true)}
            className="mx-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Category
          </Button>
        </div>
      ) : (
        <Tabs value={viewType} onValueChange={setViewType}>
          <TabsList className="mb-6">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="grid" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {processedCategories.map((category) => (
                <CategoryCard 
                  key={category.id}
                  category={category}
                  onEdit={() => handleEditClick(category)}
                  onDelete={() => handleDeleteClick(category)}
                  onView={() => handleViewClick(category)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="table">
            <Card>
              <CardHeader>
                <CardTitle>Categories List</CardTitle>
                <CardDescription>
                  Manage your product categories.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CategoryTable 
                  categories={processedCategories}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                  onView={handleViewClick}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
      
      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category details.
            </DialogDescription>
          </DialogHeader>
          
          <CategoryForm 
            formData={formData}
            setFormData={setFormData}
            onSave={handleEditCategory}
            onCancel={() => setOpenEditDialog(false)}
            submitLabel="Save Changes"
          />
        </DialogContent>
      </Dialog>
      
      {/* View Dialog */}
      <Dialog open={openViewDialog} onOpenChange={setOpenViewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Category Details</DialogTitle>
          </DialogHeader>
          
          {currentCategory && (
            <div className="space-y-4">
              <div className="aspect-video overflow-hidden rounded-md">
                <img 
                  src={currentCategory.image} 
                  alt={currentCategory.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <h3 className="text-lg font-medium">{currentCategory.name}</h3>
                <p className="text-gray-500 mt-1">{currentCategory.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-500">Products</p>
                  <p className="font-medium">{currentCategory.products}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="font-medium">{currentCategory.createdAt}</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setOpenViewDialog(false)}>Close</Button>
                <Button onClick={() => {
                  setOpenViewDialog(false);
                  handleEditClick(currentCategory);
                }}>Edit</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Dialog */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
              {currentCategory?.products > 0 && (
                <div className="mt-2 text-red-500">
                  Warning: This category contains {currentCategory.products} products that will become uncategorized.
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCategory} className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Categories;
