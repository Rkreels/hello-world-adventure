
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Mock product data - in a real app this would come from an API
  const product = {
    id: Number(id),
    name: "Premium Leather Wallet",
    brand: "LeatherCraft",
    price: 59.99,
    oldPrice: 79.99,
    discount: 25,
    rating: 4.5,
    reviews: 92,
    description: "This genuine leather wallet features a sleek and minimalist design. Handcrafted with premium full-grain leather that develops a beautiful patina over time. Multiple card slots and a bill compartment provide ample storage without bulk.",
    features: [
      "Genuine full-grain leather",
      "RFID blocking technology",
      "6 card slots plus ID window",
      "2 bill compartments",
      "Slim profile design",
      "Handcrafted with precision stitching"
    ],
    specifications: [
      { name: "Material", value: "Full-grain leather" },
      { name: "Dimensions", value: "4.5 × 3.5 × 0.5 inches" },
      { name: "Weight", value: "85g" },
      { name: "Color Options", value: "Black, Brown, Tan" },
      { name: "Warranty", value: "1 year" }
    ],
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1575602685837-5a0a12185e41?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1627123423231-9399a53470fe?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606735584785-1853cba72136?q=80&w=2070&auto=format&fit=crop"
    ],
    colors: ["#000000", "#784212", "#A04000"],
    inStock: true,
    category: "Fashion",
    tags: ["wallet", "leather", "accessories"]
  };
  
  const relatedProducts = [
    {
      id: 5,
      name: "Premium Leather Belt",
      brand: "LeatherCraft",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1570004143290-45bfd0278bdc?q=80&w=1779&auto=format&fit=crop"
    },
    {
      id: 6,
      name: "Leather Key Holder",
      brand: "LeatherCraft",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1601055903647-ddf1ee9701b7?q=80&w=1780&auto=format&fit=crop"
    },
    {
      id: 7,
      name: "Leather Card Case",
      brand: "LeatherCraft",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1618235277648-56ab8f7f5b1d?q=80&w=1780&auto=format&fit=crop"
    },
    {
      id: 8,
      name: "Bifold Wallet",
      brand: "LeatherCraft",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1591127069631-37f3221411a9?q=80&w=1780&auto=format&fit=crop"
    }
  ];
  
  const handleAddToCart = () => {
    // Add to cart functionality
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product is already in cart
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if product already exists
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      // Add new product to cart
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: quantity
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart`,
    });
  };
  
  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };
  
  const handleAddToWishlist = () => {
    // Add to wishlist functionality
    toast({
      title: "Added to wishlist",
      description: `${product.name} added to your wishlist`,
    });
  };
  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  const nextImage = () => {
    setActiveImageIndex(prev => (prev + 1) % product.images.length);
  };
  
  const prevImage = () => {
    setActiveImageIndex(prev => (prev - 1 + product.images.length) % product.images.length);
  };
  
  if (!product) {
    return <div className="container mx-auto px-4 py-8 text-center">Product not found</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="w-full lg:w-1/2">
          <div className="relative mb-4 h-96 bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={product.images[activeImageIndex]} 
              alt={product.name} 
              className="w-full h-full object-contain"
            />
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div 
                key={index}
                className={`
                  h-20 rounded-md overflow-hidden cursor-pointer border-2 
                  ${activeImageIndex === index ? 'border-primary' : 'border-transparent'}
                `}
                onClick={() => setActiveImageIndex(index)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} ${index+1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="w-full lg:w-1/2">
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-500 mb-4">{product.brand}</p>
            </div>
            <Button 
              variant="outline" 
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={handleAddToWishlist}
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
            <span className="text-sm text-gray-500 ml-2">{product.rating} ({product.reviews} reviews)</span>
          </div>
          
          <div className="flex items-baseline mb-6">
            <span className="text-3xl font-bold">{formatCurrency(product.price)}</span>
            {product.oldPrice && (
              <>
                <span className="text-lg text-gray-500 line-through ml-2">{formatCurrency(product.oldPrice)}</span>
                <span className="text-sm text-green-600 ml-2">-{product.discount}% OFF</span>
              </>
            )}
          </div>
          
          {product.inStock ? (
            <div className="flex items-center text-green-600 mb-6">
              <Check className="h-4 w-4 mr-1" />
              <span>In Stock</span>
            </div>
          ) : (
            <div className="text-red-600 mb-6">Out of Stock</div>
          )}
          
          {/* Color Options */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex space-x-2">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-300"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Quantity</h3>
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-16 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={increaseQuantity}
              >
                +
              </Button>
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-6">
            <Button 
              className="flex-1 bg-green-500 hover:bg-green-600"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            <Button 
              variant="secondary" 
              className="flex-1"
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </div>
          
          {/* Product Information Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <p className="text-gray-700">{product.description}</p>
            </TabsContent>
            <TabsContent value="features" className="mt-4">
              <ul className="list-disc pl-5 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-700">{feature}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="specifications" className="mt-4">
              <div className="space-y-2">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="grid grid-cols-2 border-b border-gray-100 py-2">
                    <div className="font-medium">{spec.name}</div>
                    <div className="text-gray-700">{spec.value}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map(product => (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div 
                  className="h-40 mb-4 bg-gray-100 rounded overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 
                  className="font-medium truncate cursor-pointer hover:text-primary"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">{product.brand}</p>
                <p className="font-semibold mt-1">{formatCurrency(product.price)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
