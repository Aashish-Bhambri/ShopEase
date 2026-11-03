import React from 'react';
import { SlidersHorizontal, X, ArrowLeft, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';

const ShopProducts = ({
  category,
  setCategory,
  search,
  productRes,
  isLoading,
  error,
  sortBy,
  setSortBy,
  range,
  setRange,
  filterBrand,
  setFilterBrand,
  totalCount,
  currentPage,
  totalPages,
  setCurrentPage,
  onOpenMobileFilters,
}) => {
  const hasActiveFilters = Boolean(category || filterBrand || range < 5000 || search);

  const handleClearAll = () => {
    setCategory('');
    setFilterBrand('');
    setRange(5000);
    setCurrentPage(1);
  };

  return (
    <main className="min-w-0 flex-1 px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Bar: Title, Count, Filters Trigger, Sort */}
      <div className="flex flex-col gap-4 pb-6 border-b border-gray-200 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {search ? `Search results for “${search}”` : category || 'All Products'}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            {isLoading
              ? 'Fetching products...'
              : `Showing ${productRes.length} of ${totalCount || productRes.length} items`}
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Mobile filter button */}
          <button
            type="button"
            onClick={onOpenMobileFilters}
            className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs font-semibold text-gray-800 shadow-xs hover:bg-gray-50 md:hidden cursor-pointer"
          >
            <SlidersHorizontal size={14} />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
                !
              </span>
            )}
          </button>

          {/* Sort By Select */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs font-semibold text-gray-600 hidden sm:inline">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-800 focus:border-black focus:outline-hidden shadow-xs cursor-pointer"
            >
              <option value="">Featured / Latest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Customer Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 py-4">
          <span className="text-xs font-semibold text-gray-400">Active filters:</span>

          {category && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
              Category: {category}
              <button
                type="button"
                onClick={() => setCategory('')}
                className="hover:text-black"
                aria-label="Remove category filter"
              >
                <X size={13} />
              </button>
            </span>
          )}

          {filterBrand && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
              Brand: {filterBrand}
              <button
                type="button"
                onClick={() => setFilterBrand('')}
                className="hover:text-black"
                aria-label="Remove brand filter"
              >
                <X size={13} />
              </button>
            </span>
          )}

          {range < 5000 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
              Under ${range}
              <button
                type="button"
                onClick={() => setRange(5000)}
                className="hover:text-black"
                aria-label="Remove price filter"
              >
                <X size={13} />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={handleClearAll}
            className="text-xs font-bold text-gray-900 underline hover:text-gray-600 ml-1 cursor-pointer"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Products Content */}
      {error ? (
        <div role="alert" className="my-12 rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
          <p className="font-semibold">{error}</p>
          <button
            type="button"
            onClick={handleClearAll}
            className="mt-3 text-xs font-bold underline"
          >
            Reset Filters
          </button>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-80 rounded-2xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : productRes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productRes.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex h-9 items-center gap-1 rounded-xl border border-gray-300 bg-white px-3 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40"
              >
                <ArrowLeft size={14} />
                <span>Prev</span>
              </button>

              {[...Array(totalPages)].map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => {
                      setCurrentPage(pageNum);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`h-9 w-9 rounded-xl text-xs font-bold transition ${
                      currentPage === pageNum
                        ? 'bg-black text-white shadow-xs'
                        : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex h-9 items-center gap-1 rounded-xl border border-gray-300 bg-white px-3 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40"
              >
                <span>Next</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="my-16 rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center max-w-lg mx-auto">
          <p className="text-lg font-bold text-gray-900">No products found</p>
          <p className="mt-1 text-sm text-gray-500">
            {search
              ? `No items match “${search}”. Try different keywords.`
              : 'No items match your selected filters. Try broadening your criteria.'}
          </p>
          <button
            type="button"
            onClick={handleClearAll}
            className="mt-6 inline-flex rounded-xl bg-black px-5 py-2.5 text-xs font-bold text-white transition hover:bg-gray-800"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </main>
  );
};

export default ShopProducts;
