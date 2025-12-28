import React, { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function Notifications() {
    const [isOpen, setIsOpen] = useState(false)
    const { notifications, markNotificationAsRead, deleteNotification, clearAllNotifications, getUnreadNotificationsCount } = useApp()

    const unreadCount = getUnreadNotificationsCount()

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'success':
                return (
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                )
            case 'error':
                return (
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                )
            case 'warning':
                return (
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                )
            default:
                return (
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                )
        }
    }

    return (
        <div className="relative">
            {/* Bell Icon */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 hover:bg-[var(--bg-secondary)] rounded-xl transition-all active:scale-95"
            >
                <svg className="w-6 h-6 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Panel */}
                    <div className="absolute right-0 mt-3 w-96 bg-[var(--bg-surface)] rounded-2xl shadow-2xl z-50 max-h-[600px] overflow-hidden flex flex-col border border-[var(--border-color)] animate-in slide-in-from-top-2 duration-300">
                        {/* Header */}
                        <div className="p-5 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-secondary)]">
                            <h3 className="text-lg font-black text-[var(--text-primary)] uppercase italic tracking-tighter">Notifications</h3>
                            {notifications.length > 0 && (
                                <button
                                    onClick={clearAllNotifications}
                                    className="text-sm text-blue-600 hover:text-blue-700 font-black uppercase tracking-widest text-[10px]"
                                >
                                    Clear all
                                </button>
                            )}
                        </div>

                        {/* Notifications List */}
                        <div className="overflow-y-auto flex-1">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    <svg className="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                    <p>No notifications</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {notifications.map(notif => (
                                        <div
                                            key={notif.id}
                                            className={`p-5 hover:bg-[var(--bg-secondary)] transition-colors border-b border-[var(--border-color)] last:border-0 ${!notif.read ? 'bg-blue-500/5' : ''}`}
                                        >
                                            <div className="flex gap-4">
                                                {getNotificationIcon(notif.type)}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-3 mb-1">
                                                        <h4 className="font-black text-[var(--text-primary)] text-sm uppercase tracking-tight">{notif.title}</h4>
                                                        <button
                                                            onClick={() => deleteNotification(notif.id)}
                                                            className="text-[var(--text-muted)] hover:text-red-500 transition-colors"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <p className="text-sm text-[var(--text-secondary)] mb-2 font-medium leading-relaxed">{notif.message}</p>
                                                    <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest">
                                                        {new Date(notif.timestamp).toLocaleTimeString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
