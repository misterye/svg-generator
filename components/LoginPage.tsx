'use client';

import React, { useState } from 'react';
import { Lock, Loader2, AlertCircle, Shield } from 'lucide-react';

interface LoginPageProps {
    onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful
                onLoginSuccess();
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('Connection error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-purple-500/20 mb-4">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">VectorCraft AI</h1>
                    <p className="text-zinc-400">Protected SVG Generator</p>
                </div>

                {/* Login Card */}
                <div className="bg-zinc-900/80 backdrop-blur border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-white mb-2">Welcome Back</h2>
                        <p className="text-sm text-zinc-400">
                            Enter your password to access the SVG generator
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Password Input */}
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="w-full bg-zinc-800 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                disabled={isLoading}
                                autoFocus
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-2">
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-200">{error}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!password || isLoading}
                            className={`
                w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200
                ${!password || isLoading
                                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                                    : 'bg-white text-zinc-950 hover:bg-zinc-200 active:scale-95 shadow-lg shadow-white/10'}
              `}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Logging in...</span>
                                </>
                            ) : (
                                <>
                                    <Lock className="w-5 h-5" />
                                    <span>Login</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Info */}
                    <div className="mt-6 pt-6 border-t border-white/10">
                        <p className="text-xs text-zinc-500 text-center">
                            🔒 Your session will be valid for 24 hours
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-zinc-600">
                    <p>AI-Powered Vector Graphics</p>
                </div>
            </div>
        </div>
    );
};
