import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  CreditCard,
  Lock,
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const categories = [
    { name: "Men's Fashion", query: "Men's Fashion" },
    { name: "Women's Fashion", query: "Women's Fashion" },
    { name: "Electronics", query: "Electronics" },
    { name: "Home & Living", query: "Home & Living" },
    { name: "Beauty & Personal Care", query: "Beauty & Personal Care" },
    { name: "Sports & Outdoors", query: "Sports & Outdoors" },
  ];

  const quickLinks = [
    { name: 'Shop All', path: '/shop' },
    { name: 'All Categories', path: '/categories' },
    { name: 'About ShopEase', path: '/about' },
    { name: 'Shopping Cart', path: '/cart' },
  ];

  const trustHighlights = [
    {
      icon: <Truck size={20} className="text-gray-900" />,
      title: 'Free Worldwide Shipping',
      desc: 'On all orders over $50',
    },
    {
      icon: <ShieldCheck size={20} className="text-gray-900" />,
      title: '256-Bit SSL Encryption',
      desc: '100% secure checkout',
    },
    {
      icon: <RotateCcw size={20} className="text-gray-900" />,
      title: '30-Day Free Returns',
      desc: 'Hassle-free money back',
    },
  ];

  return (
    <footer className="mt-20 border-t border-gray-200 bg-white">
      {/* Top Highlights Strip */}
      <div className="border-b border-gray-100 bg-[#FAFAFA]">
        <div className="container py-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trustHighlights.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 rounded-xl border border-gray-200/60 bg-white p-4 shadow-xs"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              className="text-2xl font-extrabold tracking-tight text-gray-900"
            >
              ShopEase
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-gray-600">
              Modern curated lifestyle essentials. Built with React 19, Tailwind CSS v4, Redux Toolkit, and Node.js for an ultra-responsive, seamless shopping experience.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Repository"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-gray-900 hover:text-gray-900"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-gray-900 hover:text-gray-900"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-gray-900 hover:text-gray-900"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-gray-900 mb-4">
              Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    to={`/shop?category=${encodeURIComponent(cat.query)}`}
                    className="text-gray-600 transition hover:text-black"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-gray-900 mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-600 transition hover:text-black"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-gray-900 mb-4">
              Stay in Touch
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Subscribe to get updates on new arrivals, flash deals, and project updates.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 rounded-xl bg-green-50 p-3 text-xs font-semibold text-green-700 border border-green-200">
                <Check size={16} />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-black focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1.5 top-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white transition hover:bg-gray-800"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
                <p className="text-[11px] text-gray-400">
                  We respect your privacy. No spam ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Legal & Payment Badges */}
      <div className="border-t border-gray-200 bg-[#F9FAFB] py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} ShopEase. Designed & Developed for Portfolio Showcase.
          </p>

          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Lock size={12} className="text-gray-400" />
              SSL Secured
            </span>
            <span>•</span>
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Apple Pay</span>
            <span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
