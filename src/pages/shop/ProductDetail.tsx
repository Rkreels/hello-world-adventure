
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Star, 
  TruckIcon, 
  ShieldCheck, 
  ArrowLeft, 
  Heart, 
  Share2, 
  MinusCircle, 
  PlusCircle,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency } from '@/lib/utils';

// Mock product data
const product = {
  id: 1,
  name: "FitPro 3000 Smartwatch",
  brand: "GadgetPro",
  price: 119.99,
  oldPrice: 149.99,
  images: [
    "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=2044&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=2070&auto=format&fit=crop",
  ],
  rating: 4.8,
  reviews: 152,
  discount: 20,
  description: "The FitPro 3000 is the ultimate smartwatch for fitness enthusiasts. With advanced health tracking, long battery life, and a beautiful display, it's the perfect companion for your active lifestyle.",
  features: [
    "Heart rate monitoring",
    "Sleep tracking",
    "Water resistant up to 50m",
    "GPS tracking",
    "7-day battery life",
    "Customizable watch faces",
    "Bluetooth connectivity",
    "Compatible with iOS and Android",
  ],
  specifications: {
    "Display": "1.3\" AMOLED",
    "Resolution": "360 x 360 pixels",
    "Processor": "Dual-core 1.2 GHz",
    "RAM": "1GB",
    "Storage": "8GB",
    "Battery": "420mAh Li-ion",
    "Water Resistance": "5 ATM",
    "Connectivity": "Bluetooth 5.0, Wi-Fi",
    "Sensors": "Accelerometer, Gyroscope, Heart Rate, Barometer",
    "Dimensions": "45 x 45 x 12.5 mm",
    "Weight": "52g",
    "Material": "Aluminum case, silicone band",
    "Colors": "Black, Silver, Blue",
  },
  colors: ["Black", "Silver", "Blue"],
  sizes: ["Regular", "Large"],
  stock: 15,
  relatedProducts: [
    {
      id: 2,
      name: "Wireless Earbuds Pro",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=2070&auto=format&fit=crop",
      rating: 4.5,
      reviews: 98,
    },
    {
      id: 3,
      name: "Activity Tracker Band",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?q=80&w=2088&auto=format&fit=crop",
      rating: 4.2,
      reviews: 124,
    },
    {
      id: 4,
      name: "Bluetooth Fitness Scale",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1535743686920-55e4145369ec?q=80&w=2032&auto=format&fit=crop",
      rating: 4.0,
      reviews: 76,
    },
    {
      id: 5,
      name: "Smart Body Composition Monitor",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?q=80&w=2070&auto=format&fit=crop",
      rating: 4.7,
      reviews: 54,
    },
  ]
};

const ProductDetail = () => {
  const { id } = useParams();
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-emerald-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-emerald-600">Shop</Link>
        <span className="mx-2">/</span>
        <Link to="/category/electronics" className="hover:text-emerald-600">Electronics</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        {/* Product Images */}
        <div>
          <div className="aspect-[4/3] mb-4 overflow-hidden rounded-lg bg-gray-100">
            <img 
              src={mainImage} 
              alt={product.name} 
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((image, index) => (
              <button 
                key={index}
                className={`aspect-square rounded-md overflow-hidden border-2 ${
                  mainImage === image ? 'border-emerald-500' : 'border-transparent'
                }`}
                onClick={() => setMainImage(image)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <div className="mb-6">
            <span className="text-sm text-emerald-600 font-medium">{product.brand}</span>
            <h1 className="text-2xl md:text-3xl font-bold mt-1 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400' : ''}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating} ({product.reviews} reviews)</span>
            </div>
            
            <div className="flex items-center mb-1">
              <span className="text-2xl font-bold mr-3">{formatCurrency(product.price)}</span>
              <span className="text-gray-500 line-through">{formatCurrency(product.oldPrice)}</span>
              <span className="ml-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                {product.discount}% OFF
              </span>
            </div>
            
            <p className="text-sm text-gray-600">
              Inclusive of all taxes. <span className="text-emerald-600">Free shipping</span> on orders over $100.
            </p>
          </div>
          
          <p className="text-gray-700 mb-6">
            {product.description}
          </p>
          
          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Color: <span className="font-normal">{selectedColor}</span></h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border ${
                    selectedColor === color 
                      ? 'ring-2 ring-offset-2 ring-emerald-500' 
                      : 'border-gray-300'
                  }`}
                  style={{ 
                    backgroundColor: color.toLowerCase() === 'black' ? '#000' : 
                                     color.toLowerCase() === 'silver' ? '#C0C0C0' : 
                                     color.toLowerCase() === 'blue' ? '#0066CC' : '#FFF' 
                  }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          </div>
          
          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Size: <span className="font-normal">{selectedSize}</span></h3>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded-md ${
                    selectedSize === size 
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
                      : 'border-gray-300'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Quantity:</h3>
            <div className="flex items-center">
              <button 
                className="text-gray-500 hover:text-emerald-600"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <MinusCircle className="h-6 w-6" />
              </button>
              <span className="mx-4 w-8 text-center">{quantity}</span>
              <button 
                className="text-gray-500 hover:text-emerald-600"
                onClick={increaseQuantity}
                disabled={quantity >= product.stock}
              >
                <PlusCircle className="h-6 w-6" />
              </button>
              <span className="ml-4 text-sm text-gray-500">
                {product.stock} items available
              </span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 h-12">
              <Link to="/cart" className="flex items-center justify-center w-full">
                Add to Cart
              </Link>
            </Button>
            <Button variant="outline" className="flex-1 h-12">
              <Link to="/checkout" className="flex items-center justify-center w-full">
                Buy Now
              </Link>
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Product Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-200 pt-5">
            <div className="flex items-center">
              <TruckIcon className="h-5 w-5 text-emerald-600 mr-2" />
              <span className="text-sm">Free delivery on orders over $100</span>
            </div>
            <div className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-emerald-600 mr-2" />
              <span className="text-sm">30-day easy returns</span>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="h-5 w-5 text-emerald-600 mr-2" />
              <span className="text-sm">2 year warranty</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 mr-2" />
              <span className="text-sm">100% authentic products</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="border-b w-full justify-start rounded-none mb-5 px-0">
          <TabsTrigger value="description" className="rounded-none px-6">Description</TabsTrigger>
          <TabsTrigger value="features" className="rounded-none px-6">Features</TabsTrigger>
          <TabsTrigger value="specs" className="rounded-none px-6">Specifications</TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-none px-6">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="px-4">
          <h2 className="text-2xl font-bold mb-4">Product Description</h2>
          <p className="mb-4">
            The FitPro 3000 is our most advanced smartwatch yet, designed for fitness enthusiasts who demand the best. 
            With cutting-edge health monitoring technology, you can track your heart rate, sleep patterns, and activity levels with pinpoint accuracy.
          </p>
          <p className="mb-4">
            The beautiful 1.3" AMOLED display offers crystal clear visuals even in direct sunlight, while the intuitive interface makes navigation a breeze. 
            With up to 7 days of battery life, you can spend more time moving and less time charging.
          </p>
          <p className="mb-4">
            Water-resistant up to 50 meters, the FitPro 3000 is your perfect companion for swimming and other water sports. 
            The built-in GPS allows for accurate tracking of your outdoor activities without the need to bring your phone.
          </p>
          <p>
            Stay connected with smart notifications for calls, texts, and apps. The FitPro 3000 is compatible with both iOS and Android devices, 
            offering seamless integration with your digital lifestyle.
          </p>
        </TabsContent>
        
        <TabsContent value="features" className="px-4">
          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 mr-2" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </TabsContent>
        
        <TabsContent value="specs" className="px-4">
          <h2 className="text-2xl font-bold mb-4">Technical Specifications</h2>
          <div className="border rounded-lg overflow-hidden">
            {Object.entries(product.specifications).map(([key, value], index) => (
              <div key={key} className={`flex ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <div className="w-1/3 border-r border-b p-3 font-medium">{key}</div>
                <div className="w-2/3 border-b p-3">{value}</div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex items-center mb-2">
                  <span className="text-4xl font-bold mr-2">{product.rating}</span>
                  <div className="flex flex-col">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400' : ''}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{product.reviews} reviews</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((num) => (
                    <div key={num} className="flex items-center">
                      <span className="w-1/6 text-sm">{num} star</span>
                      <div className="w-4/6 mx-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400 rounded-full" 
                          style={{ 
                            width: `${num === 5 ? 70 : num === 4 ? 20 : num === 3 ? 7 : num === 2 ? 2 : 1}%` 
                          }}
                        ></div>
                      </div>
                      <span className="w-1/6 text-xs text-gray-500 text-right">
                        {num === 5 ? 70 : num === 4 ? 20 : num === 3 ? 7 : num === 2 ? 2 : 1}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                Write a Review
              </Button>
            </div>
            
            <div className="md:w-2/3">
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="John D." 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-medium">John D.</h4>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400 mr-2">
                        <Star className="h-4 w-4 fill-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400" />
                      </div>
                      <span className="text-xs text-gray-500">5 days ago</span>
                    </div>
                  </div>
                </div>
                <h5 className="font-medium mb-2">Amazing smartwatch with great features</h5>
                <p className="text-gray-700 text-sm mb-3">
                  I've been using the FitPro 3000 for about a month now and I'm extremely impressed. The battery life is outstanding, 
                  easily lasting 5-6 days even with heavy use. The health tracking features are accurate and the sleep analysis has been very insightful. 
                  Highly recommend for fitness enthusiasts!
                </p>
                <div className="flex items-center text-sm">
                  <button className="text-gray-500 hover:text-gray-700 mr-4">Helpful (12)</button>
                  <button className="text-gray-500 hover:text-gray-700">Report</button>
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="Sarah M." 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-medium">Sarah M.</h4>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400 mr-2">
                        <Star className="h-4 w-4 fill-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400" />
                        <Star className="h-4 w-4" />
                      </div>
                      <span className="text-xs text-gray-500">2 weeks ago</span>
                    </div>
                  </div>
                </div>
                <h5 className="font-medium mb-2">Good but with some minor issues</h5>
                <p className="text-gray-700 text-sm mb-3">
                  The FitPro 3000 is a solid smartwatch with excellent fitness tracking capabilities. The heart rate monitor is accurate and the GPS works well for running. 
                  I'm taking off one star because the app can be a bit buggy sometimes and syncing occasionally fails. Also, the sleep tracking isn't as accurate as I'd like.
                  Overall though, it's a good value for the price.
                </p>
                <div className="flex items-center text-sm">
                  <button className="text-gray-500 hover:text-gray-700 mr-4">Helpful (8)</button>
                  <button className="text-gray-500 hover:text-gray-700">Report</button>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline">Load More Reviews</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Related Products */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {product.relatedProducts.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <Link to={`/products/${item.id}`}>
                  <div className="aspect-square mb-4 bg-gray-100 rounded overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="flex text-yellow-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'fill-yellow-400' : ''}`} 
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({item.reviews})</span>
                  </div>
                  
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className="font-semibold">{formatCurrency(item.price)}</span>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
