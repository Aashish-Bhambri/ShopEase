import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import api from '../services/api';
import ProductCard from './ProductCard';

const BestSeller = () => {
  const [bestseller, setBestseller] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getBestseller = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('products/bestsellers/')
      setBestseller(res.data.products || []);
    } catch (err) {
      console.error('Error fetching bestsellers:', err)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getBestseller();
  }, [])

  return (
    <section className='mt-12'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='font-bold text-2xl text-gray-900'>Best Sellers</h2>
        <Link to='/shop' className='text-sm font-semibold text-gray-700 hover:text-black flex items-center gap-1 transition'>
          View All →
        </Link>
      </div>

      {isLoading ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {[...Array(4)].map((_, i) => (
            <div key={i} className='h-80 rounded-2xl bg-gray-100 animate-pulse' />
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {bestseller.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

export default BestSeller
