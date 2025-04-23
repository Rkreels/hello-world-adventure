
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Search, Download, Filter } from 'lucide-react';

const AdminAuthority = () => {
  const permissions = [
    { id: 1, module: 'Dashboard', view: true, create: false, edit: false, delete: false },
    { id: 2, module: 'Products', view: true, create: true, edit: true, delete: true },
    { id: 3, module: 'Categories', view: true, create: true, edit: true, delete: false },
    { id: 4, module: 'Orders', view: true, create: false, edit: true, delete: false },
    { id: 5, module: 'Customers', view: true, create: false, edit: false, delete: false },
    { id: 6, module: 'Transactions', view: true, create: false, edit: false, delete: false },
    { id: 7, module: 'Admin Roles', view: false, create: false, edit: false, delete: false },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Control Authority</h1>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
            Save Changes
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="text-lg font-medium mr-4">Permission Matrix</div>
              <select className="border rounded-md p-2">
                <option>Content Manager Role</option>
                <option>Super Admin</option>
                <option>Order Manager</option>
                <option>Analytics Viewer</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search modules"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <Button variant="ghost">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
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
                      <Switch defaultChecked={perm.view} />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Switch defaultChecked={perm.create} />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Switch defaultChecked={perm.edit} />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Switch defaultChecked={perm.delete} />
                    </div>
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

export default AdminAuthority;
