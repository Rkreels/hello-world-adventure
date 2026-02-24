import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Plus, Minus, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import { shopProducts } from '@/data/shopProducts';
import { toast } from 'sonner';
import { Loading } from '@/components/ui/loading';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = shopProducts.find(p => String(p.id) === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
        <Button asChild><Link to="/shop">Back to Shop</Link></Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    });
  };

  const relatedProducts = shopProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm">
        <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to="/shop" className="text-gray-500 hover:text-gray-700">Products</Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">{product.brand}</Badge>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-500 mt-1">{product.category}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < product.rating ? 'fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-gray-600">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.oldPrice > product.price && (
              <>
                <span className="text-xl text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
                <Badge variant="destructive">{product.discount}% OFF</Badge>
              </>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="font-medium text-green-600">In Stock</span>
            {product.isNew && <Badge className="ml-2 bg-blue-500">New Arrival</Badge>}
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium px-4">{quantity}</span>
              <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button onClick={handleAddToCart} className="flex-1 bg-green-600 hover:bg-green-700">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" onClick={() => { setIsWishlisted(!isWishlisted); toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist'); }} className={isWishlisted ? 'text-red-500 border-red-500' : ''}>
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="outline" onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); }}>
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Truck className="h-5 w-5" /><span>Free shipping</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="h-5 w-5" /><span>1 year warranty</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <RotateCcw className="h-5 w-5" /><span>30-day returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((rp) => (
              <Card key={rp.id} className="group cursor-pointer" onClick={() => navigate(`/products/${rp.id}`)}>
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                    <img src={rp.image} alt={rp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{rp.name}</h3>
                  <p className="text-sm text-gray-500">{rp.brand}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-gray-900">${rp.price.toFixed(2)}</span>
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/products/${rp.id}`}>View</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
