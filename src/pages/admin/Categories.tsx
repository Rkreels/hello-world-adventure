
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Grid, List } from 'lucide-react';
import { useAdminStore } from '@/stores/adminStore';
import CategoryCard from '@/components/admin/categories/CategoryCard';
import CategoryTable from '@/components/admin/categories/CategoryTable';
import CategoryForm from '@/components/admin/categories/CategoryForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

const Categories = () => {
  const { categories, addCategory, updateCategory, deleteCategory, initializeData } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCategory = (categoryData: any) => {
    addCategory({
      name: categoryData.name,
      description: categoryData.description,
      image: categoryData.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300',
      createdAt: new Date().toISOString().split('T')[0],
      products: 0,
    });
    setIsDialogOpen(false);
    toast.success('Category added successfully');
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const handleUpdateCategory = (categoryData: any) => {
    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name: categoryData.name,
        description: categoryData.description,
        image: categoryData.image || editingCategory.image,
      });
      setIsDialogOpen(false);
      setEditingCategory(null);
      toast.success('Category updated successfully');
    }
  };

  const handleDeleteCategory = (id: number) => {
    deleteCategory(id);
    toast.success('Category deleted successfully');
  };

  const handleFormSubmit = (categoryData: any) => {
    if (editingCategory) {
      handleUpdateCategory(categoryData);
    } else {
      handleAddCategory(categoryData);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingCategory(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingCategory(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </DialogTitle>
            </DialogHeader>
            <CategoryForm
              category={editingCategory}
              onSubmit={handleFormSubmit}
              onCancel={handleDialogClose}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Manage Categories</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search categories..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={view} onValueChange={(v) => setView(v as 'grid' | 'table')}>
            <TabsList className="mb-4">
              <TabsTrigger value="grid" className="flex items-center gap-2">
                <Grid className="h-4 w-4" />
                Grid View
              </TabsTrigger>
              <TabsTrigger value="table" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                Table View
              </TabsTrigger>
            </TabsList>

            <TabsContent value="grid">
              {filteredCategories.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No categories found</p>
                  <p className="text-gray-400 text-sm mt-2">
                    {searchQuery ? 'Try adjusting your search terms' : 'Create your first category to get started'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCategories.map((category) => (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      onEdit={handleEditCategory}
                      onDelete={handleDeleteCategory}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="table">
              <CategoryTable
                categories={filteredCategories}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Categories;
