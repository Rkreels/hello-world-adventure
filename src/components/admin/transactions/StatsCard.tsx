
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MoreHorizontal } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  percentage: string;
  period: string;
  percentageDown?: boolean;
}

const StatsCard = ({ title, value, percentage, period, percentageDown }: StatsCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-sm text-gray-500">{title}</h3>
            <p className="text-sm text-gray-500">{period}</p>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center">
          <div className="text-2xl font-semibold">{value}</div>
          <span className={`ml-2 text-xs ${percentageDown ? 'text-red-500' : 'text-green-500'}`}>
            {percentage}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
