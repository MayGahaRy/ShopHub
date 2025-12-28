import React from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import ProductCard from '../Components/ProductCard'
import Nav from '../Components/Nav'

export default function Favorites() {
    const { favorites } = useApp()

    if (favorites.length === 0) {
        return (
            <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-500">
                <Nav />
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="text-center">
                        <svg className="w-32 h-32 mx-auto text-[var(--border-color)] mb-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <h2 className="text-4xl font-black text-[var(--text-primary)] mb-4 italic uppercase tracking-tighter">No favorites <span className="text-pink-500">yet</span></h2>
                        <p className="text-[var(--text-secondary)] mb-10 font-medium">Start adding products to your wishlist!</p>
                        <Link
                            to="/"
                            className="inline-block bg-gradient-to-r from-pink-500 to-red-500 text-white px-10 py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:shadow-2xl hover:shadow-pink-500/30 transition-all active:scale-95"
                        >
                            Browse Products
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-500">
            <Nav />

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="mb-12">
                    <h1 className="text-5xl font-black text-[var(--text-primary)] mb-3 italic uppercase tracking-tighter">My <span className="text-pink-500">Wishlist</span></h1>
                    <p className="text-[var(--text-secondary)] font-medium">You have <span className="text-pink-500 font-black">{favorites.length}</span> item{favorites.length !== 1 ? 's' : ''} in your wishlist</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {favorites.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}
