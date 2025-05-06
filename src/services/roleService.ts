
import { toast } from 'sonner';
import { AdminRole } from './types';

export const roleService = {
  getAll: async (search?: string) => {
    try {
      // Mock data for admin roles
      const roles: AdminRole[] = [
        { id: 1, name: 'Super Admin', description: 'Full access to all features', permissions: 'All' },
        { id: 2, name: 'Content Manager', description: 'Manage products and categories', permissions: 'Products, Categories' },
        { id: 3, name: 'Order Manager', description: 'Manage customer orders', permissions: 'Orders, Customers' },
        { id: 4, name: 'Analytics Viewer', description: 'View analytics only', permissions: 'Read-only' },
      ];
      
      if (search) {
        const searchLower = search.toLowerCase();
        return roles.filter(role => 
          role.name.toLowerCase().includes(searchLower) || 
          role.description.toLowerCase().includes(searchLower)
        );
      }
      
      await new Promise(resolve => setTimeout(resolve, 500)); // Mock API delay
      return roles;
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast.error('Failed to load roles');
      throw error;
    }
  },
  
  create: async (role: Omit<AdminRole, 'id'>) => {
    try {
      // Simulate creating a role
      const newRole = {
        ...role,
        id: Date.now()
      };
      
      toast.success(`Role "${role.name}" created successfully`);
      return newRole;
    } catch (error) {
      console.error('Error creating role:', error);
      toast.error('Failed to create role');
      throw error;
    }
  },
  
  update: async (id: number, roleData: Partial<AdminRole>) => {
    try {
      // In a real app, we'd call a specific endpoint
      toast.success(`Role "${roleData.name}" updated successfully`);
      return { id, ...roleData };
    } catch (error) {
      console.error(`Error updating role ${id}:`, error);
      toast.error('Failed to update role');
      throw error;
    }
  },
  
  delete: async (id: number) => {
    try {
      // In a real app, we'd call a specific endpoint
      toast.success('Role deleted successfully');
      return { success: true };
    } catch (error) {
      console.error(`Error deleting role ${id}:`, error);
      toast.error('Failed to delete role');
      throw error;
    }
  }
};
