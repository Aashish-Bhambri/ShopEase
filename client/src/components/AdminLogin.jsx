import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import api from '../services/api';

const AdminLogin = ({ setIsLoggedin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const authLogin = async () => {
        setErrorMessage('');
        setLoading(true);
        try {
            const res = await api.post('admin/login', {
                uniqueId: uuidv4(),
                email: email.trim(),
                password: password.trim()
            });

            if (res.data.success) {
                localStorage.setItem('adminToken', res.data.data);
                setIsLoggedin(true);
            }
        } catch (error) {
            console.error('Admin login failed:', error);
            setErrorMessage(error.response?.data?.message || 'Unable to log in. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        authLogin();
    };

    return (
        <div className='w-full flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4'>
            <a className='shrink-0 text-5xl md:text-7xl font-black tracking-tight text-gray-900 transition hover:opacity-90 p-4'>
                ShopEase
            </a>

            <div className='w-full max-w-md bg-white border border-gray-200 p-8 md:p-10 rounded-2xl shadow-xl'>
                <form className='flex flex-col gap-4' onSubmit={handleLogin}>
                    <div className='flex flex-col gap-1 mb-2'>
                        <span className='text-3xl font-bold text-gray-900'>Welcome back</span>
                        <span className='text-sm text-gray-500'>Sign in with your admin credentials</span>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-medium text-gray-700' htmlFor='admin-email'>Email</label>
                        <input
                            id='admin-email'
                            className='p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black'
                            type='email'
                            required
                            autoComplete='email'
                            placeholder='shopease@gmail.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-medium text-gray-700' htmlFor='admin-password'>Password</label>
                        <input
                            id='admin-password'
                            className='p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black'
                            type='password'
                            required
                            autoComplete='current-password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {errorMessage && (
                        <div role='alert' className='p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-medium'>
                            {errorMessage}
                        </div>
                    )}

                    <button
                        className='p-3 mt-2 bg-black hover:bg-gray-800 disabled:opacity-50 text-white font-medium rounded-xl transition cursor-pointer'
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
