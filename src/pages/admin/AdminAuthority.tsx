
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Search, Download, Filter } from 'lucide-react';
import { authorityService } from '@/services/authorityService';
import { PermissionModule } from '@/services/types';
import { toast } from 'sonner';

const AdminAuthority = () => {
  const [permissions, setPermissions] = useState<PermissionModule[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<number>(1); // Default to first role
  const [roleOptions, setRoleOptions] = useState<{id: number, name: string}[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRoles();
  }, []);
  
  useEffect(() => {
    if (selectedRole) {
      fetchPermissions(selectedRole);
    }
  }, [selectedRole]);
  
  const fetchRoles = async () => {
    try {
      const roles = await authorityService.getRoles();
      setRoleOptions(roles);
      
      // If no role is selected yet, select the first one
      if (!selectedRole && roles.length > 0) {
        setSelectedRole(roles[0].id);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };
  
  const fetchPermissions = async (roleId: number) => {
    setIsLoading(true);
    try {
      const permissionsData = await authorityService.getPermissions(roleId);
      
      // Filter permissions based on search query if any
      const filteredPermissions = searchQuery
        ? permissionsData.filter(p => 
            p.module.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : permissionsData;
        
      setPermissions(filteredPermissions);
    } catch (error) {
      console.error('Error fetching permissions:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTogglePermission = async (
    moduleId: number, 
    permissionType: 'view' | 'create' | 'edit' | 'delete', 
    currentValue: boolean
  ) => {
    try {
      await authorityService.updatePermission(selectedRole, moduleId, permissionType, !currentValue);
      
      // Update local state
      setPermissions(prevPermissions => 
        prevPermissions.map(perm => 
          perm.id === moduleId 
            ? { ...perm, [permissionType]: !currentValue } 
            : perm
        )
      );
    } catch (error) {
      console.error('Error updating permission:', error);
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPermissions(selectedRole);
  };
  
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(Number(e.target.value));
  };
  
  const handleSaveChanges = async () => {
    try {
      await authorityService.saveAllPermissions(selectedRole, permissions);
    } catch (error) {
      console.error('Error saving permissions:', error);
    }
  };
  
  const handleExport = () => {
    // In a real app, we might generate a CSV or PDF here
    const roleName = roleOptions.find(r => r.id === selectedRole)?.name || 'unknown';
    toast.success(`Exported permissions for ${roleName} role`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Control Authority</h1>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="text-lg font-medium mr-4">Permission Matrix</div>
              <select 
                className="border rounded-md p-2"
                value={selectedRole}
                onChange={handleRoleChange}
              >
                {roleOptions.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <form onSubmit={handleSearch}>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search modules"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
              <Button variant="ghost">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="h-14 bg-gray-100 animate-pulse rounded"></div>
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Module</TableHead>
                  <TableHead className="text-center">View</TableHead>
                  <TableHead className="text-center">Create</TableHead>
                  <TableHead className="text-center">Edit</TableHead>
                  <TableHead className="text-center">Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {permissions.map((perm) => (
                  <TableRow key={perm.id}>
                    <TableCell className="font-medium">{perm.module}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <Switch 
                          checked={perm.view} 
                          onCheckedChange={() => handleTogglePermission(perm.id, 'view', perm.view)} 
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <Switch 
                          checked={perm.create} 
                          onCheckedChange={() => handleTogglePermission(perm.id, 'create', perm.create)} 
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <Switch 
                          checked={perm.edit} 
                          onCheckedChange={() => handleTogglePermission(perm.id, 'edit', perm.edit)} 
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <Switch 
                          checked={perm.delete} 
                          onCheckedChange={() => handleTogglePermission(perm.id, 'delete', perm.delete)} 
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {permissions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No permissions found. Select a role or clear your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuthority;
