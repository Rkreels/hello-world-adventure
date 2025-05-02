
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import RatingStars from './RatingStars';
import ReviewStatusBadge from './ReviewStatusBadge';

interface Review {
  id: number;
  customer: string;
  product: string;
  review: string;
  rating: number;
  date: string;
  status: string;
}

interface ReviewsTableProps {
  reviews: Review[];
  onApprove: (reviewId: number) => void;
  onReject: (reviewId: number) => void;
}

const ReviewsTable = ({ reviews, onApprove, onReject }: ReviewsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Review</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reviews.map((review) => (
          <TableRow key={review.id}>
            <TableCell className="font-medium">{review.customer}</TableCell>
            <TableCell>{review.product}</TableCell>
            <TableCell>
              <div className="max-w-xs truncate">{review.review}</div>
            </TableCell>
            <TableCell>
              <RatingStars rating={review.rating} />
            </TableCell>
            <TableCell>{review.date}</TableCell>
            <TableCell>
              <ReviewStatusBadge status={review.status} />
            </TableCell>
            <TableCell className="text-right">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-green-500"
                onClick={() => onApprove(review.id)}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-500"
                onClick={() => onReject(review.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ReviewsTable;
