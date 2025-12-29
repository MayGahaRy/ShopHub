import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Nav from '../Components/Nav'
import ProductCard from '../Components/ProductCard'
import Footer from '../Components/Footer'

export default function Shop() {
    const { products } = useApp()

    // --- States ---
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategories, setSelectedCategories] = useState([])
    const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 })
    const [sortBy, setSortBy] = useState('newest')
    const [showOnlyInStock, setShowOnlyInStock] = useState(false)

    // --- Computed Data ---
    const categories = useMemo(() => [...new Set(products.map(p => p.category))], [products])

    const filteredAndSortedProducts = useMemo(() => {
        let result = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)

            const finalPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price
            const matchesPrice = finalPrice >= priceRange.min && finalPrice <= priceRange.max

            const matchesStock = !showOnlyInStock || product.inStock

            return matchesSearch && matchesCategory && matchesPrice && matchesStock
        })

        // Sorting
        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => (a.price * (1 - (a.discount || 0) / 100)) - (b.price * (1 - (b.discount || 0) / 100)))
                break
            case 'price-high':
                result.sort((a, b) => (b.price * (1 - (b.discount || 0) / 100)) - (a.price * (1 - (a.discount || 0) / 100)))
                break
            case 'rating':
                result.sort((a, b) => b.rating - a.rating)
                break
            case 'newest':
            default:
                result.sort((a, b) => b.id - a.id)
                break
        }

        return result
    }, [products, searchQuery, selectedCategories, priceRange, sortBy, showOnlyInStock])

    // --- Handlers ---
    const toggleCategory = (cat) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        )
    }

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col transition-colors duration-500">
            <Nav />

            {/* Shop Header (Minimalist) */}
            <div className="bg-[var(--bg-primary)] border-b border-[var(--border-color)] py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight italic uppercase">
                                Explore <span className="text-blue-600">Catalog</span>
                            </h1>
                            <p className="text-[var(--text-secondary)] mt-2 font-medium">Find your next obsession with our professional selection.</p>
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
                            <button
                                onClick={() => setSelectedCategories([])}
                                className={`px-6 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap ${selectedCategories.length === 0
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:bg-blue-500 hover:text-white'
                                    }`}
                            >
                                All
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => toggleCategory(cat)}
                                    className={`px-6 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap ${selectedCategories.includes(cat)
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:bg-blue-500 hover:text-white'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Shop Area: Professional Filter + Grid */}
            <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-10">
                {/* Professional Sidebar Filter */}
                <aside className="lg:w-72 shrink-0 space-y-10">
                    {/* Search */}
                    <div className="bg-[var(--bg-surface)] p-6 rounded-3xl border border-[var(--border-color)] shadow-sm">
                        <h4 className="text-sm font-black text-[var(--text-muted)] uppercase tracking-widest mb-4">Search</h4>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Looking for..."
                                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl px-4 py-3 text-sm text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-[var(--text-muted)]"
                            />
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="bg-[var(--bg-surface)] p-6 rounded-3xl border border-[var(--border-color)] shadow-sm">
                        <h4 className="text-sm font-black text-[var(--text-muted)] uppercase tracking-widest mb-4">Price Range</h4>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <input
                                        type="number"
                                        value={priceRange.min}
                                        placeholder="Min"
                                        onChange={(e) => setPriceRange(p => ({ ...p, min: Math.max(0, parseInt(e.target.value) || 0) }))}
                                        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="number"
                                        value={priceRange.max}
                                        placeholder="Max"
                                        onChange={(e) => setPriceRange(p => ({ ...p, max: Math.max(0, parseInt(e.target.value) || 0) }))}
                                        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center justify-between p-6 bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-color)] shadow-sm">
                        <span className="text-sm font-black text-[var(--text-primary)]">In Stock</span>
                        <button
                            onClick={() => setShowOnlyInStock(!showOnlyInStock)}
                            className={`w-12 h-6 rounded-full transition-all relative ${showOnlyInStock ? 'bg-blue-600' : 'bg-gray-200 dark:bg-slate-700'}`}
                        >
                            <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${showOnlyInStock ? 'translate-x-6' : 'translate-x-0'}`}></span>
                        </button>
                    </div>

                    {/* Promotional Ad in Sidebar */}
                    <div className="p-8 bg-black rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        <h4 className="text-xl font-black italic mb-4">Premium <br /><span className="text-blue-500 underline">Service</span></h4>
                        <p className="text-xs text-gray-400 leading-relaxed mb-6">Unlock exclusive benefits and 24/7 dedicated support by joining our elite community.</p>
                        <button className="text-sm font-bold border-b border-blue-500 pb-1 hover:text-blue-500 transition-colors uppercase tracking-widest">Learn More</button>
                    </div>
                </aside>

                {/* Grid & Toolbar */}
                <main className="flex-1">
                    {/* Toolbar */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 bg-[var(--bg-surface)] p-6 rounded-[2.5rem] border border-[var(--border-color)] shadow-sm">
                        <div>
                            <p className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-widest">Showing</p>
                            <p className="text-lg font-black text-[var(--text-primary)] leading-tight">{filteredAndSortedProducts.length} Results</p>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full sm:w-auto bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl px-6 py-3 text-sm font-bold text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                            >
                                <option value="newest">Newest Arrival</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Top Rated</option>
                            </select>
                        </div>
                    </div>

                    {/* Product Grid */}
                    {filteredAndSortedProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                            {filteredAndSortedProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32 bg-[var(--bg-surface)] rounded-[3rem] border border-[var(--border-color)] shadow-sm">
                            <h3 className="text-2xl font-black text-[var(--text-primary)] mb-2 italic">Nothing found.</h3>
                            <p className="text-[var(--text-secondary)] max-w-xs mx-auto mb-10">Try a different filter or check back later for new arrivals.</p>
                            <button
                                onClick={() => {
                                    setSearchQuery('')
                                    setSelectedCategories([])
                                    setPriceRange({ min: 0, max: 2000 })
                                    setSortBy('newest')
                                    setShowOnlyInStock(false)
                                }}
                                className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-8 py-3 rounded-2xl font-black hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95"
                            >
                                Reset All
                            </button>
                        </div>
                    )}
                </main>
            </div>

            <Footer />
        </div>
    )
}
