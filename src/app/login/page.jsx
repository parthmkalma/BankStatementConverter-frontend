// File: frontend/app/(auth)/login/page.jsx
"use client";

import { useState, useEffect } from "react";
import { FileText, Mail, Shield, CheckCircle, ArrowLeft } from "lucide-react";
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
            setUser(response.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log("Auth check failed:", error.response || error);
            if (error.response?.status === 401) {
                setAuthError("Session expired. Please login again.");
            }
            setUser(null);
            setIsAuthenticated(false);
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
            <div className="h-screen bg-white flex items-center justify-center">
                <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent" />
                    <p className="text-gray-600">Checking authentication…</p>
                </div>
            </div>
        );
    }

    // — Authenticated state —
    if (isAuthenticated && user) {
        return (
            <div className="h-screen bg-white flex items-center justify-center">
                <div className="text-center max-w-sm">
                    <img
                        src={user.profile_picture || "/default-avatar.png"}
                        alt={user.name}
                        className="h-16 w-16 rounded-full mx-auto mb-4 border-2 border-green-100"
                    />
                    <h2 className="text-2xl font-semibold text-gray-900 mb-1">Welcome back!</h2>
                    <p className="text-gray-600 mb-6">{user.name}</p>

                    <div className="flex items-center justify-center space-x-2 mb-6 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Successfully signed in</span>
                    </div>

                    <button
                        onClick={handleLogout}
                        disabled={isLoading}
                        className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {isLoading ? "Signing out…" : "Sign Out"}
                    </button>
                </div>
            </div>
        );
    }

    // — Unauthenticated state —
    return (
        <div className="h-screen bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <FileText className="h-6 w-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                        Sign in to StatementPro
                    </h1>
                    <p className="text-gray-600">
                        Convert bank statements to Excel instantly
                    </p>
                </div>

                {/* Error Message */}
                {authError && (
                    <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-center">
                        <span className="text-red-800 text-sm">{authError}</span>
                    </div>
                )}

                {/* Google Sign-in Button */}
                <button
                    onClick={handleGoogleLoginRedirect}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-8"
                >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span className="text-gray-700 font-medium">
                        {isLoading ? "Redirecting…" : "Continue with Google"}
                    </span>
                </button>

                {/* Features - Minimal */}
                <div className="space-y-3 mb-8">
                    <div className="flex items-center text-sm text-gray-600">
                        <Shield className="h-4 w-4 text-green-500 mr-3" />
                        <span>Secure authentication with Google</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                        <span>No passwords to remember</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 text-green-500 mr-3" />
                        <span>Get notified when files are ready</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center space-y-3">
                    <p className="text-xs text-gray-500">
                        By signing in, you agree to our{" "}
                        <Link href="/terms" className="text-blue-600 hover:underline">
                            Terms
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-blue-600 hover:underline">
                            Privacy Policy
                        </Link>
                    </p>

                    <Link
                        href="/"
                        className="inline-flex items-center text-gray-500 hover:text-gray-700 text-sm"
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back to home
                    </Link>
                </div>
            </div>
        </div>
    );
}