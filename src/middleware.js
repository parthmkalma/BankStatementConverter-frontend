import { NextResponse } from "next/server"

export function middleware(request) {
    // Get the pathname of the request (e.g. /, /login, /dashboard)
    const path = request.nextUrl.pathname

    // Define paths that require authentication
    const protectedPaths = ["/dashboard", "/profile", "/settings"]

    // Define paths that should redirect to dashboard if user is logged in
    const authPaths = ["/login", "/signup"]

    // Check if user is logged in by looking for user data in cookies
    // You might need to adjust this based on how you store authentication state
    const userCookie = request.cookies.get("access_token") || request.cookies.get("user")
    console.log("User cookie:", userCookie)
    const isLoggedIn = !!userCookie

    // If user is logged in and trying to access auth pages, redirect to dashboard
    // if (isLoggedIn && authPaths.includes(path)) {
    //     return NextResponse.redirect(new URL("/dashboard", request.url))
    // }

    // If user is not logged in and trying to access protected pages, redirect to login
    if (!isLoggedIn && protectedPaths.includes(path)) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
}
