import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import category_mens_fashion from '../assets/category_mens_fashion.jpg';
import category_womens_fashion from '../assets/category_womens_fashion.jpg';
import category_electronics from '../assets/category_electronics.jpg';
import category_beauty_personal_care from '../assets/category_beauty_personal_care.jpg';
import category_sports_outdoors from '../assets/category_sports_outdoors.jpg';
import category_home_living from '../assets/category_home_living.jpg';

const ShopByCategory = () => {
    const categories = [
        { img: category_mens_fashion, name: "Men's Fashion" },
        { img: category_womens_fashion, name: "Women's Fashion" },
        { img: category_electronics, name: "Electronics" },
        { img: category_home_living, name: "Home & Living" },
        { img: category_beauty_personal_care, name: "Beauty & Personal Care" },
        { img: category_sports_outdoors, name: "Sports & Outdoors" }
    ]
    const navigate = useNavigate();

    const handleNavigation = (catName) => {
        navigate(`/shop?category=${encodeURIComponent(catName)}`)
    }

    return (
        <section className='mt-8'>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='font-bold text-2xl text-gray-900'>Shop by Category</h2>
                <Link to='/shop' className='text-sm font-semibold text-gray-700 hover:text-black flex items-center gap-1 transition'>
                    View All →
                </Link>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4'>
                {categories.map((cat) => (
                    <div
                        key={cat.name}
                        onClick={() => handleNavigation(cat.name)}
                        className='group bg-[#ECECEC] rounded-[20px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md'
                    >
                        <div className='aspect-square overflow-hidden bg-gray-200'>
                            <img
                                className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                                src={cat.img}
                                alt={cat.name}
                            />
                        </div>
                        <div className='p-3 sm:p-4 font-semibold text-sm sm:text-base text-gray-900 text-center truncate'>
                            {cat.name}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ShopByCategory
