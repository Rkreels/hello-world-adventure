
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowDown, ArrowUp, MoreHorizontal } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface StatsCardProps {
  title: string;
  value: string;
  change: { 
    value: string; 
    positive: boolean 
  };
  icon: React.ReactNode;
  colorClass: string;
  onView?: () => void;
  onRefresh?: () => void;
  onDownload?: () => void;
}

const StatsCard = ({ 
  title, 
  value, 
  change, 
  icon, 
  colorClass,
  onView,
  onRefresh,
  onDownload
}: StatsCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleRefresh = () => {
    if (onRefresh) {
      setIsLoading(true);
      
      // Simulate an API call with timeout
      setTimeout(() => {
        setIsLoading(false);
        onRefresh();
      }, 600);
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {onView && (
              <DropdownMenuItem onClick={onView}>
                View details
              </DropdownMenuItem>
            )}
            {onRefresh && (
              <DropdownMenuItem onClick={handleRefresh} disabled={isLoading}>
                {isLoading ? 'Refreshing...' : 'Refresh data'}
              </DropdownMenuItem>
            )}
            {onDownload && (
              <DropdownMenuItem onClick={onDownload}>
                Download report
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-6 flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          <div className="flex items-center gap-1 mt-1">
            {change.positive ? (
              <ArrowUp className="h-3 w-3 text-green-500" />
            ) : (
              <ArrowDown className="h-3 w-3 text-red-500" />
            )}
            <span className={change.positive ? "text-xs text-green-500" : "text-xs text-red-500"}>
              {change.value}
            </span>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        </div>
        <div className={`p-3 rounded-full ${colorClass}`}>
          {icon}
        </div>
      </CardContent>
      {(onView) && (
        <CardFooter className="px-6 py-3 bg-gray-50/50">
          <Button 
            variant="link" 
            className="p-0 h-auto text-xs text-blue-600"
            onClick={onView}
          >
            View details
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default StatsCard;
