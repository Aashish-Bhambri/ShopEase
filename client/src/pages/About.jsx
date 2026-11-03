import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  ShieldCheck,
  Zap,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

const About = () => {
  const stack = [
    {
      title: 'Frontend Engineering',
      tech: 'React 19 • Vite • Tailwind CSS v4 • Redux Toolkit',
      desc: 'Built with the latest React 19 concurrent features, rapid Vite bundling, custom Tailwind v4 @theme design tokens, and normalized Redux store with localStorage state persistence.',
      icon: <Code2 className="text-blue-600" size={24} />,
    },
    {
      title: 'Backend & RESTful APIs',
      tech: 'Node.js (ESM) • Express 5 • RESTful Controllers',
      desc: 'Modular controller-route architecture handling multi-parameter filtering (category, price ceiling, brand search), full-text search indexing, and robust error handling.',
      icon: <Cpu className="text-emerald-600" size={24} />,
    },
    {
      title: 'Database & Data Modeling',
      tech: 'MongoDB • Mongoose 9 ODM',
      desc: 'Optimized schemas with slug generation, virtual discount hooks, indexed search fields, inventory status, and automated database seeding pipelines.',
      icon: <Database className="text-amber-600" size={24} />,
    },
    {
      title: 'Production-Grade UX',
      tech: 'Semantic HTML5 • Mobile First • Accessibility',
      desc: 'Designed for effortless navigation with mobile drawers, instant keyboard search shortcuts (Ctrl+K), multi-step interactive checkout, and accessible color contrast.',
      icon: <Zap className="text-purple-600" size={24} />,
    },
  ];

  const highlights = [
    { stat: 'React 19', label: 'Latest React version' },
    { stat: '6+', label: 'Curated Categories' },
    { stat: '100%', label: 'Mobile Responsive' },
    { stat: 'E2E', label: 'Complete Checkout Flow' },
  ];

  return (
    <div className="container py-12">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-black px-6 py-16 text-center text-white sm:px-12 sm:py-24">
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md mb-6">
            <Sparkles size={14} />
            <span>Developer Portfolio Flagship Project</span>
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            Modern Commerce, Engineered for Speed & Simplicity
          </h1>

          <p className="mt-6 text-base text-gray-300 sm:text-xl leading-relaxed">
            ShopEase is a full-stack e-commerce web application engineered from the ground up to demonstrate enterprise architectural patterns, responsive UI design systems, and seamless shopping workflows.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-gray-100"
            >
              <span>Explore The Store</span>
              <ArrowRight size={16} />
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/10"
            >
              <span>View Source Code</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Background gradient orb */}
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-bl from-purple-500/20 to-orange-500/20 blur-3xl" />
      </section>

      {/* Metrics Row */}
      <section className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {highlights.map((h, i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-200/80 bg-white p-6 text-center shadow-xs"
          >
            <div className="text-3xl font-black text-gray-900 sm:text-4xl">{h.stat}</div>
            <div className="mt-1 text-xs font-semibold text-gray-500 sm:text-sm">{h.label}</div>
          </div>
        ))}
      </section>

      {/* Technical Architecture */}
      <section className="mt-16">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <h2 className="text-3xl font-black text-gray-900">
            System Architecture & Tech Stack
          </h2>
          <p className="mt-2 text-gray-600">
            Carefully selected modern technologies working harmoniously together to deliver snappy page transitions and robust data integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {stack.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl border border-gray-200/80 bg-white p-7 shadow-xs transition hover:shadow-md"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 mb-4 border border-gray-100">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                <p className="mt-1 text-xs font-mono font-medium text-gray-500">{item.tech}</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Developer Spotlight */}
      <section className="mt-16 rounded-3xl border border-gray-200 bg-white p-8 sm:p-12 shadow-xs">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Developer Profile
            </span>
            <h2 className="mt-1 text-2xl font-black text-gray-900 sm:text-3xl">
              Engineered with Passion for High-Impact Software
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              I am a Software Engineer focused on building fast, reliable, and user-centric web applications. Interested in collaborating or discussing opportunities? Let's connect!
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              <span>GitHub Profile</span>
              <ExternalLink size={15} />
            </a>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <span>View Live Store</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
