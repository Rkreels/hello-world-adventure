
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentMethodProps {
  type: string;
  number: string;
  status: string;
  transactions: string;
  revenue: string;
}

const PaymentMethodCard = ({ type, number, status, transactions, revenue }: PaymentMethodProps) => {
  const handleAddCard = () => {
    toast.success("Add new card clicked");
  };

  const handleDeactivate = () => {
    toast.error("Card deactivated");
  };

  const handleViewTransactions = () => {
    toast.info("View transactions clicked");
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium">Payment Method</h3>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-start">
          <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 w-64 h-40 rounded-xl p-4 text-white mr-6">
            <div className="flex justify-between mb-4">
              <div className="text-lg">{type}</div>
              <div className="flex space-x-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
                <div className="w-4 h-4 bg-white bg-opacity-70 rounded-full"></div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <div>•••• •••• ••••</div>
                <div>{number}</div>
              </div>
              <div className="text-xs">
                <div>Card holder name</div>
                <div className="font-medium">Norman Montasor</div>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div className="text-xs">
                <div>Expiry Date</div>
                <div>02/30</div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="mb-2">
              <div className="text-sm text-gray-500">Status: <span className="text-green-500">{status}</span></div>
              <div className="text-sm text-gray-500">Transactions: {transactions}</div>
              <div className="text-sm text-gray-500">Revenue: {revenue}</div>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="link" 
                className="text-blue-500 p-0 h-auto"
                onClick={handleViewTransactions}
              >
                View Transactions
              </Button>
            </div>
          </div>
          
          <div>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleDeactivate}
            >
              Deactivate
            </Button>
          </div>
        </div>
        
        <div className="mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center"
            onClick={handleAddCard}
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Card
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodCard;
