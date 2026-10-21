import React from 'react'
import ProductCard from './ProductCard'

const ShopProducts = ({ category, productRes }) => {

    return (
        <div>
            {category?
                <div className='font-bold text-5xl text-gray-800 pt-4 px-6'>{category}</div>
                :
                <div className='font-bold text-5xl text-gray-800 pt-4 px-6'>All Products</div>

            }
            <div className='grid grid-cols-4 p-4 gap-4'>{
                productRes?.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default ShopProducts