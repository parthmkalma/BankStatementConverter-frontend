// File: frontend/app/(auth)/login/page.jsx
"use client";

import { useState, useEffect } from "react";
import { FileText, Mail, Shield, CheckCircle } from "lucide-react";
import Link from "next/link";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function LoginPage() {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState(null);

    // Configure axios once
    useEffect(() => {
        axios.defaults.baseURL = API_BASE_URL;
        axios.defaults.withCredentials = true;
    }, []);

    // Fetch current user; the HTTP‑only cookie is sent automatically
    const fetchUser = async () => {
        setIsLoading(true);
        setAuthError(null);
        try {
            const response = await axios.get("/auth/me");
            // console.log("rfer", response.data);
            setUser(response.data);
            // setIsAuthenticated(true);
        } catch (error) {
            console.log("Auth check failed:", error.response || error);
            if (error.response?.status === 401) {
                setAuthError("Session expired. Please login again.");
            }
            // setUser(null);
            // setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    // On mount (and after Google redirect), try to fetch the user
    useEffect(() => {
        fetchUser();
        window.history.replaceState({}, document.title, window.location.pathname);
    }, []);

    const handleGoogleLoginRedirect = () => {
        setIsLoading(true);
        setAuthError(null);
        window.location.href = `${API_BASE_URL}/auth/login/google`;
    };

    const handleLogout = async () => {
        setIsLoading(true);
        setAuthError(null);
        try {
            await axios.post("/auth/logout");
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Logout failed:", error.response || error);
            setAuthError("Logout failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // — Loading state —
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                <p className="ml-4 text-gray-600">Checking authentication…</p>
            </div>
        );
    }

    // — Authenticated state —
    if (isAuthenticated && user) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-6">
                <img
                    src={user.profile_picture || "/default-avatar.png"}
                    alt={user.name}
                    className="h-20 w-20 rounded-full"
                />
                <h2 className="text-2xl font-bold">Welcome, {user.name}!</h2>
                <p className="text-sm text-gray-600">{user.email}</p>

                <div className="p-4 bg-green-50 rounded-lg flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-green-800">Successfully signed in with Google!</span>
                </div>

                <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="px-6 py-2 border rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                    {isLoading ? "Signing out…" : "Sign Out"}
                </button>
            </div>
        );
    }

    // — Unauthenticated state —
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <FileText className="h-12 w-12 text-blue-600" />
            <h2 className="mt-4 text-3xl font-bold text-gray-900">Sign in to StatementPro</h2>
            <p className="text-gray-600">Convert your bank statements to Excel instantly</p>

            {authError && (
                <div className="mt-4 p-3 bg-red-50 rounded-lg flex items-center space-x-2">
                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9l-1.293-1.293a1 1 0 011.414-1.414L10 7.586l1.293-1.293a1 1 0 011.414 1.414L11.414 9l1.293 1.293a1 1 0 01-1.414 1.414L10 10.414l-1.293 1.293a1 1 0 01-1.414-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="text-red-800">{authError}</span>
                </div>
            )}

            <button
                onClick={handleGoogleLoginRedirect}
                disabled={isLoading}
                className="mt-6 flex items-center px-4 py-2 border rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50"
            >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    {/* Google “G” icon paths */}
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                {isLoading ? "Redirecting…" : "Continue with Google"}
            </button>

            <div className="mt-8 space-y-4 text-sm text-gray-500">
                <p>Why choose Google Sign-In?</p>
                <ul className="space-y-2">
                    <li className="flex items-start">
                        <Shield className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="ml-2">Secure &amp; Safe – your data is protected by Google</span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="ml-2">Quick Access – no extra password</span>
                    </li>
                    <li className="flex items-start">
                        <Mail className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="ml-2">Email Updates – know when your conversions are ready</span>
                    </li>
                </ul>
            </div>

            <p className="mt-6 text-xs text-gray-400">
                By signing in, you agree to our{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                </Link>.
            </p>

            <Link href="/" className="mt-4 text-blue-600 hover:underline">
                ← Back to home
            </Link>
        </div>
    );
}
