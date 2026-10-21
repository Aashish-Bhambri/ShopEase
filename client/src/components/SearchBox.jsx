import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { Target } from 'lucide-react';

const SearchBox = ({ isSearchOpen, setIsSearchOpen }) => {
    const [searchText, setSearchText] = useState('');
    console.log(searchText)
    const getSearchPProducts = async (req, res) => {
        try {
            const res = await api.get(`/products?search=${searchText}`)
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getSearchPProducts()
    }, [searchText])

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white p-4 rounded-lg shadow-lg flex ">
                <button onClick={() => setIsSearchOpen(!isSearchOpen)}>X</button>
                <input
                    type="search"
                    name="search"
                    placeholder="Search for products..."
                    aria-label="Search for products"
                    className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted border "
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
            <div>

            </div>
        </div>
    )
}

export default SearchBox