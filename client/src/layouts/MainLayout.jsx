import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import SearchBox from '../components/SearchBox';
import Footer from '../components/Footer';

const MainLayout = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F6F7]">
      <Navbar setIsSearchOpen={setIsSearchOpen} />
      <div className="flex-1">
        <Outlet context={isSearchOpen} />
      </div>
      <Footer />
      {isSearchOpen && <SearchBox setIsSearchOpen={setIsSearchOpen} />}
    </div>
  );
};

export default MainLayout;
