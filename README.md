# ShopEase — Flagship Full-Stack E-Commerce Platform

[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.0-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Node.js](https://img.shields.io/badge/Node.js-ESM-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express 5](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **ShopEase** is a modern, high-performance e-commerce web application engineered with **React 19**, **Tailwind CSS v4**, **Redux Toolkit**, and a modular **Node.js / Express 5 / MongoDB** backend. Built to deliver sub-100ms response times, intuitive multi-facet product discovery, and a frictionless 3-step checkout experience.

---

## 📸 Key Highlights & User Experience

- **Minimalist Aesthetic**: Clean typography, subtle micro-interactions, cohesive `@theme` design tokens, and neutral color palette inspired by Scandinavian design.
- **Global Search (`Ctrl + K`)**: Real-time debounced full-text search with product thumbnail previews and keyboard navigation.
- **Multi-Facet Filtering & Sorting**: Filter instantly by Category, Brand, and dynamic Price Ceilings with active filter tags and 4-way sorting (Featured, Price Low/High, Rating).
- **Rich Product Detail Pages**: Multi-thumbnail interactive gallery, dynamic hex color swatches, size selectors, quantity stepper, Redux cart integration, and tabbed panels for descriptions, specifications, and customer reviews.
- **Persistent Cart**: Global state powered by Redux Toolkit with automatic `localStorage` synchronization.
- **Full 3-Step Checkout Flow**: Shipping address validation, multi-payment options (Card, Apple Pay, Cash on Delivery), promo coupon engine (`SHOPEASE10`), and real-time order confirmation generation.
- **100% Mobile Responsive**: Dedicated mobile drawer navigation, off-canvas filter sheets, and touch-optimized layout across all device viewports.

---

## 🏛️ System Architecture

```
[ Client: React 19 + Redux Toolkit + Tailwind v4 ]
                        │
                        ▼ (HTTP REST API via Axios)
[ Server: Node.js (ESM) + Express 5 Router ]
      ├── /api/products              (Query: category, brand, maxPrice, search, sort, page)
      ├── /api/products/bestsellers  (Featured homepage items)
      └── /api/products/:slug        (Lookup by slug, ObjectId, or string id)
                        │
                        ▼ (Mongoose ODM 9)
[ Database: MongoDB Atlas (Products, Categories, Users) ]
```

---

## 📂 Project Structure

```
e-com2.0/
├── client/                      # Frontend Application (React 19 + Vite + Tailwind v4)
│   ├── src/
│   │   ├── app/
│   │   │   ├── feature/
│   │   │   │   └── cartSlice.js # Redux Toolkit Cart state + localStorage sync
│   │   │   └── store.js         # Configured Redux store
│   │   ├── assets/              # Curated photography & promotional banners
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Responsive header with mobile drawer & cart counter
│   │   │   ├── HeroSection.jsx  # Interactive hero carousel with auto-advance & slide dots
│   │   │   ├── ProductCard.jsx  # Card with wishlist toggle, price formatting & ratings
│   │   │   ├── ProductDetails.jsx # Showcase product page with gallery & spec tabs
│   │   │   ├── Filters.jsx      # Multi-facet filters sidebar & mobile drawer
│   │   │   ├── ShopProducts.jsx # Filterable product grid with active chips & pagination
│   │   │   ├── SearchBox.jsx    # Live debounced search modal with Ctrl+K shortcut
│   │   │   ├── Cart.jsx         # Cart page with item steppers & order summary
│   │   │   └── Footer.jsx       # Trust badges, newsletter subscribe & footer links
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx   # Root shell layout with global keyboard shortcuts
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Landing page with hero, categories, bestsellers & deals
│   │   │   ├── Shop.jsx         # Catalog page with sorting, pagination, & query sync
│   │   │   ├── Categories.jsx   # Curated collections showcase
│   │   │   ├── About.jsx        # Project architecture & engineering overview
│   │   │   └── Checkout.jsx     # 3-step shipping, payment, & confirmation flow
│   │   ├── services/
│   │   │   └── api.js           # Axios base instance with backend URL
│   │   ├── App.jsx              # React Router v7 routes
│   │   ├── index.css            # Tailwind v4 `@theme` tokens & global utilities
│   │   └── main.jsx             # React DOM entry point
│   └── package.json
│
├── server/                      # Backend API (Node.js + Express 5 + Mongoose 9)
│   ├── src/
│   │   ├── controller/
│   │   │   └── product.controller.js # Multi-parameter query, sort & pagination
│   │   ├── model/
│   │   │   └── Product.js       # Mongoose schema with pre-save hooks & discount logic
│   │   ├── routes/
│   │   │   └── productRoute.js  # RESTful product endpoints
│   │   ├── scripts/
│   │   │   └── seed.js          # Automated database seeding script
│   │   └── data/
│   │       └── shopease-products.json # 60+ pre-seeded catalog items
│   ├── server.js                # Express app initialization & MongoDB connection
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ or v20+
- **MongoDB** local instance or free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster URI

---

### 1. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/shopease?retryWrites=true&w=majority
```

Seed the catalog into MongoDB (60+ items across 6 categories):
```bash
node src/scripts/seed.js
```

Start the backend server:
```bash
npm run dev
# Server running on port 5000
# Connected to MongoDB
```

---

### 2. Frontend Setup

In a new terminal:
```bash
cd client
npm install
```

Start the Vite development server:
```bash
npm run dev
# Local: http://localhost:5173
```

To create a production build:
```bash
npm run build
```

---

## 📡 REST API Reference

| Method | Endpoint | Query Parameters | Description |
|---|---|---|---|
| `GET` | `/api/products` | `category`, `brand`, `minPrice`, `maxPrice`, `search`, `sort`, `page`, `limit` | Paginated product search & multi-facet filtering |
| `GET` | `/api/products/bestsellers` | — | Retrieves featured items for homepage carousel |
| `GET` | `/api/products/:slug` | — | Retrieves product by slug, MongoDB `_id`, or string ID |

---

## 🛠️ Engineering Decisions

- **React 19 & Vite**: Selected for instant HMR (<50ms) and minimal production bundle size (~130kB gzipped JS).
- **Tailwind CSS v4**: Utilizes the modern `@theme` directive directly in CSS for zero-config variable binding without legacy `tailwind.config.js` overhead.
- **Redux Toolkit Slice with Custom Storage Middleware**: Ensures cart state remains resilient across tab reloads and browser restarts without heavy external dependencies.
- **Flexible ID / Slug Resolvers**: Backend dynamically matches product URLs using human-readable SEO slugs (`soft-bath-towel-set`), legacy identifiers (`id`), or MongoDB `ObjectId`.

---

## 👨‍💻 Developer & Portfolio

Developed as a flagship full-stack project for developer portfolio showcase.
- **Repository**: [GitHub](https://github.com)
- **Tech Focus**: Full-Stack Web Development, Responsive Design Systems, RESTful APIs, Performance Optimization.
