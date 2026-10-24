import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ShoppingBag,
  SlidersHorizontal,
  Plus,
  MessageCircle,
  X,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './HomePage';
import { formatNaira } from '../utils/format';

interface ShopPageProps {
  onNavigate: (page: string, params?: any) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onNavigate,
  searchQuery,
  onSearchChange,
}) => {
  const { products, settings, isAdmin, addToCart } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');

  // Categories list derived from store settings + existing products
  const categories = useMemo(() => {
    const list = new Set<string>();
    settings.categories.forEach((c) => list.add(c));
    products.forEach((p) => {
      if (p.category) list.add(p.category);
    });
    return ['All', ...Array.from(list)];
  }, [settings.categories, products]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.sku && p.sku.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Availability filter
    if (selectedAvailability !== 'All') {
      result = result.filter((p) => p.availability === selectedAvailability);
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => {
        const priceA = a.discountedPrice || a.price;
        const priceB = b.discountedPrice || b.price;
        return priceA - priceB;
      });
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => {
        const priceA = a.discountedPrice || a.price;
        const priceB = b.discountedPrice || b.price;
        return priceB - priceA;
      });
    } else {
      // Newest
      result.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );
    }

    return result;
  }, [products, searchQuery, selectedCategory, selectedAvailability, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Store Catalogue</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a1931]">
            Shop Our Products
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Browse genuine products available from chrisAkons in Owerri, Nigeria. All prices in Naira (₦). Direct WhatsApp order confirmation.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => onNavigate('admin', { tab: 'products' })}
            className="px-5 py-2.5 rounded-xl bg-[#0a1931] hover:bg-[#12284c] text-white text-xs font-bold shadow-md transition flex items-center gap-2 self-start md:self-auto"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add New Product</span>
          </button>
        )}
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        {/* Search bar inside shop */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search by product name, description, SKU..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Category:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
                  isSelected
                    ? 'bg-[#0a1931] text-amber-400 font-bold shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Secondary Filters: Availability & Sort By */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Availability:</span>
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 font-medium focus:outline-none focus:border-amber-500"
            >
              <option value="All">All Statuses</option>
              <option value="Available">Available in Stock</option>
              <option value="Pre-order">Pre-order</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 font-medium focus:outline-none focus:border-amber-500"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Result Status Bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-900">{filteredProducts.length}</strong> of{' '}
          {products.length} products
        </span>
        {(selectedCategory !== 'All' || selectedAvailability !== 'All' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedAvailability('All');
              onSearchChange('');
            }}
            className="text-amber-600 hover:underline font-semibold"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center max-w-xl mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-bold text-[#0a1931] mb-2">
            {products.length === 0
              ? 'No Products Added Yet'
              : 'No Products Match Your Criteria'}
          </h3>

          <p className="text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
            {products.length === 0
              ? 'The store inventory is currently empty until products are published in the admin dashboard. You can order or request specific products directly on WhatsApp.'
              : 'Try adjusting your search terms, selecting "All" categories, or resetting the filters.'}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={settings.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire on WhatsApp</span>
            </a>

            {isAdmin && (
              <button
                onClick={() => onNavigate('admin', { tab: 'products' })}
                className="px-5 py-2.5 rounded-xl bg-[#0a1931] text-white font-semibold text-xs transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Add Product</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={() => onNavigate('product-detail', { id: product.id })}
              onAddToCart={() => addToCart(product, 1)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
