import React from 'react';

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="relative flex flex-col items-center">
                {/* Main Spinner Ring */}
                <div className="w-20 h-20 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin"></div>

                {/* Secondary Pulsing Glow */}
                <div className="absolute top-0 w-20 h-20 bg-blue-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>

                {/* Premium Text */}
                <div className="mt-6 flex flex-col items-center">
                    <span className="text-xl font-black italic tracking-tighter text-gray-900 animate-bounce">
                        SHOPHUB<span className="text-blue-600">.</span>
                    </span>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mt-2">
                        Loading Experience
                    </p>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 0.1; }
                    50% { transform: scale(1.5); opacity: 0.3; }
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                .animate-spin { animation: spin 1s linear infinite; }
                .animate-pulse { animation: pulse 2s ease-in-out infinite; }
                .animate-bounce { animation: bounce 1.5s ease-in-out infinite; }
            `}} />
        </div>
    );
}
