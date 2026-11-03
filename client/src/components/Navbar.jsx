import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, UserRound, ShoppingCart, Menu, X, ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '../app/feature/cartSlice';

const Navbar = ({ setIsSearchOpen }) => {
  const cartCount = useSelector(selectCartItemCount);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
  ];

  const categories = [
    "Men's Fashion",
    "Women's Fashion",
    "Electronics",
    "Home & Living",
    "Beauty & Personal Care",
    "Sports & Outdoors",
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <nav className="container flex min-h-[72px] items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 lg:hidden"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link
            to="/"
            className="shrink-0 text-2xl font-black tracking-tight text-gray-900 transition hover:opacity-90"
          >
            ShopEase
          </Link>
        </div>

        {/* Center: Desktop Navigation links */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${
                  isActive
                    ? 'text-gray-950 font-bold border-b-2 border-black pb-1'
                    : 'text-gray-600 hover:text-gray-950'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Center-Right: Search Input trigger */}
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          aria-label="Open product search"
          className="hidden h-11 max-w-[340px] flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 text-left transition hover:border-gray-300 md:flex"
        >
          <Search size={18} className="shrink-0 text-gray-400" />
          <span className="flex-1 text-sm text-gray-500">Search for products, brands...</span>
          <kbd className="hidden sm:inline-block rounded bg-white px-2 py-0.5 text-[10px] font-medium text-gray-400 border border-gray-200 shadow-xs">
            Ctrl+K
          </kbd>
        </button>

        {/* Right: Actions (Mobile Search, User, Cart) */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search products"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 hover:bg-gray-100 md:hidden"
          >
            <Search size={22} />
          </button>

          <Link
            to="/shop"
            title="Browse Catalog"
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 hover:bg-gray-100"
          >
            <UserRound size={22} strokeWidth={1.8} />
          </Link>

          <Link
            to="/cart"
            aria-label={`Shopping cart with ${cartCount} items`}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-900 transition hover:bg-gray-100"
          >
            <ShoppingCart size={24} strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-[11px] font-bold text-white shadow-xs">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-5 lg:hidden animate-in fade-in duration-200 shadow-lg">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition ${
                    isActive
                      ? 'bg-gray-100 text-black'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                <span>{link.name}</span>
                <ChevronRight size={18} className="text-gray-400" />
              </NavLink>
            ))}
          </div>

          <div className="mt-5 border-t border-gray-100 pt-4">
            <span className="px-4 text-xs font-bold uppercase tracking-wider text-gray-400">
              Popular Categories
            </span>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/shop?category=${encodeURIComponent(cat)}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-lg bg-gray-50 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
