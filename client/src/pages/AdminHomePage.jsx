import React, { useEffect, useState } from 'react'
import AdminLogin from '../components/AdminLogin'
import AdminSidebar from '../components/AdminSidebar'
import { useNavigate } from 'react-router'

const AdminHomePage = () => {
    const [isLoggedin, setIsLoggedin] = useState(false)
    const navigate = useNavigate();
    const handleNaviate = () => {
        navigate("/admin/dashboard")
    }
    useEffect(()=>{
        isLoggedin?handleNaviate():''
    },[isLoggedin])
    return (
        <div>
            {!isLoggedin ?
                <AdminLogin isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin} />
                : ""

            }
        </div>
    )
}

export default AdminHomePage