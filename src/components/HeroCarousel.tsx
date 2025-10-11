
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      title: "Summer Sale",
      subtitle: "Up to 50% Off",
      description: "Discover amazing deals on your favorite products",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&q=80",
      bgColor: "from-orange-500 to-pink-500",
      cta: "Shop Now"
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Fresh Collections",
      description: "Check out our latest products and trends",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80",
      bgColor: "from-blue-500 to-purple-600",
      cta: "Explore"
    },
    {
      id: 3,
      title: "Best Sellers",
      subtitle: "Top Rated Items",
      description: "Most popular products chosen by customers",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80",
      bgColor: "from-green-500 to-teal-600",
      cta: "View All"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-80`}></div>
          </div>
          
          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-2xl text-white animate-fade-in">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h1>
                <h2 className="text-3xl md:text-4xl font-semibold mb-6 drop-shadow-lg">
                  {slide.subtitle}
                </h2>
                <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
                  {slide.description}
                </p>
                <Button 
                  size="lg"
                  className="bg-white text-gray-800 hover:bg-gray-100 text-lg px-8 py-6 hover-scale shadow-xl"
                >
                  {slide.cta}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm hover:bg-white/50 text-white p-3 md:p-4 rounded-full transition-all hover-scale shadow-lg z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm hover:bg-white/50 text-white p-3 md:p-4 rounded-full transition-all hover-scale shadow-lg z-10"
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-white w-12' 
                : 'bg-white/50 w-8 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
