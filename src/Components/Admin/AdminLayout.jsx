import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

export default function AdminLayout() {
    const { isAdmin, loading, logout } = useApp()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!loading && !isAdmin) {
            navigate('/admin/login')
        }
    }, [isAdmin, loading, navigate])

    const menuItems = [
        { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
        { path: '/admin/products', icon: '📦', label: 'Products' },
        { path: '/admin/orders', icon: '🛍️', label: 'Orders' },
        { path: '/admin/marketing', icon: '📢', label: 'Marketing' }, // New
        { path: '/admin/support', icon: '💬', label: 'Support' },
    ]

    const isActive = (path) => location.pathname === path

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col fixed h-full z-20">
                <div className="p-6 border-b border-gray-700">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        AdminPanel
                    </h2>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive(item.path)
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={() => {
                            logout()
                            navigate('/admin/login')
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-200"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                    <Link
                        to="/"
                        className="block text-center text-xs text-gray-500 mt-4 hover:text-white transition-colors"
                    >
                        View Live Store
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
