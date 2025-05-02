
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ReviewPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ReviewPagination = ({ currentPage, totalPages, onPageChange }: ReviewPaginationProps) => {
  const pageNumbers = Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1);
  
  return (
    <div className="flex items-center justify-between mt-6">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>
      
      <div className="flex items-center space-x-1">
        {pageNumbers.map((pageNumber) => (
          <Button 
            key={pageNumber}
            variant={currentPage === pageNumber ? "outline" : "ghost"} 
            size="sm" 
            className={currentPage === pageNumber ? "bg-emerald-50 text-emerald-600 border-emerald-200" : ""}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}
        {totalPages > 5 && (
          <>
            <span>.....</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </Button>
          </>
        )}
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
};

export default ReviewPagination;
