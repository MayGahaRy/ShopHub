import React from 'react';

export default function BrandStory() {
    return (
        <section className="py-32 bg-gray-900 relative overflow-hidden">
            {/* Abstract background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 skew-x-12 -z-0"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px] -z-0"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-[2px] w-12 bg-blue-500"></div>
                                <h4 className="text-blue-500 font-black tracking-[0.4em] uppercase text-xs">Exclusivity Redefined</h4>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black text-white leading-[1.1] italic tracking-tighter">
                                Crafted for <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-black">Modern Visionary.</span>
                            </h2>
                        </div>

                        <div className="space-y-6">
                            <p className="text-xl text-gray-300 leading-relaxed font-medium max-w-lg">
                                Founded in 2024, ShopHub was born out of a desire for a more curated, quality-driven online marketplace. We don't just sell products; we deliver experiences that enhance your lifestyle.
                            </p>
                            <p className="text-gray-500 leading-relaxed max-w-md">
                                Every item in our catalog is hand-selected to meet the rigorous standards of modern design and functional excellence. Your satisfaction isn't just a goal—it's our heritage.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-12 pt-4">
                            <div className="border-l-2 border-blue-600 pl-6">
                                <h5 className="text-5xl font-black text-white mb-2 tracking-tighter">10K+</h5>
                                <p className="text-gray-500 text-xs font-black uppercase tracking-widest">Global Clients</p>
                            </div>
                            <div className="border-l-2 border-purple-600 pl-6">
                                <h5 className="text-5xl font-black text-white mb-2 tracking-tighter">24/7</h5>
                                <p className="text-gray-500 text-xs font-black uppercase tracking-widest">Elite Support</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-8 pt-6">
                            <button className="px-10 py-5 bg-white text-gray-900 rounded-2xl font-black hover:bg-blue-600 hover:text-white transition-all hover:shadow-[0_20px_50px_rgba(37,99,235,0.3)] active:scale-95">
                                Explore Our Story
                            </button>
                            <div className="hidden sm:flex items-center gap-4 text-white/50 hover:text-white transition-colors cursor-pointer group">
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-blue-500 transition-colors">
                                    <span className="text-xs">▶</span>
                                </div>
                                <span className="font-bold text-sm tracking-widest uppercase">Watch Video</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative group perspective-1000">
                        {/* Glow and Shadow effects */}
                        <div className="absolute -inset-10 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-[4rem] blur-[80px] opacity-30 group-hover:opacity-60 transition-opacity"></div>

                        {/* Image Container with premium frame */}
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] border border-white/5 shadow-2xl transform transition-all duration-700 group-hover:rotate-y-6 group-hover:scale-[1.02]">
                            <img
                                src="/assets/images/brand-story.png"
                                alt="ShopHub Brand Experience"
                                className="w-full h-full object-cover"
                            />

                            {/* Glass overlay text item */}
                            <div className="absolute bottom-8 left-8 right-8 p-6 backdrop-blur-xl bg-black/40 rounded-3xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <p className="text-blue-400 font-black text-xs uppercase tracking-widest mb-1">In Detail</p>
                                <p className="text-white text-sm font-medium leading-relaxed">Curated for the ones who seek perfection in every pixel and stitch.</p>
                            </div>
                        </div>

                        {/* Abstract decoration */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .perspective-1000 { perspective: 1000px; }
                .rotate-y-6 { transform: rotateY(-6deg); }
                @keyframes pulse {
                    0%, 100% { opacity: 0.1; transform: scale(1); }
                    50% { opacity: 0.3; transform: scale(1.2); }
                }
                .animate-pulse { animation: pulse 4s ease-in-out infinite; }
            `}} />
        </section>
    );
}
