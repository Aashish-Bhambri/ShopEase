import React from 'react'
import HeroSection from '../components/HeroSection';
import BelowHeroSection from '../components/BelowHeroSection';
import ShopByCategory from '../components/ShopByCategory';
import BestSeller from '../components/BestSeller';
import Home_banner from '../assets/Home_banner.png'

const Home = () => {
  const banner = {
    backgroundImage: `url(${Home_banner})`,
    width: "100%",
    height: "400px",
    backgroundPosition: 'top',
    backgroundSize: "cover", 
    backgroundRepeat: "no-repeat"
  };


  return (
    <div className=' max-w-7xl mx-auto  h-full gap-2'>
      <div className='w-full h-135 object-contain mt-2  '>
        <HeroSection />
      </div>
      <BelowHeroSection />
      <div className='section-spacing'>
        <ShopByCategory />
        <BestSeller />
      </div>
      <div className='section-spacing'>
        <div style={banner} className='rounded-2xl flex flex-col p-6 justify-center gap-1 ' >
          <span className='font-bold text-6xl'>Up to 50% Off</span>
          <span className='font-semibold '>Top brands, Biggersavings.</span>
          <span className='bg-black text-white p-4 items-center w-34 rounded-2xl mt-5 '>Shop Details</span>
        </div>
      </div>
    </div>
  )
}

export default Home;