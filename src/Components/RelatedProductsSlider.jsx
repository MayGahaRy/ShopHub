import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'

export default function RelatedProductsSlider({ products, currentProductId }) {
    const sliderRef = useRef(null)

    const scroll = (direction) => {
        const slider = sliderRef.current
        if (slider) {
            const scrollAmount = 300
            slider.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    // Filter out current product
    const relatedProducts = products.filter(p => p.id !== currentProductId)

    return (
        <div className="py-12 bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">You May Also Like</h2>
                        <p className="text-[var(--text-secondary)]">Similar products from this category</p>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="p-3 bg-[var(--bg-surface)] hover:bg-[var(--bg-secondary)] rounded-full shadow-lg transition-all duration-300 hover:scale-110 border border-[var(--border-color)]"
                            aria-label="Scroll left"
                        >
                            <svg className="w-6 h-6 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-3 bg-[var(--bg-surface)] hover:bg-[var(--bg-secondary)] rounded-full shadow-lg transition-all duration-300 hover:scale-110 border border-[var(--border-color)]"
                            aria-label="Scroll right"
                        >
                            <svg className="w-6 h-6 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Scrollable Product Grid */}
                <div
                    ref={sliderRef}
                    className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {relatedProducts.map(product => (
                        <div key={product.id} className="flex-none w-72">
                            <Link to={`/product/${product.id}`}>
                                <ProductCard product={product} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
