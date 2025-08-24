import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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
import { toast } from 'sonner';
import { useProducts } from '@/hooks/useProducts';

const productsData = [
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
    category: "Beauty",
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
    category: "Home",
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
    category: "Electronics",
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
    category: "Electronics",
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
    category: "Fashion",
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
    category: "Home",
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
    category: "Fashion",
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
    category: "Electronics",
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
    category: "Home",
  },
];

const categories = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'home', name: 'Home & Kitchen' },
  { id: 'beauty', name: 'Beauty & Personal Care' },
  { id: 'sports', name: 'Sports & Outdoors' },
];

const brands = [
  { id: 'saltform', name: 'SaltForm' },
  { id: 'design-denmark', name: 'Design Denmark' },
  { id: 'gadgetpro', name: 'GadgetPro' },
  { id: 'audiotech', name: 'AudioTech' },
  { id: 'leathercraft', name: 'LeatherCraft' },
  { id: 'ecolife', name: 'EcoLife' },
  { id: 'ecowear', name: 'EcoWear' },
  { id: 'soundwave', name: 'SoundWave' },
  { id: 'homestyle', name: 'HomeStyle' },
];

const Shop = () => {
  const { products: apiProducts, loading } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState<'grid' | 'list'>(searchParams.get('view') as 'grid' | 'list' || 'grid');
  const [priceRange, setPriceRange] = useState([
    parseInt(searchParams.get('minPrice') || '0'),
    parseInt(searchParams.get('maxPrice') || '300')
  ]);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'featured');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('categories')?.split(',') || []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.get('brands')?.split(',') || []
  );
  const [minRating, setMinRating] = useState<number>(
    parseInt(searchParams.get('rating') || '0')
  );
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
  const productsPerPage = 9;
  
  // Use API products if available, otherwise fallback to static data
  const allProducts = apiProducts.length > 0 ? apiProducts : productsData;
  
  useEffect(() => {
    let filtered = [...allProducts];
    
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category.toLowerCase())
      );
    }
    
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        selectedBrands.includes(product.brand.toLowerCase().replace(/\s+/g, '-'))
      );
    }
    
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    if (minRating > 0) {
      filtered = filtered.filter(product => product.rating >= minRating);
    }
    
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => {
          const aIsNew = (a as any).isNew || false;
          const bIsNew = (b as any).isNew || false;
          return (aIsNew === bIsNew) ? 0 : aIsNew ? -1 : 1;
        });
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        break;
    }
    
    setFilteredProducts(filtered as any);
    
    const params: Record<string, string> = {};
    
    if (view !== 'grid') params.view = view;
    if (priceRange[0] > 0) params.minPrice = priceRange[0].toString();
    if (priceRange[1] < 300) params.maxPrice = priceRange[1].toString();
    if (sortBy !== 'featured') params.sort = sortBy;
    if (selectedCategories.length > 0) params.categories = selectedCategories.join(',');
    if (selectedBrands.length > 0) params.brands = selectedBrands.join(',');
    if (minRating > 0) params.rating = minRating.toString();
    if (currentPage > 1) params.page = currentPage.toString();
    
    setSearchParams(params);
  }, [view, priceRange, sortBy, selectedCategories, selectedBrands, minRating, currentPage, allProducts]);
  
  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories(prev => {
      if (checked) {
        return [...prev, category];
      } else {
        return prev.filter(c => c !== category);
      }
    });
  };
  
  const handleBrandChange = (brand: string, checked: boolean) => {
    setSelectedBrands(prev => {
      if (checked) {
        return [...prev, brand];
      } else {
        return prev.filter(b => b !== brand);
      }
    });
  };
  
  const handleRatingChange = (rating: number, checked: boolean) => {
    if (checked) {
      setMinRating(rating);
    } else if (minRating === rating) {
      setMinRating(0);
    }
  };
  
  const handleAddToCart = (productId: number) => {
    toast.success("Product added to cart successfully");
  };
  
  const handleAddToWishlist = (productId: number) => {
    toast.success("Product added to wishlist");
  };
  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <div className="sticky top-4 space-y-6">
            <div className="bg-white rounded-lg shadow p-5">
              <h3 className="font-medium text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox 
                      id={`cat-${category.id}`} 
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={(checked) => 
                        handleCategoryChange(category.id, checked === true)
                      }
                    />
                    <label htmlFor={`cat-${category.id}`} className="ml-2 text-sm">
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
              <Button variant="link" className="mt-2 px-0 text-sm text-blue-600">
                Show more
              </Button>
            </div>
            
            <div className="bg-white rounded-lg shadow p-5">
              <h3 className="font-medium text-lg mb-4">Price Range</h3>
              <Slider 
                value={priceRange} 
                max={500} 
                step={10}
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
                {[5, 4, 3].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <Checkbox 
                      id={`rating-${rating}`}
                      checked={minRating === rating}
                      onCheckedChange={(checked) => 
                        handleRatingChange(rating, checked === true)
                      }
                    />
                    <label htmlFor={`rating-${rating}`} className="ml-2 text-sm flex items-center">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < rating ? 'fill-yellow-400' : ''}`} 
                          />
                        ))}
                      </div>
                      <span>& Up</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-5">
              <h3 className="font-medium text-lg mb-4">Brands</h3>
              <div className="space-y-2">
                {brands.slice(0, 5).map((brand) => (
                  <div key={brand.id} className="flex items-center">
                    <Checkbox 
                      id={`brand-${brand.id}`}
                      checked={selectedBrands.includes(brand.id)}
                      onCheckedChange={(checked) => 
                        handleBrandChange(brand.id, checked === true)
                      }
                    />
                    <label htmlFor={`brand-${brand.id}`} className="ml-2 text-sm">{brand.name}</label>
                  </div>
                ))}
              </div>
              <Button variant="link" className="mt-2 px-0 text-sm text-blue-600">
                Show more
              </Button>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-500">
                Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
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
          
          {view === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
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
                          onClick={() => handleAddToWishlist(product.id)}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        {(product as any).isNew && (
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
                         <span className="text-sm text-gray-500 line-through ml-2">{formatCurrency((product as any).oldPrice || 0)}</span>
                         <span className="text-xs text-green-600 ml-2">-{(product as any).discount || 0}% OFF</span>
                       </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Link to={`/products/${product.id}`}>View Details</Link>
                        </Button>
                        <Button 
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => handleAddToCart(product.id)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 py-10 text-center">
                  <p className="text-gray-500">No products match your filters.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedBrands([]);
                      setPriceRange([0, 300]);
                      setMinRating(0);
                      setSortBy('featured');
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {view === 'list' && (
            <div className="space-y-4">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
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
                            onClick={() => handleAddToWishlist(product.id)}
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                          {(product as any).isNew && (
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
                            A high-quality {product.name.toLowerCase()} from {product.brand}. 
                            Perfect for everyday use with excellent customer reviews.
                          </p>
                          
                           <div className="flex items-center mb-3">
                             <span className="text-lg font-semibold">{formatCurrency(product.price)}</span>
                             <span className="text-sm text-gray-500 line-through ml-2">{formatCurrency((product as any).oldPrice || 0)}</span>
                             <span className="text-xs text-green-600 ml-2">-{(product as any).discount || 0}% OFF</span>
                           </div>
                          
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Link to={`/products/${product.id}`}>View Details</Link>
                            </Button>
                            <Button 
                              className="bg-green-500 hover:bg-green-600"
                              onClick={() => handleAddToCart(product.id)}
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add to cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="py-10 text-center">
                  <p className="text-gray-500">No products match your filters.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedBrands([]);
                      setPriceRange([0, 300]);
                      setMinRating(0);
                      setSortBy('featured');
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {filteredProducts.length > 0 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="px-2"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <Button 
                      key={i}
                      variant="outline" 
                      size="sm" 
                      className={`w-9 h-9 ${
                        currentPage === pageNumber 
                          ? 'bg-emerald-50 border-emerald-200' 
                          : ''
                      }`}
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="px-2"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
