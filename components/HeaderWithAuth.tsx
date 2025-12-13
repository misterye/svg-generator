/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React from 'react';
import { PenTool, Sparkles, LogOut } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeaderWithAuthProps {
    onLogout?: () => void;
}

export const HeaderWithAuth: React.FC<HeaderWithAuthProps> = ({ onLogout }) => {
    const { t } = useLanguage();

    return (
        <header className="w-full py-6 px-4 border-b border-white/10 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg shadow-purple-500/20">
                        <PenTool className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white tracking-tight">{t('app.title')}</h1>
                        <p className="text-xs text-zinc-400 font-medium flex items-center gap-1">
                            {t('app.subtitle')} <Sparkles className="w-3 h-3 text-amber-400" />
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <LanguageSwitcher />

                    {onLogout && (
                        <button
                            onClick={onLogout}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            title={t('header.logout')}
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">{t('header.logout')}</span>
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};
