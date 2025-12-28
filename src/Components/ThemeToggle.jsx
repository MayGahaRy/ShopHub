import React from 'react';
import { useApp } from '../context/AppContext';

export default function ThemeToggle() {
    const { isDark, toggleTheme } = useApp();

    return (
        <button
            onClick={toggleTheme}
            className="relative w-14 h-7 rounded-full transition-all duration-500 flex items-center p-1 overflow-hidden group shadow-inner"
            style={{ backgroundColor: isDark ? '#1e293b' : '#e2e8f0' }}
            aria-label="Toggle Theme"
        >
            {/* Animated Background glow */}
            <div className={`absolute inset-0 transition-opacity duration-500 opacity-20 ${isDark ? 'bg-blue-600' : 'bg-yellow-500'}`}></div>

            {/* Knob */}
            <div
                className={`z-10 w-5 h-5 rounded-full shadow-lg transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center ${isDark ? 'translate-x-7 bg-blue-500' : 'translate-x-0 bg-white'
                    }`}
            >
                {isDark ? (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                ) : (
                    <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                )}
            </div>

            {/* Micro-stars for dark mode */}
            {isDark && (
                <div className="absolute left-2 flex gap-1">
                    <div className="w-0.5 h-0.5 bg-white rounded-full animate-pulse"></div>
                    <div className="w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-75"></div>
                </div>
            )}

            {/* Mini clouds for light mode */}
            {!isDark && (
                <div className="absolute right-2 flex gap-1">
                    <div className="w-2 h-1 bg-white/40 rounded-full"></div>
                </div>
            )}
        </button>
    );
}
