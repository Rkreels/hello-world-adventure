
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const FeaturedCategories = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 -mt-16 relative z-10">
        {/* New Year! New Fashion - Overlapping Card */}
        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white">
          <CardContent className="p-0">
            <div className="relative h-64 bg-gray-100">
              <img 
                src="/lovable-uploads/01c6fb91-b0da-4976-81df-07a0dacddee3.png"
                alt="New Year! New Fashion" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="font-semibold text-lg mb-2">New Year! New Fashion</h3>
                <Button 
                  asChild
                  size="sm" 
                  className="border border-white text-white bg-transparent hover:bg-white/20"
                >
                  <Link to="/category/fashion">Shop Now</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Gaming accessories */}
        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white">
          <CardContent className="p-0">
            <div className="h-64 bg-gray-100">
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg mb-4">Gaming accessories</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="group">
                    <div className="h-20 mb-1 overflow-hidden rounded-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=2070&auto=format&fit=crop" 
                        alt="Headset" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-xs">Headset</span>
                  </div>
                  <div className="group">
                    <div className="h-20 mb-1 overflow-hidden rounded-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1623820919239-0d0ff10797a1?q=80&w=2070&auto=format&fit=crop" 
                        alt="Mouse" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-xs">Mouse</span>
                  </div>
                  <div className="group">
                    <div className="h-20 mb-1 overflow-hidden rounded-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1606318801954-d46d46d3360a?q=80&w=2070&auto=format&fit=crop" 
                        alt="Controller" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-xs">Controller</span>
                  </div>
                  <div className="group">
                    <div className="h-20 mb-1 overflow-hidden rounded-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=2070&auto=format&fit=crop" 
                        alt="Chair" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-xs">Chair</span>
                  </div>
                </div>
                <Button 
                  asChild
                  variant="link"
                  className="text-blue-600 text-sm mt-4 hover:underline p-0 h-auto"
                >
                  <Link to="/category/accessories">See more</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Combined Electronics Promotion Section */}
        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white h-64">
          <CardContent className="p-0 h-full">
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 h-full relative p-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-white">Electronics Showcase</h3>
                  <span className="bg-blue-500 px-2 py-1 text-xs font-bold rounded text-white">NEW</span>
                </div>
                <p className="text-sm text-white/90 mt-1">Latest gadgets and top tech</p>
              </div>
              <div className="flex flex-wrap justify-between items-end mt-2">
                <div className="mb-2">
                  <img 
                    src="https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=2070&auto=format&fit=crop" 
                    alt="Electronics" 
                    className="max-h-20 object-contain transform hover:scale-105 transition-transform duration-300"
                  />
                  <span className="text-xs text-white">Smart TV</span>
                </div>
                <div className="mb-2">
                  <img 
                    src="https://images.unsplash.com/photo-1544866092-1935c5ef2a8f?q=80&w=2069&auto=format&fit=crop" 
                    alt="Phone" 
                    className="max-h-20 object-contain transform hover:scale-105 transition-transform duration-300"
                  />
                  <span className="text-xs text-white">Smartphones</span>
                </div>
                <Button 
                  asChild
                  size="sm" 
                  className="mt-2 border border-white text-white bg-transparent hover:bg-white/20 w-full"
                >
                  <Link to="/category/electronics">Explore Collection</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeaturedCategories;
