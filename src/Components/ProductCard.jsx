import React from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function ProductCard({ product }) {
    const { id, name, description, price, image, category, rating, inStock } = product
    const { addToCart, toggleFavorite, isFavorite, getProductAverageRating, getProductReviews } = useApp()

    // Get dynamic rating if available
    const productReviews = getProductReviews(id)
    const avgRating = productReviews.length > 0 ? getProductAverageRating(id) : rating

    const handleAddToCart = (e) => {
        e.preventDefault()
        if (inStock) {
            addToCart(product)
        }
    }

    const handleToggleFavorite = (e) => {
        e.preventDefault()
        toggleFavorite(product)
    }

    return (
        <Link to={`/product/${id}`} className="block">
            <div className="group relative bg-[var(--bg-surface)] rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-[var(--border-color)]">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-[var(--bg-secondary)]">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                        {!inStock && (
                            <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                                Out of Stock
                            </span>
                        )}
                        {category && (
                            <span className="px-3 py-1 bg-blue-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                                {category}
                            </span>
                        )}
                    </div>

                    {/* Favorite Button */}
                    <button
                        onClick={handleToggleFavorite}
                        className={`absolute top-3 right-3 p-2 rounded-full shadow-lg transition-colors z-10 ${isFavorite(id)
                            ? 'bg-red-500 text-white'
                            : 'bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-red-500'
                            }`}
                    >
                        <svg className={`w-5 h-5 ${isFavorite(id) ? 'fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>

                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <span className="px-6 py-2 bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 border border-[var(--border-color)]">
                            Quick View
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(avgRating) ? 'text-yellow-400' : 'text-[var(--text-muted)]'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                        <span className="text-sm text-[var(--text-muted)] ml-1">({avgRating.toFixed(1)})</span>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                        {description}
                    </p>

                    {/* Price and Cart Button */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-[var(--text-primary)]">${price}</span>
                            {product.originalPrice && (
                                <span className="text-sm text-[var(--text-muted)] line-through">${product.originalPrice}</span>
                            )}
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${inStock
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:scale-105'
                                : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border-color)] cursor-not-allowed'
                                }`}
                            disabled={!inStock}
                        >
                            {inStock ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            ) : (
                                <span className="text-xs">Unavailable</span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Discount Badge */}
                {product.discount > 0 && (
                    <div className="absolute top-12 right-3 bg-gradient-to-br from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        -{product.discount}%
                    </div>
                )}
            </div>
        </Link>
    )
}
