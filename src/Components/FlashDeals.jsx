import React from 'react';
import { useApp } from '../context/AppContext';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

export default function FlashDeals() {
    const { products } = useApp();
    const deals = products.filter(p => p.discount > 0).slice(0, 8);

    if (deals.length === 0) return null;

    return (
        <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div className="animate-reveal">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-red-500 text-white text-xs font-black rounded-lg animate-pulse uppercase">Hot Deals</span>
                            <div className="h-[2px] w-12 bg-gray-200"></div>
                        </div>
                        <h2 className="text-4xl font-black text-gray-900 tracking-tight italic">
                            FLASH <span className="text-blue-600">DEALS</span>
                        </h2>
                        <p className="text-gray-500 mt-2 font-medium">Limited time offers. Unbeatable prices.</p>
                    </div>
                    <Link to="/shop" className="text-blue-600 font-bold hover:gap-4 transition-all flex items-center gap-2 group whitespace-nowrap">
                        Browser All Deals <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>

                <div className="flex gap-8 overflow-x-auto pb-10 scrollbar-hide snap-x snap-mandatory">
                    {deals.map(product => (
                        <div key={product.id} className="flex-none w-72 snap-center transform hover:-translate-y-2 transition-transform duration-500">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes reveal {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-reveal { animation: reveal 1s ease-out forwards; }
            `}} />
        </section>
    );
}
