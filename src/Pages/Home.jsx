import React, { useEffect } from 'react'
import Headersection from '../Components/headersection'
import Features from '../Components/Features'
import FlashDeals from '../Components/FlashDeals'
import BrandStory from '../Components/BrandStory'
import Footer from '../Components/Footer'
import ProductSection from '../Components/ProductSection'

export default function Home() {
    useEffect(() => {
        // Simple Intersection Observer for reveal animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-500">
            {/* Hero & Navigation */}
            <Headersection />

            {/* Trust Features */}
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out">
                <Features />
            </div>

            {/* Featured Flash Deals */}
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-100">
                <FlashDeals />
            </div>

            {/* High-end Brand Story */}
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-200">
                <BrandStory />
            </div>

            {/* Main Featured Showcase (Grid) */}
            <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out py-20 bg-[var(--bg-secondary)]">
                <div className="max-w-7xl mx-auto px-4 mb-16">
                    <h3 className="text-sm font-black text-blue-600 uppercase tracking-[0.5em] text-center mb-4">Curated Selects</h3>
                    <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] text-center mb-0 italic uppercase tracking-tighter">Trending <span className="text-blue-600">Now</span></h2>
                </div>
                <ProductSection />
            </div>

            {/* Premium Global Footer */}
            <Footer />

            <style dangerouslySetInnerHTML={{
                __html: `
                .reveal.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
            `}} />
        </div>
    )
}
