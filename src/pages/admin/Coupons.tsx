
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Edit, Trash } from 'lucide-react';
import { toast } from 'sonner';

const Coupons = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const coupons = [
    { id: 1, code: 'SUMMER25', discount: '25%', type: 'Percentage', validity: '2025-06-30', status: 'Active' },
    { id: 2, code: 'FREESHIP', discount: '$15', type: 'Fixed Amount', validity: '2025-05-15', status: 'Active' },
    { id: 3, code: 'WELCOME10', discount: '10%', type: 'Percentage', validity: '2025-12-31', status: 'Active' },
    { id: 4, code: 'FLASH50', discount: '50%', type: 'Percentage', validity: '2025-04-30', status: 'Expired' },
    { id: 5, code: 'LOYALTY20', discount: '20%', type: 'Percentage', validity: '2025-08-15', status: 'Active' },
  ];
  
  const handleEdit = (id: number) => {
    toast.success(`Edit coupon with ID: ${id}`);
  };
  
  const handleDelete = (id: number) => {
    toast.error(`Delete coupon with ID: ${id}`);
  };
  
  const handleAddCoupon = () => {
    toast.success("Add new coupon clicked");
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(`Searching for: ${searchQuery}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Coupon Codes</h1>
        
        <Button 
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
          onClick={handleAddCoupon}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Coupon
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-medium">Available Coupons</div>
            <form onSubmit={handleSearch} className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search coupons"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Coupon Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium">{coupon.code}</TableCell>
                  <TableCell>{coupon.discount}</TableCell>
                  <TableCell>{coupon.type}</TableCell>
                  <TableCell>{coupon.validity}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      coupon.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        coupon.status === 'Active' ? 'bg-green-600' : 'bg-red-600'
                      }`}></span>
                      {coupon.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEdit(coupon.id)}
                    >
                      <Edit className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(coupon.id)}
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

export default Coupons;
