import { Headset, RefreshCw, ShieldCheck, Truck } from 'lucide-react'
import React from 'react'

const BelowHeroSection = () => {
    const list = [
        { icon: <Truck size={38} className='text-gray-900 shrink-0' />, name: 'Free Shipping', des: 'On orders over $50' },
        { icon: <ShieldCheck size={38} className='text-gray-900 shrink-0' />, name: 'Secure Payment', des: '100% secure checkout' },
        { icon: <RefreshCw size={36} className='text-gray-900 shrink-0' />, name: 'Easy Returns', des: '30 day return policy' },
        { icon: <Headset size={38} className='text-gray-900 shrink-0' />, name: '24/7 Support', des: 'We are here to help' }
    ]

    return (
        <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-[#ECECEC] rounded-2xl'>
            {list.map((item) => (
                <div key={item.name} className='flex items-center gap-3 p-2'>
                    {item.icon}
                    <div>
                        <div className='font-bold text-sm sm:text-base text-gray-900'>{item.name}</div>
                        <div className='text-xs text-gray-600'>{item.des}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BelowHeroSection
