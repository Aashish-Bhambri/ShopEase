import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import heroFashion from '../assets/hero_fashion.jpg';
import heroElectronics from '../assets/hero_electronics.jpg';
import heroFootwear from '../assets/hero_footwear.jpg';

const HeroSection = () => {
  const navigate = useNavigate();

  const slides = [
    {
      image: heroFootwear,
      tag: 'NEW ARRIVALS',
      title: 'Step into\nbetter style',
      desc: 'Discover our latest collection of footwear, crafted for comfort and designed for everyday life.',
      btnText: 'Shop Footwear',
      category: "Men's Fashion",
    },
    {
      image: heroElectronics,
      tag: 'PRECISION TECH',
      title: 'Elevate your\ndaily setup',
      desc: 'High-performance mechanical keyboards, studio audio, and modern workspace essentials.',
      btnText: 'Shop Electronics',
      category: 'Electronics',
    },
    {
      image: heroFashion,
      tag: 'MINIMALIST DESIGN',
      title: 'Timeless\nwardrobe staples',
      desc: 'Tailored jackets, premium knitwear, and effortless everyday silhouettes for every season.',
      btnText: 'Shop Collection',
      category: "Women's Fashion",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const currentSlide = slides[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handleCta = () => {
    navigate(`/shop?category=${encodeURIComponent(currentSlide.category)}`);
  };

  return (
    <div
      className="relative w-full h-[460px] sm:h-[520px] rounded-3xl overflow-hidden shadow-sm"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image with cross-fade effect */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
        style={{ backgroundImage: `url(${currentSlide.image})` }}
      >
        {/* Soft dark overlay for readable text */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-14 text-white max-w-xl">
        <span className="inline-block text-xs sm:text-sm font-bold tracking-widest uppercase text-white/90 mb-2">
          {currentSlide.tag}
        </span>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight whitespace-pre-line text-white drop-shadow-xs">
          {currentSlide.title}
        </h1>

        <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed max-w-md">
          {currentSlide.desc}
        </p>

        <div className="mt-8">
          <button
            type="button"
            onClick={handleCta}
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-gray-950 shadow-md transition-all duration-300 hover:bg-gray-100 hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>{currentSlide.btnText}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/70 backdrop-blur-md text-gray-900 shadow-md transition hover:bg-white hover:scale-110 active:scale-90"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/70 backdrop-blur-md text-gray-900 shadow-md transition hover:bg-white hover:scale-110 active:scale-90"
      >
        <ChevronRight size={20} />
      </button>

      {/* Slide Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentIndex === idx ? 'w-8 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
