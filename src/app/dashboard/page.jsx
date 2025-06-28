"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, Upload, Download, History, CreditCard, LogOut, User, CheckCircle, Loader2 } from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useAuth } from "@/hooks/useAuth"

export default function Dashboard() {
    const { user, logout } = useAuth()
    // console.log("user in dashboard", user)
    const [uploadedFile, setUploadedFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isProcessed, setIsProcessed] = useState(false)
    const [dragActive, setDragActive] = useState(false)

    const sampleData = [
        { date: "2024-01-15", description: "Online Purchase - Amazon", amount: -89.99, balance: 2456.78 },
        { date: "2024-01-14", description: "Salary Deposit", amount: 3500.0, balance: 2546.77 },
        { date: "2024-01-13", description: "ATM Withdrawal", amount: -100.0, balance: -953.23 },
        { date: "2024-01-12", description: "Grocery Store", amount: -67.45, balance: -853.23 },
        { date: "2024-01-11", description: "Gas Station", amount: -45.2, balance: -785.78 },
    ]

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setUploadedFile(e.dataTransfer.files[0])
        }
    }

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedFile(e.target.files[0])
        }
    }

    const handleProcess = () => {
        setIsProcessing(true)
        // Simulate processing
        setTimeout(() => {
            setIsProcessing(false)
            setIsProcessed(true)
        }, 3000)
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50">
                {/* Sidebar */}
                <div className="flex">
                    <div className="w-64 bg-white shadow-sm min-h-screen">
                        <div className="p-6">
                            <div className="flex items-center">
                                <FileText className="h-8 w-8 text-blue-600" />
                                <span className="ml-2 text-xl font-bold text-gray-900">StatementPro</span>
                            </div>
                        </div>

                        <nav className="mt-6">
                            <div className="px-6 py-3 bg-blue-50 border-r-4 border-blue-600">
                                <div className="flex items-center">
                                    <Upload className="h-5 w-5 text-blue-600" />
                                    <span className="ml-3 text-sm font-medium text-blue-600">Upload</span>
                                </div>
                            </div>

                            <Link
                                href="/dashboard/history"
                                className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            >
                                <div className="flex items-center">
                                    <History className="h-5 w-5" />
                                    <span className="ml-3 text-sm font-medium">History</span>
                                </div>
                            </Link>

                            <Link href="/pricing" className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                                <div className="flex items-center">
                                    <CreditCard className="h-5 w-5" />
                                    <span className="ml-3 text-sm font-medium">Pricing</span>
                                </div>
                            </Link>
                        </nav>

                        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200">
                            <div className="flex items-center mb-4">
                                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    {user?.avatar ? (
                                        <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-8 w-8 rounded-full" />
                                    ) : (
                                        <User className="h-4 w-4 text-blue-600" />
                                    )}
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                                    <p className="text-xs text-gray-500">{user?.email}</p>
                                </div>
                            </div>
                            <button onClick={logout} className="flex items-center text-gray-600 hover:text-gray-900 text-sm">
                                <LogOut className="h-4 w-4" />
                                <span className="ml-2">Logout</span>
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-8">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-2xl font-bold text-gray-900 mb-8">Upload Bank Statement</h1>

                            {/* Upload Section */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload PDF Statement</h2>

                                {!uploadedFile ? (
                                    <div
                                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                                            }`}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                    >
                                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-lg font-medium text-gray-900 mb-2">
                                            Drop your PDF file here, or click to browse
                                        </p>
                                        <p className="text-sm text-gray-500 mb-4">Supports PDF files up to 10MB</p>
                                        <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" id="file-upload" />
                                        <label
                                            htmlFor="file-upload"
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer transition-colors"
                                        >
                                            Choose File
                                        </label>
                                    </div>
                                ) : (
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <FileText className="h-8 w-8 text-red-500" />
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-900">{uploadedFile.name}</p>
                                                    <p className="text-xs text-gray-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                                </div>
                                            </div>
                                            <button onClick={() => setUploadedFile(null)} className="text-gray-400 hover:text-gray-600">
                                                ×
                                            </button>
                                        </div>

                                        {!isProcessing && !isProcessed && (
                                            <button
                                                onClick={handleProcess}
                                                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                                            >
                                                Process Statement
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Processing Status */}
                            {isProcessing && (
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                                    <div className="flex items-center">
                                        <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
                                        <span className="ml-3 text-lg font-medium text-gray-900">Processing your statement...</span>
                                    </div>
                                    <div className="mt-4 bg-gray-200 rounded-full h-2">
                                        <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: "60%" }}></div>
                                    </div>
                                </div>
                            )}

                            {/* Success Status */}
                            {isProcessed && (
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <CheckCircle className="h-6 w-6 text-green-600" />
                                            <span className="ml-3 text-lg font-medium text-gray-900">Processing Complete!</span>
                                        </div>
                                        <button className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                                            <Download className="h-4 w-4 mr-2" />
                                            Download Excel
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Data Preview */}
                            {isProcessed && (
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Extracted Data Preview</h2>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Date
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Description
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Amount
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Balance
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {sampleData.map((row, index) => (
                                                    <tr key={index} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.date}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.description}</td>
                                                        <td
                                                            className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${row.amount >= 0 ? "text-green-600" : "text-red-600"
                                                                }`}
                                                        >
                                                            ${row.amount.toFixed(2)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            ${row.balance.toFixed(2)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <p className="mt-4 text-sm text-gray-500">
                                        Showing 5 of 127 transactions. Download the complete Excel file to view all data.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}
