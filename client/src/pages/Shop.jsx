import React, { useEffect, useState } from 'react'
import Filters from '../components/Filters'
import ShopProducts from '../components/ShopProducts';
import { useSearchParams } from 'react-router';
import api from '../services/api';

const Shop = () => {
  const [searchParams] = useSearchParams()
  const [category, setCategory] = useState(searchParams.get('category') || "");
  const [productRes, setProductRes] = useState([])
  const [range, setRange] = useState(0);
  const [brand, setBrand] = useState([]);
  const getProducts = async () => {
    try {
      console.log(range, "-------")
      const res = await api.get(`/products?category=${encodeURIComponent(category)}&minPrice=${range}`);
      const products = res.data.products;
      setProductRes(products)

      const uniqueBrands = [...new Set(products.map(prd => prd.brand))]
      setBrand(uniqueBrands)
    } catch (err) {
      console.log(err)
    }
  }

  console.log(brand)
  useEffect(() => {
    getProducts();
  }, [category, range])
  console.log(category)
  return (
    <div className='flex'>
      <Filters category={category} setCategory={setCategory} setProductRes={setProductRes} productRes={productRes} range={range} setRange={setRange}
        brand={brand} />
      <div className='border h-screen border-gray-200'></div>
      <ShopProducts category={category} productRes={productRes} />
    </div>
  )
}

export default Shop