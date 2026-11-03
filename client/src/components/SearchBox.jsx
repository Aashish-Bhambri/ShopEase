import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import api from '../services/api'

const SearchBox = ({ setIsSearchOpen }) => {
    const [searchText, setSearchText] = useState('')
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const query = searchText.trim()

        if (query.length < 2) {
            return undefined
        }

        const controller = new AbortController()
        const timeoutId = window.setTimeout(async () => {
            try {
                const response = await api.get('/products', {
                    params: { search: query, limit: 5 },
                    signal: controller.signal,
                })

                if (!Array.isArray(response.data.products)) {
                    throw new Error('The product search returned an invalid response.')
                }

                setProducts(response.data.products)
                setError('')
            } catch (requestError) {
                if (controller.signal.aborted) {
                    return
                }

                console.error('Unable to search products.', requestError)
                setProducts([])
                setError('Search is unavailable right now. Please try again.')
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false)
                }
            }
        }, 250)

        return () => {
            window.clearTimeout(timeoutId)
            controller.abort()
        }
    }, [searchText])

    useEffect(() => {
        const closeOnEscape = (event) => {
            if (event.key === 'Escape') {
                setIsSearchOpen(false)
            }
        }

        window.addEventListener('keydown', closeOnEscape)
        return () => window.removeEventListener('keydown', closeOnEscape)
    }, [setIsSearchOpen])

    const submitSearch = (event) => {
        event.preventDefault()
        const query = searchText.trim()

        if (!query) {
            return
        }

        setIsSearchOpen(false)
        navigate(`/shop?search=${encodeURIComponent(query)}`)
    }

    const chooseProduct = (product) => {
        setIsSearchOpen(false)
        navigate(`/products/${product.slug || product._id || product.id}`)
    }

    const handleSearchChange = (event) => {
        const value = event.target.value
        setSearchText(value)
        setProducts([])
        setError('')

        if (value.trim().length >= 2) {
            setIsLoading(true)
        } else {
            setIsLoading(false)
        }
    }

    return (
        <div
            className='fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-[12vh] sm:pt-[16vh]'
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    setIsSearchOpen(false)
                }
            }}
        >
            <section
                role='dialog'
                aria-modal='true'
                aria-labelledby='search-title'
                className='w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl'
            >
                <h2 id='search-title' className='sr-only'>Search products</h2>
                <form onSubmit={submitSearch} className='flex items-center gap-3 border-b border-gray-200 px-4'>
                    <Search size={20} aria-hidden='true' className='shrink-0 text-gray-500' />
                    <input
                        autoFocus
                        type='search'
                        name='search'
                        value={searchText}
                        placeholder='Search products...'
                        aria-label='Search products'
                        aria-controls='search-results'
                        aria-describedby={error ? 'search-error' : undefined}
                        className='h-16 min-w-0 flex-1 bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-500'
                        onChange={handleSearchChange}
                    />
                    <button
                        type='button'
                        onClick={() => setIsSearchOpen(false)}
                        aria-label='Close search'
                        className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900'
                    >
                        <X size={20} />
                    </button>
                </form>

                <div id='search-results' aria-live='polite' className='max-h-[55vh] overflow-y-auto p-3'>
                    {searchText.trim().length < 2 && (
                        <p className='px-3 py-5 text-sm text-gray-600'>
                            Type at least two characters to see matching products.
                        </p>
                    )}

                    {isLoading && (
                        <p className='px-3 py-5 text-sm text-gray-600'>Searching products...</p>
                    )}

                    {error && (
                        <p id='search-error' role='alert' className='px-3 py-5 text-sm text-red-700'>
                            {error}
                        </p>
                    )}

                    {!isLoading && !error && searchText.trim().length >= 2 && products.length === 0 && (
                        <p className='px-3 py-5 text-sm text-gray-600'>
                            No matching products. Press Enter to view search results.
                        </p>
                    )}

                    {!isLoading && products.map((product) => (
                        <button
                            key={product._id}
                            type='button'
                            onClick={() => chooseProduct(product)}
                            className='flex w-full items-center gap-4 rounded-xl px-3 py-3 text-left transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gray-900'
                        >
                            <img
                                src={product.image}
                                alt=''
                                className='h-14 w-14 shrink-0 rounded-lg bg-gray-100 object-cover'
                            />
                            <span className='min-w-0 flex-1'>
                                <span className='block truncate text-sm font-semibold text-gray-900'>
                                    {product.name}
                                </span>
                                <span className='mt-1 block truncate text-xs text-gray-600'>
                                    {product.brand}
                                </span>
                            </span>
                            <span className='shrink-0 text-sm font-semibold text-gray-900'>
                                {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: product.currency || 'USD',
                                    maximumFractionDigits: 2,
                                }).format(product.price)}
                            </span>
                        </button>
                    ))}
                </div>

                <div className='border-t border-gray-200 px-4 py-3 text-xs text-gray-600'>
                    Press Enter to see all results
                </div>
            </section>
        </div>
    )
}

export default SearchBox
