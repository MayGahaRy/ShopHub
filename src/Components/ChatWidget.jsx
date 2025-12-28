import React, { useState, useRef, useEffect } from 'react'
import { useApp } from '../context/AppContext'

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [inputText, setInputText] = useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const messagesEndRef = useRef(null)
    const fileInputRef = useRef(null)

    const { chatMessages, addChatMessage } = useApp()

    const emojis = ['😀', '😂', '😍', '🤔', '👍', '👎', '🎉', '❤️', '🔥', '👋', '😭', '😡']

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [chatMessages, isOpen])

    const handleSend = (e) => {
        e.preventDefault()
        if (!inputText.trim()) return

        addChatMessage({
            text: inputText,
            type: 'text'
        })
        setInputText('')
        setShowEmojiPicker(false)
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                addChatMessage({
                    image: reader.result,
                    type: 'image'
                })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleEmojiClick = (emoji) => {
        setInputText(prev => prev + emoji)
    }

    return (
        <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-4">
            {/* Chat Window */}
            {isOpen && (
                <div className="bg-[var(--bg-surface)] rounded-2xl shadow-2xl w-80 sm:w-96 h-[500px] flex flex-col overflow-hidden border border-[var(--border-color)] animate-fade-in-up">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <img
                                    src="https://ui-avatars.com/api/?name=Support+Agent&background=fff&color=2563eb"
                                    alt="Agent"
                                    className="w-10 h-10 rounded-full border-2 border-white"
                                />
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                            </div>
                            <div>
                                <h4 className="font-bold">Support Team</h4>
                                <p className="text-xs text-blue-100">Online</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/80 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 bg-[var(--bg-primary)] p-4 overflow-y-auto">
                        <div className="space-y-4">
                            {chatMessages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl p-4 border transition-all ${msg.sender === 'user'
                                            ? 'bg-blue-600 border-blue-500 text-white rounded-br-none shadow-lg shadow-blue-500/20'
                                            : 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-primary)] shadow-sm rounded-bl-none'
                                            }`}
                                    >
                                        <div className="flex flex-col gap-2">
                                            {msg.image && (
                                                <img src={msg.image} alt="Shared" className="rounded-xl max-w-full" />
                                            )}
                                            {msg.text && (
                                                <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                                            )}
                                        </div>
                                        <p className={`text-[10px] mt-2 font-bold uppercase tracking-wider ${msg.sender === 'user' ? 'text-blue-100' : 'text-[var(--text-muted)]'}`}>
                                            {new Date(msg.createdAt || msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-[var(--bg-surface)] border-t border-[var(--border-color)]">
                        <form onSubmit={handleSend} className="flex gap-2 items-center">
                            {/* Image Upload */}
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="text-[var(--text-muted)] hover:text-blue-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />

                            {/* Emoji Trigger */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                    className="text-[var(--text-muted)] hover:text-yellow-500 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                                {/* Simple Emoji Picker */}
                                {showEmojiPicker && (
                                    <div className="absolute bottom-12 left-0 bg-[var(--bg-surface)] shadow-2xl rounded-2xl p-3 grid grid-cols-4 gap-2 border border-[var(--border-color)] w-56 animate-in slide-in-from-bottom-2 duration-300">
                                        {emojis.map(emoji => (
                                            <button
                                                key={emoji}
                                                type="button"
                                                onClick={() => handleEmojiClick(emoji)}
                                                className="text-xl hover:bg-[var(--bg-secondary)] rounded-xl p-2 transition-colors"
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Text Input */}
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full px-5 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-[var(--text-muted)]"
                            />

                            {/* Send Button */}
                            <button
                                type="submit"
                                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                            >
                                <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${isOpen ? 'bg-gray-700 text-white' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    }`}
            >
                {isOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                )}
            </button>
        </div>
    )
}
