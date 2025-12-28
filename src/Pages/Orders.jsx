import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Nav from '../Components/Nav'

export default function Orders() {
    const { orders, isAuthenticated } = useApp()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate])

    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-500">
                <Nav />
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="text-center">
                        <svg className="w-32 h-32 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <h2 className="text-3xl font-black text-[var(--text-primary)] mb-4 italic uppercase">No orders yet</h2>
                        <p className="text-[var(--text-secondary)] mb-8 font-medium">Start shopping to see your orders here!</p>
                        <Link
                            to="/"
                            className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:shadow-lg"
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
            {/* ChatWidget will be global in App.jsx */}

            <div className="max-w-7xl mx-auto px-4 py-20">
                <h1 className="text-5xl font-black text-[var(--text-primary)] mb-12 italic uppercase tracking-tighter">My <span className="text-blue-600">Orders</span></h1>

                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order.id} className="bg-[var(--bg-surface)] rounded-[2.5rem] shadow-xl overflow-hidden border border-[var(--border-color)]">
                            {/* Order Header */}
                            <div className="bg-[var(--bg-secondary)] p-8 flex flex-wrap gap-8 justify-between items-center border-b border-[var(--border-color)]">
                                <div className="flex gap-8">
                                    <div>
                                        <p className="text-xs text-[var(--text-muted)] uppercase font-black tracking-widest mb-2">Order Placed</p>
                                        <p className="text-sm font-medium text-[var(--text-primary)]">{new Date(order.date).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[var(--text-muted)] uppercase font-black tracking-widest mb-2">Total</p>
                                        <p className="text-lg font-black text-[var(--text-primary)]">${order.total.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[var(--text-muted)] uppercase font-black tracking-widest mb-2">Order #</p>
                                        <p className="text-sm font-medium text-[var(--text-primary)]">{order.id}</p>
                                    </div>
                                </div>
                                <div>
                                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${order.status === 'Processing' ? 'bg-blue-100 text-blue-600' :
                                        order.status === 'Shipped' ? 'bg-yellow-100 text-yellow-600' :
                                            'bg-green-100 text-green-600'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="p-6">
                                <div className="space-y-6">
                                    {order.items.map(item => (
                                        <div key={item.id} className="flex gap-4 items-center">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <Link to={`/product/${item.id}`} className="text-xl font-black text-[var(--text-primary)] hover:text-blue-600 transition-colors uppercase italic tracking-tighter">
                                                    {item.name}
                                                </Link>
                                                <p className="text-sm text-[var(--text-secondary)] line-clamp-1 mt-1">{item.description}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-[var(--text-primary)]">${item.price}</p>
                                                <p className="text-sm text-[var(--text-muted)]">Qty: {item.quantity}</p>
                                            </div>
                                            <Link
                                                to={`/product/${item.id}`}
                                                className="px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-lg font-medium hover:bg-blue-50 transition-colors whitespace-nowrap"
                                            >
                                                Buy Again
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
