import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Nav from '../Components/Nav'

export default function Cart() {
    const { cartItems, updateCartQuantity, removeFromCart, getCartTotal, clearCart, addOrder, isAuthenticated, validateCoupon } = useApp()
    const navigate = useNavigate()
    const [couponCode, setCouponCode] = useState('')
    const [activeCoupon, setActiveCoupon] = useState(null)
    const [couponError, setCouponError] = useState('')

    const subtotal = getCartTotal()

    // Calculate total discount
    let discountAmount = 0
    if (activeCoupon) {
        if (activeCoupon.type === 'percent') {
            discountAmount = (subtotal * activeCoupon.discount) / 100
        }
    }

    const shipping = (subtotal > 100 || activeCoupon?.type === 'freeship') ? 0 : 10
    const total = subtotal - discountAmount + shipping

    const handleApplyCoupon = () => {
        setCouponError('')
        const coupon = validateCoupon(couponCode.toUpperCase())

        if (coupon) {
            setActiveCoupon(coupon)
            setCouponCode('')
        } else {
            setCouponError('Invalid coupon code')
            setActiveCoupon(null)
        }
    }

    const handleCheckout = () => {
        if (!isAuthenticated) {
            navigate('/login')
            return
        }

        const orderId = addOrder()
        if (orderId) {
            navigate('/orders')
        }
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-500">
                <Nav />
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="text-center">
                        <svg className="w-32 h-32 mx-auto text-[var(--text-muted)] mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Your cart is empty</h2>
                        <p className="text-[var(--text-secondary)] mb-8">Add some products to get started!</p>
                        <Link
                            to="/"
                            className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:shadow-lg"
                        >
                            Continue Shopping
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
                <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="bg-[var(--bg-surface)] rounded-xl p-6 shadow-sm relative overflow-hidden border border-[var(--border-color)]">
                                {item.discount > 0 && (
                                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                        SALE {item.discount}% OFF
                                    </div>
                                )}
                                <div className="flex gap-6">
                                    {/* Image */}
                                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-32 h-32 object-cover rounded-lg border border-[var(--border-color)]"
                                        />
                                    </Link>

                                    {/* Details */}
                                    <div className="flex-1">
                                        <Link to={`/product/${item.id}`}>
                                            <h3 className="text-lg font-bold text-[var(--text-primary)] hover:text-blue-600 transition-colors mb-2">
                                                {item.name}
                                            </h3>
                                        </Link>
                                        <p className="text-[var(--text-secondary)] text-sm mb-4">{item.description}</p>

                                        <div className="flex items-center justify-between">
                                            {/* Quantity */}
                                            <div className="flex items-center border-2 border-[var(--border-color)] rounded-lg bg-[var(--bg-secondary)]">
                                                <button
                                                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                                    className="px-3 py-2 hover:bg-[var(--bg-surface)] transition-colors text-[var(--text-primary)]"
                                                >
                                                    -
                                                </button>
                                                <span className="px-4 py-2 font-semibold text-[var(--text-primary)]">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                                    className="px-3 py-2 hover:bg-[var(--bg-surface)] transition-colors text-[var(--text-primary)]"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-[var(--text-primary)]">
                                                    ${(item.price * (1 - (item.discount || 0) / 100) * item.quantity).toFixed(2)}
                                                </p>
                                                <p className="text-sm text-[var(--text-muted)]">
                                                    {item.discount > 0 ? (
                                                        <>
                                                            <span className="line-through mr-1">${item.price}</span>
                                                            <span className="text-red-500">${(item.price * (1 - item.discount / 100)).toFixed(2)} each</span>
                                                        </>
                                                    ) : (
                                                        `$${item.price} each`
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-[var(--text-muted)] hover:text-red-500 transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Clear Cart */}
                        <button
                            onClick={clearCart}
                            className="text-red-500 hover:text-red-600 font-medium flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Clear Cart
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-[var(--bg-surface)] rounded-xl p-6 shadow-sm sticky top-4 border border-[var(--border-color)]">
                            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Order Summary</h2>

                            {/* Coupon */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Coupon Code</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="Enter code"
                                        className="flex-1 px-4 py-2 border-2 border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-lg focus:outline-none focus:border-blue-500 placeholder:text-[var(--text-muted)]"
                                    />
                                    <button
                                        onClick={handleApplyCoupon}
                                        className="px-4 py-2 bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-blue-600 hover:text-white rounded-lg font-medium transition-colors"
                                    >
                                        Apply
                                    </button>
                                </div>
                                {couponError && <p className="mt-2 text-xs text-red-500">{couponError}</p>}
                                {activeCoupon && (
                                    <div className="mt-2 bg-green-500/10 border border-green-500/20 text-green-600 px-3 py-2 rounded-lg text-sm flex justify-between items-center">
                                        <span>Code <b>{activeCoupon.code}</b> applied!</span>
                                        <button onClick={() => setActiveCoupon(null)} className="text-green-800 dark:text-green-400 hover:opacity-75 transition-opacity">&times;</button>
                                    </div>
                                )}
                            </div>

                            {/* Totals */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-[var(--text-secondary)]">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-[var(--text-primary)]">${subtotal.toFixed(2)}</span>
                                </div>
                                {activeCoupon && (
                                    <div className="flex justify-between text-green-600 font-medium">
                                        <span>Discount ({activeCoupon.type === 'freeship' ? 'Free Shipping' : `${activeCoupon.discount}%`})</span>
                                        <span>
                                            {activeCoupon.type === 'freeship' ? '$0' : `-$${discountAmount.toFixed(2)}`}
                                        </span>
                                    </div>
                                )}
                                <div className="flex justify-between text-[var(--text-secondary)]">
                                    <span>Shipping</span>
                                    <span className="font-semibold text-[var(--text-primary)]">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="border-t-2 border-[var(--border-color)] pt-3 flex justify-between text-lg font-bold text-[var(--text-primary)]">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <button
                                onClick={handleCheckout}
                                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:shadow-lg mb-4"
                            >
                                {isAuthenticated ? 'Place Order' : 'Login to Checkout'}
                            </button>

                            <Link
                                to="/"
                                className="block text-center text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
