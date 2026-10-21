
import React, { useState } from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, onAddToCart }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const currency = product.currency || 'USD';

    const formatPrice = (price) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            maximumFractionDigits: 2,
        }).format(price);

    return (
        <article className="group flex h-full flex-col rounded-2xl border border-gray-200/80 bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-4">

            {/* Image */}
            <div className="relative aspect-square overflow-hidden rounded-xl bg-[#F3F4F5]">
                <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {product.featured && (
                    <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-[#15191D]">
                        Featured
                    </span>
                )}

                <button
                    type="button"
                    onClick={() => setIsFavorite(!isFavorite)}
                    aria-label="Toggle wishlist"
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-110"
                >
                    <Heart
                        size={18}
                        className={
                            isFavorite
                                ? 'fill-red-500 text-red-500'
                                : 'text-[#15191D]'
                        }
                    />
                </button>
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col pt-4">

                <p className="text-xs text-gray-500">
                    {product.brand}
                </p>

                <div className="mt-1 flex items-start justify-between gap-2">
                    <h3 className="line-clamp-2 min-w-0 flex-1 text-sm font-semibold leading-5 text-[#15191D] sm:text-base">
                        {product.name}
                    </h3>

                    <div className="shrink-0 text-right">
                        <p className="whitespace-nowrap text-sm font-bold text-[#15191D] sm:text-base">
                            {formatPrice(product.price)}
                        </p>

                        {product.originalPrice > product.price && (
                            <p className="text-xs text-gray-400 line-through">
                                {formatPrice(product.originalPrice)}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-2 flex items-center gap-1.5">
                    <Star
                        size={15}
                        className="fill-[#F59E0B] text-[#F59E0B]"
                    />
                    <span className="text-xs font-medium text-[#15191D]">
                        {product.rating}
                    </span>
                    <span className="text-xs text-gray-500">
                        ({Number(product.reviewCount || 0).toLocaleString()})
                    </span>
                </div>

                <button
                    type="button"
                    disabled={product.inStock === false}
                    onClick={() => onAddToCart?.(product)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#111820] px-3 py-3 text-sm font-medium text-white transition hover:bg-[#28333D] disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                    <ShoppingCart size={17} />
                    {product.inStock === false
                        ? 'Out of Stock'
                        : 'Add to Cart'}
                </button>

            </div>
        </article>
    );
};

export default ProductCard;
