import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Plus, Minus, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart';
import { useProducts } from '@/hooks/useProducts';
import { toast } from 'sonner';
import { Loading } from '@/components/ui/loading';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { products, loading } = useProducts();
  
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (products && id) {
      const foundProduct = products.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        navigate('/404');
      }
    }
  }, [products, id, navigate]);

  if (loading || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loading text="Loading product..." />
      </div>
    );
  }

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: getCurrentPrice(),
      image: product.images?.[0] || '/placeholder.svg',
      quantity,
    };
    addItem(cartItem);
    toast.success('Added to cart!');
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleAttributeChange = (type: string, value: string) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const getCurrentPrice = () => {
    return selectedVariant?.price || product.price;
  };

  const getCurrentStock = () => {
    return selectedVariant?.stock || product.stock;
  };

  const isInStock = getCurrentStock() > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm">
        <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
        <span className="mx-2 text-gray-400">/</span>
        <a href="/shop" className="text-gray-500 hover:text-gray-700">Products</a>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.images?.[selectedImage] || '/placeholder.svg'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 rounded border-2 overflow-hidden ${
                    selectedImage === index ? 'border-blue-500' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-600 mt-2">{product.description}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <span className="text-gray-600">(4.8) 247 reviews</span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-gray-900">
              ${getCurrentPrice()}
            </span>
            {product.discountPrice && product.discountPrice > getCurrentPrice() && (
              <span className="text-xl text-gray-500 line-through">
                ${product.discountPrice}
              </span>
            )}
            {product.discountPrice && (
              <Badge variant="destructive">
                Save ${(product.discountPrice - getCurrentPrice()).toFixed(2)}
              </Badge>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isInStock ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={`font-medium ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
              {isInStock ? `In Stock (${getCurrentStock()} available)` : 'Out of Stock'}
            </span>
          </div>

          {/* Color Options */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Color</label>
              <div className="flex space-x-2">
                {product.colors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => handleAttributeChange('color', color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedAttributes.color === color ? 'border-gray-800' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Options */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Size</label>
              <div className="flex space-x-2">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => handleAttributeChange('size', size)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium ${
                      selectedAttributes.size === size
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium px-4">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= getCurrentStock()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button
              onClick={handleAddToCart}
              disabled={!isInStock}
              className="flex-1"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={isWishlisted ? 'text-red-500 border-red-500' : ''}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="outline">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Product Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Truck className="h-5 w-5" />
              <span>Free shipping</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="h-5 w-5" />
              <span>1 year warranty</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <RotateCcw className="h-5 w-5" />
              <span>30-day returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="mt-12">
        <div className="border-b">
          <nav className="flex space-x-8">
            <span className="border-b-2 border-blue-500 pb-2 text-sm font-medium text-blue-600">
              Description
            </span>
          </nav>
        </div>

        <div className="py-8">
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
            
            {/* Product Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {product.material && (
                <div>
                  <strong>Material:</strong> {product.material}
                </div>
              )}
              {product.brand && (
                <div>
                  <strong>Brand:</strong> {product.brand}
                </div>
              )}
              {product.weight && (
                <div>
                  <strong>Weight:</strong> {product.weight}kg
                </div>
              )}
              {product.dimensions && (
                <div>
                  <strong>Dimensions:</strong> {product.dimensions}
                </div>
              )}
              {product.careInstructions && (
                <div>
                  <strong>Care Instructions:</strong> {product.careInstructions}
                </div>
              )}
              {product.warranty && (
                <div>
                  <strong>Warranty:</strong> {product.warranty}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 4).map((relatedProduct: any) => (
            <Card key={relatedProduct.id} className="group cursor-pointer">
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                  <img
                    src={relatedProduct.images?.[0] || '/placeholder.svg'}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{relatedProduct.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{relatedProduct.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900">${relatedProduct.price}</span>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;