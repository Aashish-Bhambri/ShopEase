import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Layers } from 'lucide-react';
import category_mens_fashion from '../assets/category_mens_fashion.jpg';
import category_womens_fashion from '../assets/category_womens_fashion.jpg';
import category_electronics from '../assets/category_electronics.jpg';
import category_beauty_personal_care from '../assets/category_beauty_personal_care.jpg';
import category_sports_outdoors from '../assets/category_sports_outdoors.jpg';
import category_home_living from '../assets/category_home_living.jpg';

const Categories = () => {
  const categoryList = [
    {
      title: "Men's Fashion",
      desc: 'Modern tailoring, casual streetwear, and functional everyday apparel.',
      image: category_mens_fashion,
      itemCount: '18+ Items',
      popular: ['Northline', 'UrbanCraft', 'BlueHarbor', 'Nike'],
      badge: 'Trending',
    },
    {
      title: "Women's Fashion",
      desc: 'Effortless silhouettes, premium knitwear, and timeless wardrobe staples.',
      image: category_womens_fashion,
      itemCount: '24+ Items',
      popular: ['CarryKind', 'Converse', 'Thread & Co.', 'Denim House'],
      badge: 'New Season',
    },
    {
      title: 'Electronics',
      desc: 'Precision audio, ergonomic mechanical keyboards, and workspace gadgets.',
      image: category_electronics,
      itemCount: '30+ Items',
      popular: ['KeyForge', 'Pulse', 'SoundPeak', 'Volt'],
      badge: 'Top Rated',
    },
    {
      title: 'Home & Living',
      desc: 'Minimalist ceramic dinnerware, organic textiles, and ambient design accents.',
      image: category_home_living,
      itemCount: '20+ Items',
      popular: ['KitchenLab', 'Hearth & Home', 'FormLiving', 'GreenNest'],
      badge: 'Best Seller',
    },
    {
      title: 'Beauty & Personal Care',
      desc: 'Clean skincare formulas, botanical hair care, and daily wellness essentials.',
      image: category_beauty_personal_care,
      itemCount: '15+ Items',
      popular: ['GlowTheory', 'Maison Vale', 'Botanica'],
      badge: 'Organic',
    },
    {
      title: 'Sports & Outdoors',
      desc: 'Performance running gear, lightweight travel packs, and durable activewear.',
      image: category_sports_outdoors,
      itemCount: '16+ Items',
      popular: ['TrailWorks', 'FlexForm', 'PaceLab', 'Adidas'],
      badge: 'Active',
    },
  ];

  return (
    <div className="container py-12">
      {/* Header section */}
      <div className="mx-auto max-w-2xl text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-black/5 px-4 py-1.5 text-xs font-semibold text-gray-800 mb-3">
          <Layers size={14} />
          <span>Curated Collections</span>
        </div>
        <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
          Browse by Category
        </h1>
        <p className="mt-3 text-base text-gray-600 sm:text-lg">
          Explore our handpicked collections crafted with purpose, premium materials, and obsessive attention to detail.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categoryList.map((cat) => (
          <article
            key={cat.title}
            className="group flex flex-col overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
          >
            {/* Category Image with badge */}
            <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
              <img
                src={cat.image}
                alt={cat.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-75 transition-opacity" />
              
              <span className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-xs px-3 py-1 text-xs font-bold text-gray-900 shadow-xs">
                {cat.badge}
              </span>

              <span className="absolute bottom-4 right-4 rounded-full bg-black/60 backdrop-blur-xs px-3 py-1 text-xs font-medium text-white">
                {cat.itemCount}
              </span>
            </div>

            {/* Content Details */}
            <div className="flex flex-1 flex-col p-6">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition">
                {cat.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {cat.desc}
              </p>

              {/* Brand tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {cat.popular.map((brand) => (
                  <span
                    key={brand}
                    className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700"
                  >
                    {brand}
                  </span>
                ))}
              </div>

              {/* Action Link */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link
                  to={`/shop?category=${encodeURIComponent(cat.title)}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 transition group-hover:gap-3"
                >
                  <span>Explore Collection</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Categories;
