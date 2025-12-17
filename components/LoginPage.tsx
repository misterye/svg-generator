'use client';

import React, { useState } from 'react';
import { Lock, Loader2, AlertCircle, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';

interface LoginPageProps {
    onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
    const { t } = useLanguage();
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
                setError(data.error || t('login.error.invalid'));
            }
        } catch (err) {
            setError(t('login.error.connection'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center p-4 transition-colors duration-300">
            {/* Theme & Language Switcher - Top Right */}
            <div className="fixed top-4 right-4 z-50 flex gap-2">
                <ThemeSwitcher />
                <LanguageSwitcher />
            </div>

            <div className="w-full max-w-md">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-purple-500/20 mb-4">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('app.title')}</h1>
                    <p className="text-gray-600 dark:text-zinc-400">{t('app.subtitle')}</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur border border-gray-300 dark:border-white/10 rounded-2xl p-8 shadow-2xl transition-colors duration-300">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('login.title')}</h2>
                        <p className="text-sm text-gray-600 dark:text-zinc-400">
                            {t('login.subtitle')}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Password Input */}
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t('login.password.placeholder')}
                                className="w-full bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-white/10 rounded-lg pl-11 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
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
                                    ? 'bg-gray-200 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500 cursor-not-allowed'
                                    : 'bg-indigo-600 dark:bg-white text-white dark:text-zinc-950 hover:bg-indigo-700 dark:hover:bg-zinc-200 active:scale-95 shadow-lg shadow-indigo-500/20 dark:shadow-white/10'}
              `}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>{t('login.button.loading')}</span>
                                </>
                            ) : (
                                <>
                                    <Lock className="w-5 h-5" />
                                    <span>{t('login.button')}</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Info */}
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-white/10">
                        <p className="text-xs text-gray-500 dark:text-zinc-500 text-center">
                            🔒 {t('login.session.info')}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-gray-500 dark:text-zinc-600">
                    <p>{t('login.footer')}</p>
                </div>
            </div>
        </div>
    );
};
