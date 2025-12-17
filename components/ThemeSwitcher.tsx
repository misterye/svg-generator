/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeSwitcher: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 border border-gray-300 dark:border-white/10 transition-all duration-300 ease-in-out"
            title={theme === 'light' ? '切换到暗色模式' : '切换到亮色模式'}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
            <div className="relative w-5 h-5">
                {/* Sun Icon - visible in dark mode */}
                <Sun
                    className={`absolute inset-0 w-5 h-5 text-yellow-400 transition-all duration-300 ${theme === 'dark'
                            ? 'opacity-100 rotate-0 scale-100'
                            : 'opacity-0 rotate-90 scale-0'
                        }`}
                />
                {/* Moon Icon - visible in light mode */}
                <Moon
                    className={`absolute inset-0 w-5 h-5 text-indigo-600 transition-all duration-300 ${theme === 'light'
                            ? 'opacity-100 rotate-0 scale-100'
                            : 'opacity-0 -rotate-90 scale-0'
                        }`}
                />
            </div>
        </button>
    );
};
