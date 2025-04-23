
import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const reviews = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop",
    rating: 5,
    date: "May 12, 2024",
    product: "Wireless Headphones",
    review: "These headphones are amazing! The sound quality is superb and battery life is excellent. I'm very satisfied with my purchase.",
    verified: true
  },
  {
    id: 2,
    name: "Samantha Lee",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2961&auto=format&fit=crop",
    rating: 4,
    date: "April 28, 2024",
    product: "Smart Watch",
    review: "Love my new smartwatch. The fitness tracking features are accurate and the battery lasts longer than expected. The only downside is the screen could be a bit brighter.",
    verified: true
  },
  {
    id: 3,
    name: "Michael Torres",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop",
    rating: 5,
    date: "May 3, 2024",
    product: "Bluetooth Speaker",
    review: "Perfect for outdoor gatherings! The sound is clear even at high volumes and it's very portable. Highly recommend to anyone looking for good quality speakers.",
    verified: true
  },
  {
    id: 4,
    name: "Emily Watson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop",
    rating: 5,
    date: "May 15, 2024",
    product: "Digital Camera",
    review: "This camera exceeded my expectations! The image quality is fantastic and it's very user-friendly. Perfect for both beginners and more experienced photographers.",
    verified: true
  }
];

const CustomerReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 3 < reviews.length ? prev + 3 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 3 >= 0 ? prev - 3 : Math.max(0, reviews.length - 3)));
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + 3);

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover why thousands of customers trust us for their shopping needs. Read verified reviews from our happy shoppers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleReviews.map((review) => (
            <div 
              key={review.id} 
              className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium">{review.name}</h4>
                  <div className="flex items-center">
                    {Array(5).fill(0).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="font-medium text-sm mb-1">{review.product}</h5>
                <p className="text-gray-600 text-sm">{review.review}</p>
              </div>
              {review.verified && (
                <div className="mt-4 text-green-600 text-xs flex items-center">
                  <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified Purchase
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            className="mr-2"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={currentIndex + 3 >= reviews.length}
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
