import heroImage1 from "../assets/hero_fashion.jpg";
import heroImage2 from "../assets/hero_electronics.jpg";
import heroImage3 from "../assets/hero_footwear.jpg";
import { useEffect, useState } from "react";

const HeroSection = () => {
    const heroImages = [heroImage2, heroImage3, heroImage1];
    const [imageSlider, setImageSlider] = useState(1);

    const bannerStyle = {
        backgroundImage: `url(${heroImages[imageSlider]})`,
        height: '100%',
        width: '100%'
    };
   

    return (
        <div className='w-full h-full '>
            <div style={bannerStyle} className=' w-full h-full bg-cover bg-center bg-no-repeat rounded-3xl overflow-hidden relative'>
                <div className="inline-flex flex-col  gap-4 p-14 mt-15">
                    <span className="text-2xl font-medium">NEW ARRIVALS</span>
                    <span className="font-extrabold text-7xl">Step into <br/> better style</span>
                    <span className="font-semibold">Discover the latest collection of shoes,<br/> crafted for comfort and designed for you.</span>
                    <button className="bg-black text-white p-2 w-30 rounded-2xl">Shop Now</button>
                </div>
            
            </div>
        </div>
    )
}

export default HeroSection