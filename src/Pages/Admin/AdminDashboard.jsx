import React from 'react'
import { useApp } from '../../context/AppContext'

export default function AdminDashboard() {
    const { products, orders, user } = useApp()

    const totalSales = orders.reduce((acc, order) => acc + order.total, 0)
    const recentOrders = orders.slice(0, 5)

    const stats = [
        { label: 'Total Revenue', value: `$${totalSales.toFixed(2)}`, icon: '💰', color: 'bg-green-500/10 text-green-500', trend: '+12.5% vs last month', trendColor: 'text-green-500' },
        { label: 'Total Orders', value: orders.length, icon: '🛍️', color: 'bg-blue-500/10 text-blue-500', trend: '+5.2% vs last month', trendColor: 'text-blue-500' },
        { label: 'Products', value: products.length, icon: '📦', color: 'bg-purple-500/10 text-purple-500', trend: 'Catalog updated', trendColor: 'text-gray-500' },
        { label: 'Active Users', value: '1,234', icon: '👥', color: 'bg-orange-500/10 text-orange-500', trend: '+8.1% vs last month', trendColor: 'text-green-500' }
    ]

    // Simple SVG Sparkline
    const Sparkline = () => (
        <svg className="w-full h-16 text-blue-500 mix-blend-overlay" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M0 10 Q 25 20 50 10 T 100 10" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M0 10 Q 25 20 50 10 T 100 10 V 20 H 0 Z" fill="currentColor" opacity="0.1" />
        </svg>
    )

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                    <p className="text-gray-400">Welcome back, {user?.name}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">Last updated</p>
                    <p className="text-white font-medium">{new Date().toLocaleTimeString()}</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${stat.color} group-hover:scale-110 transition-transform`}>
                                {stat.icon}
                            </div>
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-gray-400 font-medium mb-1">{stat.label}</h3>
                            <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                            <p className={`text-xs ${stat.trendColor}`}>{stat.trend}</p>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <Sparkline />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sales Chart (Visual Placeholder) */}
                <div className="lg:col-span-2 bg-gray-800 rounded-2xl border border-gray-700 p-6">
                    <h2 className="text-xl font-bold text-white mb-6">Revenue Analytics</h2>
                    <div className="h-64 w-full flex items-end justify-between px-2 gap-2">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                            <div key={i} className="w-full bg-blue-600/20 rounded-t-sm hover:bg-blue-600/50 transition-colors relative group">
                                <div style={{ height: `${h}%` }} className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-purple-500 rounded-t-sm"></div>
                                {/* Tooltip */}
                                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                                    ${(h * 100).toFixed(0)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-gray-500 text-sm mt-4">
                        <span>Jan</span><span>Dec</span>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
                    <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((_, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-2 bg-gray-700 rounded-full relative">
                                    <div className="absolute top-0 w-full h-2 bg-blue-500 rounded-full"></div>
                                </div>
                                <div>
                                    <p className="text-gray-300 text-sm">New order placed by <span className="text-white font-medium">Customer #{1000 + i}</span></p>
                                    <p className="text-gray-500 text-xs mt-1">2 mins ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Recent Orders</h2>
                    <button className="text-blue-500 hover:text-blue-400 text-sm">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-400">
                        <thead className="bg-gray-700/50 text-gray-300 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-700/30 transition-colors">
                                    <td className="px-6 py-4">#{order.id}</td>
                                    <td className="px-6 py-4 font-medium text-white">{order.customer?.name || 'Guest'}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Processing' ? 'bg-blue-500/10 text-blue-500' :
                                                order.status === 'Shipped' ? 'bg-yellow-500/10 text-yellow-500' :
                                                    'bg-green-500/10 text-green-500'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-white">${order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {recentOrders.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        No orders found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
