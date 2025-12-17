'use client';

import React, { useState, useEffect } from 'react';
import { InputSection } from '@/components/InputSection';
import { SvgPreview } from '@/components/SvgPreview';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LoginPage } from '@/components/LoginPage';
import { HeaderWithAuth } from '@/components/HeaderWithAuth';
import { GeneratedSvg, GenerationStatus, ApiError } from '@/types';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Browser-compatible UUID generator
function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export default function Home() {
    const { t } = useLanguage();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
    const [currentSvg, setCurrentSvg] = useState<GeneratedSvg | null>(null);
    const [error, setError] = useState<ApiError | null>(null);

    // Check authentication status on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch('/api/auth/verify');
            const data = await response.json();
            setIsAuthenticated(data.authenticated);
        } catch (error) {
            console.error('Auth check failed:', error);
            setIsAuthenticated(false);
        }
    };

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            setIsAuthenticated(false);
            setCurrentSvg(null);
            setStatus(GenerationStatus.IDLE);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleGenerate = async (prompt: string) => {
        setStatus(GenerationStatus.LOADING);
        setError(null);
        setCurrentSvg(null);

        try {
            // Call our API route instead of directly calling Gemini
            const response = await fetch('/api/generate-svg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate SVG');
            }

            const data = await response.json();

            const newSvg: GeneratedSvg = {
                id: generateUUID(), // Use custom UUID generator for better compatibility
                content: data.svgContent,
                prompt: prompt,
                timestamp: Date.now()
            };

            setCurrentSvg(newSvg);
            setStatus(GenerationStatus.SUCCESS);
        } catch (err: any) {
            setStatus(GenerationStatus.ERROR);
            setError({
                message: "Generation Failed",
                details: err.message || "An unexpected error occurred while contacting Gemini."
            });
        }
    };

    // Show loading while checking authentication
    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="text-zinc-400">Loading...</div>
            </div>
        );
    }

    // Show login page if not authenticated
    if (!isAuthenticated) {
        return (
            <ErrorBoundary>
                <LoginPage onLoginSuccess={handleLoginSuccess} />
            </ErrorBoundary>
        );
    }

    // Show main app if authenticated
    return (
        <ErrorBoundary>
            <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 font-sans selection:bg-indigo-500/30 transition-colors duration-300">
                <HeaderWithAuth onLogout={handleLogout} />

                <main className="pb-20 pt-8">
                    <InputSection onGenerate={handleGenerate} status={status} />

                    {status === GenerationStatus.ERROR && error && (
                        <div className="max-w-2xl mx-auto mt-8 px-4">
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3 text-red-200">
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-red-400">{error.message}</h4>
                                    <p className="text-sm text-red-300/70 mt-1">{error.details}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {status === GenerationStatus.SUCCESS && currentSvg && (
                        <SvgPreview
                            data={currentSvg}
                        />
                    )}

                    {/* Empty State / Placeholder */}
                    {status === GenerationStatus.IDLE && (
                        <div className="max-w-2xl mx-auto mt-16 text-center px-4 opacity-50 pointer-events-none select-none">
                            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gray-200 dark:bg-zinc-900/50 border border-gray-300 dark:border-white/5 mb-4 transition-colors duration-300">
                                <svg className="w-12 h-12 text-gray-400 dark:text-zinc-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <polyline points="21 15 16 10 5 21" />
                                </svg>
                            </div>
                            <p className="text-gray-500 dark:text-zinc-600 text-sm">{t('empty.message')}</p>
                        </div>
                    )}
                </main>
            </div>
        </ErrorBoundary>
    );
}
