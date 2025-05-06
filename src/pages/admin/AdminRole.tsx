
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Edit, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { roleService } from '@/services/roleService';
import { AdminRole } from '@/services/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const AdminRolePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [adminRoles, setAdminRoles] = useState<AdminRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentRole, setCurrentRole] = useState<AdminRole | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: '',
  });

  useEffect(() => {
    fetchRoles();
  }, []);
  
  const fetchRoles = async () => {
    setIsLoading(true);
    try {
      const data = await roleService.getAll(searchQuery);
      setAdminRoles(data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRoles();
  };
  
  const handleAddRole = async () => {
    try {
      if (!formData.name.trim()) {
        toast.error('Role name is required');
        return;
      }
      
      const newRole = await roleService.create({
        name: formData.name,
        description: formData.description,
        permissions: formData.permissions,
      });
      
      setAdminRoles(prevRoles => [...prevRoles, newRole]);
      setOpenAddDialog(false);
      resetForm();
    } catch (error) {
      console.error('Error adding role:', error);
    }
  };
  
  const handleEdit = (role: AdminRole) => {
    setCurrentRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    });
    setOpenEditDialog(true);
  };
  
  const handleEditRole = async () => {
    if (!currentRole) return;
    
    try {
      if (!formData.name.trim()) {
        toast.error('Role name is required');
        return;
      }
      
      const updatedRole = await roleService.update(currentRole.id, formData);
      
      setAdminRoles(prevRoles => 
        prevRoles.map(role => 
          role.id === currentRole.id ? { ...role, ...updatedRole } : role
        )
      );
      
      setOpenEditDialog(false);
      resetForm();
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };
  
  const handleDelete = (role: AdminRole) => {
    setCurrentRole(role);
    setOpenDeleteDialog(true);
  };
  
  const handleDeleteRole = async () => {
    if (!currentRole) return;
    
    try {
      await roleService.delete(currentRole.id);
      setAdminRoles(prevRoles => prevRoles.filter(role => role.id !== currentRole.id));
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      permissions: '',
    });
    setCurrentRole(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Admin Role Management</h1>
        
        <Button 
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
          onClick={() => setOpenAddDialog(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Role
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-medium">Roles</div>
            <form onSubmit={handleSearch} className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search roles"
                className="w-full pl-10 pr-4 py-2 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
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
                  <TableHead>Role Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adminRoles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                      No roles found. Create your first role.
                    </TableCell>
                  </TableRow>
                ) : (
                  adminRoles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>{role.permissions}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEdit(role)}
                        >
                          <Edit className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDelete(role)}
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
      
      {/* Add Role Dialog */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Role</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-3">
            <div>
              <label className="text-sm font-medium">Role Name</label>
              <Input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter role name"
                className="mt-1"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Description</label>
              <Input 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Role description"
                className="mt-1"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Permissions</label>
              <Input 
                value={formData.permissions}
                onChange={(e) => setFormData({...formData, permissions: e.target.value})}
                placeholder="Comma separated permissions"
                className="mt-1"
              />
            </div>
            
            <div className="flex justify-end gap-3 pt-3">
              <Button variant="outline" onClick={() => setOpenAddDialog(false)}>Cancel</Button>
              <Button onClick={handleAddRole}>Add Role</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Edit Role Dialog */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-3">
            <div>
              <label className="text-sm font-medium">Role Name</label>
              <Input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter role name"
                className="mt-1"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Description</label>
              <Input 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Role description"
                className="mt-1"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Permissions</label>
              <Input 
                value={formData.permissions}
                onChange={(e) => setFormData({...formData, permissions: e.target.value})}
                placeholder="Comma separated permissions"
                className="mt-1"
              />
            </div>
            
            <div className="flex justify-end gap-3 pt-3">
              <Button variant="outline" onClick={() => setOpenEditDialog(false)}>Cancel</Button>
              <Button onClick={handleEditRole}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Delete Role Confirmation */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Role</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {currentRole?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRole} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminRolePage;
