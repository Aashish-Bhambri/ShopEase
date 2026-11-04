import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLogin from '../components/AdminLogin';

const AdminHomePage = () => {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token || isLoggedin) {
            navigate('/admin/dashboard');
        }
    }, [isLoggedin, navigate]);

    return (
        <div>
            {!isLoggedin && <AdminLogin setIsLoggedin={setIsLoggedin} />}
        </div>
    );
};

export default AdminHomePage;
