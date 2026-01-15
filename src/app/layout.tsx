import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-jakarta",
});

export const metadata: Metadata = {
    title: "UGC by Maddie | Performance-Driven Creative",
    description: "Transforming brands into TikTok Shop powerhouses through high-aesthetic content that actually converts.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${inter.variable} ${plusJakartaSans.variable} font-sans antialiased bg-[#050505] text-white`}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
