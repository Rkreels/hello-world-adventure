import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import HeroCarousel from '@/components/HeroCarousel';

const Landing = () => {
  return (
    <div>
      {/* Hero Banner with Carousel */}
      <div className="relative">
        <HeroCarousel />
        
        {/* Featured Categories - Overlapping Cards */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 -mt-16 relative z-10">
            {/* New Year! New Fashion - Overlapping Card */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardContent className="p-0">
                <Link to="/category/fashion" className="block">
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
                        size="sm" 
                        className="border border-white text-white bg-transparent hover:bg-white/20"
                      >
                        Shop Now
                      </Button>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
            
            {/* Gaming accessories */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardContent className="p-0">
                <Link to="/category/accessories" className="block">
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
                      <Link to="/category/accessories" className="text-blue-600 text-sm mt-4 inline-block hover:underline">
                        See more
                      </Link>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
            
            {/* Winner & Phone Promotions */}
            <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white h-64">
                <CardContent className="p-0 h-full">
                  <Link to="/category/electronics" className="block h-full">
                    <div className="bg-gradient-to-br from-red-600 to-red-800 h-full relative p-4 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-xl text-white">WINNER</h3>
                          <p className="text-sm text-white/90">Best Phone 2023</p>
                        </div>
                        <span className="bg-red-500 px-2 py-1 text-xs font-bold rounded text-white">SALE</span>
                      </div>
                      <div className="flex justify-end items-end mt-4">
                        <img 
                          src="https://images.unsplash.com/photo-1544866092-1935c5ef2a8f?q=80&w=2069&auto=format&fit=crop" 
                          alt="Phone" 
                          className="max-h-32 object-contain transform hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white h-64">
                <CardContent className="p-0 h-full">
                  <Link to="/category/electronics" className="block h-full">
                    <div className="bg-gradient-to-br from-blue-600 to-purple-700 h-full relative p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-white">Home 4K Android TV</h3>
                        <p className="text-sm text-white/90">Starting at $399.99</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <img 
                          src="https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=2070&auto=format&fit=crop" 
                          alt="TV" 
                          className="max-h-32 object-contain transform hover:scale-105 transition-transform duration-300"
                        />
                        <Button 
                          size="sm" 
                          className="mt-2 border border-white text-white bg-transparent hover:bg-white/20 w-max"
                        >
                          Shop Now
                        </Button>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the sections */}
      
      {/* Category Banners exactly as reference */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-4 gap-4 mt-6">
          <Link to="/category/clothing" className="relative h-32 rounded-md overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop" 
              alt="Clothing" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="text-white font-medium text-lg">CLOTHING</span>
            </div>
          </Link>
          
          <Link to="/category/watches" className="relative h-32 rounded-md overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2099&auto=format&fit=crop" 
              alt="Men's Fashion" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="text-white font-medium text-lg">MEN'S FASHION</span>
            </div>
          </Link>
          
          <Link to="/category/denim" className="relative h-32 rounded-md overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=2070&auto=format&fit=crop" 
              alt="Denim" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="text-white font-medium text-lg">DENIM</span>
            </div>
          </Link>
          
          <Link to="/category/appliances" className="relative h-32 rounded-md overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1563245738-1a179bb42db4?q=80&w=1932&auto=format&fit=crop" 
              alt="Philips Appliances" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="text-white font-medium text-lg">PHILIPS APPLIANCES</span>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Trending Products - Exactly matching the reference */}
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Trending Product</h2>
            <Link to="/shop" className="text-sm border border-gray-300 rounded px-4 py-1 hover:bg-gray-50">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Radiant Glow Hydrating Serum */}
            <Card className="h-full">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <Link to="/products/1">
                    <img 
                      src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1974&auto=format&fit=crop" 
                      alt="Radiant Glow Hydrating Serum" 
                      className="w-full h-48 object-cover rounded"
                    />
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    New
                  </div>
                </div>
                
                <div className="mb-2">
                  <Link to="/category/skincare" className="text-xs text-gray-500">
                    Dermalogical Certified by SaltForm
                  </Link>
                  <div className="flex text-yellow-400 mb-1">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <span className="text-xs text-gray-500 ml-1">(287)</span>
                  </div>
                  <Link to="/products/1" className="font-medium block">
                    Radiant Glow Hydrating Serum
                  </Link>
                </div>
                
                <div className="flex items-center mb-3">
                  <span className="text-lg font-semibold">$29.99</span>
                  <span className="text-sm text-gray-500 line-through ml-2">$39.99</span>
                  <span className="text-xs text-green-600 ml-2">-25% OFF</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Link to="/products/1">View Details</Link>
                  </Button>
                  <Button className="bg-green-500 hover:bg-green-600">
                    Add to cart
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Modern Minimalist Vase */}
            <Card className="h-full">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <Link to="/products/2">
                    <img 
                      src="https://images.unsplash.com/photo-1602746588630-8ce6147c406c?q=80&w=1964&auto=format&fit=crop" 
                      alt="Modern Minimalist Vase" 
                      className="w-full h-48 object-cover rounded"
                    />
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mb-2">
                  <Link to="/category/home-decor" className="text-xs text-gray-500">
                    Design in Denmark, Minted in Germany
                  </Link>
                  <div className="flex text-yellow-400 mb-1">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4" />
                    <span className="text-xs text-gray-500 ml-1">(186)</span>
                  </div>
                  <Link to="/products/2" className="font-medium block">
                    Modern Minimalist Vase
                  </Link>
                </div>
                
                <div className="flex items-center mb-3">
                  <span className="text-lg font-semibold">$49.99</span>
                  <span className="text-sm text-gray-500 line-through ml-2">$69.99</span>
                  <span className="text-xs text-green-600 ml-2">-30% OFF</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Link to="/products/2">View Details</Link>
                  </Button>
                  <Button className="bg-green-500 hover:bg-green-600">
                    Add to cart
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* FitPro Smartwatch */}
            <Card className="h-full">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <Link to="/products/3">
                    <img 
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop" 
                      alt="FitPro 3000 Smartwatch" 
                      className="w-full h-48 object-cover rounded"
                    />
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    Popular
                  </div>
                </div>
                
                <div className="mb-2">
                  <Link to="/category/wearables" className="text-xs text-gray-500">
                    Leading Fitness Tech by GadgetPro
                  </Link>
                  <div className="flex text-yellow-400 mb-1">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <span className="text-xs text-gray-500 ml-1">(152)</span>
                  </div>
                  <Link to="/products/3" className="font-medium block">
                    FitPro 3000 Smartwatch
                  </Link>
                </div>
                
                <div className="flex items-center mb-3">
                  <span className="text-lg font-semibold">$119.99</span>
                  <span className="text-sm text-gray-500 line-through ml-2">$149.99</span>
                  <span className="text-xs text-green-600 ml-2">-20% OFF</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Link to="/products/3">View Details</Link>
                  </Button>
                  <Button className="bg-green-500 hover:bg-green-600">
                    Add to cart
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Trend collection for men */}
            <Card className="h-full">
              <CardContent className="p-4">
                <div className="h-full flex flex-col">
                  <h3 className="font-medium mb-3">Trend collection for men</h3>
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    <div>
                      <img 
                        src="https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=1974&auto=format&fit=crop" 
                        alt="Pants" 
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <div className="text-sm">
                        <div className="flex items-center">
                          <span className="font-medium mr-1">$54.99</span>
                          <span className="text-xs text-green-600">-25%</span>
                        </div>
                        <span className="text-xs text-gray-500 line-through">$73.32</span>
                      </div>
                    </div>
                    <div>
                      <img 
                        src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=2015&auto=format&fit=crop" 
                        alt="Shirt" 
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <div className="text-sm">
                        <div className="flex items-center">
                          <span className="font-medium mr-1">$34.99</span>
                          <span className="text-xs text-green-600">-30%</span>
                        </div>
                        <span className="text-xs text-gray-500 line-through">$49.99</span>
                      </div>
                    </div>
                    <div>
                      <img 
                        src="https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1974&auto=format&fit=crop" 
                        alt="Hat" 
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <div className="text-sm">
                        <div className="flex items-center">
                          <span className="font-medium mr-1">$19.99</span>
                          <span className="text-xs text-green-600">-15%</span>
                        </div>
                        <span className="text-xs text-gray-500 line-through">$23.49</span>
                      </div>
                    </div>
                    <div>
                      <img 
                        src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=2080&auto=format&fit=crop" 
                        alt="Shoes" 
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <div className="text-sm">
                        <div className="flex items-center">
                          <span className="font-medium mr-1">$89.99</span>
                          <span className="text-xs text-green-600">-40%</span>
                        </div>
                        <span className="text-xs text-gray-500 line-through">$149.99</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4 w-full"
                  >
                    <Link to="/category/mens">See All</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Best Selling Products - Redesigned to exactly match the reference */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Best selling product</h2>
          <Link to="/best-selling" className="text-sm border border-gray-300 rounded px-4 py-1 hover:bg-gray-50">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="relative rounded-md overflow-hidden md:col-span-2 md:row-span-2 group h-[500px]">
            <div className="absolute top-4 left-0 bg-red-600 text-white text-xs font-bold px-4 py-1 uppercase z-10">
              Hot Deal
            </div>
            <img 
              src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2042&auto=format&fit=crop" 
              alt="Computer Accessories" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
              <h3 className="text-white text-xl font-bold mb-2">Computer Accessories</h3>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  <Star className="h-4 w-4 fill-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400" />
                </div>
                <span className="text-white text-sm">(5.0)</span>
              </div>
              <div className="flex justify-between items-center">
                <Button className="bg-white text-gray-800 hover:bg-gray-100">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Shop Now
                </Button>
                <div className="text-white">
                  <span className="text-xl font-bold mr-2">$50</span>
                  <span className="text-sm line-through">$75</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative rounded-md overflow-hidden bg-black group h-60">
            <img 
              src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop" 
              alt="Men's Fashion" 
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              <div className="flex justify-between">
                <span className="text-white font-semibold">Men's Fashion</span>
                <div className="text-white bg-gray-800 bg-opacity-50 rounded-md px-2 py-1 text-xs">
                  1,200+
                </div>
              </div>
              <div className="text-white">
                <span className="text-sm font-medium mr-2">From</span>
                <span className="text-lg font-bold">$50</span>
              </div>
            </div>
          </div>
          
          <div className="relative rounded-md overflow-hidden bg-red-600 group h-60">
            <div className="absolute top-4 left-0 bg-white text-red-600 text-xs font-bold px-4 py-1 uppercase z-10">
              Deal
            </div>
            <img 
              src="https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=1971&auto=format&fit=crop" 
              alt="Dog Food" 
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-red-600 to-transparent">
              <div className="text-white">
                <div className="text-lg font-bold">DOG FOOD SALE 40% OFF</div>
                <div className="text-sm">Made with love</div>
              </div>
            </div>
          </div>
          
          <div className="relative rounded-md overflow-hidden h-60 bg-blue-500 group">
            <img 
              src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=2070&auto=format&fit=crop" 
              alt="Cameras" 
              className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button className="bg-white text-gray-800 hover:bg-gray-100">
                Shop Now
              </Button>
            </div>
          </div>
          
          <div className="relative rounded-md overflow-hidden h-60 bg-blue-600 group md:col-span-2">
            <img 
              src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2064&auto=format&fit=crop" 
              alt="We Love Dogs" 
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 p-4 flex flex-col justify-end">
              <div className="text-white mb-2">
                <div className="text-2xl font-bold">WE LOVE DOGS</div>
                <div className="text-sm">Treats, toys, accessories and more</div>
              </div>
              <Button className="bg-blue-500 text-white hover:bg-blue-600 w-max">
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      
      {/* Categories Section - Matching reference exactly */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Start exploring now</h2>
          <Link to="/categories" className="text-sm border border-gray-300 rounded px-4 py-1 hover:bg-gray-50">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          <Link to="/category/grocery" className="text-center">
            <div className="bg-gray-100 rounded-md p-4 mb-2 mx-auto w-20 h-20 flex items-center justify-center">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/2203/2203236.png" 
                alt="Grocery" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <span className="text-sm">Grocery</span>
          </Link>
          
          <Link to="/category/home" className="text-center">
            <div className="bg-gray-100 rounded-md p-4 mb-2 mx-auto w-20 h-20 flex items-center justify-center">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/1670/1670080.png" 
                alt="Home" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <span className="text-sm">Home</span>
          </Link>
          
          <Link to="/category/fashion" className="text-center">
            <div className="bg-gray-10
