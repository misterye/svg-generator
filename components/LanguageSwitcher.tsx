/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';

export const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'zh' : 'en');
    };

    return (
        <button
            onClick={toggleLanguage}
            className="p-2 rounded-lg bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 border border-gray-300 dark:border-white/10 transition-all duration-300 ease-in-out"
            title={language === 'en' ? '切换到中文' : 'Switch to English'}
            aria-label={language === 'en' ? 'Switch to Chinese' : 'Switch to English'}
        >
            <div className="flex items-center gap-1.5">
                <Languages className="w-4 h-4 text-gray-600 dark:text-zinc-400" />
                <span className="text-xs font-medium text-gray-700 dark:text-zinc-300">{language === 'en' ? '中文' : 'EN'}</span>
            </div>
        </button>
    );
};
