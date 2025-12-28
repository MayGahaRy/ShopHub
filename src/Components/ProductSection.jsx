import React, { useState, useMemo } from 'react'
import ProductCard from './ProductCard'
import { useApp } from '../context/AppContext'

export default function ProductSection() {
    const { products } = useApp()
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [priceRange, setPriceRange] = useState('All')

    // Get unique categories
    const categories = ['All', ...new Set(products.map(p => p.category))]

    // Filter products based on search, category, and price
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // Search filter
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())

            // Category filter
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory

            // Price filter
            let matchesPrice = true
            if (priceRange === 'Under $50') matchesPrice = product.price < 50
            else if (priceRange === '$50 - $100') matchesPrice = product.price >= 50 && product.price <= 100
            else if (priceRange === '$100 - $200') matchesPrice = product.price > 100 && product.price <= 200
            else if (priceRange === 'Over $200') matchesPrice = product.price > 200

            return matchesSearch && matchesCategory && matchesPrice
        })
    }, [searchQuery, selectedCategory, priceRange, products])

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-4xl font-black text-[var(--text-primary)] mb-2 italic uppercase">Featured <span className="text-blue-600">Products</span></h2>
                <p className="text-[var(--text-secondary)] font-medium">Discover our latest collection of premium items</p>
            </div>

            {/* Search and Filters */}
            <div className="mb-8 space-y-6">
                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-6 py-4 pl-14 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl focus:outline-none focus:border-blue-500 text-[var(--text-primary)] transition-colors shadow-sm placeholder:text-[var(--text-muted)]"
                    />
                    <svg
                        className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Category Filters */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Categories</h3>
                    <div className="flex flex-wrap gap-3">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 uppercase tracking-widest text-xs border ${selectedCategory === category
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg scale-105'
                                    : 'bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-blue-500 hover:text-white'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price Range Filters */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Price Range</h3>
                    <div className="flex flex-wrap gap-3">
                        {['All', 'Under $50', '$50 - $100', '$100 - $200', 'Over $200'].map(range => (
                            <button
                                key={range}
                                onClick={() => setPriceRange(range)}
                                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${priceRange === range
                                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg scale-105'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-6 flex items-center justify-between border-b border-[var(--border-color)] pb-6">
                <p className="text-[var(--text-secondary)]">
                    Showing <span className="font-black text-[var(--text-primary)]">{filteredProducts.length}</span> products
                </p>

                {(searchQuery || selectedCategory !== 'All' || priceRange !== 'All') && (
                    <button
                        onClick={() => {
                            setSearchQuery('')
                            setSelectedCategory('All')
                            setPriceRange('All')
                        }}
                        className="text-blue-500 hover:text-blue-600 font-medium flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Clear all filters
                    </button>
                )}
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                </div>
            )}
        </div>
    )
}
