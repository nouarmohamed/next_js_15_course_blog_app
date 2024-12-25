import { NextResponse } from "next/server"
import authConfig from "./auth.config"
import NextAuth from "next-auth"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const url = req.nextUrl.pathname
    const isLoggedIn = !!req.auth

    if(url === '/'){
        return NextResponse.next()
    }

    if (url.startsWith('/api')) {
        return NextResponse.next()
    }

    if(!isLoggedIn){
        return NextResponse.redirect(new URL('/api/auth/signin', req.url))
    }
    return NextResponse.next()
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}