import { ChartNoAxesColumn, Home, Megaphone, Package, Settings, ShoppingCart, Tag, Users } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

const AdminSidebar = () => {
    const sidebar = [
        { icon: <Home size={18} />, name: "Dashboard", path: "/admin/dashboard" },
        { icon: <Package size={18} />, name: "Products", path: "/admin/products" },
        { icon: <ShoppingCart size={18} />, name: "Orders", path: "" },
        { icon: <Users size={18} />, name: "Customers", path: "" },
        { icon: <ChartNoAxesColumn size={18} />, name: "Analysis", path: "" },
        { icon: <Megaphone size={18} />, name: "Marketing", path: "" },
        { icon: <Tag size={18} />, name: "Discounts", path: "" },
        { icon: <Settings size={18} />, name: "Settings", path: "" },
    ];

    return (
        <div className='flex min-h-screen'>
            <div className='w-64 bg-black text-white p-6 flex flex-col justify-between'>
                <div className='flex flex-col'>
                    <span className='text-2xl font-bold tracking-tight mb-8'>ShopEase Admin</span>
                    <nav className='flex flex-col gap-1'>
                        {sidebar.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path || '#'}
                                className='flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-neutral-800 transition'
                            >
                                <span>{item.icon}</span>
                                <span className='text-sm font-medium'>{item.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className='flex items-center gap-3 pt-4 border-t border-neutral-800'>
                    <span className='w-8 h-8 rounded-full bg-neutral-700 text-white flex items-center justify-center font-bold text-sm'>
                        A
                    </span>
                    <div className='flex flex-col'>
                        <span className='text-sm font-medium'>Admin</span>
                        <span className='text-xs text-gray-400'>shopease@gmail.com</span>
                    </div>
                </div>
            </div>
            <div className='flex-1 p-8 bg-gray-50 overflow-auto'>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminSidebar;
