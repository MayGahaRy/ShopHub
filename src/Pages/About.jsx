import React, { useEffect } from 'react'
import Nav from '../Components/Nav'
import Footer from '../Components/Footer'
import Features from '../Components/Features'

export default function About() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-500">
            <Nav />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=800&fit=crop"
                        alt="Join our community"
                        className="w-full h-full object-cover opacity-30 dark:opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]"></div>
                </div>

                <div className="relative z-10 text-center space-y-6 max-w-4xl px-4 mt-20">
                    <h4 className="text-blue-500 font-black tracking-[0.5em] uppercase text-xs reveal opacity-0 translate-y-4">Our Mission</h4>
                    <h1 className="text-6xl md:text-8xl font-black text-[var(--text-primary)] italic tracking-tighter reveal opacity-0 translate-y-4 delay-100">
                        BEYOND THE <span className="text-blue-600">TRANSACTION.</span>
                    </h1>
                    <p className="text-xl text-[var(--text-secondary)] font-medium max-w-2xl mx-auto reveal opacity-0 translate-y-4 delay-200">
                        At ShopHub, we believe technology and lifestyle should seamlessly intertwine to empower the modern visionary.
                    </p>
                </div>
            </section>

            {/* Story Grid */}
            <section className="py-24 max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-10 reveal opacity-0 -translate-x-10">
                        <h2 className="text-4xl font-black text-[var(--text-primary)] leading-tight italic">
                            Redefining the <span className="text-blue-600">Marketplace.</span>
                        </h2>
                        <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
                            <p>
                                Founded in 2024 by a team of design enthusiasts and tech veterans, ShopHub was born out of frustration with cluttered, soul-less shopping experiences.
                            </p>
                            <p>
                                We spent months hand-picking partners who share our commitment to sustainability, ethical production, and uncompromising quality. Every pixel of this platform and every product in our catalog is a testament to that vision.
                            </p>
                        </div>
                        <div className="flex gap-10">
                            {[
                                { val: '2024', label: 'Est.' },
                                { val: '50+', label: 'Brands' },
                                { val: '1M+', label: 'Reach' }
                            ].map((stat, i) => (
                                <div key={i}>
                                    <h5 className="text-3xl font-black text-[var(--text-primary)]">{stat.val}</h5>
                                    <p className="text-xs text-[var(--text-muted)] font-black uppercase tracking-widest">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative reveal opacity-0 translate-x-10">
                        <div className="absolute -inset-4 bg-blue-600/20 rounded-[3rem] blur-3xl"></div>
                        <img
                            src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop"
                            alt="Our Office"
                            className="relative rounded-[2.5rem] shadow-2xl border border-[var(--border-color)]"
                        />
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <Features />

            {/* Community Section */}
            <section className="py-32 bg-[var(--bg-secondary)] text-center transition-colors">
                <div className="max-w-4xl mx-auto px-4 space-y-10 reveal opacity-0 translate-y-10">
                    <h2 className="text-5xl font-black text-[var(--text-primary)] italic">JOINT THE <span className="text-blue-600 px-4 py-2 border-2 border-blue-600 rounded-2xl not-italic">VISION.</span></h2>
                    <p className="text-[var(--text-secondary)] text-lg">
                        We are more than just a store. We are a community of forward-thinkers.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <button className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-500 shadow-xl shadow-blue-500/20 transition-all">
                            Careers at ShopHub
                        </button>
                        <button className="px-10 py-5 bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-2xl font-black border border-[var(--border-color)] hover:bg-[var(--bg-primary)] transition-all">
                            Partner with Us
                        </button>
                    </div>
                </div>
            </section>

            <Footer />

            <style dangerouslySetInnerHTML={{
                __html: `
                .reveal { transition: all 1s cubic-bezier(0.4, 0, 0.2, 1); }
                .reveal.visible { opacity: 1 !important; transform: translate(0) !important; }
            `}} />
        </div>
    )
}
