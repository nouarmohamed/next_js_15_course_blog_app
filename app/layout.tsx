import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from "@/components/NavBar";
import {SessionProvider} from 'next-auth/react'

const inter = Inter({
    subsets: ['latin'],
    variable: '--inter',
});

export const metadata: Metadata = {
    title: "BLOGO",
    description: "Blogo is a modern platform for sharing your stories and ideas with the world. Create, connect, and grow your audience with ease on a sleek, user-friendly blog space."
}
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-gradient-to-r from-blue-100 via-purple-100 to-white`}>
                <SessionProvider>
                    <NavBar/>
                    {children}
                </SessionProvider>
            </body>
        </html>
    )
}
