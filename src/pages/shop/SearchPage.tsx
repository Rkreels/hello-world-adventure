import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Filter, SortAsc, SortDesc } from 'lucide-react';
import ProductCard from '@/components/shop/ProductCard';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

// Mock product type
interface Product {
  id: number;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  rating: number;
  reviewsCount: number;
  category: string;
  inStock: boolean;
}

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOption, setSortOption] = useState<string>('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Fetch products on component mount and when search query changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      
      try {
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate mock products
        const mockProducts: Product[] = Array.from({ length: 50 }, (_, i) => {
          const categories = ['Electronics', 'Clothing', 'Home', 'Sports', 'Beauty'];
          const category = categories[Math.floor(Math.random() * categories.length)];
          const price = Math.floor(Math.random() * 900) + 100;
          const hasDiscount = Math.random() > 0.5;
          
          return {
            id: i + 1,
            name: `Product ${i + 1} ${query ? `matching "${query}"` : ''}`,
            price,
            discountPrice: hasDiscount ? Math.floor(price * 0.8) : undefined,
            image: 'https://placehold.co/300x300',
            rating: Math.floor(Math.random() * 5) + 1,
            reviewsCount: Math.floor(Math.random() * 500),
            category,
            inStock: Math.random() > 0.2,
          };
        });
        
        setProducts(mockProducts);
        
        // Get unique categories
        const uniqueCategories = [...new Set(mockProducts.map(product => product.category))];
        setCategories(uniqueCategories);
        
        // Apply initial filters
        filterAndSortProducts(mockProducts, selectedCategories, priceRange, sortOption);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [query]);

  // Filter and sort products
  const filterAndSortProducts = (
    productsList: Product[], 
    categories: string[], 
    price: [number, number], 
    sort: string
  ) => {
    // Apply filters
    let filtered = productsList;
    
    if (categories.length > 0) {
      filtered = filtered.filter(product => categories.includes(product.category));
    }
    
    filtered = filtered.filter(product => {
      const productPrice = product.discountPrice || product.price;
      return productPrice >= price[0] && productPrice <= price[1];
    });
    
    // Apply sorting
    switch (sort) {
      case 'price-asc':
        filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price-desc':
        filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'relevance':
      default:
        // Keep default order (relevance based on query match)
        break;
    }
    
    setFilteredProducts(filtered);
  };

  // Handle filter changes
  const handleCategoryChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(updatedCategories);
    filterAndSortProducts(products, updatedCategories, priceRange, sortOption);
  };

  const handlePriceChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setPriceRange(newRange);
    filterAndSortProducts(products, selectedCategories, newRange, sortOption);
  };

  const handleSortChange = (sort: string) => {
    setSortOption(sort);
    filterAndSortProducts(products, selectedCategories, priceRange, sort);
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {query ? `Search Results for "${query}"` : 'All Products'}
      </h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">Filters</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 1000]);
                    filterAndSortProducts(products, [], [0, 1000], sortOption);
                  }}
                >
                  Reset
                </Button>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Price Range</h3>
                <Slider
                  defaultValue={[0, 1000]}
                  min={0}
                  max={1000}
                  step={10}
                  value={[priceRange[0], priceRange[1]]}
                  onValueChange={handlePriceChange}
                />
                <div className="flex justify-between mt-2 text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              {/* Availability */}
              <div>
                <h3 className="font-medium mb-2">Availability</h3>
                <div className="flex items-center">
                  <Checkbox id="inStock" />
                  <label
                    htmlFor="inStock"
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    In Stock Only
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort and Result Count */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <p className="text-sm text-gray-600 mb-4 sm:mb-0">
              {filteredProducts.length} products found
            </p>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium mr-2">Sort by:</span>
              <select
                className="text-sm border rounded-md p-2"
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="relevance">Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-10 w-10 animate-spin text-green-600" />
            </div>
          ) : currentProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg font-medium">No products found</p>
              <p className="text-gray-600">Try changing your filters or search query</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              <div className="mt-10">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }).map((_, index) => {
                      // Show only a limited number of pages
                      if (
                        index === 0 ||
                        index === totalPages - 1 ||
                        (index >= currentPage - 2 && index <= currentPage + 2)
                      ) {
                        return (
                          <PaginationItem key={index}>
                            <PaginationLink
                              isActive={currentPage === index + 1}
                              onClick={() => paginate(index + 1)}
                            >
                              {index + 1}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                      
                      // Show ellipsis
                      if (index === currentPage - 3 || index === currentPage + 3) {
                        return (
                          <PaginationItem key={index}>
                            <span className="flex h-9 w-9 items-center justify-center text-sm">
                              ...
                            </span>
                          </PaginationItem>
                        );
                      }
                      
                      return null;
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
