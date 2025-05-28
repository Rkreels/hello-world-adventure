
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Truck, Package, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface OrderStatusManagerProps {
  orderId: string;
  currentStatus: string;
  onStatusUpdate: (orderId: string, status: string, trackingNumber?: string, notes?: string) => void;
}

const OrderStatusManager = ({ orderId, currentStatus, onStatusUpdate }: OrderStatusManagerProps) => {
  const [status, setStatus] = useState(currentStatus);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [notes, setNotes] = useState('');

  const statusOptions = [
    { value: 'Pending', label: 'Pending', icon: Package, color: 'bg-yellow-100 text-yellow-800' },
    { value: 'Processing', label: 'Processing', icon: Package, color: 'bg-blue-100 text-blue-800' },
    { value: 'Shipped', label: 'Shipped', icon: Truck, color: 'bg-purple-100 text-purple-800' },
    { value: 'Delivered', label: 'Delivered', icon: CheckCircle, color: 'bg-green-100 text-green-800' },
    { value: 'Cancelled', label: 'Cancelled', icon: XCircle, color: 'bg-red-100 text-red-800' },
  ];

  const handleUpdateStatus = () => {
    onStatusUpdate(orderId, status, trackingNumber, notes);
    toast.success(`Order ${orderId} status updated to ${status}`);
  };

  const currentStatusConfig = statusOptions.find(option => option.value === currentStatus);
  const StatusIcon = currentStatusConfig?.icon || Package;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <StatusIcon className="h-5 w-5" />
          Order Status Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Current Status:</span>
          <Badge className={currentStatusConfig?.color}>
            {currentStatus}
          </Badge>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Update Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <option.icon className="h-4 w-4" />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {(status === 'Shipped' || status === 'Delivered') && (
            <div>
              <label className="text-sm font-medium">Tracking Number</label>
              <Input
                placeholder="Enter tracking number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="mt-1"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium">Notes (Optional)</label>
            <Textarea
              placeholder="Add any notes about this status update..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>

          <Button onClick={handleUpdateStatus} className="w-full">
            Update Order Status
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderStatusManager;
