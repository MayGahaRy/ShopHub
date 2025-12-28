import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Nav from '../Components/Nav'

export default function Reviews() {
    const { products, reviews, user, isAuthenticated } = useApp()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate])

    const userReviews = reviews.filter(r => r.userId === user?.id)

    if (userReviews.length === 0) {
        return (
            <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-500">
                <Nav />
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="text-center">
                        <svg className="w-32 h-32 mx-auto text-[var(--border-color)] mb-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <h2 className="text-4xl font-black text-[var(--text-primary)] mb-4 italic uppercase tracking-tighter">No reviews <span className="text-blue-600">yet</span></h2>
                        <p className="text-[var(--text-secondary)] mb-10 font-medium">Share your thoughts on products you've purchased!</p>
                        <Link
                            to="/"
                            className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:shadow-2xl hover:shadow-blue-500/30 transition-all active:scale-95"
                        >
                            Start Reviewing
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
                <h1 className="text-5xl font-black text-[var(--text-primary)] mb-10 italic uppercase tracking-tighter">My <span className="text-blue-600">Reviews</span></h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {userReviews.map(review => {
                        const product = products.find(p => p.id === review.productId)
                        return (
                            <div key={review.id} className="bg-[var(--bg-surface)] rounded-2xl shadow-sm overflow-hidden border border-[var(--border-color)] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                <div className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <img
                                            src={product?.image}
                                            alt={product?.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div>
                                            <h3 className="font-black text-[var(--text-primary)] line-clamp-1 uppercase tracking-tight text-sm">{product?.name}</h3>
                                            <div className="flex items-center gap-1 text-yellow-500">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-current' : 'text-[var(--border-color)] fill-current opacity-30'}`}
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <svg className="absolute top-0 left-0 w-10 h-10 text-blue-500/10 transform -translate-x-4 -translate-y-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 16.6569 20.6739 18 19.017 18H16.017C15.4647 18 15.017 18.4477 15.017 19V21L14.017 21Z" />
                                            <path d="M8.01691 21L8.01691 18C8.01691 16.8954 8.91234 16 10.0169 16H13.0169C13.5692 16 14.0169 15.5523 14.0169 15V9C14.0169 8.44772 13.5692 8 13.0169 8H9.01691C8.46462 8 8.01691 8.44772 8.01691 9V11C8.01691 11.5523 7.56919 12 7.01691 12H6.01691V5H16.0169V15C16.0169 16.6569 14.6738 18 13.0169 18H10.0169C9.46462 18 9.01691 18.4477 9.01691 19V21L8.01691 21Z" />
                                        </svg>
                                        <p className="text-[var(--text-secondary)] italic relative z-10 font-medium leading-relaxed">{review.comment}</p>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-[var(--border-color)] flex justify-between items-center text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">
                                        <span>{new Date(review.date).toLocaleDateString()}</span>
                                        <Link to={`/product/${product?.id}`} className="text-blue-600 hover:text-blue-500 transition-colors">
                                            View Product
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
