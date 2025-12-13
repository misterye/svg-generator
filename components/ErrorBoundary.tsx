'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-zinc-900 border border-red-500/20 rounded-xl p-6 text-center">
                        <div className="text-red-400 text-5xl mb-4">⚠️</div>
                        <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
                        <p className="text-zinc-400 text-sm mb-4">
                            {this.state.error?.message || 'An unexpected error occurred'}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-white text-zinc-900 rounded-lg hover:bg-zinc-200 transition-colors"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
