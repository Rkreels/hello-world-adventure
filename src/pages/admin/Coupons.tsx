
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Edit, Trash, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Coupon } from '@/types/coupon';
import { couponService } from '@/services/couponService';
import CouponDialog from '@/components/admin/coupons/CouponDialog';
import DeleteCouponConfirm from '@/components/admin/coupons/DeleteCouponConfirm';

const Coupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | undefined>(undefined);
  const [filteredCoupons, setFilteredCoupons] = useState<Coupon[]>([]);
  
  // Fetch coupons on load
  useEffect(() => {
    fetchCoupons();
  }, []);
  
  // Apply search filter
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCoupons(coupons);
    } else {
      const filtered = coupons.filter(coupon => 
        coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coupon.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coupon.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCoupons(filtered);
    }
  }, [searchQuery, coupons]);
  
  const fetchCoupons = async () => {
    setIsLoading(true);
    try {
      const data = await couponService.getAllCoupons();
      setCoupons(data);
      setFilteredCoupons(data);
    } catch (error) {
      console.error('Failed to fetch coupons:', error);
      toast.error('Failed to load coupons');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddCoupon = () => {
    setSelectedCoupon(undefined);
    setIsDialogOpen(true);
  };
  
  const handleEditCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setIsDialogOpen(true);
  };
  
  const handleDeleteCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setIsDeleteDialogOpen(true);
  };
  
  const handleSubmitCoupon = async (data: any) => {
    try {
      if (selectedCoupon) {
        // Update existing coupon
        await couponService.updateCoupon(selectedCoupon.id, data);
        toast.success(`Coupon ${data.code} updated successfully`);
      } else {
        // Create new coupon
        await couponService.createCoupon(data);
        toast.success(`Coupon ${data.code} created successfully`);
      }
      setIsDialogOpen(false);
      fetchCoupons();
    } catch (error) {
      console.error('Error saving coupon:', error);
      toast.error(`Failed to ${selectedCoupon ? 'update' : 'create'} coupon`);
    }
  };
  
  const confirmDelete = async () => {
    if (!selectedCoupon) return;
    
    try {
      await couponService.deleteCoupon(selectedCoupon.id);
      toast.success(`Coupon ${selectedCoupon.code} deleted successfully`);
      setIsDeleteDialogOpen(false);
      fetchCoupons();
    } catch (error) {
      console.error('Error deleting coupon:', error);
      toast.error('Failed to delete coupon');
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Could implement additional search logic here if needed
    }
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
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            </div>
          ) : (
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
                {filteredCoupons.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      {searchQuery ? 'No coupons match your search' : 'No coupons available'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCoupons.map((coupon) => (
                    <TableRow key={coupon.id}>
                      <TableCell className="font-medium">{coupon.code}</TableCell>
                      <TableCell>{coupon.discount}</TableCell>
                      <TableCell>{coupon.type}</TableCell>
                      <TableCell>{coupon.validity}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          coupon.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : coupon.status === 'Upcoming'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            coupon.status === 'Active' 
                              ? 'bg-green-600' 
                              : coupon.status === 'Upcoming'
                                ? 'bg-blue-600'
                                : 'bg-red-600'
                          }`}></span>
                          {coupon.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEditCoupon(coupon)}
                        >
                          <Edit className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteCoupon(coupon)}
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
      
      {/* Add/Edit Coupon Dialog */}
      <CouponDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmitCoupon}
        coupon={selectedCoupon}
      />
      
      {/* Delete Confirmation Dialog */}
      {selectedCoupon && (
        <DeleteCouponConfirm 
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
          couponCode={selectedCoupon.code}
        />
      )}
    </div>
  );
};

export default Coupons;
