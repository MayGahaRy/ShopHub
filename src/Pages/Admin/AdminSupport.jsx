import React, { useState, useEffect, useMemo } from 'react'
import { useApp } from '../../context/AppContext'

export default function AdminSupport() {
    const { chatMessages, adminReply } = useApp()
    const [selectedUserId, setSelectedUserId] = useState(null)
    const [replyText, setReplyText] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const fileInputRef = React.useRef(null)

    // Group messages by user
    const conversations = useMemo(() => {
        const grouped = {}
        chatMessages.forEach(msg => {
            const userObj = msg.User || msg.user
            const uid = String(msg.userId || userObj?.id || '')
            if (!uid) return

            if (!grouped[uid]) {
                const isHardcodedAdmin = uid === '9999' || uid === 'admin'
                const defaultUser = {
                    name: isHardcodedAdmin ? 'Administrator' : 'Unknown User',
                    email: isHardcodedAdmin ? 'admin' : 'No Email',
                    id: uid
                }
                grouped[uid] = {
                    user: userObj ? { ...defaultUser, ...userObj } : defaultUser,
                    messages: [],
                    lastMessage: null,
                    unreadCount: 0
                }
            }

            // If we find better user info in a subsequent message, update the group
            if (userObj && grouped[uid].user.name === 'Unknown User') {
                grouped[uid].user = { ...grouped[uid].user, ...userObj }
            }

            grouped[uid].messages.push(msg)

            // Track last message for sorting
            if (!grouped[uid].lastMessage || new Date(msg.createdAt) > new Date(grouped[uid].lastMessage.createdAt)) {
                grouped[uid].lastMessage = msg
            }
        })

        // Sort users by last message time
        return Object.values(grouped).sort((a, b) =>
            new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt)
        )
    }, [chatMessages])

    // Filter conversations by search
    const filteredConversations = conversations.filter(c =>
        c.user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Select first conversation by default if none selected
    useEffect(() => {
        if (!selectedUserId && conversations.length > 0) {
            setSelectedUserId(conversations[0].user.id)
        }
    }, [conversations, selectedUserId])

    const activeConversation = conversations.find(c => c.user.id === selectedUserId)

    const handleReply = async (e) => {
        e.preventDefault()
        if (!replyText.trim() || !selectedUserId) return

        await adminReply(replyText, selectedUserId)
        setReplyText('')
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (file && selectedUserId) {
            const reader = new FileReader()
            reader.onloadend = async () => {
                await adminReply('', selectedUserId, 'image', reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="h-[calc(100vh-6rem)] bg-gray-900 rounded-2xl overflow-hidden flex shadow-2xl border border-gray-800">
            {/* Sidebar - User List */}
            <div className="w-80 bg-slate-900 border-r border-gray-800 flex flex-col">
                {/* Search Header */}
                <div className="p-4 border-b border-gray-800">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-800 text-gray-200 placeholder-gray-500 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 border border-transparent focus:border-blue-500 transition-all"
                        />
                        <svg className="w-5 h-5 text-gray-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Users List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {filteredConversations.map((conv) => {
                        const isOnline = conv.user.lastActive && (new Date() - new Date(conv.user.lastActive)) < 5 * 60 * 1000;
                        return (
                            <div
                                key={conv.user.id}
                                onClick={() => setSelectedUserId(conv.user.id)}
                                className={`p-4 flex items-center gap-3 cursor-pointer transition-colors border-b border-gray-800/50 hover:bg-slate-800 ${selectedUserId === conv.user.id ? 'bg-blue-900/20 border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'
                                    }`}
                            >
                                <div className="relative flex-shrink-0">
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${conv.user.name}&background=random&color=fff`}
                                        alt={conv.user.name}
                                        className="w-12 h-12 rounded-full ring-2 ring-gray-800"
                                    />
                                    {isOnline && (
                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-sm font-semibold text-gray-100 truncate">
                                            {conv.user.name || conv.user.username || (conv.user.email !== 'No Email' ? conv.user.email : 'Unknown User')}
                                        </h3>
                                        <span className="text-xs text-gray-500">{new Date(conv.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-xs text-gray-400 truncate flex-1">
                                            {conv.lastMessage.sender === 'admin' && <span className="text-blue-400">You: </span>}
                                            {conv.lastMessage.type === 'image' ? 'Example Sent an image' : (conv.lastMessage.text || 'Message')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    {filteredConversations.length === 0 && (
                        <div className="p-8 text-center text-gray-500 text-sm">
                            No conversations found
                        </div>
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-[#0e1621] relative">
                {/* Uses Telegram-like dark background color */}
                <div className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`
                    }}
                ></div>

                {activeConversation ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 bg-slate-900 border-b border-gray-800 flex justify-between items-center z-10">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${activeConversation.user.name || activeConversation.user.username || 'User'}&background=random&color=fff`}
                                        alt={activeConversation.user.name}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    {activeConversation.user.lastActive && (new Date() - new Date(activeConversation.user.lastActive)) < 5 * 60 * 1000 && (
                                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-slate-900 rounded-full"></span>
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white leading-tight">
                                        {activeConversation.user.name || activeConversation.user.username || (activeConversation.user.email !== 'No Email' ? activeConversation.user.email : 'Unknown User')}
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${activeConversation.user.lastActive && (new Date() - new Date(activeConversation.user.lastActive)) < 5 * 60 * 1000 ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                                        <p className="text-xs text-gray-400">
                                            {activeConversation.user.lastActive && (new Date() - new Date(activeConversation.user.lastActive)) < 5 * 60 * 1000
                                                ? 'Online'
                                                : (activeConversation.user.lastActive ? `Last seen ${new Date(activeConversation.user.lastActive).toLocaleString()}` : 'Last seen long ago')}
                                        </p>
                                        <span className="text-gray-600">|</span>
                                        <p className="text-xs text-blue-400">{activeConversation.user.email}</p>
                                    </div>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                            </button>
                        </div>

                        {/* Messages List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 z-10">
                            {activeConversation.messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[70%] min-w-[120px] relative group`}>
                                        <div className={`p-3 rounded-2xl shadow-sm ${msg.sender === 'admin'
                                            ? 'bg-blue-600 text-white rounded-br-none'
                                            : 'bg-[#2b5278] text-white rounded-bl-none' // Darker blue for received similar to Telegram dark mode
                                            }`}>
                                            <div className="flex flex-col gap-2">
                                                {msg.image && (
                                                    <img src={msg.image} alt="Attachment" className="rounded-lg max-w-full" />
                                                )}
                                                {msg.text && (
                                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                                )}
                                            </div>

                                            <div className={`flex items-center justify-end gap-1 mt-1 ${msg.sender === 'admin' ? 'text-blue-200' : 'text-gray-400'}`}>
                                                <span className="text-[10px]">
                                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                                {msg.sender === 'admin' && (
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-slate-900 border-t border-gray-800 z-10">
                            <form onSubmit={handleReply} className="flex gap-4 items-end">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    accept="image/*"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="p-3 text-gray-400 hover:text-white transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                    </svg>
                                </button>
                                <div className="flex-1 bg-gray-800 rounded-2xl flex items-center px-4 border border-gray-700 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                                    <input
                                        type="text"
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder="Write a message..."
                                        className="flex-1 bg-transparent py-3 text-white placeholder-gray-500 focus:outline-none"
                                    />
                                    <button type="button" className="p-2 text-gray-400 hover:text-yellow-400 transition-colors">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button>
                                </div>
                                <button
                                    type="submit"
                                    disabled={!replyText.trim()}
                                    className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                                >
                                    <svg className="w-5 h-5 transform rotate-45 translate-x-[-2px] translate-y-[2px]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <p className="text-lg font-medium">Select a chat to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    )
}
