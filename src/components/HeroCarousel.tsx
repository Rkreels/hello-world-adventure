
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    title: "Discover the Latest Deals",
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
    <div className="relative bg-gradient-to-r from-black/70 to-black/50 h-[500px] md:h-[550px] overflow-hidden">
      {carouselItems.map((item, index) => (
        <div 
          key={item.id} 
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="max-w-xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {item.title}
              </h1>
              <p className="text-xl md:text-2xl font-medium mb-8 text-white/90">
                {item.subtitle}
              </p>
              <Button className="bg-white text-gray-800 hover:bg-gray-100 px-8 py-6 text-lg rounded-md shadow-lg">
                <Link to={item.buttonLink}>{item.buttonText}</Link>
              </Button>
            </div>
          </div>
          <div className="absolute inset-0 z-0">
            <img 
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover opacity-50"
            />
          </div>
        </div>
      ))}
      
      {/* Carousel Controls */}
      <Button 
        variant="outline" 
        size="icon" 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-12 h-12 z-20"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-12 h-12 z-20"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators - moved up significantly */}
      <div className="absolute bottom-32 left-0 right-0 flex justify-center space-x-2 z-20">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
