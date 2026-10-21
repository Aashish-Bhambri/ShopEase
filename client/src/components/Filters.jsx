import React from 'react'

const Filters = ({ category, setCategory, range, setRange, brand }) => {
    const categories = [
        "Men's Fashion",
        "Women's Fashion",
        "Electronics",
        "Home & Living",
        "Beauty & Personal Care",
        "Sports & Outdoors"
    ]
    
    return (
        // Added max-w-sm to restrain size, min-w-[280px] to prevent extreme compression, and right-border separation
        <div className='flex flex-col p-6 w-full max-w-xs min-w-[280px] border-r border-gray-200 bg-white gap-6 h-screen '>
            
            {/* Header section */}
            <h2 className='font-bold text-2xl text-gray-800 tracking-tight'>Filters</h2>
            
            {/* Cleaner divider item */}
            <hr className='border-gray-200' />
            
            {/* Categories segment */}
            <div className='flex flex-col gap-3'>
                <span className='text-[18px] font-semibold text-gray-700 mb-1'>Category</span>
                <div className='flex flex-col gap-2'>
                    {categories.map((cat) => (
                        <div key={cat} className='flex items-center gap-3 cursor-pointer group'>
                            <input
                                className='h-4 w-4 accent-black cursor-pointer rounded'
                                type="checkbox"
                                id={cat.replaceAll(' ', '')}
                                value={cat}
                                checked={category === cat}
                                onChange={(e) => {
                                    setCategory(category === cat ? "" : e.target.value);
                                }}
                            />
                            <label 
                                htmlFor={cat.replaceAll(' ', '')} 
                                className='text-sm text-gray-600 font-medium cursor-pointer group-hover:text-black transition-colors'
                            >
                                {cat}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            
            <hr className='border-gray-200' />

            {/* Price Slider Component */}
            <div className='flex flex-col gap-3'>
                <span className='font-semibold text-[18px] text-gray-700'>Price range</span>
                
                {/* Made range slider take full width of the filter block */}
                <input 
                    className='w-full accent-black cursor-pointer h-1.5 bg-gray-200 rounded-lg appearance-none' 
                    type='range' 
                    min={50} 
                    max={5000} 
                    value={range} 
                    onChange={(e) => setRange(e.target.value)}
                />
                
                {/* Synchronized layout positions for bottom display counts */}
                <div className='flex justify-between w-full text-xs font-semibold text-gray-500 px-0.5'>
                    <div>$50</div>
                    <div className='text-black font-bold'>${range}</div>
                </div>
                
                <button className='w-full bg-black hover:bg-gray-800 transition-colors font-medium rounded-xl text-white py-2 mt-2 text-sm shadow-sm'>
                    Apply
                </button>
            </div>

            <hr className='border-gray-200' />

            {/* Brands segment */}
            <div className='flex flex-col gap-3 pb-6'>
                <span className='font-semibold text-[18px] text-gray-700 mb-1'>Brand</span>
                <div className='flex flex-col gap-2'>
                    {brand.map((brd) => (
                        <div key={brd} className='flex items-center gap-3 cursor-pointer group'>
                            <input 
                                type='checkbox' 
                                id={brd} 
                                className='h-4 w-4 accent-black cursor-pointer rounded' 
                            />
                            <label 
                                htmlFor={brd} 
                                className='text-sm text-gray-600 font-medium cursor-pointer group-hover:text-black transition-colors'
                            >
                                {brd}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Filters
