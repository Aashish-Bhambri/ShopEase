import { Headset, RefreshCw, ShieldCheck, Truck } from 'lucide-react'
import React from 'react'

const BelowHeroSection = () => {
    const list = [
        { icon: <Truck size={50} />, name: 'Free Shipping', des: 'On orders over $50' },
        { icon: <ShieldCheck size={50} />, name: 'Secure Payment', des: '100% secure checkout' },
        { icon: <RefreshCw size={50} />, name: 'easy Returs', des: '30 day return policy' },
        { icon: <Headset size={50} />, name: '24/7 Support', des: 'We are here to help' }
    ]
    return (
        <div className='mt-6 flex justify-between text-[16px] p-2  items-center bg-[#ECECEC] rounded-2xl'>
            {
                list.map((item) => (
                    <div className='flex gap-2  p-2'>
                        {item.icon}
                        <div>
                            <div className='font-semibold'>{item.name}</div>
                            <div>{item.des}</div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default BelowHeroSection