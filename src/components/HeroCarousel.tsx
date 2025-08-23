
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
      image: "/lovable-uploads/01c6fb91-b0da-4976-81df-07a0dacddee3.png",
      cta: "Shop Now"
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Fresh Collections",
      description: "Check out our latest products and trends",
      image: "/lovable-uploads/36d681be-b2a9-4d5a-9475-971eca401ba5.png",
      cta: "Explore"
    },
    {
      id: 3,
      title: "Best Sellers",
      subtitle: "Top Rated Items",
      description: "Most popular products chosen by customers",
      image: "/lovable-uploads/b23db856-6fa6-4310-bc20-061035de9d03.png",
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
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="relative h-full flex items-center justify-between px-4 md:px-8">
            <div className="text-white max-w-lg">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">{slide.subtitle}</h2>
              <p className="text-lg mb-6">{slide.description}</p>
              <Button className="bg-white text-gray-800 hover:bg-gray-100">
                {slide.cta}
              </Button>
            </div>
            
            {slide.image && (
              <div className="hidden md:block">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-64 h-64 object-contain"
                />
              </div>
            )}
          </div>
        </div>
      ))}
      
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
      >
        <ChevronRight size={24} />
      </button>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
