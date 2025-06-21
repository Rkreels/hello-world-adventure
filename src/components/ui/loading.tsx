
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export const Loading = ({ size = 'md', text, className }: LoadingProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <Loader2 className={cn('animate-spin', sizeClasses[size])} />
      {text && <span className="text-sm text-gray-600">{text}</span>}
    </div>
  );
};

export const PageLoading = ({ text = 'Loading...' }: { text?: string }) => (
  <div className="min-h-[400px] flex items-center justify-center">
    <Loading size="lg" text={text} />
  </div>
);

export const ButtonLoading = ({ text = 'Loading...' }: { text?: string }) => (
  <Loading size="sm" text={text} />
);
