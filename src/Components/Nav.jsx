import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Notifications from './Notifications'
import ThemeToggle from './ThemeToggle'

export default function Nav() {
  const { isAuthenticated, user, logout, getCartItemsCount } = useApp()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const cartCount = getCartItemsCount()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <nav className={`sticky top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled
      ? 'glass-effect border-b border-[var(--border-color)] shadow-lg'
      : 'bg-[var(--bg-primary)] border-b border-transparent'
      }`}>
      <div className={`max-w-7xl mx-auto px-4 transition-all duration-500 flex items-center justify-between ${isScrolled ? 'h-16' : 'h-24'
        }`}>
        {/* Logo & Links */}
        <div className="flex items-center gap-12 text-[var(--text-primary)]">
          <Link to="/" className="text-3xl font-black italic tracking-tighter hover:scale-105 transition-transform">
            ShopHub<span className="text-blue-600">.</span>
          </Link>

          <ul className="hidden lg:flex items-center gap-8">
            <li>
              <Link to="/" className="hover:text-blue-500 transition-colors font-bold uppercase tracking-widest text-xs">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-blue-500 transition-colors font-bold uppercase tracking-widest text-xs">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-500 transition-colors font-bold uppercase tracking-widest text-xs">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <ThemeToggle />

          {isAuthenticated ? (
            <>
              <Notifications />

              {/* Cart */}
              <Link to="/cart" className="relative p-2 text-[var(--text-primary)] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-all active:scale-90">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-blue-600 text-white text-[10px] rounded-full flex items-center justify-center font-black animate-bounce">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 p-1 rounded-2xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all active:scale-95"
                >
                  <img
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`}
                    alt={user?.name}
                    className="w-10 h-10 rounded-2xl object-cover border-2 border-white/50"
                  />
                  <svg className={`w-4 h-4 text-[var(--text-secondary)] transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-4 w-64 bg-[var(--bg-surface)] rounded-3xl shadow-2xl z-50 py-3 border border-[var(--border-color)] animate-in fade-in slide-in-from-top-4 duration-300">
                      <div className="px-6 py-4 border-b border-[var(--border-color)] mb-2">
                        <p className="text-sm font-black text-[var(--text-primary)]">{user?.name}</p>
                        <p className="text-xs text-[var(--text-muted)] truncate">{user?.email}</p>
                      </div>
                      <Link to="/dashboard" className="flex items-center gap-3 px-6 py-3 text-sm text-[var(--text-secondary)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" onClick={() => setUserMenuOpen(false)}>
                        <span>📊</span> Dashboard
                      </Link>
                      <Link to="/account" className="flex items-center gap-3 px-6 py-3 text-sm text-[var(--text-secondary)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" onClick={() => setUserMenuOpen(false)}>
                        <span>⚙️</span> Settings
                      </Link>
                      <Link to="/favorites" className="flex items-center gap-3 px-6 py-3 text-sm text-[var(--text-secondary)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" onClick={() => setUserMenuOpen(false)}>
                        <span>❤️</span> Wishlist
                      </Link>
                      <div className="mt-2 pt-2 border-t border-[var(--border-color)]">
                        <button
                          onClick={() => {
                            logout()
                            setUserMenuOpen(false)
                          }}
                          className="w-full text-left flex items-center gap-3 px-6 py-4 text-sm text-red-500 font-black hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                        >
                          <span>🚪</span> Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/login" className="px-6 py-3 text-sm font-black text-[var(--text-primary)] hover:text-blue-600 transition-colors">
                Login
              </Link>
              <Link to="/signup" className="px-8 py-3 bg-blue-600 text-white rounded-2xl text-sm font-black hover:bg-blue-500 shadow-xl shadow-blue-500/20 active:scale-95 transition-all">
                Join
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-xl transition-all"
          >
            {isMobileMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[200] animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[85vw] max-w-sm bg-[var(--bg-primary)] border-l border-[var(--border-color)] shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-500 overflow-y-auto">
            <div className="flex items-center justify-between mb-12">
              <span className="text-2xl font-black italic tracking-tighter text-[var(--text-primary)]">
                Navigation<span className="text-blue-600">.</span>
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-xl transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex-1">
              <ul className="space-y-6">
                <li>
                  <Link
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 text-xl font-black text-[var(--text-primary)] hover:text-blue-600 transition-colors uppercase italic"
                  >
                    <span className="text-blue-600 text-xs not-italic font-bold">01</span> Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 text-xl font-black text-[var(--text-primary)] hover:text-blue-600 transition-colors uppercase italic"
                  >
                    <span className="text-blue-600 text-xs not-italic font-bold">02</span> Shop
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 text-xl font-black text-[var(--text-primary)] hover:text-blue-600 transition-colors uppercase italic"
                  >
                    <span className="text-blue-600 text-xs not-italic font-bold">03</span> About
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="mt-auto space-y-4 pt-8 border-t border-[var(--border-color)]">
              {!isAuthenticated ? (
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-6 py-4 bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-2xl text-center font-black text-sm uppercase"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-6 py-4 bg-blue-600 text-white rounded-2xl text-center font-black text-sm uppercase shadow-lg shadow-blue-600/20"
                  >
                    Join
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 p-4 bg-[var(--bg-secondary)] rounded-2xl">
                    <img
                      src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`}
                      alt={user?.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-black text-[var(--text-primary)] truncate">{user?.name}</p>
                      <p className="text-xs text-[var(--text-muted)] truncate">{user?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full py-4 border-2 border-red-500/20 text-red-500 rounded-2xl font-black text-sm uppercase hover:bg-red-500/5 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
