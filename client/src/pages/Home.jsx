import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import BelowHeroSection from '../components/BelowHeroSection';
import ShopByCategory from '../components/ShopByCategory';
import BestSeller from '../components/BestSeller';
import Home_banner from '../assets/Home_banner.png';

const Home = () => {
  const banner = {
    backgroundImage: `url(${Home_banner})`,
    width: '100%',
    minHeight: '340px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className="container py-6 space-y-12">
      {/* Hero Carousel */}
      <section>
        <HeroSection />
      </section>

      {/* Trust Highlights Strip */}
      <section>
        <BelowHeroSection />
      </section>

      {/* Shop By Category */}
      <section>
        <ShopByCategory />
      </section>

      {/* Best Sellers Grid */}
      <section>
        <BestSeller />
      </section>

      {/* Deals Promo Banner */}
      <section>
        <div
          style={banner}
          className="relative overflow-hidden rounded-3xl p-8 sm:p-14 flex flex-col justify-center items-start shadow-sm"
        >
          {/* Subtle overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent rounded-3xl" />

          <div className="relative z-10 max-w-lg text-white space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
              <Sparkles size={13} />
              Limited Time Event
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Up to 50% Off
            </h2>
            <p className="text-sm sm:text-base text-gray-200">
              Top brands, bigger savings. Upgrade your style and daily essentials before supplies run out.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-gray-950 transition hover:bg-gray-100 hover:scale-105 active:scale-95 shadow-md"
              >
                <span>Shop Deals Now</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
