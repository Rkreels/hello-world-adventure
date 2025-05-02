
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Coupon } from '@/types/coupon';
import { toast } from 'sonner';

const formSchema = z.object({
  code: z.string().min(3, 'Coupon code must be at least 3 characters').max(20),
  discount: z.string().min(1, 'Discount is required'),
  type: z.enum(['Percentage', 'Fixed Amount']),
  validity: z.string().min(1, 'Validity date is required'),
  status: z.enum(['Active', 'Expired', 'Upcoming']),
  description: z.string().optional(),
  usageLimit: z.string().optional(),
  minimumPurchase: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CouponFormProps {
  coupon?: Coupon;
  onSubmit: (data: FormValues) => Promise<void>;
  onCancel: () => void;
}

const CouponForm = ({ coupon, onSubmit, onCancel }: CouponFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const defaultValues: Partial<FormValues> = coupon ? {
    code: coupon.code,
    discount: coupon.discount,
    type: coupon.type,
    validity: coupon.validity,
    status: coupon.status,
    description: coupon.description || '',
    usageLimit: coupon.usageLimit?.toString() || '',
    minimumPurchase: coupon.minimumPurchase || '',
  } : {
    code: '',
    discount: '',
    type: 'Percentage',
    validity: new Date().toISOString().split('T')[0],
    status: 'Active',
    description: '',
    usageLimit: '',
    minimumPurchase: '',
  };
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  
  const handleSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      toast.success(`Coupon ${coupon ? 'updated' : 'created'} successfully`);
    } catch (error) {
      toast.error(`Failed to ${coupon ? 'update' : 'create'} coupon`);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Coupon Code*</FormLabel>
              <FormControl>
                <Input placeholder="e.g., SUMMER25" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount*</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 25% or $10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type*</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select discount type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Percentage">Percentage</SelectItem>
                    <SelectItem value="Fixed Amount">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="validity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valid Until*</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status*</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Brief description of the coupon" 
                  rows={3} 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="usageLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usage Limit</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="e.g., 100" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="minimumPurchase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Purchase</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., $50" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : coupon ? 'Update Coupon' : 'Create Coupon'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CouponForm;
