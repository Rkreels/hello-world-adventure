
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import CustomerAnalytics from './CustomerAnalytics';
import { useAdminStore } from '@/stores/adminStore';
import { toast } from 'sonner';

const CustomerManager = () => {
  const { customers, initializeData } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { initializeData(); }, [initializeData]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCount = customers.filter(c => c.status === 'active').length;
  const vipCount = customers.filter(c => c.status === 'vip').length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgValue = customers.length > 0 ? Math.round(totalRevenue / customers.length) : 0;

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      vip: 'bg-purple-100 text-purple-800'
    };
    return colors[status] || colors.active;
  };

  const handleContactCustomer = (name: string, method: 'email' | 'phone') => {
    toast.info(`Opening ${method} to contact ${name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Customer Management</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search customers..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="customers">All Customers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card><CardContent className="p-4"><div className="text-2xl font-bold">{customers.length}</div><p className="text-sm text-muted-foreground">Total Customers</p></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-2xl font-bold">{activeCount}</div><p className="text-sm text-muted-foreground">Active Customers</p></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-2xl font-bold">{vipCount}</div><p className="text-sm text-muted-foreground">VIP Customers</p></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-2xl font-bold">${avgValue}</div><p className="text-sm text-muted-foreground">Avg Customer Value</p></CardContent></Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Directory</CardTitle>
              <CardDescription>View and manage all customers ({filteredCustomers.length} results)</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img src={customer.avatar} alt={customer.name} className="w-8 h-8 rounded-full" />
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Joined {new Date(customer.registeredAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm flex items-center gap-1"><Mail className="h-3 w-3" />{customer.email}</div>
                          <div className="text-sm flex items-center gap-1"><Phone className="h-3 w-3" />{customer.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3" />{customer.address}
                        </div>
                      </TableCell>
                      <TableCell>{customer.totalOrders}</TableCell>
                      <TableCell>${customer.totalSpent.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusBadge(customer.status)}`}>
                          {customer.status.toUpperCase()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" onClick={() => handleContactCustomer(customer.name, 'email')}><Mail className="h-4 w-4" /></Button>
                          <Button size="sm" variant="ghost" onClick={() => handleContactCustomer(customer.name, 'phone')}><Phone className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <CustomerAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerManager;
