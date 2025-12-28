import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import Nav from '../Components/Nav'

export default function Account() {
    const { user, logout } = useApp()
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        country: ''
    })

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSave = () => {
        // Save logic here
        setIsEditing(false)
    }

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-500">
            <Nav />

            <div className="max-w-4xl mx-auto px-4 py-12">
                <h1 className="text-5xl font-black text-[var(--text-primary)] mb-10 italic uppercase tracking-tighter">Account <span className="text-blue-600">Settings</span></h1>

                {/* Profile Section */}
                <div className="bg-[var(--bg-surface)] rounded-2xl p-8 shadow-sm mb-8 border border-[var(--border-color)]">
                    <div className="flex items-center gap-6 mb-8">
                        <img
                            src={user?.avatar}
                            alt={user?.name}
                            className="w-24 h-24 rounded-full"
                        />
                        <div>
                            <h2 className="text-3xl font-black text-[var(--text-primary)] uppercase italic tracking-tighter">{user?.name}</h2>
                            <p className="text-[var(--text-secondary)] font-medium">{user?.email}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tight">Personal Information</h3>
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-6 py-2 text-blue-600 hover:bg-blue-500/10 rounded-xl font-black uppercase text-xs tracking-widest transition-all active:scale-95"
                            >
                                Edit
                            </button>
                        ) : (
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-2 text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] rounded-xl font-black uppercase text-xs tracking-widest transition-all active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                                >
                                    Save
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-black text-[var(--text-muted)] uppercase tracking-widest mb-2 ml-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full px-5 py-4 bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-2xl focus:outline-none focus:border-blue-500 disabled:opacity-50 text-[var(--text-primary)] font-medium transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-[var(--text-muted)] uppercase tracking-widest mb-2 ml-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full px-5 py-4 bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-2xl focus:outline-none focus:border-blue-500 disabled:opacity-50 text-[var(--text-primary)] font-medium transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-[var(--text-muted)] uppercase tracking-widest mb-2 ml-1">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full px-5 py-4 bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-2xl focus:outline-none focus:border-blue-500 disabled:opacity-50 text-[var(--text-primary)] font-medium transition-all"
                                placeholder="Enter phone number"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-[var(--text-muted)] uppercase tracking-widest mb-2 ml-1">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full px-5 py-4 bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-2xl focus:outline-none focus:border-blue-500 disabled:opacity-50 text-[var(--text-primary)] font-medium transition-all"
                                placeholder="Enter city"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-black text-[var(--text-muted)] uppercase tracking-widest mb-2 ml-1">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full px-5 py-4 bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-2xl focus:outline-none focus:border-blue-500 disabled:opacity-50 text-[var(--text-primary)] font-medium transition-all"
                                placeholder="Enter address"
                            />
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <div className="bg-[var(--bg-surface)] rounded-2xl p-8 shadow-sm mb-8 border border-[var(--border-color)]">
                    <h3 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tight mb-8">Security</h3>
                    <button className="px-8 py-4 border-2 border-[var(--border-color)] text-[var(--text-primary)] rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[var(--bg-secondary)] transition-all active:scale-95">
                        Change Password
                    </button>
                </div>

                {/* Danger Zone */}
                <div className="bg-red-500/5 rounded-2xl p-8 shadow-sm border-2 border-red-500/20">
                    <h3 className="text-xl font-black text-red-600 uppercase tracking-tight mb-4">Danger Zone</h3>
                    <p className="text-[var(--text-secondary)] mb-8 font-medium">Once you delete your account, there is no going back. All your data will be permanently removed.</p>
                    <button className="px-8 py-4 bg-red-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-red-500/20">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    )
}
