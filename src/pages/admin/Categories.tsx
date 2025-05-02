
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import CategoryCard from '@/components/admin/categories/CategoryCard';
import CategoryTable from '@/components/admin/categories/CategoryTable';
import CategoryForm from '@/components/admin/categories/CategoryForm';

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  products: number;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([
    { 
      id: 1, 
      name: 'Electronics', 
      description: 'Electronic devices and gadgets',
      image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2070&auto=format&fit=crop',
      createdAt: '2023-01-15',
      products: 56
    },
    { 
      id: 2, 
      name: 'Fashion', 
      description: 'Clothing and accessories',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop',
      createdAt: '2023-01-18',
      products: 124
    },
    { 
      id: 3, 
      name: 'Home & Kitchen', 
      description: 'Furniture and kitchen appliances',
      image: 'https://images.unsplash.com/photo-1556911220-bda9f7f7597b?q=80&w=2070&auto=format&fit=crop',
      createdAt: '2023-01-20',
      products: 89
    },
    { 
      id: 4, 
      name: 'Beauty', 
      description: 'Cosmetics and personal care',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop',
      createdAt: '2023-01-22',
      products: 74
    },
    { 
      id: 5, 
      name: 'Sports & Outdoors', 
      description: 'Sports equipment and outdoor gear',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop',
      createdAt: '2023-01-25',
      products: 62
    }
  ]);
  
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: ''
  });
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddCategory = () => {
    const newCategory = {
      id: categories.length + 1,
      name: formData.name,
      description: formData.description,
      image: formData.image || 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2070&auto=format&fit=crop',
      createdAt: new Date().toISOString().split('T')[0],
      products: 0
    };
    
    setCategories([...categories, newCategory]);
    setFormData({ name: '', description: '', image: '' });
    setOpenAddDialog(false);
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
    if (!currentCategory) return;
    
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
            <DialogContent>
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {filteredCategories.map((category) => (
          <CategoryCard 
            key={category.id}
            category={category}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Categories List</CardTitle>
          <CardDescription>
            Manage your product categories.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryTable 
            categories={filteredCategories}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </CardContent>
      </Card>
      
      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent>
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
      
      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteCategory}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Categories;
