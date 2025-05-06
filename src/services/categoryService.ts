
import { api } from './api';
import { toast } from 'sonner';

export interface Category {
  id: string | number;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  products: number;
  status: 'active' | 'inactive';
}

export const categoryService = {
  getAll: async (filters?: { status?: string, search?: string }) => {
    try {
      const { data } = await api.getCategories();
      
      let filteredData = [...data];
      
      if (filters?.status && filters.status !== 'all') {
        filteredData = filteredData.filter(cat => cat.status === filters.status);
      }
      
      if (filters?.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredData = filteredData.filter(cat => 
          cat.name.toLowerCase().includes(searchTerm) || 
          cat.description.toLowerCase().includes(searchTerm)
        );
      }
      
      return filteredData;
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
      throw error;
    }
  },
  
  getById: async (id: string | number) => {
    try {
      // In a real app, we'd call a specific endpoint
      const { data } = await api.getCategories();
      const category = data.find(c => c.id.toString() === id.toString());
      
      if (!category) {
        throw new Error('Category not found');
      }
      
      return category;
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error);
      toast.error('Failed to load category details');
      throw error;
    }
  },
  
  create: async (category: Omit<Category, 'id' | 'createdAt' | 'products'>) => {
    try {
      // Simulate creating a category
      const newCategory = {
        ...category,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        products: 0
      };
      
      toast.success(`Category "${category.name}" created successfully`);
      return newCategory;
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error('Failed to create category');
      throw error;
    }
  },
  
  update: async (id: string | number, categoryData: Partial<Category>) => {
    try {
      // In a real app, we'd call a specific endpoint
      toast.success(`Category "${categoryData.name}" updated successfully`);
      return { id, ...categoryData };
    } catch (error) {
      console.error(`Error updating category ${id}:`, error);
      toast.error('Failed to update category');
      throw error;
    }
  },
  
  delete: async (id: string | number) => {
    try {
      // In a real app, we'd call a specific endpoint
      toast.success('Category deleted successfully');
      return { success: true };
    } catch (error) {
      console.error(`Error deleting category ${id}:`, error);
      toast.error('Failed to delete category');
      throw error;
    }
  }
};
