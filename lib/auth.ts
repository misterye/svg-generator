/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const SESSION_COOKIE_NAME = 'svg_gen_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Simple encryption for session data
 */
function encryptSession(data: string): string {
    const secret = process.env.SESSION_SECRET || 'default-secret-change-me';
    // Simple XOR encryption (for demo - in production use proper encryption)
    let encrypted = '';
    for (let i = 0; i < data.length; i++) {
        encrypted += String.fromCharCode(
            data.charCodeAt(i) ^ secret.charCodeAt(i % secret.length)
        );
    }
    return Buffer.from(encrypted).toString('base64');
}

/**
 * Decrypt session data
 */
function decryptSession(encrypted: string): string {
    const secret = process.env.SESSION_SECRET || 'default-secret-change-me';
    try {
        const data = Buffer.from(encrypted, 'base64').toString();
        let decrypted = '';
        for (let i = 0; i < data.length; i++) {
            decrypted += String.fromCharCode(
                data.charCodeAt(i) ^ secret.charCodeAt(i % secret.length)
            );
        }
        return decrypted;
    } catch {
        return '';
    }
}

/**
 * Verify password
 */
export function verifyPassword(password: string): boolean {
    const correctPassword = process.env.AUTH_PASSWORD;

    if (!correctPassword) {
        console.warn('AUTH_PASSWORD not set in environment variables');
        return false;
    }

    return password === correctPassword;
}

/**
 * Create session
 */
export async function createSession() {
    const sessionData = JSON.stringify({
        authenticated: true,
        createdAt: Date.now(),
    });

    const encrypted = encryptSession(sessionData);

    (await cookies()).set(SESSION_COOKIE_NAME, encrypted, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: SESSION_DURATION / 1000, // in seconds
        path: '/',
    });
}

/**
 * Verify session
 */
export async function verifySession(): Promise<boolean> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie) {
        return false;
    }

    try {
        const decrypted = decryptSession(sessionCookie.value);
        const sessionData = JSON.parse(decrypted);

        // Check if session is valid and not expired
        if (sessionData.authenticated && sessionData.createdAt) {
            const age = Date.now() - sessionData.createdAt;
            if (age < SESSION_DURATION) {
                return true;
            }
        }
    } catch (error) {
        console.error('Session verification failed:', error);
    }

    return false;
}

/**
 * Destroy session
 */
export async function destroySession() {
    (await cookies()).delete(SESSION_COOKIE_NAME);
}

/**
 * Middleware helper to check authentication
 */
export async function requireAuth(request: NextRequest): Promise<boolean> {
    return await verifySession();
}
