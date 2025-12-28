import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Nav from '../Components/Nav'

export default function Dashboard() {
    const { user, isAuthenticated, cartItems, favorites, logout, orders, reviews } = useApp()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate])

    if (!user) return null

    const stats = [
        { label: 'Total Orders', value: orders.length, icon: '📦', color: 'bg-blue-100 text-blue-600' },
        { label: 'My Reviews', value: reviews.filter(r => r.userId === user.id).length, icon: '⭐', color: 'bg-yellow-100 text-yellow-600' },
        { label: 'Wishlist', value: favorites.length, icon: '❤️', color: 'bg-red-100 text-red-600' },
        { label: 'Cart Items', value: cartItems.length, icon: '🛒', color: 'bg-green-100 text-green-600' }
    ]

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-500">
            <Nav />

            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Welcome Section */}
                <div className="bg-[var(--bg-surface)] rounded-2xl p-8 shadow-sm border border-[var(--border-color)] mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-20 h-20 rounded-full border-4 border-blue-50"
                        />
                        <div>
                            <h1 className="text-3xl font-black text-[var(--text-primary)]">Welcome back, {user.name}!</h1>
                            <p className="text-[var(--text-secondary)] font-medium">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="px-6 py-2 border-2 border-red-500/10 text-red-500 rounded-xl hover:bg-red-500/5 font-black text-sm uppercase transition-all active:scale-95"
                    >
                        Logout
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-[var(--bg-surface)] p-6 rounded-2xl shadow-sm border border-[var(--border-color)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${stat.color}`}>
                                    {stat.icon}
                                </div>
                                <span className="text-3xl font-black text-[var(--text-primary)] tracking-tighter">{stat.value}</span>
                            </div>
                            <p className="text-[var(--text-secondary)] font-black uppercase text-xs tracking-widest">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <h2 className="text-2xl font-black text-[var(--text-primary)] mb-8 italic uppercase">Quick <span className="text-blue-600">Actions</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Link to="/orders" className="group bg-[var(--bg-surface)] p-8 rounded-2xl shadow-sm border border-[var(--border-color)] hover:border-blue-500 transition-all duration-300">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-black text-[var(--text-primary)] mb-2 uppercase italic tracking-tighter">My Orders</h3>
                        <p className="text-[var(--text-secondary)] text-sm font-medium">Track active orders and view purchase history</p>
                    </Link>

                    <Link to="/account" className="group bg-[var(--bg-surface)] p-8 rounded-2xl shadow-sm border border-[var(--border-color)] hover:border-purple-500 transition-all duration-300">
                        <div className="w-14 h-14 bg-purple-500/10 text-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-black text-[var(--text-primary)] mb-2 uppercase italic tracking-tighter">Account Settings</h3>
                        <p className="text-[var(--text-secondary)] text-sm font-medium">Update your profile and security preferences</p>
                    </Link>

                    <Link to="/favorites" className="group bg-[var(--bg-surface)] p-8 rounded-2xl shadow-sm border border-[var(--border-color)] hover:border-red-500 transition-all duration-300">
                        <div className="w-14 h-14 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-black text-[var(--text-primary)] mb-2 uppercase italic tracking-tighter">Wishlist</h3>
                        <p className="text-[var(--text-secondary)] text-sm font-medium">View and manage saved products</p>
                    </Link>

                    <Link to="/reviews" className="group bg-[var(--bg-surface)] p-8 rounded-2xl shadow-sm border border-[var(--border-color)] hover:border-yellow-500 transition-all duration-300">
                        <div className="w-14 h-14 bg-yellow-500/10 text-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-black text-[var(--text-primary)] mb-2 uppercase italic tracking-tighter">My Reviews</h3>
                        <p className="text-[var(--text-secondary)] text-sm font-medium">Manage your product reviews and ratings</p>
                    </Link>

                    <Link to="/support" className="group bg-[var(--bg-surface)] p-8 rounded-2xl shadow-sm border border-[var(--border-color)] hover:border-green-500 transition-all duration-300">
                        <div className="w-14 h-14 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-black text-[var(--text-primary)] mb-2 uppercase italic tracking-tighter">Help & Supoort</h3>
                        <p className="text-[var(--text-secondary)] text-sm font-medium">Contact us or view FAQs</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
