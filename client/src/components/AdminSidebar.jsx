import { ChartNoAxesColumn, Home, Megaphone, Package, Settings, ShoppingCart, Tag, Users } from 'lucide-react'
import React from 'react'
import { Link, Outlet } from 'react-router'

const AdminSidebar = () => {
    const sidebar = [
        { icon: <Home />, name: "Dashboard", path: "/admin/dashboard" },
        { icon: <Package />, name: "Products", path: "" },
        { icon: <ShoppingCart />, name: "Orders", path: "" },
        { icon: <Users />, name: "Customers", path: "" },
        { icon: <ChartNoAxesColumn />, name: "Analysis", path: "" },
        { icon: <Megaphone />, name: "Marketing", path: "" },
        { icon: <Tag />, name: "Discounts", path: "" },
        { icon: <Settings />, name: "Settings", path: "" },
    ]

    return (<div className='flex'>
        <div className='w-50 bg-primary text-white h-screen overflow-auto flex py-4'>
            <div className='flex  flex-col  '>
                <span className='text-3xl'>ShopEase</span>
                <div className='flex flex-col grow justify-between '>
                    <div className='mt-4 flex flex-col gap-2'>
                        {
                            sidebar.map((item) => (
                                <Link to={item.path} className='flex gap-2 py-2 cursor-pointer'>
                                    <span>{item?.icon}</span>
                                    <span className='text-[16px] font-medium'>{item.name}</span>
                                </Link>
                            ))
                        }
                    </div>
                    <div className='flex gap-2 '>
                        <span className='rounded-full bg-surface-secondary text-black p-1'>A</span>
                        <span>User</span>
                    </div>
                </div>
            </div>
        </div>
        <Outlet />
    </div>
    )
}

export default AdminSidebar