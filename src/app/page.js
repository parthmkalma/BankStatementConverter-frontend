"use client"

import Link from "next/link"
import { ArrowRight, FileText, Shield, Zap, CheckCircle, Menu, X } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { ProfileDropdown } from "@/components/profile-dropdown"

export default function LandingPage() {
  const { user, loading } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  StatementPro
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <Link
                  href="/pricing"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105"
                >
                  Pricing
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105"
                >
                  How it Works
                </Link>
                <Link
                  href="#features"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105"
                >
                  Features
                </Link>
                {user?.name ? (
                  <ProfileDropdown />
                ) : (
                  <Link
                    href="/login"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="bg-gray-50 hover:bg-gray-100 p-2 rounded-lg text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 shadow-lg">
                <Link
                  href="/pricing"
                  className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 text-base font-medium rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 text-base font-medium rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How it Works
                </Link>
                <Link
                  href="#features"
                  className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 text-base font-medium rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <div className="pt-2 border-t border-gray-200">
                  {user?.name ? (
                    <ProfileDropdown />
                  ) : (
                    <Link
                      href="/login"
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white block px-3 py-2 text-base font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Convert Your Bank</span>{" "}
                  <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent xl:inline">
                    Statements to Excel
                  </span>{" "}
                  <span className="block xl:inline">Instantly</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Secure, fast, and accurate conversion from PDF to Excel. Save hours of manual data entry with our
                  intelligent parsing technology.
                </p>

                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    {user?.name ? (
                      <Link
                        href="/dashboard"
                        className="group w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 md:py-4 md:text-lg md:px-10 transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Go to Dashboard
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ) : (
                      <Link
                        href="/login"
                        className="group w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 md:py-4 md:text-lg md:px-10 transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Login with Google
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      href="#how-it-works"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>

        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full bg-gradient-to-br from-blue-50 to-indigo-100 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
            <div className="text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <FileText className="h-32 w-32 text-blue-400 mx-auto mb-6" />
                <div className="flex items-center justify-center space-x-6">
                  <div className="group">
                    <div className="w-20 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-xl border-2 border-red-300 flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg">
                      <span className="text-red-600 font-bold text-sm">PDF</span>
                    </div>
                  </div>
                  <ArrowRight className="h-8 w-8 text-blue-400 animate-pulse" />
                  <div className="group">
                    <div className="w-20 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-xl border-2 border-green-300 flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg">
                      <span className="text-green-600 font-bold text-sm">XLSX</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">How it Works</h2>
            <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
              Simple 3-Step Process
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Convert your bank statements in minutes with our secure and accurate conversion process.
            </p>
          </div>

          <div className="mt-16">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="relative group">
                <div className="absolute flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8" />
                </div>
                <div className="ml-20">
                  <h3 className="text-xl leading-6 font-bold text-gray-900">Secure Upload</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Upload your PDF bank statement securely. All files are encrypted and processed safely with bank-level security.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Zap className="h-8 w-8" />
                </div>
                <div className="ml-20">
                  <h3 className="text-xl leading-6 font-bold text-gray-900">Smart Processing</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Our AI-powered engine extracts and structures your transaction data automatically with 99.9% accuracy.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg group-hover:scale-110 transition-transform">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <div className="ml-20">
                  <h3 className="text-xl leading-6 font-bold text-gray-900">Download Excel</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Get your perfectly formatted Excel file ready for analysis, accounting, and financial planning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block">Convert your first statement today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-100">
            Join thousands of users who trust StatementPro for their bank statement conversions.
          </p>
          {user ? (
            <Link
              href="/dashboard"
              className="group mt-8 w-full inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-blue-600 bg-white hover:bg-blue-50 sm:w-auto transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <Link
              href="/login"
              className="group mt-8 w-full inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-blue-600 bg-white hover:bg-blue-50 sm:w-auto transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link href="/pricing" className="text-gray-400 hover:text-gray-600 transition-colors">
              Pricing
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              Terms
            </Link>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">&copy; 2024 StatementPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}