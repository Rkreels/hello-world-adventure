
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder: number;
  usage: number;
  maxUsage: number;
  status: 'active' | 'inactive' | 'expired';
  expiryDate: string;
}

const CouponManager = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: '1',
      code: 'WELCOME10',
      type: 'percentage',
      value: 10,
      minOrder: 50,
      usage: 125,
      maxUsage: 1000,
      status: 'active',
      expiryDate: '2024-12-31'
    },
    {
      id: '2',
      code: 'SAVE20',
      type: 'fixed',
      value: 20,
      minOrder: 100,
      usage: 45,
      maxUsage: 500,
      status: 'active',
      expiryDate: '2024-06-30'
    }
  ]);

  const [newCoupon, setNewCoupon] = useState({
    code: '',
    type: 'percentage' as 'percentage' | 'fixed',
    value: 0,
    minOrder: 0,
    maxUsage: 100,
    expiryDate: ''
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateCoupon = () => {
    if (!newCoupon.code || !newCoupon.value || !newCoupon.expiryDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const coupon: Coupon = {
      id: Date.now().toString(),
      ...newCoupon,
      usage: 0,
      status: 'active'
    };

    setCoupons([...coupons, coupon]);
    setNewCoupon({
      code: '',
      type: 'percentage',
      value: 0,
      minOrder: 0,
      maxUsage: 100,
      expiryDate: ''
    });
    setIsDialogOpen(false);
    toast.success('Coupon created successfully');
  };

  const handleDeleteCoupon = (id: string) => {
    setCoupons(coupons.filter(coupon => coupon.id !== id));
    toast.success('Coupon deleted successfully');
  };

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Coupon code copied to clipboard');
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      expired: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || colors.inactive;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Coupon Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Coupon</DialogTitle>
              <DialogDescription>
                Set up a new discount coupon for your customers
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="code">Coupon Code</Label>
                <Input
                  id="code"
                  placeholder="e.g., SAVE10"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Discount Type</Label>
                  <Select value={newCoupon.type} onValueChange={(value: 'percentage' | 'fixed') => setNewCoupon({ ...newCoupon, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="value">Discount Value</Label>
                  <Input
                    id="value"
                    type="number"
                    placeholder={newCoupon.type === 'percentage' ? '10' : '20'}
                    value={newCoupon.value || ''}
                    onChange={(e) => setNewCoupon({ ...newCoupon, value: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minOrder">Minimum Order ($)</Label>
                  <Input
                    id="minOrder"
                    type="number"
                    placeholder="50"
                    value={newCoupon.minOrder || ''}
                    onChange={(e) => setNewCoupon({ ...newCoupon, minOrder: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="maxUsage">Usage Limit</Label>
                  <Input
                    id="maxUsage"
                    type="number"
                    placeholder="100"
                    value={newCoupon.maxUsage || ''}
                    onChange={(e) => setNewCoupon({ ...newCoupon, maxUsage: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={newCoupon.expiryDate}
                  onChange={(e) => setNewCoupon({ ...newCoupon, expiryDate: e.target.value })}
                />
              </div>
              <Button onClick={handleCreateCoupon} className="w-full">
                Create Coupon
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Coupons</CardTitle>
          <CardDescription>Manage your discount coupons and promotions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium">{coupon.code}</TableCell>
                  <TableCell>{coupon.type === 'percentage' ? 'Percentage' : 'Fixed Amount'}</TableCell>
                  <TableCell>
                    {coupon.type === 'percentage' ? `${coupon.value}%` : `$${coupon.value}`}
                  </TableCell>
                  <TableCell>{coupon.usage}/{coupon.maxUsage}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(coupon.status)}`}>
                      {coupon.status}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(coupon.expiryDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleCopyCoupon(coupon.code)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDeleteCoupon(coupon.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
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

export default CouponManager;
