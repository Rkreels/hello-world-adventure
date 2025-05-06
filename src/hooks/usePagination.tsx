
import { useState, useMemo } from 'react';

interface UsePaginationProps {
  totalItems: number;
  initialPage?: number;
  itemsPerPage?: number;
}

interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  startIndex: number;
  endIndex: number;
  paginatedItems: <T>(items: T[]) => T[];
  pageNumbers: number[];
}

export const usePagination = ({
  totalItems,
  initialPage = 1,
  itemsPerPage = 10
}: UsePaginationProps): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalItems / itemsPerPage));
  }, [totalItems, itemsPerPage]);

  // Ensure current page is within valid range when total pages changes
  useMemo(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Calculate start and end indices for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

  // Navigation functions
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Helper function to paginate an array of items
  const paginatedItems = <T,>(items: T[]): T[] => {
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  // Generate array of page numbers for rendering pagination buttons
  const pageNumbers = useMemo(() => {
    // For small number of pages, show all page numbers
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // For many pages, show limited page numbers with ellipsis
    const pages = [];

    // Always include first page
    pages.push(1);

    // If current page is near start, show 2, 3, 4, ..., last
    if (currentPage <= 3) {
      if (currentPage !== 1) pages.push(2);
      if (currentPage === 3) pages.push(3);
      pages.push(-1); // Represents ellipsis
      pages.push(totalPages);
    }
    // If current page is near end, show 1, ..., last-3, last-2, last-1, last
    else if (currentPage >= totalPages - 2) {
      pages.push(-1); // Represents ellipsis
      if (currentPage === totalPages - 2) pages.push(totalPages - 2);
      if (currentPage !== totalPages) pages.push(totalPages - 1);
      pages.push(totalPages);
    }
    // If current page is in middle, show 1, ..., current-1, current, current+1, ..., last
    else {
      pages.push(-1); // Represents ellipsis
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
      pages.push(-1); // Represents ellipsis
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  return {
    currentPage,
    totalPages,
    itemsPerPage,
    nextPage,
    prevPage,
    goToPage,
    startIndex,
    endIndex,
    paginatedItems,
    pageNumbers,
  };
};
