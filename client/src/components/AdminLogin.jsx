import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const AdminLogin = ({ isLoggedin = false, setIsLoggedin }) => {

    const admin = { email: "shopeease@gmail.com", password: "password1234" }

    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const uniqueId= uuidv4();

    const handleLogin = (e) => {
        e.preventDefault();
        email == admin.email && password == admin.password ? setIsLoggedin(true) : setIsLoggedin(false)

        console.log(isLoggedin)
    }
    console.log(email)
    console.log(password)
    return (
        <>

            <div className=' w-full flex flex-col items-center justify-center h-screen '>
                <a className="shrink-0  text-7xl font-black tracking-tight text-gray-900 transition hover:opacity-90 p-4 " >ShopEase</a>

                <div className='border-4 p-10 shadow-2xl '>
                    <form className='flex flex-col gap-4' onSubmit={handleLogin}>
                        <span className='text-4xl font-bold'>Welcome back</span>
                        <input className='p-4 border rounded-2xl' type='email' placeholder='Enter email' onChange={(e) => setEmail(e.target.value)}></input>
                        <input className='p-4 border rounded-2xl' type='password' placeholder='Enter password' onChange={(e) => setpassword(e.target.value)}></input>
                        <button className='p-2 bg-black text-white rounded-3xl' type='submit'>Submit</button>
                    </form>
                </div>
            </div>


        </>)
}

export default AdminLogin