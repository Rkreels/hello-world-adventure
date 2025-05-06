
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { Switch } from '@/components/ui/switch';
import { Coupon } from '@/types/coupon';
import { Loader2 } from 'lucide-react';

interface CouponFormProps {
  coupon?: Coupon;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

const CouponForm = ({ coupon, onSubmit, onCancel }: CouponFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discount: '',
    type: 'Percentage',
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default 30 days from now
    status: 'Active',
    description: '',
    usageLimit: '',
    minimumPurchase: '',
    isActive: true
  });

  // Initialize form data if editing an existing coupon
  useEffect(() => {
    if (coupon) {
      setFormData({
        code: coupon.code || '',
        discount: coupon.discount || '',
        type: coupon.type || 'Percentage',
        validFrom: new Date(), // Would parse from coupon.validity in a real implementation
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: coupon.status || 'Active',
        description: coupon.description || '',
        usageLimit: coupon.usageLimit?.toString() || '',
        minimumPurchase: coupon.minimumPurchase || '',
        isActive: coupon.status === 'Active'
      });
    }
  }, [coupon]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateChange = (date: Date | undefined, field: string) => {
    if (date) {
      setFormData(prevState => ({
        ...prevState,
        [field]: date
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Prepare data for submission
      const status = formData.isActive ? 'Active' : 'Inactive';
      const couponData = {
        ...formData,
        status,
        usageLimit: formData.usageLimit ? parseInt(formData.usageLimit) : undefined,
        validity: `${formData.validFrom.toLocaleDateString()} - ${formData.validUntil.toLocaleDateString()}`
      };
      
      // Submit data
      await onSubmit(couponData);
    } catch (error) {
      console.error('Error submitting coupon:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="code">Coupon Code</Label>
          <Input
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="e.g. SUMMER20"
            required
            className="uppercase"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type">Discount Type</Label>
          <Select 
            value={formData.type} 
            onValueChange={(value) => handleSelectChange(value, 'type')}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Select discount type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Percentage">Percentage</SelectItem>
              <SelectItem value="Fixed Amount">Fixed Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="discount">Discount Value</Label>
          <div className="relative">
            <Input
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              placeholder={formData.type === 'Percentage' ? '10' : '25.00'}
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500">
                {formData.type === 'Percentage' ? '%' : '$'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="minimumPurchase">Minimum Purchase</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              $
            </span>
            <Input
              id="minimumPurchase"
              name="minimumPurchase"
              value={formData.minimumPurchase}
              onChange={handleChange}
              placeholder="0.00"
              className="pl-6"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Valid From</Label>
          <DatePicker
            date={formData.validFrom}
            setDate={(date) => handleDateChange(date, 'validFrom')}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Valid Until</Label>
          <DatePicker
            date={formData.validUntil}
            setDate={(date) => handleDateChange(date, 'validUntil')}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="usageLimit">Usage Limit</Label>
          <Input
            id="usageLimit"
            name="usageLimit"
            value={formData.usageLimit}
            onChange={handleChange}
            placeholder="e.g. 100 (leave empty for unlimited)"
            type="number"
            min="0"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status">Active Status</Label>
          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.isActive}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, isActive: checked }))
              }
              id="status"
            />
            <Label htmlFor="status" className="cursor-pointer">
              {formData.isActive ? 'Active' : 'Inactive'}
            </Label>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter coupon description or conditions"
          className="h-24 resize-none"
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {coupon ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            coupon ? 'Update Coupon' : 'Create Coupon'
          )}
        </Button>
      </div>
    </form>
  );
};

export default CouponForm;
