import React from 'react'
import category_mens_fashion from '../assets/category_mens_fashion.jpg';
import category_womens_fashion from '../assets/category_womens_fashion.jpg';
import category_electronics from '../assets/category_electronics.jpg';
import category_beauty_personal_care from '../assets/category_beauty_personal_care.jpg';
import category_sports_outdoors from '../assets/category_sports_outdoors.jpg';
import category_home_living from '../assets/category_home_living.jpg';
import { useNavigate } from 'react-router';


const ShopByCategory = () => {
    const categories = [
        { img: category_mens_fashion, name: "Men's Fashion" },
        { img: category_womens_fashion, name: "Women's Fashion" },
        { img: category_electronics, name: "Electronics" },
        { img: category_home_living, name: "Home & Living" },
        { img: category_beauty_personal_care, name: "Beauty & Personal Care" },
        { img: category_sports_outdoors, name: "Sports & Outdoors" }
    ]
    const navigate= useNavigate();
    const handleNavigation=(catName)=>{
        navigate(`/shop?category=${encodeURIComponent(catName)}`)
    }
    return (
        <div className=''>
            <span className=' font-bold text-2xl '>Shop By Category</span>
            <div className='flex gap-2 mt-2 cursor-pointer'>
                {categories.map((cat) => (
                    <div className='bg-[#ECECEC]  rounded-[20px]'onClick={(e)=>handleNavigation(cat.name)} id={cat}>
                        <img className=' rounded-t-[20px]' src={cat.img}></img>
                        <div className='p-4 font-semibold'>{cat.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShopByCategory