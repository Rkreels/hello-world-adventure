
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CouponForm from "./CouponForm";
import { Coupon } from "@/types/coupon";

interface CouponDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  coupon?: Coupon;
}

const CouponDialog = ({
  isOpen,
  onClose,
  onSubmit,
  coupon,
}: CouponDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{coupon ? 'Edit Coupon' : 'Add New Coupon'}</DialogTitle>
        </DialogHeader>
        <CouponForm 
          coupon={coupon}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CouponDialog;
