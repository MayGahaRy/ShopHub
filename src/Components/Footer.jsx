import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-[var(--footer-bg)] pt-20 pb-10 text-white mt-auto border-t border-white/5 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                <div className="space-y-6">
                    <h3 className="text-3xl font-black italic tracking-tighter">ShopHub<span className="text-blue-500">.</span></h3>
                    <p className="text-gray-400 leading-relaxed max-w-sm">
                        Elevating your daily life with curated tech, fashion, and lifestyle essentials. Quality guaranteed, style redefined.
                    </p>
                    <div className="flex gap-4">
                        {['twitter', 'instagram', 'facebook'].map(social => (
                            <div key={social} className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all cursor-pointer group">
                                <span className="text-gray-400 group-hover:text-white capitalize text-xs">{social[0]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="font-bold text-lg mb-8 text-blue-500 uppercase tracking-widest text-sm">Shop Collections</h4>
                    <ul className="space-y-4 text-gray-400">
                        <li><Link to="/shop" className="hover:text-white transition-colors">Electronics & Gadgets</Link></li>
                        <li><Link to="/shop" className="hover:text-white transition-colors">Fashion & Apparel</Link></li>
                        <li><Link to="/shop" className="hover:text-white transition-colors">Home & Lifestyle</Link></li>
                        <li><Link to="/shop" className="hover:text-white transition-colors">Exclusive Offers</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-lg mb-8 text-blue-500 uppercase tracking-widest text-sm">Customer Care</h4>
                    <ul className="space-y-4 text-gray-400">
                        <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link to="/support" className="hover:text-white transition-colors">Help Center</Link></li>
                        <li><Link to="/orders" className="hover:text-white transition-colors">Track Your Order</Link></li>
                        <li><Link to="/support" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                        <li><Link to="/support" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-lg mb-8 text-blue-500 uppercase tracking-widest text-sm">Newsletter</h4>
                    <p className="text-sm text-gray-400 mb-6">Stay ahead with early access to sales and events.</p>
                    <form className="flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:border-blue-500 outline-none transition-all"
                        />
                        <button className="bg-blue-600 px-6 py-3 rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                            Subscribe Now
                        </button>
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-500 text-sm">© 2024 ShopHub Store. Built with passion for modern trade.</p>
                <div className="flex gap-8">
                    <span className="text-gray-500 text-xs">Payment Partners: Visa, Master, PayPal</span>
                </div>
            </div>
        </footer>
    );
}
