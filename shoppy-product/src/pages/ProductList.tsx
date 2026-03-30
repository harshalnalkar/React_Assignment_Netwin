import { useState, useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import { ProductCard } from '../components/ProductCard';
import { Search, Filter, SlidersHorizontal, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const ITEMS_PER_PAGE = 8;

export default function ProductList() {
  const { products, categories, loading, error } = useProducts();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating' | 'default'>('default');

  const debouncedSearch = useDebounce(search, 300);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (debouncedSearch) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    return result;
  }, [products, debouncedSearch, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
        <p className="text-gray-500 font-medium">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500">
          <Filter className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Oops! Something went wrong</h2>
        <p className="text-gray-500 max-w-md">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-black text-white rounded-full font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>
          <p className="text-gray-500">Showing {filteredProducts.length} results</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all w-full sm:w-64"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-all appearance-none cursor-pointer"
          >
            <option value="default">Sort by: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            setSelectedCategory(null);
            setCurrentPage(1);
          }}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all border",
            selectedCategory === null
              ? "bg-black text-white border-black"
              : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
          )}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all border capitalize",
              selectedCategory === cat
                ? "bg-black text-white border-black"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-20 text-center space-y-4">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filters.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-10 border-t border-gray-100">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={cn(
                  "w-10 h-10 rounded-full text-sm font-bold transition-all",
                  currentPage === i + 1
                    ? "bg-black text-white"
                    : "text-gray-500 hover:bg-gray-50"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
