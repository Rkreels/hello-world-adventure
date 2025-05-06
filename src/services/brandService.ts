
import { api } from './api';
import { toast } from 'sonner';

export interface Brand {
  id: number | string;
  name: string;
  products: number;
  featured: boolean;
  logo: string;
  status?: 'active' | 'inactive';
}

export const brandService = {
  getAll: async (filters?: { 
    status?: string,
    featured?: boolean, 
    search?: string 
  }) => {
    try {
      // In a real app, this would be a specific endpoint
      const mockBrands = [
        { id: 1, name: 'Apple', products: 56, featured: true, logo: '🍎', status: 'active' as const },
        { id: 2, name: 'Samsung', products: 42, featured: true, logo: '📱', status: 'active' as const },
        { id: 3, name: 'Nike', products: 78, featured: true, logo: '👟', status: 'active' as const },
        { id: 4, name: 'Adidas', products: 63, featured: false, logo: '👕', status: 'active' as const },
        { id: 5, name: 'Sony', products: 37, featured: false, logo: '🎧', status: 'inactive' as const },
        { id: 6, name: 'Microsoft', products: 25, featured: true, logo: '💻', status: 'active' as const },
      ];
      
      let filteredData = [...mockBrands];
      
      if (filters?.status && filters.status !== 'all') {
        filteredData = filteredData.filter(brand => brand.status === filters.status);
      }
      
      if (filters?.featured !== undefined) {
        filteredData = filteredData.filter(brand => brand.featured === filters.featured);
      }
      
      if (filters?.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredData = filteredData.filter(brand => 
          brand.name.toLowerCase().includes(searchTerm)
        );
      }
      
      await new Promise(resolve => setTimeout(resolve, 500)); // Mock API delay
      return filteredData;
    } catch (error) {
      console.error('Error fetching brands:', error);
      toast.error('Failed to load brands');
      throw error;
    }
  },
  
  create: async (brand: Omit<Brand, 'id'>) => {
    try {
      // Simulate creating a brand
      const newBrand = {
        ...brand,
        id: Date.now()
      };
      
      toast.success(`Brand "${brand.name}" created successfully`);
      return newBrand;
    } catch (error) {
      console.error('Error creating brand:', error);
      toast.error('Failed to create brand');
      throw error;
    }
  },
  
  update: async (id: number | string, brandData: Partial<Brand>) => {
    try {
      // In a real app, we'd call a specific endpoint
      toast.success(`Brand "${brandData.name}" updated successfully`);
      return { id, ...brandData };
    } catch (error) {
      console.error(`Error updating brand ${id}:`, error);
      toast.error('Failed to update brand');
      throw error;
    }
  },
  
  toggleFeatured: async (id: number | string, featured: boolean) => {
    try {
      // In a real app, we'd call a specific endpoint
      toast.success(`Brand ${featured ? 'marked as featured' : 'removed from featured'}`);
      return { id, featured };
    } catch (error) {
      console.error(`Error updating brand ${id} featured status:`, error);
      toast.error('Failed to update brand');
      throw error;
    }
  },
  
  delete: async (id: number | string) => {
    try {
      // In a real app, we'd call a specific endpoint
      toast.success('Brand deleted successfully');
      return { success: true };
    } catch (error) {
      console.error(`Error deleting brand ${id}:`, error);
      toast.error('Failed to delete brand');
      throw error;
    }
  }
};
