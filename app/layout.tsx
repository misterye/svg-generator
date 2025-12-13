import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "SVG Generator - Powered by Gemini AI",
    description: "Generate stunning SVG artwork using AI",
    icons: {
        icon: '/favicon.svg',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}
