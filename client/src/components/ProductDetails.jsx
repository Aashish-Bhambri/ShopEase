import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Star,
  ShoppingCart,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../app/feature/cartSlice';
import api from '../services/api';

// Comprehensive color mapping for products
const getColorHex = (name = '') => {
  const map = {
    white: '#FFFFFF',
    sand: '#D4B996',
    sage: '#9CAF88',
    terracotta: '#E07A5F',
    cream: '#FBF8F3',
    black: '#15191D',
    grey: '#9CA3AF',
    gray: '#9CA3AF',
    navy: '#1E3A8A',
    blue: '#3B82F6',
    red: '#EF4444',
    green: '#10B981',
    olive: '#556B2F',
    brown: '#8B5A2B',
    beige: '#E5DCC5',
    tan: '#D2B48C',
    silver: '#E5E7EB',
    gold: '#F59E0B',
    yellow: '#FBBF24',
    pink: '#EC4899',
    purple: '#8B5CF6',
    orange: '#F97316',
    clear: '#F3F4F6',
    amber: '#D97706',
    rust: '#B45309',
    forest: '#1E4620',
    mint: '#A7F3D0',
  };
  return map[name.toLowerCase().trim()] || '#D1D5DB';
};

const ProductDetails = () => {
  const { id, slug } = useParams();
  const productParam = id || slug;

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Interactive UI states
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [addedNotice, setAddedNotice] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    let isCurrent = true;
    setIsLoading(true);
    setError('');

    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${productParam}`);
        if (!response.data?.product) {
          throw new Error('Product not found');
        }
        if (isCurrent) {
          const item = response.data.product;
          setProduct(item);

          // Initialize color & size selections
          if (Array.isArray(item.colors) && item.colors.length > 0) {
            setSelectedColor(item.colors[0]);
          } else {
            setSelectedColor('');
          }

          if (Array.isArray(item.sizes) && item.sizes.length > 0) {
            setSelectedSize(item.sizes[0]);
          } else {
            setSelectedSize('');
          }

          setSelectedImageIndex(0);
          setQuantity(1);
        }
      } catch (err) {
        if (isCurrent) {
          console.error('Error fetching product details:', err);
          setError('Product could not be loaded.');
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    };

    fetchProduct();
    return () => {
      isCurrent = false;
    };
  }, [productParam]);

  // Loading skeleton
  if (isLoading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-4 w-48 rounded bg-gray-200" />
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7 flex gap-4">
              <div className="hidden sm:flex flex-col gap-3 w-20">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square rounded-xl bg-gray-200" />
                ))}
              </div>
              <div className="aspect-square flex-1 rounded-2xl bg-gray-200" />
            </div>
            <div className="lg:col-span-5 space-y-4 pt-4">
              <div className="h-8 w-3/4 rounded bg-gray-200" />
              <div className="h-5 w-1/4 rounded bg-gray-200" />
              <div className="h-8 w-1/3 rounded bg-gray-200" />
              <div className="h-20 w-full rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error / Not found state
  if (error || !product) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Product Not Found</h2>
        <p className="mt-3 text-gray-600">
          The product you requested could not be located.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
        >
          Return to Shop
        </Link>
      </main>
    );
  }

  const currency = product.currency || 'USD';
  const formatPrice = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(amount);

  // Gallery: Ensure 4-5 thumbnails for high-fidelity showcase matching
  const primaryImage = product.image;
  const rawImages =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [primaryImage];
  const galleryImages =
    rawImages.length >= 4
      ? rawImages
      : [
        ...rawImages,
        ...Array(Math.max(0, 4 - rawImages.length)).fill(primaryImage),
      ];

  const currentDisplayImage = galleryImages[selectedImageIndex] || primaryImage;

  const availableSizes =
    Array.isArray(product.sizes) && product.sizes.length > 0
      ? product.sizes
      : [];

  const availableColors =
    Array.isArray(product.colors) && product.colors.length > 0
      ? product.colors
      : [];

  const handleAddToCart = () => {
    if (product.inStock === false) return;

    dispatch(
      addToCart({
        ...product,
        quantity,
        selectedColor,
        selectedSize,
      })
    );

    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
    }, 2200);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* 1. Breadcrumb navigation */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-gray-500"
      >
        <Link to="/" className="hover:text-gray-900 transition-colors">
          Home
        </Link>
        <ChevronRight size={14} className="text-gray-400" />
        <Link
          to={`/shop?category=${encodeURIComponent(product.category || '')}`}
          className="hover:text-gray-900 transition-colors"
        >
          {product.category || 'Shop'}
        </Link>
        <ChevronRight size={14} className="text-gray-400" />
        <span className="font-semibold text-gray-900 truncate max-w-[200px] sm:max-w-md">
          {product.name}
        </span>
      </nav>

      {/* 2. Main Product Section (2 Columns) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 flex flex-col-reverse gap-4 sm:flex-row">
          {/* Vertical Thumbnail Stack */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
            {galleryImages.slice(0, 5).map((imgUrl, index) => {
              const isSelected = selectedImageIndex === index;
              return (
                <button
                  key={`thumb-${index}`}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative aspect-square w-16 sm:w-20 overflow-hidden rounded-xl bg-[#F3F4F5] p-1.5 transition-all focus:outline-none ${isSelected
                      ? 'border-2 border-black ring-1 ring-black/10 shadow-xs'
                      : 'border-2 border-transparent hover:border-gray-300'
                    }`}
                  aria-label={`View thumbnail ${index + 1}`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="h-full w-full object-cover rounded-lg"
                  />
                </button>
              );
            })}
          </div>

          {/* Large Main Display Image */}
          <div className="relative aspect-square flex-1 overflow-hidden rounded-2xl bg-[#F3F4F5] flex items-center justify-center p-6 sm:p-12">
            <img
              src={currentDisplayImage}
              alt={product.name}
              className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
            />

            {product.featured && (
              <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-900 shadow-xs">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Details & Actions */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          {/* Brand & Title */}
          <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
            {product.brand}
          </div>
          <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111820]">
            {product.name}
          </h1>

          {/* Rating & Review Counter */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-[#F59E0B] text-[#F59E0B]" />
              <span className="text-sm font-bold text-[#111820]">
                {product.rating || '4.5'}
              </span>
            </div>
            <span className="text-xs text-gray-500 font-medium">
              ({product.reviewCount ? Number(product.reviewCount).toLocaleString() : '200'} reviews)
            </span>
          </div>

          {/* Price & Stock Badge */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-extrabold text-[#111820]">
              {formatPrice(product.price)}
            </span>

            {product.originalPrice > product.price && (
              <span className="text-lg text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}

            {product.inStock !== false && (product.stock ?? 1) > 0 ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                In Stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 border border-red-200/60">
                Out of Stock
              </span>
            )}
          </div>

          {/* Product Description */}
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-gray-600">
            {product.description}
          </p>

          <hr className="my-6 border-gray-200" />

          {/* Color Selector */}
          {availableColors.length > 0 && (
            <div className="space-y-3">
              <div className="text-sm font-semibold text-gray-900">
                Color:{' '}
                <span className="font-normal text-gray-700">
                  {selectedColor || availableColors[0]}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {availableColors.map((colorName) => {
                  const hex = getColorHex(colorName);
                  const isSelected = selectedColor === colorName;
                  const isLight =
                    colorName.toLowerCase() === 'white' ||
                    colorName.toLowerCase() === 'cream' ||
                    colorName.toLowerCase() === 'clear';

                  return (
                    <button
                      key={colorName}
                      type="button"
                      onClick={() => setSelectedColor(colorName)}
                      aria-label={`Select color ${colorName}`}
                      className={`relative h-8 w-8 rounded-full transition-transform focus:outline-none ${isSelected
                          ? 'ring-2 ring-black ring-offset-2 scale-110'
                          : 'hover:scale-105'
                        }`}
                      style={{
                        backgroundColor: hex,
                        border: isLight ? '1px solid #D1D5DB' : 'none',
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {availableSizes.length > 0 && (
            <div className="mt-6 space-y-3">
              <div className="text-sm font-semibold text-gray-900">
                Size:{' '}
                <span className="font-normal text-gray-700">
                  {selectedSize || availableSizes[0]}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                {availableSizes.map((sizeOption) => {
                  const isSelected = selectedSize === sizeOption;
                  return (
                    <button
                      key={sizeOption}
                      type="button"
                      onClick={() => setSelectedSize(sizeOption)}
                      className={`h-10 min-w-10 px-3 flex items-center justify-center rounded-xl text-sm font-semibold transition-all focus:outline-none ${isSelected
                          ? 'bg-black text-white shadow-xs'
                          : 'border border-gray-200 bg-white text-gray-800 hover:border-gray-400'
                        }`}
                    >
                      {sizeOption}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Stepper & Add to Cart */}
          <div className="mt-8 flex items-center gap-3">
            {/* Stepper */}
            <div className="flex h-12 items-center rounded-xl border border-gray-200 bg-white px-2">
              <button
                type="button"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <Minus size={16} />
              </button>
              <span className="min-w-10 text-center text-sm font-bold text-gray-900 tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((prev) => prev + 1)}
                disabled={product.inStock === false}
                aria-label="Increase quantity"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Add to Cart button */}
            <button
              type="button"
              disabled={product.inStock === false}
              onClick={handleAddToCart}
              className="flex-1 h-12 rounded-xl bg-[#111820] px-6 text-sm sm:text-base font-semibold text-white shadow-xs transition hover:bg-[#28333D] disabled:cursor-not-allowed disabled:bg-gray-400 flex items-center justify-center gap-2"
            >
              {addedNotice ? (
                <>
                  <Check size={18} className="text-emerald-400" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={18} />
                  <span>{product.inStock === false ? 'Out of Stock' : 'Add to Cart'}</span>
                </>
              )}
            </button>
          </div>

          {/* Add to Wishlist Link */}
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => setIsFavorite(!isFavorite)}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black py-1"
            >
              <Heart
                size={18}
                className={
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'
                }
              />
              <span>
                {isFavorite ? 'Saved to Wishlist' : 'Add to Wishlist'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Value Proposition / Trust Badges */}
      <div className="mt-14 grid grid-cols-1 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 rounded-2xl border border-gray-200 bg-white py-4 sm:grid-cols-3">
        <div className="flex items-center justify-center gap-4 p-4 text-center sm:text-left">
          <Truck size={28} className="text-[#111820] shrink-0" />
          <div>
            <div className="font-bold text-sm sm:text-base text-gray-900">Free Shipping</div>
            <div className="text-xs text-gray-500">On orders over $50</div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 p-4 text-center sm:text-left">
          <RotateCcw size={26} className="text-[#111820] shrink-0" />
          <div>
            <div className="font-bold text-sm sm:text-base text-gray-900">30 Days Returns</div>
            <div className="text-xs text-gray-500">Hassle free returns</div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 p-4 text-center sm:text-left">
          <ShieldCheck size={28} className="text-[#111820] shrink-0" />
          <div>
            <div className="font-bold text-sm sm:text-base text-gray-900">Secure Payment</div>
            <div className="text-xs text-gray-500">100% secure checkout</div>
          </div>
        </div>
      </div>

      {/* 4. Tab Navigation & Content Section */}
      <div className="mt-14">
        {/* Tabs Bar */}
        <div className="flex border-b border-gray-200 gap-8">
          <button
            type="button"
            onClick={() => setActiveTab('description')}
            className={`pb-3 text-base sm:text-lg font-semibold transition-colors relative ${activeTab === 'description'
                ? 'text-black border-b-2 border-black'
                : 'text-gray-500 hover:text-gray-800'
              }`}
          >
            Description
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('specifications')}
            className={`pb-3 text-base sm:text-lg font-semibold transition-colors relative ${activeTab === 'specifications'
                ? 'text-black border-b-2 border-black'
                : 'text-gray-500 hover:text-gray-800'
              }`}
          >
            Specifications
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-base sm:text-lg font-semibold transition-colors relative ${activeTab === 'reviews'
                ? 'text-black border-b-2 border-black'
                : 'text-gray-500 hover:text-gray-800'
              }`}
          >
            Reviews ({product.reviewCount ? Number(product.reviewCount).toLocaleString() : '200'})
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="py-8">
          {activeTab === 'description' && (
            <div className="max-w-3xl space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
              <p>
                {product.description} Designed with exceptional attention to craftsmanship,
                combining premium quality materials with enduring comfort for daily use.
              </p>
              <p>
                Engineered to meet the demands of everyday routines while adding an effortless touch
                of modern design. High durability, easy care, and made to last.
              </p>

              {Array.isArray(product.features) && product.features.length > 0 ? (
                <div className="pt-4">
                  <h3 className="font-bold text-gray-900 mb-2">Key Highlights</h3>
                  <ul className="list-disc pl-5 space-y-1.5">
                    {product.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="pt-4">
                  <h3 className="font-bold text-gray-900 mb-2">Key Highlights</h3>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>Crafted with high-grade, durable materials</li>
                    <li>Ergonomically designed for maximum daily comfort</li>
                    <li>Reinforced seams and stitching for extended longevity</li>
                    <li>Authentic {product.brand} quality guarantee</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="max-w-2xl overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-left text-sm text-gray-600">
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-gray-50/50">
                    <td className="w-1/3 px-4 py-3 font-semibold text-gray-900">Brand</td>
                    <td className="px-4 py-3">{product.brand}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-gray-900">Category</td>
                    <td className="px-4 py-3">{product.category}</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="px-4 py-3 font-semibold text-gray-900">Available Colors</td>
                    <td className="px-4 py-3">
                      {availableColors.length > 0 ? availableColors.join(', ') : 'Standard'}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-gray-900">Stock Availability</td>
                    <td className="px-4 py-3">
                      {product.inStock !== false ? `${product.stock || 25} units in stock` : 'Out of Stock'}
                    </td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="px-4 py-3 font-semibold text-gray-900">Product SKU</td>
                    <td className="px-4 py-3 font-mono text-xs">{product.slug || product._id}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-gray-900">Warranty</td>
                    <td className="px-4 py-3">1 Year Standard Manufacturer Warranty</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Rating Summary Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 rounded-2xl bg-gray-50 max-w-2xl">
                <div className="text-center sm:text-left">
                  <div className="text-4xl font-extrabold text-[#111820]">
                    {product.rating || '4.5'}
                  </div>
                  <div className="mt-1 flex items-center justify-center sm:justify-start gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className="fill-[#F59E0B] text-[#F59E0B]"
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Based on {product.reviewCount ? Number(product.reviewCount).toLocaleString() : '200'} reviews
                  </p>
                </div>

                <div className="h-12 w-px bg-gray-200 hidden sm:block" />

                <div className="flex-1 w-full space-y-1.5 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="w-10">5 stars</span>
                    <div className="h-2 flex-1 rounded-full bg-gray-200 overflow-hidden">
                      <div className="h-full bg-[#F59E0B] rounded-full w-[80%]" />
                    </div>
                    <span className="w-8 text-right">80%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-10">4 stars</span>
                    <div className="h-2 flex-1 rounded-full bg-gray-200 overflow-hidden">
                      <div className="h-full bg-[#F59E0B] rounded-full w-[14%]" />
                    </div>
                    <span className="w-8 text-right">14%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-10">3 stars</span>
                    <div className="h-2 flex-1 rounded-full bg-gray-200 overflow-hidden">
                      <div className="h-full bg-[#F59E0B] rounded-full w-[4%]" />
                    </div>
                    <span className="w-8 text-right">4%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-10">2 stars</span>
                    <div className="h-2 flex-1 rounded-full bg-gray-200 overflow-hidden">
                      <div className="h-full bg-[#F59E0B] rounded-full w-[1%]" />
                    </div>
                    <span className="w-8 text-right">1%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-10">1 star</span>
                    <div className="h-2 flex-1 rounded-full bg-gray-200 overflow-hidden">
                      <div className="h-full bg-[#F59E0B] rounded-full w-[1%]" />
                    </div>
                    <span className="w-8 text-right">1%</span>
                  </div>
                </div>
              </div>

              {/* Sample Verified Customer Reviews */}
              <div className="space-y-6 max-w-2xl">
                <div className="border-b border-gray-100 pb-5">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-gray-900">Emily R.</div>
                    <span className="text-xs text-gray-400">3 days ago</span>
                  </div>
                  <div className="flex items-center gap-1 my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Super soft and absorbent! Color matched the pictures perfectly. Would definitely buy again.
                  </p>
                </div>

                <div className="border-b border-gray-100 pb-5">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-gray-900">David M.</div>
                    <span className="text-xs text-gray-400">2 weeks ago</span>
                  </div>
                  <div className="flex items-center gap-1 my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Excellent quality, arrived quickly, and washes really well without fading. Very pleased!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
