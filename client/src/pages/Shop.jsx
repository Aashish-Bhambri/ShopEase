import React, { useEffect, useState } from 'react';
import Filters from '../components/Filters';
import ShopProducts from '../components/ShopProducts';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search')?.trim() || '';
  const urlCategory = searchParams.get('category') || '';

  const [category, setCategory] = useState(urlCategory);
  const [productRes, setProductRes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [range, setRange] = useState(5000);
  const [brand, setBrand] = useState([]);
  const [filterBrand, setFilterBrand] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state if category changes in URL
  useEffect(() => {
    if (urlCategory !== category) {
      setCategory(urlCategory);
      setFilterBrand('');
      setCurrentPage(1);
    }
  }, [urlCategory]);

  const brands = [
    { id: "Men's Fashion", brand: ['Northline', 'UrbanCraft', 'BlueHarbor', 'Nike'] },
    { id: "Women's Fashion", brand: ['CarryKind', 'Converse', 'Thread & Co.', 'Denim House'] },
    {
      id: 'Electronics',
      brand: ['KeyForge', 'Vista', 'BoomBox', 'Pulse', 'DataNest', 'Volt', 'SoundPeak'],
    },
    { id: 'Home & Living', brand: ['KitchenLab', 'Hearth & Home', 'FormLiving', 'GreenNest'] },
    { id: 'Beauty & Personal Care', brand: ['GlowTheory', 'Maison Vale', 'Botanica'] },
    { id: 'Sports & Outdoors', brand: ['TrailWorks', 'FlexForm', 'PaceLab', 'Adidas'] },
  ];

  useEffect(() => {
    let isCurrentRequest = true;
    setIsLoading(true);
    setError('');

    const getProducts = async () => {
      try {
        const res = await api.get('/products', {
          params: {
            category: category || undefined,
            maxPrice: range < 5000 ? range : undefined,
            brand: filterBrand || undefined,
            sort: sortBy || undefined,
            page: currentPage,
            limit: 12,
            ...(search ? { search } : {}),
          },
        });

        const products = res.data.products;
        if (!Array.isArray(products)) {
          throw new Error('The product search returned an invalid response.');
        }

        if (isCurrentRequest) {
          setProductRes(products);
          setTotalPages(res.data.totalPages || 1);
          setTotalCount(res.data.count || products.length);
          setBrand([...new Set(products.map((p) => p.brand))]);
        }
      } catch (requestError) {
        if (isCurrentRequest) {
          console.error('Unable to load products.', requestError);
          setError('Products could not be loaded. Please try again.');
          setProductRes([]);
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false);
        }
      }
    };

    getProducts();
    return () => {
      isCurrentRequest = false;
    };
  }, [category, range, filterBrand, search, sortBy, currentPage]);

  return (
    <div className="container min-h-screen">
      <div className="flex">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block w-72 shrink-0 border-r border-gray-200/80 py-6 pr-6">
          <div className="sticky top-24">
            <Filters
              category={category}
              setCategory={(cat) => {
                setCategory(cat);
                setCurrentPage(1);
              }}
              range={range}
              setRange={(r) => {
                setRange(r);
                setCurrentPage(1);
              }}
              brand={brand}
              filterBrand={filterBrand}
              setFilterBrand={(b) => {
                setFilterBrand(b);
                setCurrentPage(1);
              }}
              brands={brands}
            />
          </div>
        </aside>

        {/* Mobile Filters Drawer / Modal */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
              onClick={() => setIsMobileFilterOpen(false)}
            />

            {/* Slide-out drawer */}
            <div className="relative ml-auto flex h-full w-full max-w-xs flex-col bg-white shadow-xl overflow-y-auto">
              <Filters
                category={category}
                setCategory={(cat) => {
                  setCategory(cat);
                  setCurrentPage(1);
                }}
                range={range}
                setRange={(r) => {
                  setRange(r);
                  setCurrentPage(1);
                }}
                brand={brand}
                filterBrand={filterBrand}
                setFilterBrand={(b) => {
                  setFilterBrand(b);
                  setCurrentPage(1);
                }}
                brands={brands}
                onCloseMobile={() => setIsMobileFilterOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Products Main View */}
        <ShopProducts
          category={category}
          setCategory={(cat) => {
            setCategory(cat);
            setCurrentPage(1);
          }}
          search={search}
          productRes={productRes}
          isLoading={isLoading}
          error={error}
          sortBy={sortBy}
          setSortBy={setSortBy}
          range={range}
          setRange={(r) => {
            setRange(r);
            setCurrentPage(1);
          }}
          filterBrand={filterBrand}
          setFilterBrand={(b) => {
            setFilterBrand(b);
            setCurrentPage(1);
          }}
          totalCount={totalCount}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
        />
      </div>
    </div>
  );
};

export default Shop;
