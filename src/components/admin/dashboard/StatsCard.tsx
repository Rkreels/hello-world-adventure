
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: { 
    value: string; 
    positive: boolean 
  };
  icon: React.ReactNode;
  colorClass: string;
}

const StatsCard = ({ title, value, change, icon, colorClass }: StatsCardProps) => {
  return (
    <Card>
      <CardContent className="p-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
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
    </Card>
  );
};

export default StatsCard;
