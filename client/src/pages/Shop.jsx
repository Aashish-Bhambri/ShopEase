import React, { useEffect, useState } from 'react'
import Filters from '../components/Filters'
import ShopProducts from '../components/ShopProducts';
import { useSearchParams } from 'react-router';
import api from '../services/api';

const Shop = () => {
  const [searchParams] = useSearchParams()
  const [category, setCategory] = useState(searchParams.get('category') || "");
  const [productRes, setProductRes] = useState([])
  const [range, setRange] = useState(50);
  const [brand, setBrand] = useState([]);
  const [filterBrand, setFilterBrand] = useState('');

  const brands =
    [
      { id: "Men's Fashion", brand: ["Northline", "UrbanCraft", "BlueHarbor", "Nike"] },
      { id: "Women's Fashion", brand: ["CarryKind", "Converse", "Thread & Co.", "Denim House"] },
      { id: "Electronics", brand: ["KeyForge", "Vista", "BoomBox", "Pulse", "DataNest", "Volt", "SoundPeak"] },
      { id: "Home & Living", brand: ["KitchenLab", "Hearth & Home", "FormLiving", "GreenNest"] },
      { id: "Beauty & Personal Care", brand: ["GlowTheory", "Maison Vale", "Botanica"] },
      { id: "Sports & Outdoors", brand: ["TrailWorks", "FlexForm", "PaceLab", "Adidas"] }


    ]


  const getProducts = async () => {
    try {
      const res = await api.get(`/products?category=${encodeURIComponent(category)}&minPrice=${range}&brand=${encodeURIComponent(filterBrand)}`);
      const products = res.data.products;
      setProductRes(products)

      const uniqueBrands = [...new Set(products.map(prd => prd.brand))]
      setBrand(uniqueBrands)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getProducts();
  }, [category, range, filterBrand])
  return (
    <div className='flex'>
      <Filters category={category} setCategory={setCategory} setProductRes={setProductRes} productRes={productRes} range={range} setRange={setRange}
        brand={brand} setBrand={setBrand} filterBrand={filterBrand} setFilterBrand={setFilterBrand} brands={brands} />
      <div className='border h-screen border-gray-200'></div>
      <ShopProducts category={category} productRes={productRes} />
    </div>
  )
}

export default Shop