import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'

const MainLayout = () => {
    const [searchText, setSearchText] = useState("")
    const[isSearchOpen,setIsSearchOpen] =useState(false)
    console.log(searchText)

    return (
        <div>
            <Navbar searchText={searchText} setSearchText={setSearchText} />
            <Outlet context={isSearchOpen} />
        </div>
    )
}

export default MainLayout