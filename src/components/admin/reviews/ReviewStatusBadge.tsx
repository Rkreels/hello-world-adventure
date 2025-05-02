
import React from 'react';

interface ReviewStatusBadgeProps {
  status: string;
}

const ReviewStatusBadge = ({ status }: ReviewStatusBadgeProps) => {
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
      status === 'Published' 
        ? 'bg-green-100 text-green-800' 
        : status === 'Pending'
          ? 'bg-yellow-100 text-yellow-800'
          : 'bg-red-100 text-red-800'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
        status === 'Published' 
          ? 'bg-green-600' 
          : status === 'Pending'
            ? 'bg-yellow-600'
            : 'bg-red-600'
      }`}></span>
      {status}
    </span>
  );
};

export default ReviewStatusBadge;
