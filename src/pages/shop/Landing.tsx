
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Landing = () => {
  return (
    <div>
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-teal-900 to-teal-700 h-80 overflow-hidden">
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-xl text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover the Latest Deals -</h1>
            <p className="text-xl md:text-2xl font-semibold mb-6">Up to 50% Off!</p>
            <Button className="bg-white text-teal-800 hover:bg-gray-100 px-6 rounded">
              <Link to="/shop">Shop Now</Link>
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop"
            alt="Shop collection" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        {/* Carousel Controls */}
        <Button 
          variant="outline" 
          size="sm" 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-8 h-8 p-0 z-20"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-8 h-8 p-0 z-20"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Featured Categories - Match exactly with the reference */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* New Year! New Fashion */}
          <Card className="overflow-hidden">
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
                    <h3 className="font-semibold text-lg">New Year! New Fashion</h3>
                    <Button 
                      size="sm" 
                      className="mt-2 border border-white text-white bg-transparent hover:bg-white/20"
                    >
                      Shop Now
                    </Button>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
          
          {/* Gaming accessories */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <Link to="/category/accessories" className="block">
                <div className="relative h-64 bg-gray-100">
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-lg mb-4">Gaming accessories</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <img 
                          src="https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=2070&auto=format&fit=crop" 
                          alt="Headset" 
                          className="w-full h-20 object-contain mb-1"
                        />
                        <span className="text-xs">Headset</span>
                      </div>
                      <div>
                        <img 
                          src="https://images.unsplash.com/photo-1623820919239-0d0ff10797a1?q=80&w=2070&auto=format&fit=crop" 
                          alt="Mouse" 
                          className="w-full h-20 object-contain mb-1"
                        />
                        <span className="text-xs">Mouse</span>
                      </div>
                      <div>
                        <img 
                          src="https://images.unsplash.com/photo-1606318801954-d46d46d3360a?q=80&w=2070&auto=format&fit=crop" 
                          alt="Controller" 
                          className="w-full h-20 object-contain mb-1"
                        />
                        <span className="text-xs">Controller</span>
                      </div>
                      <div>
                        <img 
                          src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=2070&auto=format&fit=crop" 
                          alt="Chair" 
                          className="w-full h-20 object-contain mb-1"
                        />
                        <span className="text-xs">Chair</span>
                      </div>
                    </div>
                    <Link to="/category/accessories" className="text-blue-600 text-sm mt-3 inline-block">
                      See more
                    </Link>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
          
          {/* Winner & Phone Promotions */}
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <Card className="overflow-hidden h-64">
              <CardContent className="p-0 h-full">
                <Link to="/category/electronics" className="block h-full">
                  <div className="bg-gradient-to-br from-red-600 to-red-800 h-full relative">
                    <div className="p-4 text-white h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-xl">WINNER</h3>
                          <p className="text-sm">Best Phone 2023</p>
                        </div>
                        <span className="bg-red-500 px-2 py-1 text-xs font-bold rounded">SALE</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex items-end justify-end w-full">
                          <img 
                            src="https://images.unsplash.com/photo-1544866092-1935c5ef2a8f?q=80&w=2069&auto=format&fit=crop" 
                            alt="Phone" 
                            className="max-h-32 object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden h-64">
              <CardContent className="p-0 h-full">
                <Link to="/category/electronics" className="block h-full">
                  <div className="bg-gradient-to-br from-blue-600 to-purple-700 h-full relative">
                    <div className="p-4 text-white h-full flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg">Home 4K Android TV</h3>
                        <p className="text-sm text-white/90">Starting at $399.99</p>
                      </div>
                      <div className="flex items-end justify-center w-full">
                        <img 
                          src="https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=2070&auto=format&fit=crop" 
                          alt="TV" 
                          className="max-h-32 object-contain"
                        />
                      </div>
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
        
        {/* Category Banners exactly as reference */}
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
            <div className="bg-gray-100 rounded-md p-4 mb-2 mx-auto w-20 h-20 flex items-center justify-center">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/3626/3626932.png" 
                alt="Fashion" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <span className="text-sm">Fashion</span>
          </Link>
          
          <Link to="/category/electronics" className="text-center">
            <div className="bg-gray-100 rounded-md p-4 mb-2 mx-auto w-20 h-20 flex items-center justify-center">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/3659/3659899.png" 
                alt="Electronics" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <span className="text-sm">Electronics</span>
          </Link>
          
          <Link to="/category/toys" className="text-center">
            <div className="bg-gray-100 rounded-md p-4 mb-2 mx-auto w-20 h-20 flex items-center justify-center">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/3655/3655930.png" 
                alt="Toys" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <span className="text-sm">Toys</span>
          </Link>
          
          <Link to="/category/more" className="text-center">
            <div className="bg-gray-100 rounded-md p-4 mb-2 mx-auto w-20 h-20 flex items-center justify-center">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/512/512142.png" 
                alt="More" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <span className="text-sm">More</span>
          </Link>
        </div>
      </div>
      
      {/* Best Selling Products - Matches reference exactly */}
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Best selling product</h2>
            <Link to="/best-selling" className="text-sm border border-gray-300 rounded px-4 py-1 hover:bg-gray-50">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="relative rounded-md overflow-hidden md:col-span-2 row-span-2 group">
              <div className="absolute top-4 left-0 bg-red-600 text-white text-xs font-bold px-4 py-1 uppercase z-10">
                Hot Deal
              </div>
              <img 
                src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2042&auto=format&fit=crop" 
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
            
            <div className="relative rounded-md overflow-hidden bg-red-600 group">
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
            
            <div className="relative rounded-md overflow-hidden h-48 bg-blue-500 group">
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
            
            <div className="relative rounded-md overflow-hidden h-48 bg-blue-600 group md:col-span-2">
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
      </div>
      
      {/* Limited Time Deals - Exactly matching reference */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Limited-Time Deal</h2>
          <Link to="/deals" className="text-sm border border-gray-300 rounded px-4 py-1 hover:bg-gray-50">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <Card>
            <CardContent className="p-4">
              <div className="relative mb-4">
                <Link to="/products/samsung-galaxy">
                  <img 
                    src="https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?q=80&w=1974&auto=format&fit=crop" 
                    alt="Samsung Galaxy S24" 
                    className="w-full h-48 object-contain rounded"
                  />
                </Link>
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
                  <span className="text-xs text-gray-500">Samsung...</span>
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
                <Link to="/products/ut-earbuds">
                  <img 
                    src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1972&auto=format&fit=crop" 
                    alt="UT Pro TWS Earbuds" 
                    className="w-full h-48 object-contain rounded"
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
                  <span className="text-xs text-gray-500">Auditory...</span>
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
                <Link to="/products/winter-jacket">
                  <img 
                    src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop" 
                    alt="Winter Fashion Jacket" 
                    className="w-full h-48 object-contain rounded"
                  />
                </Link>
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
                  <span className="text-xs text-gray-500">Sporting...</span>
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
                <Link to="/products/sneakers">
                  <img 
                    src="https://images.unsplash.com/photo-1597248881519-db089d3744a5?q=80&w=2080&auto=format&fit=crop" 
                    alt="New Balance 574 Sneakers" 
                    className="w-full h-48 object-contain rounded"
                  />
                </Link>
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
                  <span className="text-xs text-gray-500">Comfy...</span>
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
                <Link to="/products/ut-pro-700z">
                  <img 
                    src="https://images.unsplash.com/photo-1606400082777-ef05f3c5252b?q=80&w=1936&auto=format&fit=crop" 
                    alt="UT Pro 700Z Earbuds" 
                    className="w-full h-48 object-contain rounded"
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
                  <span className="text-xs text-gray-500">Gaming...</span>
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
      
      {/* Testimonials - Exactly matching reference */}
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
                      src="https://randomuser.me/api/portraits/women/44.jpg" 
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
                  "Excellent service and fantastic quality! The customer support team was quick to resolve my query. Perfect for a retail experience."
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://randomuser.me/api/portraits/men/32.jpg" 
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
                      src="https://randomuser.me/api/portraits/men/42.jpg" 
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
                      src="https://randomuser.me/api/portraits/men/22.jpg" 
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
                      src="https://randomuser.me/api/portraits/women/22.jpg" 
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
                      src="https://randomuser.me/api/portraits/men/52.jpg" 
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
            <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-2">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
