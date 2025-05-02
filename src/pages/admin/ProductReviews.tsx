
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Filter, Search } from 'lucide-react';
import ReviewsTable from '@/components/admin/reviews/ReviewsTable';
import ReviewPagination from '@/components/admin/reviews/ReviewPagination';

interface Review {
  id: number;
  customer: string;
  product: string;
  review: string;
  rating: number;
  date: string;
  status: string;
}

const ProductReviews = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  const reviews: Review[] = [
    { 
      id: 1, 
      customer: 'John Doe', 
      product: 'Wireless Bluetooth Headphones',
      review: 'Great sound quality and comfortable fit. Battery life is impressive!',
      rating: 5,
      date: '01-01-2025',
      status: 'Published'
    },
    { 
      id: 2, 
      customer: 'Jane Smith', 
      product: 'Men\'s T-Shirt',
      review: 'Good quality material but the sizing runs small.',
      rating: 3,
      date: '01-02-2025',
      status: 'Published'
    },
    { 
      id: 3, 
      customer: 'Mike Johnson', 
      product: 'Memory Foam Pillow',
      review: 'Very comfortable! Helps with neck pain.',
      rating: 5,
      date: '01-03-2025',
      status: 'Published'
    },
    { 
      id: 4, 
      customer: 'Sarah Wilson', 
      product: 'Coffee Maker',
      review: 'Works well but water tank is too small.',
      rating: 4,
      date: '01-04-2025',
      status: 'Pending'
    },
    { 
      id: 5, 
      customer: 'Robert Brown', 
      product: 'Full HD Webcam',
      review: 'Poor quality video and difficult to install.',
      rating: 2,
      date: '01-05-2025',
      status: 'Rejected'
    },
    { 
      id: 6, 
      customer: 'Emily Davis', 
      product: 'Casual Baseball Cap',
      review: 'Fits well and looks great! Very satisfied.',
      rating: 5,
      date: '01-06-2025',
      status: 'Pending'
    },
  ];
  
  // Filter reviews based on active tab
  const filteredReviews = activeTab === 'all' 
    ? reviews
    : reviews.filter(review => review.status.toLowerCase() === activeTab);

  const handleApproveReview = (reviewId: number) => {
    // In a real application, this would update the review status
    console.log(`Approving review ${reviewId}`);
  };
  
  const handleRejectReview = (reviewId: number) => {
    // In a real application, this would update the review status
    console.log(`Rejecting review ${reviewId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Product Reviews</h1>
      
      <Card>
        <CardContent className="p-6">
          {/* Tabs */}
          <div className="flex overflow-x-auto mb-4 bg-gray-50 rounded-md">
            <button 
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'all' ? 'bg-white rounded-md shadow' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Reviews (240)
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'published' ? 'bg-white rounded-md shadow' : ''}`}
              onClick={() => setActiveTab('published')}
            >
              Published
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'pending' ? 'bg-white rounded-md shadow' : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              Pending
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'rejected' ? 'bg-white rounded-md shadow' : ''}`}
              onClick={() => setActiveTab('rejected')}
            >
              Rejected
            </button>
          </div>
          
          {/* Search and Filters */}
          <div className="flex justify-end items-center mb-4">
            <div className="relative max-w-md mr-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search reviews"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          
          {/* Table */}
          <ReviewsTable 
            reviews={filteredReviews}
            onApprove={handleApproveReview}
            onReject={handleRejectReview}
          />
          
          {/* Pagination */}
          <ReviewPagination 
            currentPage={currentPage} 
            totalPages={24} 
            onPageChange={handlePageChange} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductReviews;
