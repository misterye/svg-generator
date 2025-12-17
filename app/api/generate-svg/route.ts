/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { verifySession } from '@/lib/auth';

// Initialize the Gemini AI client with API key from environment variables
// This ensures the API key is NEVER exposed to the frontend
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY || ''
});

export async function POST(request: NextRequest) {
    try {
        // Check authentication first
        const isAuthenticated = await verifySession();
        if (!isAuthenticated) {
            return NextResponse.json(
                { error: 'Unauthorized. Please login to use this service.' },
                { status: 401 }
            );
        }

        // Validate API key exists
        if (!process.env.GOOGLE_API_KEY) {
            return NextResponse.json(
                { error: 'API key not configured. Please set GOOGLE_API_KEY in your environment variables.' },
                { status: 500 }
            );
        }

        // Parse request body
        const body = await request.json();
        const { prompt } = body;

        // Validate prompt
        if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
            return NextResponse.json(
                { error: 'Invalid prompt. Please provide a valid description.' },
                { status: 400 }
            );
        }

        // System prompt for SVG generation
        const systemPrompt = `
      You are a world-class expert in Scalable Vector Graphics (SVG) design and coding. 
      Your task is to generate a high-quality, visually stunning, and detailed SVG based on the user's description of an object or item.
      
      Guidelines:
      1.  **Output Format**: Return ONLY the raw SVG code. Do not wrap it in markdown code blocks (e.g., no \`\`\`xml). Do not add any conversational text before or after.
      2.  **Quality**: Use gradients, proper pathing, and distinct colors to create depth and visual appeal. Avoid simple stroked lines unless requested. The style should be "flat art" or "material design" unless specified otherwise.
      3.  **Technical**: 
          - Always include a \`viewBox\` attribute.
          - Ensure the SVG is self-contained (no external references).
          - Use semantic IDs or classes if helpful, but inline styles are preferred for portability.
          - Default size should be square (e.g., 512x512) unless the aspect ratio suggests otherwise.
    `;

        const fullPrompt = `Create an SVG representation of the following object/item: "${prompt}"`;

        // Call Gemini AI API
        const response = await ai.models.generateContent({
            // Previous models:
            // - 'gemini-2.0-flash-exp' (experimental, deprecated)
            // - 'gemini-2.5-flash' (stable, production-ready)
            model: 'models/gemini-3-pro-preview', // Latest preview model
            contents: fullPrompt,
            config: {
                systemInstruction: systemPrompt,
                temperature: 0.4, // Lower temperature for more precise code generation
                topP: 0.95,
                topK: 40,
            },
        });

        const rawText = response.text || '';

        // Robust cleanup to extract just the SVG part
        const svgMatch = rawText.match(/<svg[\s\S]*?<\/svg>/i);

        let svgContent: string;
        if (svgMatch && svgMatch[0]) {
            svgContent = svgMatch[0];
        } else {
            // If regex fails, return raw text but try to clean it up
            svgContent = rawText
                .replace(/```xml/g, '')
                .replace(/```svg/g, '')
                .replace(/```/g, '')
                .trim();
        }

        // Return the SVG content
        return NextResponse.json({
            svgContent,
            prompt
        });

    } catch (error: any) {
        console.error('Gemini API Error:', error);

        return NextResponse.json(
            {
                error: 'Failed to generate SVG',
                details: error.message || 'An unexpected error occurred'
            },
            { status: 500 }
        );
    }
}

// Prevent caching of API responses
export const dynamic = 'force-dynamic';
