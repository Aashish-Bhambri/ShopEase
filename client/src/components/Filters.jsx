import React, { useState, useEffect } from 'react';
import { RotateCcw, X, SlidersHorizontal } from 'lucide-react';

const Filters = ({
  category,
  setCategory,
  range,
  setRange,
  filterBrand,
  setFilterBrand,
  brands = [],
  onCloseMobile,
}) => {
  const [draftRange, setDraftRange] = useState(range);

  useEffect(() => {
    setDraftRange(range);
  }, [range]);

  const categories = [
    "Men's Fashion",
    "Women's Fashion",
    "Electronics",
    "Home & Living",
    "Beauty & Personal Care",
    "Sports & Outdoors",
  ];

  const categoryBrands = brands.find((item) => item.id === category)?.brand ?? [];

  const hasActiveFilters = Boolean(category || filterBrand || range < 5000);

  const handleReset = () => {
    setCategory('');
    setFilterBrand('');
    setRange(5000);
    setDraftRange(5000);
  };

  return (
    <div className="flex flex-col p-6 w-full bg-white gap-6">
      {/* Header section */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-gray-900" />
          <h2 className="font-bold text-xl text-gray-900 tracking-tight">Filters</h2>
        </div>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-gray-500 hover:text-black flex items-center gap-1 transition"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          )}

          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-gray-500 hover:bg-gray-100 md:hidden"
              aria-label="Close filters"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Categories segment */}
      <div className="flex flex-col gap-3">
        <span className="text-sm font-bold uppercase tracking-wider text-gray-900">
          Category
        </span>
        <div className="flex flex-col gap-2.5">
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-3 cursor-pointer group select-none text-sm"
            >
              <input
                className="h-4 w-4 accent-black cursor-pointer rounded"
                type="checkbox"
                value={cat}
                checked={category === cat}
                onChange={(e) => {
                  setCategory(category === cat ? '' : e.target.value);
                  setFilterBrand('');
                }}
              />
              <span
                className={`font-medium transition-colors ${
                  category === cat
                    ? 'text-black font-bold'
                    : 'text-gray-600 group-hover:text-black'
                }`}
              >
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Price Slider Component */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold uppercase tracking-wider text-gray-900">
            Price Ceiling
          </span>
          <span className="text-sm font-bold text-black">${draftRange}</span>
        </div>

        <input
          className="w-full accent-black cursor-pointer h-2 bg-gray-200 rounded-lg appearance-none"
          type="range"
          min={30}
          max={5000}
          step={10}
          value={draftRange}
          onChange={(e) => setDraftRange(Number(e.target.value))}
        />

        <div className="flex justify-between w-full text-xs font-semibold text-gray-400">
          <span>Min: $30</span>
          <span>Max: $5000</span>
        </div>

        <button
          type="button"
          onClick={() => {
            setRange(draftRange);
            if (onCloseMobile) onCloseMobile();
          }}
          className="w-full bg-black hover:bg-gray-800 transition-colors font-semibold rounded-xl text-white py-2.5 mt-1 text-xs shadow-xs"
        >
          Apply Price Filter
        </button>
      </div>

      <hr className="border-gray-200" />

      {/* Brands segment */}
      <div className="flex flex-col gap-3 pb-4">
        <span className="text-sm font-bold uppercase tracking-wider text-gray-900">
          Brand
        </span>

        <div className="flex flex-col gap-2.5">
          {categoryBrands.length > 0 ? (
            categoryBrands.map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 cursor-pointer group select-none text-sm"
              >
                <input
                  type="checkbox"
                  value={item}
                  checked={filterBrand === item}
                  className="h-4 w-4 accent-black cursor-pointer rounded"
                  onChange={(e) =>
                    setFilterBrand(filterBrand === item ? '' : e.target.value)
                  }
                />
                <span
                  className={`font-medium transition-colors ${
                    filterBrand === item
                      ? 'text-black font-bold'
                      : 'text-gray-600 group-hover:text-black'
                  }`}
                >
                  {item}
                </span>
              </label>
            ))
          ) : (
            <p className="text-xs text-gray-400 italic">
              Select a category above to view available brands.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
