
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Filter, Grid3X3, LayoutList, ChevronDown, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { formatCurrency } from '@/lib/utils';

const products = [
  {
    id: 1,
    name: "Radiant Glow Hydrating Serum",
    brand: "SaltForm",
    price: 29.99,
    oldPrice: 39.99,
    image: "https://images.unsplash.com/photo-1615900119312-2acd3a71f3aa?q=80&w=1964&auto=format&fit=crop",
    rating: 5,
    reviews: 287,
    isNew: true,
    discount: 25,
  },
  {
    id: 2,
    name: "Modern Minimalist Vase",
    brand: "Design Denmark",
    price: 49.99,
    oldPrice: 69.99,
    image: "https://images.unsplash.com/photo-1602746588630-8ce6147c406c?q=80&w=1964&auto=format&fit=crop",
    rating: 4,
    reviews: 186,
    isNew: false,
    discount: 30,
  },
  {
    id: 3,
    name: "FitPro 3000 Smartwatch",
    brand: "GadgetPro",
    price: 119.99,
    oldPrice: 149.99,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=2044&auto=format&fit=crop",
    rating: 5,
    reviews: 152,
    isNew: false,
    discount: 20,
  },
  {
    id: 4,
    name: "Wireless Noise Cancelling Headphones",
    brand: "AudioTech",
    price: 189.99,
    oldPrice: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    rating: 4,
    reviews: 215,
    isNew: false,
    discount: 24,
  },
  {
    id: 5,
    name: "Premium Leather Wallet",
    brand: "LeatherCraft",
    price: 59.99,
    oldPrice: 79.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1974&auto=format&fit=crop",
    rating: 4,
    reviews: 92,
    isNew: true,
    discount: 25,
  },
  {
    id: 6,
    name: "Stainless Steel Water Bottle",
    brand: "EcoLife",
    price: 24.99,
    oldPrice: 34.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1887&auto=format&fit=crop",
    rating: 5,
    reviews: 178,
    isNew: false,
    discount: 28,
  },
  {
    id: 7,
    name: "Organic Cotton T-Shirt",
    brand: "EcoWear",
    price: 19.99,
    oldPrice: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop",
    rating: 4,
    reviews: 124,
    isNew: false,
    discount: 33,
  },
  {
    id: 8,
    name: "Portable Bluetooth Speaker",
    brand: "SoundWave",
    price: 79.99,
    oldPrice: 99.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2069&auto=format&fit=crop",
    rating: 4,
    reviews: 86,
    isNew: true,
    discount: 20,
  },
  {
    id: 9,
    name: "Ceramic Coffee Mug Set",
    brand: "HomeStyle",
    price: 34.99,
    oldPrice: 49.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=2070&auto=format&fit=crop",
    rating: 5,
    reviews: 142,
    isNew: false,
    discount: 30,
  },
];

const Shop = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 300]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-1/4">
          <div className="sticky top-4 space-y-6">
            <div className="bg-white rounded-lg shadow p-5">
              <h3 className="font-medium text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox id="cat-electronics" />
                  <label htmlFor="cat-electronics" className="ml-2 text-sm">Electronics</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="cat-fashion" />
                  <label htmlFor="cat-fashion" className="ml-2 text-sm">Fashion</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="cat-home" />
                  <label htmlFor="cat-home" className="ml-2 text-sm">Home & Kitchen</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="cat-beauty" />
                  <label htmlFor="cat-beauty" className="ml-2 text-sm">Beauty & Personal Care</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="cat-sports" />
                  <label htmlFor="cat-sports" className="ml-2 text-sm">Sports & Outdoors</label>
                </div>
              </div>
              <Button variant="link" className="mt-2 px-0 text-sm text-blue-600">
                Show more
              </Button>
            </div>
            
            <div className="bg-white rounded-lg shadow p-5">
              <h3 className="font-medium text-lg mb-4">Price Range</h3>
              <Slider 
                defaultValue={[0, 300]} 
                max={500} 
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="my-6"
              />
              <div className="flex items-center justify-between">
                <div className="w-[45%]">
                  <label className="text-xs text-gray-500 mb-1 block">Min</label>
                  <div className="border rounded px-3 py-2 text-sm">
                    ${priceRange[0]}
                  </div>
                </div>
                <span className="text-gray-400">-</span>
                <div className="w-[45%]">
                  <label className="text-xs text-gray-500 mb-1 block">Max</label>
                  <div className="border rounded px-3 py-2 text-sm">
                    ${priceRange[1]}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-5">
              <h3 className="font-medium text-lg mb-4">Customer Ratings</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox id="rating-5" />
                  <label htmlFor="rating-5" className="ml-2 text-sm flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                    </div>
                    <span>& Up</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="rating-4" />
                  <label htmlFor="rating-4" className="ml-2 text-sm flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4" />
                    </div>
                    <span>& Up</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="rating-3" />
                  <label htmlFor="rating-3" className="ml-2 text-sm flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4" />
                      <Star className="h-4 w-4" />
                    </div>
                    <span>& Up</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-5">
              <h3 className="font-medium text-lg mb-4">Brands</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox id="brand-samsung" />
                  <label htmlFor="brand-samsung" className="ml-2 text-sm">Samsung</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="brand-apple" />
                  <label htmlFor="brand-apple" className="ml-2 text-sm">Apple</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="brand-sony" />
                  <label htmlFor="brand-sony" className="ml-2 text-sm">Sony</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="brand-logitech" />
                  <label htmlFor="brand-logitech" className="ml-2 text-sm">Logitech</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="brand-adidas" />
                  <label htmlFor="brand-adidas" className="ml-2 text-sm">Adidas</label>
                </div>
              </div>
              <Button variant="link" className="mt-2 px-0 text-sm text-blue-600">
                Show more
              </Button>
            </div>
          </div>
        </div>
        
        {/* Products */}
        <div className="w-full md:w-3/4">
          {/* Filters bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-500">Showing 1-9 of 36 products</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center">
                <span className="text-sm mr-2">Sort by:</span>
                <Select defaultValue="featured">
                  <SelectTrigger className="w-[180px] h-9">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="rating">Avg. Customer Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center border rounded">
                <button 
                  className={`px-3 py-1.5 ${view === 'grid' ? 'bg-gray-100' : ''}`}
                  onClick={() => setView('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button 
                  className={`px-3 py-1.5 ${view === 'list' ? 'bg-gray-100' : ''}`}
                  onClick={() => setView('list')}
                >
                  <LayoutList className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Products grid */}
          {view === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-48 object-cover rounded"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      {product.isNew && (
                        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          New
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex text-yellow-400 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < product.rating ? 'fill-yellow-400' : ''}`} 
                          />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">({product.reviews} reviews)</span>
                      </div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.brand}</p>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <span className="text-lg font-semibold">{formatCurrency(product.price)}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">{formatCurrency(product.oldPrice)}</span>
                      <span className="text-xs text-green-600 ml-2">-{product.discount}% OFF</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Link to={`/products/${product.id}`}>View Details</Link>
                      </Button>
                      <Button className="bg-green-500 hover:bg-green-600">
                        <Link to="/cart">Add to cart</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {/* Products list */}
          {view === 'list' && (
            <div className="space-y-4">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative md:w-1/4">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-48 md:h-full object-cover rounded"
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        {product.isNew && (
                          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                            New
                          </div>
                        )}
                      </div>
                      
                      <div className="md:w-3/4">
                        <div className="mb-2">
                          <div className="flex text-yellow-400 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < product.rating ? 'fill-yellow-400' : ''}`} 
                              />
                            ))}
                            <span className="text-xs text-gray-500 ml-1">({product.reviews} reviews)</span>
                          </div>
                          <h3 className="font-medium text-lg">{product.name}</h3>
                          <p className="text-sm text-gray-500">{product.brand}</p>
                        </div>
                        
                        <p className="text-gray-600 mb-4 text-sm">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                          Nulla facilisi. Sed euismod, nisl vel ultricies lacinia, 
                          nunc nisl ultricies nisl, nec ultricies nisl nunc vel nisl.
                        </p>
                        
                        <div className="flex items-center mb-3">
                          <span className="text-lg font-semibold">{formatCurrency(product.price)}</span>
                          <span className="text-sm text-gray-500 line-through ml-2">{formatCurrency(product.oldPrice)}</span>
                          <span className="text-xs text-green-600 ml-2">-{product.discount}% OFF</span>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Link to={`/products/${product.id}`}>View Details</Link>
                          </Button>
                          <Button className="bg-green-500 hover:bg-green-600">
                            <Link to="/cart">Add to cart</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <nav className="flex items-center space-x-1">
              <Button variant="outline" size="sm" className="px-2">
                Previous
              </Button>
              <Button variant="outline" size="sm" className="w-9 h-9 bg-emerald-50 border-emerald-200">
                1
              </Button>
              <Button variant="outline" size="sm" className="w-9 h-9">
                2
              </Button>
              <Button variant="outline" size="sm" className="w-9 h-9">
                3
              </Button>
              <Button variant="outline" size="sm" className="px-2">
                Next
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
