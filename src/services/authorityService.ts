
import { toast } from 'sonner';
import { PermissionModule } from './types';

interface AuthorityRole {
  id: number;
  name: string;
  permissions: PermissionModule[];
}

export const authorityService = {
  getRoles: async () => {
    try {
      // Mock data - in real app would come from API
      const roles: AuthorityRole[] = [
        { 
          id: 1, 
          name: 'Content Manager', 
          permissions: [] // We'll fetch these separately
        },
        { 
          id: 2, 
          name: 'Super Admin', 
          permissions: [] 
        },
        { 
          id: 3, 
          name: 'Order Manager', 
          permissions: [] 
        },
        { 
          id: 4, 
          name: 'Analytics Viewer', 
          permissions: [] 
        },
      ];
      
      await new Promise(resolve => setTimeout(resolve, 300)); // Mock API delay
      return roles;
    } catch (error) {
      console.error('Error fetching authority roles:', error);
      toast.error('Failed to load roles');
      throw error;
    }
  },
  
  getPermissions: async (roleId: number) => {
    try {
      // Mock data for permissions
      const permissions: PermissionModule[] = [
        { id: 1, module: 'Dashboard', view: true, create: false, edit: false, delete: false },
        { id: 2, module: 'Products', view: true, create: true, edit: true, delete: true },
        { id: 3, module: 'Categories', view: true, create: true, edit: true, delete: false },
        { id: 4, module: 'Orders', view: true, create: false, edit: true, delete: false },
        { id: 5, module: 'Customers', view: true, create: false, edit: false, delete: false },
        { id: 6, module: 'Transactions', view: true, create: false, edit: false, delete: false },
        { id: 7, module: 'Admin Roles', view: false, create: false, edit: false, delete: false },
      ];
      
      await new Promise(resolve => setTimeout(resolve, 300)); // Mock API delay
      return permissions;
    } catch (error) {
      console.error('Error fetching permissions:', error);
      toast.error('Failed to load permissions');
      throw error;
    }
  },
  
  updatePermission: async (roleId: number, moduleId: number, permissionType: 'view' | 'create' | 'edit' | 'delete', value: boolean) => {
    try {
      // In a real app, we'd call a specific endpoint to update a permission
      toast.success(`Permission updated successfully`);
      return { success: true };
    } catch (error) {
      console.error('Error updating permission:', error);
      toast.error('Failed to update permission');
      throw error;
    }
  },
  
  saveAllPermissions: async (roleId: number, permissions: PermissionModule[]) => {
    try {
      // In a real app, we'd send all permissions in one API call
      await new Promise(resolve => setTimeout(resolve, 500)); // Mock API delay
      toast.success('Permissions saved successfully');
      return { success: true };
    } catch (error) {
      console.error('Error saving permissions:', error);
      toast.error('Failed to save permissions');
      throw error;
    }
  }
};
