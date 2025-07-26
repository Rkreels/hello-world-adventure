
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface CarouselItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

const carouselItems: CarouselItem[] = [
  {
    id: 1,
    title: "Discover the Latest Deals –",
    subtitle: "Up to 50% Off!",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
    buttonText: "Shop Now",
    buttonLink: "/shop"
  },
  {
    id: 2,
    title: "New Season Arrivals",
    subtitle: "Fresh Collections at Great Prices",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1971&auto=format&fit=crop",
    buttonText: "Explore",
    buttonLink: "/new-arrivals"
  },
  {
    id: 3,
    title: "Best Selling Electronics",
    subtitle: "Premium Quality, Unbeatable Prices",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1932&auto=format&fit=crop",
    buttonText: "View Products",
    buttonLink: "/category/electronics"
  },
  {
    id: 4,
    title: "Summer Fashion Collection",
    subtitle: "Stay Cool & Stylish This Season",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop",
    buttonText: "Shop Collection",
    buttonLink: "/category/fashion"
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative bg-[#003742] h-[400px] md:h-[450px] overflow-hidden">
      <AnimatePresence>
        {carouselItems.map((item, index) => 
          currentSlide === index && (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                zIndex: 10
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
            <div className="container mx-auto px-6 h-full flex items-center relative z-10 max-w-7xl">
              <motion.div 
                className="max-w-lg text-white pl-12"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl font-medium mb-2 leading-tight">
                  {item.title}
                </h1>
                <p className="text-3xl md:text-5xl font-bold mb-8 text-white">
                  {item.subtitle}
                </p>
                <Button className="bg-white text-gray-800 hover:bg-gray-100 px-8 py-5 text-base rounded-md">
                  <Link to={item.buttonLink}>{item.buttonText}</Link>
                </Button>
              </motion.div>
            </div>
            <div className="absolute inset-0 z-0">
              <img 
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover opacity-50"
              />
            </div>
          </motion.div>
        )
      )}
      </AnimatePresence>
      
      {/* Carousel Controls */}
      <Button 
        variant="outline" 
        size="icon" 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-10 h-10 z-20 flex items-center justify-center p-0"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-10 h-10 z-20 flex items-center justify-center p-0"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default HeroCarousel;
