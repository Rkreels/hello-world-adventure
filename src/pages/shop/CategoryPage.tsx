
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star, Filter, Grid3X3, LayoutList, Heart, ShoppingCart } from 'lucide-react';
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
import { toast } from 'sonner';
import { shopProducts } from '@/data/shopProducts';

// Category metadata
const categoryMeta: Record<string, { name: string; description: string; banner: string; subcategories: string[]; filterCategory: string }> = {
  electronics: {
    name: 'Electronics',
    description: 'Explore our collection of the latest electronics and gadgets.',
    banner: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&q=80',
    subcategories: ['Smartphones', 'Laptops', 'Audio', 'Wearables', 'Accessories'],
    filterCategory: 'Electronics',
  },
  fashion: {
    name: 'Fashion',
    description: 'Discover the latest trends in fashion for men, women, and kids.',
    banner: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=80',
    subcategories: ['Men', 'Women', 'Kids', 'Shoes', 'Accessories'],
    filterCategory: 'Fashion',
  },
  home: {
    name: 'Home & Kitchen',
    description: 'Everything you need to make your home comfortable and stylish.',
    banner: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=1200&q=80',
    subcategories: ['Kitchen', 'Living Room', 'Bedroom', 'Bathroom', 'Garden'],
    filterCategory: 'Home',
  },
  sports: {
    name: 'Sports & Outdoors',
    description: 'Gear up for your next adventure with our sports equipment.',
    banner: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80',
    subcategories: ['Fitness', 'Running', 'Yoga', 'Team Sports', 'Outdoor'],
    filterCategory: 'Sports',
  },
  beauty: {
    name: 'Beauty & Personal Care',
    description: 'Premium skincare, haircare and wellness products for everyone.',
    banner: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80',
    subcategories: ['Skincare', 'Haircare', 'Makeup', 'Wellness', 'Fragrances'],
    filterCategory: 'Beauty',
  },
  gaming: {
    name: 'Gaming',
    description: 'Level up your gaming experience with the best gear.',
    banner: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=1200&q=80',
    subcategories: ['Laptops', 'Keyboards', 'Headsets', 'Monitors', 'Accessories'],
    filterCategory: 'Electronics',
  },
  books: {
    name: 'Books',
    description: 'Find your next great read from our curated collection.',
    banner: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200&q=80',
    subcategories: ['Fiction', 'Non-Fiction', 'Educational', 'Self-Help', 'Comics'],
    filterCategory: '',
  },
  toys: {
    name: 'Toys & Games',
    description: 'Fun and exciting toys for kids of all ages.',
    banner: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=1200&q=80',
    subcategories: ['Board Games', 'Action Figures', 'Puzzles', 'Outdoor Toys', 'Educational'],
    filterCategory: '',
  },
  automotive: {
    name: 'Automotive',
    description: 'Car accessories and maintenance products.',
    banner: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80',
    subcategories: ['Interior', 'Exterior', 'Tools', 'Electronics', 'Maintenance'],
    filterCategory: '',
  },
};

const fallbackMeta = {
  name: 'Products',
  description: 'Explore our collection of high-quality products.',
  banner: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80',
  subcategories: ['Featured', 'New Arrivals', 'Best Sellers', 'Deals'],
  filterCategory: '',
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const meta = categoryMeta[categoryId || ''] || fallbackMeta;
  
  // Get products for this category from the shared product list
  const categoryProducts = meta.filterCategory
    ? shopProducts.filter(p => p.category === meta.filterCategory)
    : shopProducts;

  // Apply filters
  let filtered = categoryProducts.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

  switch (sortBy) {
    case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
    case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
    case 'newest': filtered.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1)); break;
    case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
  }

  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const currentProducts = filtered.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  const handleAddToCart = (product: typeof shopProducts[0]) => {
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = (product: typeof shopProducts[0]) => {
    toast.success(`${product.name} added to wishlist!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Banner */}
      <div className="relative h-48 sm:h-64 rounded-xl overflow-hidden mb-8">
        <img src={meta.banner} alt={meta.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-6 sm:px-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">{meta.name}</h1>
          <p className="text-white text-sm sm:text-lg max-w-xl">{meta.description}</p>
        </div>
      </div>
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-blue-600">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{meta.name}</span>
      </div>
      
      {/* Subcategories */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
        {meta.subcategories.map((sub, i) => (
          <Link 
            key={i} 
            to={`/category/${categoryId}/${sub.toLowerCase().replace(/\s+/g, '-')}`}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors text-sm"
          >
            {sub}
          </Link>
        ))}
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="sticky top-4 space-y-6">
            <div className="bg-white rounded-lg shadow p-5">
              <h3 className="font-medium text-lg mb-4">Price Range</h3>
              <Slider value={priceRange} max={1500} step={10} onValueChange={setPriceRange} className="my-6" />
              <div className="flex items-center justify-between">
                <div className="w-[45%]">
                  <label className="text-xs text-gray-500 mb-1 block">Min</label>
                  <div className="border rounded px-3 py-2 text-sm">${priceRange[0]}</div>
                </div>
                <span className="text-gray-400">-</span>
                <div className="w-[45%]">
                  <label className="text-xs text-gray-500 mb-1 block">Max</label>
                  <div className="border rounded px-3 py-2 text-sm">${priceRange[1]}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-5">
              <h3 className="font-medium text-lg mb-4">Brands</h3>
              <div className="space-y-2">
                {Array.from(new Set(categoryProducts.map(p => p.brand))).map((brand, i) => (
                  <div className="flex items-center" key={i}>
                    <Checkbox id={`brand-cat-${i}`} />
                    <label htmlFor={`brand-cat-${i}`} className="ml-2 text-sm">{brand}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-5">
              <h3 className="font-medium text-lg mb-4">Customer Ratings</h3>
              <div className="space-y-2">
                {[5, 4, 3].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <Checkbox id={`rating-cat-${rating}`} />
                    <label htmlFor={`rating-cat-${rating}`} className="ml-2 text-sm flex items-center">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < rating ? 'fill-yellow-400' : ''}`} />
                        ))}
                      </div>
                      <span>& Up</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Products */}
        <div className="w-full md:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-500">
                Showing {filtered.length > 0 ? (currentPage - 1) * productsPerPage + 1 : 0}-{Math.min(currentPage * productsPerPage, filtered.length)} of {filtered.length} products
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center">
                <span className="text-sm mr-2">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
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
                <button className={`px-3 py-1.5 ${view === 'grid' ? 'bg-gray-100' : ''}`} onClick={() => setView('grid')}>
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button className={`px-3 py-1.5 ${view === 'list' ? 'bg-gray-100' : ''}`} onClick={() => setView('list')}>
                  <LayoutList className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          {view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden group">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Link to={`/products/${product.id}`}>
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
                      </Link>
                      <Button variant="outline" size="sm" className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white" onClick={() => handleAddToWishlist(product)}>
                        <Heart className="h-4 w-4" />
                      </Button>
                      {product.isNew && <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">New</div>}
                      {product.discount > 0 && <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">-{product.discount}%</div>}
                    </div>
                    
                    <div className="p-4">
                      <div className="flex text-yellow-400 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < product.rating ? 'fill-yellow-400' : ''}`} />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                      </div>
                      <Link to={`/products/${product.id}`}>
                        <h3 className="font-medium hover:text-blue-600 line-clamp-2">{product.name}</h3>
                      </Link>
                      <p className="text-sm text-gray-500">{product.brand}</p>
                      
                      <div className="flex items-center mt-2 mb-3">
                        <span className="text-lg font-semibold">{formatCurrency(product.price)}</span>
                        <span className="text-sm text-gray-500 line-through ml-2">{formatCurrency(product.oldPrice)}</span>
                      </div>
                      
                      <Button className="w-full" size="sm" onClick={() => handleAddToCart(product)}>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {currentProducts.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative md:w-1/4">
                        <Link to={`/products/${product.id}`}>
                          <img src={product.image} alt={product.name} className="w-full h-48 md:h-full object-cover rounded" />
                        </Link>
                        <Button variant="outline" size="sm" className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white" onClick={() => handleAddToWishlist(product)}>
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="md:w-3/4">
                        <div className="flex text-yellow-400 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < product.rating ? 'fill-yellow-400' : ''}`} />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">({product.reviews} reviews)</span>
                        </div>
                        <Link to={`/products/${product.id}`}>
                          <h3 className="font-medium text-lg hover:text-blue-600">{product.name}</h3>
                        </Link>
                        <p className="text-sm text-gray-500">{product.brand}</p>
                        <p className="text-gray-600 mt-2 text-sm">
                          A high-quality {product.name.toLowerCase()} from {product.brand}. Perfect for everyday use.
                        </p>
                        
                        <div className="flex items-center mt-2 mb-3">
                          <span className="text-lg font-semibold">{formatCurrency(product.price)}</span>
                          <span className="text-sm text-gray-500 line-through ml-2">{formatCurrency(product.oldPrice)}</span>
                          <span className="text-xs text-green-600 ml-2">-{product.discount}% OFF</span>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/products/${product.id}`}>View Details</Link>
                          </Button>
                          <Button size="sm" onClick={() => handleAddToCart(product)}>
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {filtered.length === 0 && (
            <div className="py-10 text-center">
              <p className="text-gray-500">No products found in this category.</p>
              <Button variant="outline" className="mt-4" onClick={() => setPriceRange([0, 1500])}>Reset Filters</Button>
            </div>
          )}
          
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-1">
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>Previous</Button>
                {[...Array(Math.min(totalPages, 5))].map((_, i) => (
                  <Button 
                    key={i} variant="outline" size="sm"
                    className={`w-9 h-9 ${currentPage === i + 1 ? 'bg-blue-50 border-blue-200' : ''}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >{i + 1}</Button>
                ))}
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</Button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
