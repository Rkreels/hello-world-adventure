
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, DollarSign, CheckCircle, Clock, XCircle, RefreshCw } from 'lucide-react';
import { useAdminStore } from '@/stores/adminStore';
import { toast } from 'sonner';

const Transactions = () => {
  const { transactions, initializeData } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => { initializeData(); }, [initializeData]);

  const filtered = transactions.filter(t => {
    const matchesSearch = t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.orderId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const completedCount = transactions.filter(t => t.status === 'Complete').length;
  const pendingCount = transactions.filter(t => t.status === 'Pending').length;
  const canceledCount = transactions.filter(t => t.status === 'Canceled').length;
  const refundedCount = transactions.filter(t => t.status === 'Refunded').length;

  const getStatusBadge = (status: string) => {
    const config: Record<string, { icon: React.ReactNode; className: string }> = {
      Complete: { icon: <CheckCircle className="h-3 w-3" />, className: 'bg-green-100 text-green-800' },
      Pending: { icon: <Clock className="h-3 w-3" />, className: 'bg-yellow-100 text-yellow-800' },
      Canceled: { icon: <XCircle className="h-3 w-3" />, className: 'bg-red-100 text-red-800' },
      Refunded: { icon: <RefreshCw className="h-3 w-3" />, className: 'bg-blue-100 text-blue-800' },
    };
    const c = config[status] || config.Pending;
    return <Badge className={`flex items-center gap-1 w-fit ${c.className}`}>{c.icon}{status}</Badge>;
  };

  const handleExport = () => {
    toast.success('Transaction report exported successfully');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Transactions</h1>
        <Button variant="outline" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" /> Export
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-green-600" /><span className="text-sm text-muted-foreground">Total</span></div><p className="text-2xl font-bold">{transactions.length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /><span className="text-sm text-muted-foreground">Completed</span></div><p className="text-2xl font-bold text-green-600">{completedCount}</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><Clock className="h-4 w-4 text-yellow-600" /><span className="text-sm text-muted-foreground">Pending</span></div><p className="text-2xl font-bold text-yellow-600">{pendingCount}</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><XCircle className="h-4 w-4 text-red-600" /><span className="text-sm text-muted-foreground">Canceled / Refunded</span></div><p className="text-2xl font-bold text-red-600">{canceledCount + refundedCount}</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Transaction History</CardTitle>
            <div className="flex items-center gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Complete">Complete</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Canceled">Canceled</SelectItem>
                  <SelectItem value="Refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search..." className="pl-10 w-56" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="font-mono text-xs">{txn.id}</TableCell>
                  <TableCell className="font-mono text-xs">{txn.orderId}</TableCell>
                  <TableCell>{txn.customerName}</TableCell>
                  <TableCell>{txn.date}</TableCell>
                  <TableCell className="font-medium">{txn.amount}</TableCell>
                  <TableCell>{txn.method}</TableCell>
                  <TableCell>{getStatusBadge(txn.status)}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No transactions found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
