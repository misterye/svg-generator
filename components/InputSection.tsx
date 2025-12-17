/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { Send, Loader2, Wand2 } from 'lucide-react';
import { GenerationStatus } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface InputSectionProps {
  onGenerate: (prompt: string) => void;
  status: GenerationStatus;
}

export const InputSection: React.FC<InputSectionProps> = ({ onGenerate, status }) => {
  const { t } = useLanguage();
  const [input, setInput] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && status !== GenerationStatus.LOADING) {
      onGenerate(input.trim());
    }
  }, [input, status, onGenerate]);

  const isLoading = status === GenerationStatus.LOADING;

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-zinc-200 dark:to-zinc-400 mb-3">
          {t('input.title')}
        </h2>
        <p className="text-gray-600 dark:text-zinc-400 text-lg">
          {t('input.description')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur-lg"></div>
        <div className="relative flex items-center bg-white dark:bg-zinc-900 rounded-xl border border-gray-300 dark:border-white/10 shadow-2xl overflow-hidden p-2 transition-colors duration-300">
          <div className="pl-4 text-gray-400 dark:text-zinc-500">
            <Wand2 className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('input.placeholder')}
            className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 px-4 py-3 text-lg"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`
              px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200
              ${!input.trim() || isLoading
                ? 'bg-gray-200 dark:bg-zinc-800 text-gray-400 dark:text-zinc-600 cursor-not-allowed'
                : 'bg-indigo-600 dark:bg-white text-white dark:text-zinc-950 hover:bg-indigo-700 dark:hover:bg-zinc-200 active:scale-95 shadow-lg shadow-white/10'}
            `}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="hidden sm:inline">{t('input.button.generating')}</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline">{t('input.button.generate')}</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Suggestions */}
      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {[
          t('input.suggestion.1'),
          t('input.suggestion.2'),
          t('input.suggestion.3'),
          t('input.suggestion.4')
        ].map((suggestion, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setInput(suggestion)}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-100 dark:bg-zinc-800/50 hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white text-sm rounded-lg border border-gray-300 dark:border-white/5 hover:border-gray-400 dark:hover:border-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};
