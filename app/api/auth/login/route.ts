/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, createSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { password } = body;

        if (!password || typeof password !== 'string') {
            return NextResponse.json(
                { error: 'Password is required' },
                { status: 400 }
            );
        }

        // Verify password
        if (verifyPassword(password)) {
            // Create session
            await createSession();

            return NextResponse.json({
                success: true,
                message: 'Login successful'
            });
        } else {
            return NextResponse.json(
                { error: 'Invalid password' },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Login failed' },
            { status: 500 }
        );
    }
}
