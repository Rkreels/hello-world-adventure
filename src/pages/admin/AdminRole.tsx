
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Edit, Trash } from 'lucide-react';
import { toast } from 'sonner';

const AdminRole = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [adminRoles, setAdminRoles] = useState([
    { id: 1, name: 'Super Admin', description: 'Full access to all features', permissions: 'All' },
    { id: 2, name: 'Content Manager', description: 'Manage products and categories', permissions: 'Products, Categories' },
    { id: 3, name: 'Order Manager', description: 'Manage customer orders', permissions: 'Orders, Customers' },
    { id: 4, name: 'Analytics Viewer', description: 'View analytics only', permissions: 'Read-only' },
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(`Searching for: ${searchQuery}`);
  };

  const handleEdit = (id: number) => {
    toast.success(`Edit role with ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    toast.error(`Delete role with ID: ${id}`);
    setAdminRoles(adminRoles.filter(role => role.id !== id));
  };

  const handleAddRole = () => {
    toast.success("Add new role clicked");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Admin Role Management</h1>
        
        <Button 
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
          onClick={handleAddRole}
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
              <input
                type="text"
                placeholder="Search roles"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
          
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
              {adminRoles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>{role.permissions}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEdit(role.id)}
                    >
                      <Edit className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(role.id)}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRole;
