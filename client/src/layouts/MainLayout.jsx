import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'
import SearchBox from '../components/SearchBox'

const MainLayout = () => {
    const [searchText, setSearchText] = useState("")
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    return (
        <div>
            <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
            <Outlet context={isSearchOpen} />
            {
                isSearchOpen ? <SearchBox isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} /> : ''
            }
        </div>
    )
}

export default MainLayout