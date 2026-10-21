import React, { useEffect, useState } from 'react'
import api from '../services/api';
import ProductCard from './ProductCard';

const BestSeller = () => {
  const [bestseller, setBestseller] = useState([]);

  const getBestseller = async () => {
    try {
      const res = await api.get('products/bestsellers/')
      setBestseller(res.data.products);

    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getBestseller();

  }, [])

  console.log(bestseller)
  return (
    <div className=''>
      <div className='font-bold text-2xl '>
        Best Sellers
      </div>
      <div className='flex justify-between' >
        {
          bestseller.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        }
      </div>
    </div>
  )
}

export default BestSeller