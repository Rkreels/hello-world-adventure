
import { api } from './api';
import { toast } from 'sonner';
import { Product } from '@/types';

export const productService = {
  getAll: async (filters?: { 
    status?: string, 
    category?: string | number,
    featured?: boolean, 
    search?: string,
    minPrice?: number,
    maxPrice?: number,
    sortBy?: string,
    sortOrder?: 'asc' | 'desc'
  }) => {
    try {
      const { data } = await api.getProducts();
      
      let filteredData = [...data];
      
      if (filters?.status && filters.status !== 'all') {
        filteredData = filteredData.filter(product => product.status === filters.status);
      }
      
      if (filters?.category) {
        filteredData = filteredData.filter(product => 
          (product.categoryId && product.categoryId.toString() === filters.category?.toString()) ||
          product.category === filters.category
        );
      }
      
      if (filters?.featured !== undefined) {
        filteredData = filteredData.filter(product => 
          product.featured === filters.featured || product.isFeatured === filters.featured
        );
      }
      
      if (filters?.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredData = filteredData.filter(product => 
          product.name.toLowerCase().includes(searchTerm) || 
          product.description.toLowerCase().includes(searchTerm) ||
          (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
        );
      }
      
      if (filters?.minPrice !== undefined) {
        filteredData = filteredData.filter(product => 
          (product.discountedPrice || product.discountPrice || product.price) >= filters.minPrice!
        );
      }
      
      if (filters?.maxPrice !== undefined) {
        filteredData = filteredData.filter(product => 
          (product.discountedPrice || product.discountPrice || product.price) <= filters.maxPrice!
        );
      }
      
      // Sorting
      if (filters?.sortBy) {
        const sortOrder = filters.sortOrder === 'desc' ? -1 : 1;
        
        filteredData.sort((a, b) => {
          switch (filters.sortBy) {
            case 'price':
              return ((a.discountedPrice || a.discountPrice || a.price) - (b.discountedPrice || b.discountPrice || b.price)) * sortOrder;
            case 'name':
              return a.name.localeCompare(b.name) * sortOrder;
            case 'date':
              return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * sortOrder;
            case 'popularity':
              return ((b.reviewCount || 0) - (a.reviewCount || 0)) * sortOrder;
            default:
              return 0;
          }
        });
      }
      
      return filteredData;
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
      throw error;
    }
  },
  
  getById: async (id: string | number) => {
    try {
      const { data } = await api.getProduct(id.toString());
      return data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      toast.error('Failed to load product details');
      throw error;
    }
  },
  
  create: async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'ratings' | 'reviewCount'>) => {
    try {
      const { data } = await api.createProduct(product);
      toast.success(`Product "${product.name}" created successfully`);
      return data;
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Failed to create product');
      throw error;
    }
  },
  
  update: async (id: string | number, productData: Partial<Product>) => {
    try {
      const { data } = await api.updateProduct(id.toString(), productData);
      toast.success(`Product "${productData.name || 'selected'}" updated successfully`);
      return data;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      toast.error('Failed to update product');
      throw error;
    }
  },
  
  delete: async (id: string | number) => {
    try {
      await api.deleteProduct(id.toString());
      toast.success('Product deleted successfully');
      return { success: true };
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      toast.error('Failed to delete product');
      throw error;
    }
  }
};
