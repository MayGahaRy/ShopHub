import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'

export default function AdminMarketing() {
    const { coupons, addCoupon, removeCoupon, products, applyCategoryDiscount } = useApp()

    // Coupon Form State
    const [couponForm, setCouponForm] = useState({
        code: '',
        discount: '',
        type: 'percent' // percent or freeship
    })

    // Offer Form State
    const [offerCategory, setOfferCategory] = useState('')
    const [offerDiscount, setOfferDiscount] = useState('')

    const handleCreateCoupon = (e) => {
        e.preventDefault()
        if (!couponForm.code || !couponForm.discount) return

        addCoupon({
            code: couponForm.code.toUpperCase(),
            discount: parseInt(couponForm.discount),
            type: couponForm.type
        })
        setCouponForm({ code: '', discount: '', type: 'percent' })
    }

    const handleApplyOffer = (e) => {
        e.preventDefault()
        if (!offerCategory || !offerDiscount) return

        applyCategoryDiscount(offerCategory, parseInt(offerDiscount))
        setOfferCategory('')
        setOfferDiscount('')
    }

    const categories = ['Electronics', 'Fashion', 'Home']

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">Marketing Center</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Coupon Management */}
                <div className="space-y-6">
                    <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="text-2xl">🎟️</span> Create Coupon
                        </h2>
                        <form onSubmit={handleCreateCoupon} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Coupon Code</label>
                                <input
                                    type="text"
                                    value={couponForm.code}
                                    onChange={e => setCouponForm({ ...couponForm, code: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    placeholder="e.g., SUMMER25"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Discount Value</label>
                                    <input
                                        type="number"
                                        value={couponForm.discount}
                                        onChange={e => setCouponForm({ ...couponForm, discount: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                        placeholder="20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
                                    <select
                                        value={couponForm.type}
                                        onChange={e => setCouponForm({ ...couponForm, type: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="percent">Percentage (%)</option>
                                        <option value="freeship">Free Shipping</option>
                                    </select>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                            >
                                Create Coupon
                            </button>
                        </form>
                    </div>

                    <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
                        <h2 className="text-xl font-bold text-white mb-6">Active Coupons</h2>
                        <div className="space-y-4">
                            {coupons.map((coupon, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-700/50 p-4 rounded-xl border border-gray-600">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-green-500/20 text-green-500 rounded-lg flex items-center justify-center font-bold">
                                            %
                                        </div>
                                        <div>
                                            <p className="font-bold text-white tracking-wider">{coupon.code}</p>
                                            <p className="text-sm text-gray-400">
                                                {coupon.type === 'freeship' ? 'Free Shipping' : `${coupon.discount}% Off`}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeCoupon(coupon.code)}
                                        className="text-red-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {coupons.length === 0 && (
                                <p className="text-gray-500 text-center py-4">No active coupons</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bulk Offers */}
                <div className="space-y-6">
                    <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="text-2xl">🔥</span> Bulk Category Offers
                        </h2>
                        <p className="text-gray-400 mb-6 text-sm">
                            Apply a discount to ALL products in a specific category instantly.
                        </p>
                        <form onSubmit={handleApplyOffer} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Target Category</label>
                                <select
                                    value={offerCategory}
                                    onChange={e => setOfferCategory(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Discount Percent (%)</label>
                                <input
                                    type="number"
                                    value={offerDiscount}
                                    onChange={e => setOfferDiscount(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    placeholder="e.g. 15"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                            >
                                Apply Bulk Discount
                            </button>
                        </form>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl p-6 text-white">
                        <h3 className="text-lg font-bold mb-2">Pro Tip</h3>
                        <p className="text-blue-100 text-sm opacity-90">
                            Create a specific coupon code like <b>FLASH50</b> for short-term sales campaigns to boost engagement by 200%.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
