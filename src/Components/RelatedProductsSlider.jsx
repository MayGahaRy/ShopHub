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
        <div className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">You May Also Like</h2>
                        <p className="text-gray-600">Similar products from this category</p>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="p-3 bg-white hover:bg-gray-100 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                            aria-label="Scroll left"
                        >
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-3 bg-white hover:bg-gray-100 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                            aria-label="Scroll right"
                        >
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
