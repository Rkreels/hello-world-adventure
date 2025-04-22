
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const Landing = () => {
  return (
    <div>
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-emerald-800 to-emerald-600 h-80 overflow-hidden">
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-xl text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover the Latest Deals -</h1>
            <p className="text-xl md:text-2xl font-semibold mb-6">Up to 50% Off!</p>
            <Button className="bg-white text-emerald-700 hover:bg-gray-100 px-6">
              Shop Now
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-bg.jpg" 
            alt="Shop collection" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        {/* Carousel Controls */}
        <Button 
          variant="outline" 
          size="sm" 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full w-8 h-8 p-0 z-20"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full w-8 h-8 p-0 z-20"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Featured Categories */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <Link to="/category/fashion" className="block">
                <div className="relative h-64 bg-gray-100">
                  <img 
                    src="/products/fashion.jpg" 
                    alt="New Year! New Fashion" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="font-semibold text-lg">New Year! New Fashion</h3>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white"
                    >
                      Shop Now
                    </Button>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <Link to="/category/accessories" className="block">
                <div className="relative h-64 bg-gray-100">
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-lg mb-4">Gaming accessories</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <img 
                          src="/products/headset.jpg" 
                          alt="Headset" 
                          className="w-full h-20 object-contain mb-1"
                        />
                        <span className="text-xs">Headset</span>
                      </div>
                      <div>
                        <img 
                          src="/products/mouse.jpg" 
                          alt="Mouse" 
                          className="w-full h-20 object-contain mb-1"
                        />
                        <span className="text-xs">Mouse</span>
                      </div>
                      <div>
                        <img 
                          src="/products/controller.jpg" 
                          alt="Controller" 
                          className="w-full h-20 object-contain mb-1"
                        />
                        <span className="text-xs">Controller</span>
                      </div>
                      <div>
                        <img 
                          src="/products/chair.jpg" 
                          alt="Chair" 
                          className="w-full h-20 object-contain mb-1"
                        />
                        <span className="text-xs">Chair</span>
                      </div>
                    </div>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="mt-2 text-blue-600"
                    >
                      See more
                    </Button>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
          
          <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <Link to="/category/electronics" className="block">
                  <div className="aspect-[4/3] bg-gradient-to-br from-blue-600 to-purple-700 relative">
                    <div className="p-4 text-white h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-xl">WINNER</h3>
                          <p className="text-sm">Best Phone 2023</p>
                        </div>
                        <span className="bg-red-500 px-2 py-1 text-xs font-bold rounded">SALE</span>
                      </div>
                      <div className="mt-auto flex gap-2">
                        <img 
                          src="/products/phone-1.jpg" 
                          alt="Phone" 
                          className="w-1/2 object-contain"
                        />
                        <img 
                          src="/products/phone-2.jpg" 
                          alt="Phone" 
                          className="w-1/2 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <Link to="/category/electronics" className="block">
                  <div className="aspect-[4/3] bg-gradient-to-br from-pink-500 to-orange-400 relative">
                    <div className="p-4 text-white h-full flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-xl">Home 4K Android TV</h3>
                        <p className="text-sm">Starting at $399.99</p>
                      </div>
                      <div className="mt-auto">
                        <img 
                          src="/products/tv.jpg" 
                          alt="TV" 
                          className="w-full object-contain max-h-32"
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white"
                        >
                          Shop Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Category Banners */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <Link to="/category/clothing" className="relative h-32 rounded-md overflow-hidden group">
            <img 
              src="/category/clothing.jpg" 
              alt="Clothing" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="text-white font-medium text-lg">Clothing</span>
            </div>
          </Link>
          
          <Link to="/category/watches" className="relative h-32 rounded-md overflow-hidden group">
            <img 
              src="/category/watches.jpg" 
              alt="Men's Fashion" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="text-white font-medium text-lg">MEN'S FASHION</span>
            </div>
          </Link>
          
          <Link to="/category/denim" className="relative h-32 rounded-md overflow-hidden group">
            <img 
              src="/category/denim.jpg" 
              alt="Denim" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="text-white font-medium text-lg">DENIM</span>
            </div>
          </Link>
          
          <Link to="/category/appliances" className="relative h-32 rounded-md overflow-hidden group">
            <img 
              src="/category/appliances.jpg" 
              alt="Philips Appliances" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="text-white font-medium text-lg">PHILIPS APPLIANCES</span>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Trending Products */}
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Trending Product</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img 
                    src="/products/serum.jpg" 
                    alt="Radiant Glow Hydrating Serum" 
                    className="w-full h-48 object-cover rounded"
                  />
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
                  <div className="flex text-yellow-400 mb-1">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <span className="text-xs text-gray-500 ml-1">(287 reviews)</span>
                  </div>
                  <h3 className="font-medium">Radiant Glow Hydrating Serum</h3>
                  <p className="text-sm text-gray-500">Dermalogical Certified by SaltForm</p>
                </div>
                
                <div className="flex items-center mb-3">
                  <span className="text-lg font-semibold">$29.99</span>
                  <span className="text-sm text-gray-500 line-through ml-2">$39.99</span>
                  <span className="text-xs text-green-600 ml-2">-25% OFF</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button className="bg-green-500 hover:bg-green-600">
                    Add to cart
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img 
                    src="/products/vase.jpg" 
                    alt="Modern Minimalist Vase" 
                    className="w-full h-48 object-cover rounded"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mb-2">
                  <div className="flex text-yellow-400 mb-1">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4" />
                    <span className="text-xs text-gray-500 ml-1">(186 reviews)</span>
                  </div>
                  <h3 className="font-medium">Modern Minimalist Vase</h3>
                  <p className="text-sm text-gray-500">Design in Denmark, Minted in Germany</p>
                </div>
                
                <div className="flex items-center mb-3">
                  <span className="text-lg font-semibold">$49.99</span>
                  <span className="text-sm text-gray-500 line-through ml-2">$69.99</span>
                  <span className="text-xs text-green-600 ml-2">-30% OFF</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button className="bg-green-500 hover:bg-green-600">
                    Add to cart
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img 
                    src="/products/smartwatch.jpg" 
                    alt="FitPro 3000 Smartwatch" 
                    className="w-full h-48 object-cover rounded"
                  />
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
                  <div className="flex text-yellow-400 mb-1">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <span className="text-xs text-gray-500 ml-1">(152 reviews)</span>
                  </div>
                  <h3 className="font-medium">FitPro 3000 Smartwatch</h3>
                  <p className="text-sm text-gray-500">Leading Fitness Tech by GadgetPro</p>
                </div>
                
                <div className="flex items-center mb-3">
                  <span className="text-lg font-semibold">$119.99</span>
                  <span className="text-sm text-gray-500 line-through ml-2">$149.99</span>
                  <span className="text-xs text-green-600 ml-2">-20% OFF</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button className="bg-green-500 hover:bg-green-600">
                    Add to cart
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hidden md:block">
              <CardContent className="p-4">
                <div className="h-full flex flex-col">
                  <h3 className="font-medium mb-3">Trend collection for men</h3>
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    <div>
                      <img 
                        src="/products/pants.jpg" 
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
                        src="/products/shirt.jpg" 
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
                        src="/products/hat.jpg" 
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
                        src="/products/shoes.jpg" 
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
                    See All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Categories Section */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Start exploring now</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          <Link to="/category/grocery" className="text-center">
            <div className="bg-gray-100 rounded-md p-4 mb-2 mx-auto w-20 h-20 flex items-center justify-center">
              <img 
                src="/icons/grocery.png" 
                alt="Grocery" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <span className="text-sm">Grocery</span>
          </Link>
          
          <Link to="/category/home" className="text-center">
            <div className="bg-gray-100 rounded-md p-4 mb-2 mx-auto w-20 h-20 flex items-center justify-center">
              <img 
                src="/icons/home.png" 
                alt="Home" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <span className="text-sm">Home</span>
          </Link>
          
          <Link to="/category/fashion" className="text-center">
            <div className="bg-gray-100 rounded-md p-4 mb-2 mx-auto w-20 h-20 flex items-center justify-center">
              <img 
                src="/icons/fashion.png" 
                alt="Fashion" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <span className="text-sm">Fashion</span>
          </Link>
          
          <Link to="/category/electronics" className="text-center">
            <div className="bg-gray-100 rounded-md p-4 mb-2 mx-auto w-20 h-20 flex items-center justify-center">
              <img 
                src="/icons/electronics.png" 
                alt="Electronics" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <span className="text-sm">Electronics</span>
          </Link>
          
          <Link to="/category/toys" className="text-center">
            <div className="bg-gray-100 rounded-md p-4 mb-2 mx-auto w-20 h-20 flex items-center justify-center">
              <img 
                src="/icons/toys.png" 
                alt="Toys" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <span className="text-sm">Toys</span>
          </Link>
          
          <Link to="/category/more" className="text-center">
            <div className="bg-gray-100 rounded-md p-4 mb-2 mx-auto w-20 h-20 flex items-center justify-center">
              <img 
                src="/icons/more.png" 
                alt="More" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <span className="text-sm">More</span>
          </Link>
        </div>
      </div>
      
      {/* Best Selling Products */}
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Best selling product</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="relative rounded-md overflow-hidden md:col-span-2 row-span-2 group">
              <div className="absolute top-4 left-0 bg-red-600 text-white text-xs font-bold px-4 py-1 uppercase z-10">
                Hot Deal
              </div>
              <img 
                src="/products/computer-accessories.jpg" 
                alt="Computer Accessories" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 p-6 flex flex-col justify-end">
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
            
            <div className="relative rounded-md overflow-hidden bg-black group">
              <img 
                src="/products/mens-fashion.jpg" 
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
            
            <div className="relative rounded-md overflow-hidden bg-red-600 group">
              <div className="absolute top-4 left-0 bg-white text-red-600 text-xs font-bold px-4 py-1 uppercase z-10">
                Deal
              </div>
              <img 
                src="/products/dog-food.jpg" 
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
            
            <div className="relative rounded-md overflow-hidden h-48 bg-blue-500 group">
              <img 
                src="/products/cameras.jpg" 
                alt="Cameras" 
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button className="bg-white text-gray-800 hover:bg-gray-100">
                  Shop Now
                </Button>
              </div>
            </div>
            
            <div className="relative rounded-md overflow-hidden h-48 bg-blue-600 group md:col-span-2">
              <img 
                src="/products/dogs.jpg" 
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
      </div>
      
      {/* Limited Time Deals */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Limited-Time Deal</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <Card>
            <CardContent className="p-4">
              <div className="relative mb-4">
                <img 
                  src="/products/samsung.jpg" 
                  alt="Samsung Galaxy S24" 
                  className="w-full h-48 object-contain rounded"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  -25% OFF
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex text-yellow-400">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <span className="text-xs text-gray-500 ml-1">(24)</span>
                  </div>
                  <span className="text-xs text-gray-500">Sanding Furniture...</span>
                </div>
                <h3 className="font-medium">Samsung Galaxy S24</h3>
                <p className="text-xs text-gray-500">
                  Color: <span className="text-black">Silver</span> | Size: <span className="text-black">128GB</span>
                </p>
              </div>
              
              <div className="flex items-center mb-3">
                <span className="text-lg font-semibold">$799.99</span>
                <span className="text-sm text-gray-500 line-through ml-2">$999.99</span>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="link" size="sm" className="text-xs p-0 h-auto">
                  Learn More
                </Button>
                <Button variant="outline" size="sm" className="text-xs flex-1">
                  Add to wish
                </Button>
                <Button className="bg-green-500 hover:bg-green-600 text-xs">
                  Add to cart
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="relative mb-4">
                <img 
                  src="/products/earbuds.jpg" 
                  alt="UT Pro TWS Earbuds" 
                  className="w-full h-48 object-contain rounded"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  SPECIAL OFFER
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex text-yellow-400">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4" />
                    <span className="text-xs text-gray-500 ml-1">(18)</span>
                  </div>
                  <span className="text-xs text-gray-500">Auditory Dynamic...</span>
                </div>
                <h3 className="font-medium">UT Pro TWS Earbuds</h3>
                <p className="text-xs text-gray-500">
                  Color: <span className="text-black">Black</span> | Type: <span className="text-black">Wireless</span>
                </p>
              </div>
              
              <div className="flex items-center mb-3">
                <span className="text-lg font-semibold">$149.99</span>
                <span className="text-sm text-gray-500 line-through ml-2">$199.99</span>
                <span className="text-xs text-green-600 ml-2">-25% OFF</span>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="link" size="sm" className="text-xs p-0 h-auto">
                  Learn More
                </Button>
                <Button variant="outline" size="sm" className="text-xs flex-1">
                  Add to wish
                </Button>
                <Button className="bg-green-500 hover:bg-green-600 text-xs">
                  Add to cart
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="relative mb-4">
                <img 
                  src="/products/jacket.jpg" 
                  alt="Winter Fashion Jacket" 
                  className="w-full h-48 object-contain rounded"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                  WINTER
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex text-yellow-400">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4" />
                    <span className="text-xs text-gray-500 ml-1">(32)</span>
                  </div>
                  <span className="text-xs text-gray-500">Sporting Fashion...</span>
                </div>
                <h3 className="font-medium">Winter Fashion Jacket</h3>
                <p className="text-xs text-gray-500">
                  Color: <span className="text-black">Orange</span> | Size: <span className="text-black">XL</span>
                </p>
              </div>
              
              <div className="flex items-center mb-3">
                <span className="text-lg font-semibold">$259.99</span>
                <span className="text-sm text-gray-500 line-through ml-2">$399.99</span>
                <span className="text-xs text-green-600 ml-2">-35% OFF</span>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="link" size="sm" className="text-xs p-0 h-auto">
                  Learn More
                </Button>
                <Button variant="outline" size="sm" className="text-xs flex-1">
                  Add to wish
                </Button>
                <Button className="bg-green-500 hover:bg-green-600 text-xs">
                  Add to cart
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="relative mb-4">
                <img 
                  src="/products/sneakers.jpg" 
                  alt="New Balance 574 Sneakers" 
                  className="w-full h-48 object-contain rounded"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  HOT
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex text-yellow-400">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <span className="text-xs text-gray-500 ml-1">(87)</span>
                  </div>
                  <span className="text-xs text-gray-500">Comfy for exercise...</span>
                </div>
                <h3 className="font-medium">New Balance 574 Sneakers</h3>
                <p className="text-xs text-gray-500">
                  Color: <span className="text-black">Grey/Red</span> | Size: <span className="text-black">10</span>
                </p>
              </div>
              
              <div className="flex items-center mb-3">
                <span className="text-lg font-semibold">$79.99</span>
                <span className="text-sm text-gray-500 line-through ml-2">$109.99</span>
                <span className="text-xs text-green-600 ml-2">-27% OFF</span>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="link" size="sm" className="text-xs p-0 h-auto">
                  Learn More
                </Button>
                <Button variant="outline" size="sm" className="text-xs flex-1">
                  Add to wish
                </Button>
                <Button className="bg-green-500 hover:bg-green-600 text-xs">
                  Add to cart
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hidden lg:block">
            <CardContent className="p-4">
              <div className="relative mb-4">
                <img 
                  src="/products/earbuds2.jpg" 
                  alt="UT Pro TWS Earbuds" 
                  className="w-full h-48 object-contain rounded"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  SPECIAL OFFER
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex text-yellow-400">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <Star className="h-4 w-4" />
                    <span className="text-xs text-gray-500 ml-1">(42)</span>
                  </div>
                  <span className="text-xs text-gray-500">Gaming Headset...</span>
                </div>
                <h3 className="font-medium">UT Pro 700Z Earbuds</h3>
                <p className="text-xs text-gray-500">
                  Color: <span className="text-black">White</span> | Type: <span className="text-black">Wireless</span>
                </p>
              </div>
              
              <div className="flex items-center mb-3">
                <span className="text-lg font-semibold">$179.99</span>
                <span className="text-sm text-gray-500 line-through ml-2">$249.99</span>
                <span className="text-xs text-green-600 ml-2">-28% OFF</span>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="link" size="sm" className="text-xs p-0 h-auto">
                  Learn More
                </Button>
                <Button variant="outline" size="sm" className="text-xs flex-1">
                  Add to wish
                </Button>
                <Button className="bg-green-500 hover:bg-green-600 text-xs">
                  Add to cart
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="bg-green-50 py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-8">Our Happy Customers</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
            Don't just take our word for it - hear from some of our satisfied customers! Check out our numerous reviews from across the globe. Our customers' satisfaction is our priority.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="/customers/emily.jpg" 
                      alt="Emily R." 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Emily R.</h4>
                    <div className="flex text-yellow-400">
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  "Excellent and fantastic quality! The customer support team was quick to resolve my query. Perfect for a retail experience."
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="/customers/john.jpg" 
                      alt="John D." 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">John D.</h4>
                    <div className="flex text-yellow-400">
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  "Products arrived on time and fantastic quality! The customer support team was quick to resolve my query. Perfect experience!"
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="/customers/ahmed.jpg" 
                      alt="Ahmed M." 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Ahmed M.</h4>
                    <div className="flex text-yellow-400">
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  "Splendid products and fantastic quality! The customer support team was quick to resolve my query. Perfect for a retail experience."
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="/customers/alex.jpg" 
                      alt="Alex T." 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Alex T.</h4>
                    <div className="flex text-yellow-400">
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  "Excellent service and fantastic quality! The customer support team was quick to resolve my query. Perfect for a retail experience."
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="/customers/priya.jpg" 
                      alt="Priya K." 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Priya K.</h4>
                    <div className="flex text-yellow-400">
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  "Fast delivery and fantastic quality! The customer support team was quick to resolve my query. Perfect for a retail experience."
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="/customers/david.jpg" 
                      alt="David H." 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">David H.</h4>
                    <div className="flex text-yellow-400">
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  "Very impressed with the fantastic quality! The customer support team was quick to resolve my query. Perfect for a retail experience."
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-10">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
