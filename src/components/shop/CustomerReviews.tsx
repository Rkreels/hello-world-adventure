
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const reviews = [
  {
    id: 1,
    name: "Emily R.",
    rating: 5,
    review: "Fast delivery and fantastic quality! The customer support team was quick to resolve my query. Couldn't be happier with my total experience.",
    avatar: "/lovable-uploads/b23db856-6fa6-4310-bc20-061035de9d03.png"
  },
  {
    id: 2,
    name: "John D.",
    rating: 5,
    review: "I've ordered multiple times and always receive excellent service. The products are exactly as described and arrive on time. Will definitely shop again!",
    avatar: "/lovable-uploads/b23db856-6fa6-4310-bc20-061035de9d03.png"
  },
  {
    id: 3,
    name: "Ahmed M.",
    rating: 5,
    review: "The prices are competitive and the shipping is incredibly fast. Their customer care team went above and beyond when I needed to make a return.",
    avatar: "/lovable-uploads/b23db856-6fa6-4310-bc20-061035de9d03.png"
  },
  {
    id: 4,
    name: "Alex T.",
    rating: 5,
    review: "I can't believe how smooth the checkout process was. The website is so easy to navigate and the product arrived ahead of schedule. Great job!",
    avatar: "/lovable-uploads/b23db856-6fa6-4310-bc20-061035de9d03.png"
  }
];

const CustomerReviews = () => {
  return (
    <div className="bg-[#f8f9f6] py-16 shadow-inner">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Our Happy Customers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Don't just take our word for it - see how our products and services have helped customers across the globe. Join thousands of happy shoppers!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start mb-4">
                <img 
                  src={review.avatar} 
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <h4 className="font-medium">{review.name}</h4>
                  <div className="flex text-yellow-400">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{review.review}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" className="px-8 hover:bg-green-50 border-green-600 text-green-600">
            Read More Reviews
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
