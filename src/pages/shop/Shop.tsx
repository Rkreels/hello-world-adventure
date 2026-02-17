import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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
import { shopProducts, shopBrands, shopCategories } from '@/data/shopProducts';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState<'grid' | 'list'>(searchParams.get('view') as 'grid' | 'list' || 'grid');
  const [priceRange, setPriceRange] = useState([
    parseInt(searchParams.get('minPrice') || '0'),
    parseInt(searchParams.get('maxPrice') || '1500')
  ]);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'featured');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('categories')?.split(',').filter(Boolean) || []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.get('brands')?.split(',').filter(Boolean) || []
  );
  const [minRating, setMinRating] = useState<number>(
    parseInt(searchParams.get('rating') || '0')
  );
  const [filteredProducts, setFilteredProducts] = useState(shopProducts);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
  const productsPerPage = 12;
  
  useEffect(() => {
    let filtered = [...shopProducts];
    
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
        filtered.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    setFilteredProducts(filtered);
    
    const params: Record<string, string> = {};
    if (view !== 'grid') params.view = view;
    if (priceRange[0] > 0) params.minPrice = priceRange[0].toString();
    if (priceRange[1] < 1500) params.maxPrice = priceRange[1].toString();
    if (sortBy !== 'featured') params.sort = sortBy;
    if (selectedCategories.length > 0) params.categories = selectedCategories.join(',');
    if (selectedBrands.length > 0) params.brands = selectedBrands.join(',');
    if (minRating > 0) params.rating = minRating.toString();
    if (currentPage > 1) params.page = currentPage.toString();
    
    setSearchParams(params);
  }, [view, priceRange, sortBy, selectedCategories, selectedBrands, minRating, currentPage]);
  
  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories(prev => checked ? [...prev, category] : prev.filter(c => c !== category));
    setCurrentPage(1);
  };
  
  const handleBrandChange = (brand: string, checked: boolean) => {
    setSelectedBrands(prev => checked ? [...prev, brand] : prev.filter(b => b !== brand));
    setCurrentPage(1);
  };
  
  const handleRatingChange = (rating: number, checked: boolean) => {
    setMinRating(checked ? rating : 0);
    setCurrentPage(1);
  };
  
  const handleAddToCart = (product: typeof shopProducts[0]) => {
    toast.success(`${product.name} added to cart!`);
  };
  
  const handleAddToWishlist = (product: typeof shopProducts[0]) => {
    toast.success(`${product.name} added to wishlist!`);
  };
  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  const [showAllBrands, setShowAllBrands] = useState(false);
  const visibleBrands = showAllBrands ? shopBrands : shopBrands.slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-1/4">
          <div className="sticky top-4 space-y-6">
            <div className="bg-white rounded-lg shadow p-5">
              <h3 className="font-medium text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                {shopCategories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox 
                      id={`cat-${category.id}`} 
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={(checked) => handleCategoryChange(category.id, checked === true)}
                    />
                    <label htmlFor={`cat-${category.id}`} className="ml-2 text-sm">{category.name}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-5">
              <h3 className="font-medium text-lg mb-4">Price Range</h3>
              <Slider 
                value={priceRange} 
                max={1500} 
                step={10}
                onValueChange={setPriceRange}
                className="my-6"
              />
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
              <h3 className="font-medium text-lg mb-4">Customer Ratings</h3>
              <div className="space-y-2">
                {[5, 4, 3].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <Checkbox 
                      id={`rating-${rating}`}
                      checked={minRating === rating}
                      onCheckedChange={(checked) => handleRatingChange(rating, checked === true)}
                    />
                    <label htmlFor={`rating-${rating}`} className="ml-2 text-sm flex items-center">
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
            
            <div className="bg-white rounded-lg shadow p-5">
              <h3 className="font-medium text-lg mb-4">Brands</h3>
              <div className="space-y-2">
                {visibleBrands.map((brand) => (
                  <div key={brand.id} className="flex items-center">
                    <Checkbox 
                      id={`brand-${brand.id}`}
                      checked={selectedBrands.includes(brand.id)}
                      onCheckedChange={(checked) => handleBrandChange(brand.id, checked === true)}
                    />
                    <label htmlFor={`brand-${brand.id}`} className="ml-2 text-sm">{brand.name}</label>
                  </div>
                ))}
              </div>
              <Button variant="link" className="mt-2 px-0 text-sm text-blue-600" onClick={() => setShowAllBrands(!showAllBrands)}>
                {showAllBrands ? 'Show less' : `Show all (${shopBrands.length})`}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Products */}
        <div className="w-full md:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-500">
                Showing {filteredProducts.length > 0 ? indexOfFirstProduct + 1 : 0}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
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
          
          {view === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden group">
                    <CardContent className="p-0">
                      <div className="relative">
                        <Link to={`/products/${product.id}`}>
                          <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
                        </Link>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
                          onClick={() => handleAddToWishlist(product)}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        {product.isNew && (
                          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">New</div>
                        )}
                        {product.discount > 0 && (
                          <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">-{product.discount}%</div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <div className="flex text-yellow-400 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < product.rating ? 'fill-yellow-400' : ''}`} />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                        </div>
                        <Link to={`/products/${product.id}`}>
                          <h3 className="font-medium hover:text-blue-600 transition-colors line-clamp-2">{product.name}</h3>
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
                ))
              ) : (
                <div className="col-span-3 py-10 text-center">
                  <p className="text-gray-500">No products match your filters.</p>
                  <Button variant="outline" className="mt-4" onClick={() => {
                    setSelectedCategories([]);
                    setSelectedBrands([]);
                    setPriceRange([0, 1500]);
                    setMinRating(0);
                    setSortBy('featured');
                  }}>
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
                          <Link to={`/products/${product.id}`}>
                            <img src={product.image} alt={product.name} className="w-full h-48 md:h-full object-cover rounded" />
                          </Link>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white"
                            onClick={() => handleAddToWishlist(product)}
                          >
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
                            A high-quality {product.name.toLowerCase()} from {product.brand}. Perfect for everyday use with excellent customer reviews.
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
                ))
              ) : (
                <div className="py-10 text-center">
                  <p className="text-gray-500">No products match your filters.</p>
                  <Button variant="outline" className="mt-4" onClick={() => {
                    setSelectedCategories([]);
                    setSelectedBrands([]);
                    setPriceRange([0, 1500]);
                    setMinRating(0);
                    setSortBy('featured');
                  }}>
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-1">
                <Button variant="outline" size="sm" className="px-2" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
                  Previous
                </Button>
                {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <Button 
                      key={i}
                      variant="outline" 
                      size="sm" 
                      className={`w-9 h-9 ${currentPage === pageNumber ? 'bg-emerald-50 border-emerald-200' : ''}`}
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
                <Button variant="outline" size="sm" className="px-2" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
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
