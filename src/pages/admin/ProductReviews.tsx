
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronLeft, ChevronRight, Filter, Search, Star, Check, X } from 'lucide-react';

const ProductReviews = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const reviews = [
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

  // Render stars based on rating
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
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
              />
            </div>
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          
          {/* Table */}
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
                    <div className="flex">{renderStars(review.rating)}</div>
                  </TableCell>
                  <TableCell>{review.date}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      review.status === 'Published' 
                        ? 'bg-green-100 text-green-800' 
                        : review.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        review.status === 'Published' 
                          ? 'bg-green-600' 
                          : review.status === 'Pending'
                            ? 'bg-yellow-600'
                            : 'bg-red-600'
                      }`}></span>
                      {review.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-green-500">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <X className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <Button variant="outline" size="sm" className="flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              <Button variant="outline" size="sm" className="bg-emerald-50 text-emerald-600 border-emerald-200">1</Button>
              <Button variant="ghost" size="sm">2</Button>
              <Button variant="ghost" size="sm">3</Button>
              <Button variant="ghost" size="sm">4</Button>
              <Button variant="ghost" size="sm">5</Button>
              <span>.....</span>
              <Button variant="ghost" size="sm">24</Button>
            </div>
            <Button variant="outline" size="sm" className="flex items-center">
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductReviews;
