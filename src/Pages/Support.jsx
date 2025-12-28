import React, { useState } from 'react'
import Nav from '../Components/Nav'
import { useApp } from '../context/AppContext'

export default function Support() {
    const { addNotification } = useApp()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        image: null
    })
    const fileInputRef = React.useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        addNotification('success', 'Message Sent', 'We have received your message and will get back to you shortly.')
        setFormData({ name: '', email: '', subject: '', message: '', image: null })
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result }))
            }
            reader.readAsDataURL(file)
        }
    }

    const faqs = [
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for all unused items in their original packaging. Simply contact our support team to initiate a return."
        },
        {
            question: "How long does shipping take?",
            answer: "Standard shipping takes 3-5 business days. Express shipping options are available at checkout for 1-2 day delivery."
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes, we ship to over 50 countries worldwide. International shipping times vary by location, typically taking 7-14 business days."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order ships, you will receive a tracking number via email. You can also view your order status in the 'My Orders' section of your account."
        }
    ]

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-500">
            <Nav />

            <div className="max-w-7xl mx-auto px-4 py-20">
                <h1 className="text-5xl font-black text-center text-[var(--text-primary)] mb-6 italic uppercase tracking-tighter">Help & <span className="text-blue-600">Support</span></h1>
                <p className="text-center text-[var(--text-secondary)] mb-20 max-w-2xl mx-auto font-medium">
                    Have questions? We're here to help. Check out our FAQs or send us a message directly.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* FAQ Section */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-black text-[var(--text-primary)] mb-10 italic uppercase">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-[var(--bg-surface)] rounded-2xl shadow-sm border border-[var(--border-color)] p-8 transition-all hover:shadow-md">
                                    <h3 className="font-bold text-lg text-[var(--text-primary)] mb-3">{faq.question}</h3>
                                    <p className="text-[var(--text-secondary)] leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-[var(--bg-surface)] rounded-[2.5rem] shadow-xl p-10 border border-[var(--border-color)]">
                        <h2 className="text-2xl font-black text-[var(--text-primary)] mb-8 italic uppercase">Send a <span className="text-blue-600">Message</span></h2>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-black text-[var(--text-muted)] uppercase tracking-widest mb-3">Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full px-6 py-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-[var(--text-muted)]"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-black text-[var(--text-muted)] uppercase tracking-widest mb-3">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        className="w-full px-6 py-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-[var(--text-muted)]"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-black text-[var(--text-muted)] uppercase tracking-widest mb-3">Subject</label>
                                <select
                                    required
                                    value={formData.subject}
                                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                                    className="w-full px-6 py-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500/20 outline-none transition-all appearance-none cursor-pointer"
                                >
                                    <option value="">Select a topic</option>
                                    <option value="order">Order Inquiry</option>
                                    <option value="return">Return/Refund</option>
                                    <option value="product">Product Question</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-black text-[var(--text-muted)] uppercase tracking-widest mb-3">Message</label>
                                <textarea
                                    required
                                    rows="6"
                                    value={formData.message}
                                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                    className="w-full px-6 py-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-[var(--text-muted)]"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Attachment (Optional)</label>
                                <div className="flex items-center gap-4">
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                        {formData.image ? 'Change Image' : 'Upload Image'}
                                    </button>
                                    {formData.image && (
                                        <div className="relative">
                                            <img src={formData.image} alt="Preview" className="w-12 h-12 rounded object-cover border border-gray-200" />
                                            <button
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
