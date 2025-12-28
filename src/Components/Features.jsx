import React from 'react';

export default function Features() {
    const featureList = [
        {
            icon: "🚀",
            title: "Global Shipping",
            desc: "Fast delivery to your doorstep, anywhere in the world."
        },
        {
            icon: "🛡️",
            title: "Secure Payment",
            desc: "Multiple secure payment options with SSL encryption."
        },
        {
            icon: "💬",
            title: "Live Support",
            desc: "24/7 dedicated support team ready to assist you."
        },
        {
            icon: "♻️",
            title: "Easy Returns",
            desc: "30-day money back guarantee for peace of mind."
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {featureList.map((f, i) => (
                        <div key={i} className="group p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 border border-transparent hover:border-gray-100">
                            <div className="text-4xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 inline-block">
                                {f.icon}
                            </div>
                            <h4 className="text-xl font-black text-gray-900 mb-3">{f.title}</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
