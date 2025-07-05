"use client"

import Link from "next/link"
import { FileText, User, LogOut, Upload, History, CreditCard, CheckCircle, XCircle } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useState, useEffect } from "react"
import axios from "axios"

export default function HistoryPage() {
    const { user, logout } = useAuth()
    const [historyData, setHistoryData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch history data from API
    useEffect(() => {
        const fetchHistoryData = async () => {
            try {
                setLoading(true)
                // Replace with your actual API endpoint
                const response = await axios.get('/history/')
                console.log('History data fetched:', response.data)
                setHistoryData(response.data)
            } catch (err) {
                const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch history data'
                setError(errorMessage)
                console.error('Error fetching history:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchHistoryData()
    }, [])

    // Transform API data to match the display format
    const transformedData = historyData.map(item => ({
        id: item.id,
        fileName: item.original_filename,
        uploadDate: item.uploaded_at,
        status: item.processed ? "Success" : "Failed",
        fileId: item.file_id,
        format: item.format
    }))

    // Calculate stats
    const totalConversions = transformedData.length
    const successfulConversions = transformedData.filter(item => item.status === "Success").length
    const failedConversions = transformedData.filter(item => item.status === "Failed").length

    // Format date helper function
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString)
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        } catch (error) {
            return 'Invalid Date'
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="flex">
                <div className="w-64 bg-white shadow-sm min-h-screen">
                    <div className="p-6">
                        <Link href="/" className="flex items-center">
                            <FileText className="h-8 w-8 text-blue-600" />
                            <span className="ml-2 text-xl font-bold text-gray-900">StatementPro</span>
                        </Link>
                    </div>

                    <nav className="mt-6">
                        <Link href="/dashboard" className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                            <div className="flex items-center">
                                <Upload className="h-5 w-5" />
                                <span className="ml-3 text-sm font-medium">Upload</span>
                            </div>
                        </Link>

                        <div className="px-6 py-3 bg-blue-50 border-r-4 border-blue-600">
                            <div className="flex items-center">
                                <History className="h-5 w-5 text-blue-600" />
                                <span className="ml-3 text-sm font-medium text-blue-600">History</span>
                            </div>
                        </div>

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
                    <div className="max-w-6xl mx-auto">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-2xl font-bold text-gray-900">Conversion History</h1>
                            <Link
                                href="/dashboard"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                            >
                                New Upload
                            </Link>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <FileText className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Total Conversions</p>
                                        <p className="text-2xl font-bold text-gray-900">{totalConversions}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <CheckCircle className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Successful</p>
                                        <p className="text-2xl font-bold text-gray-900">{successfulConversions}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center">
                                    <div className="p-2 bg-red-100 rounded-lg">
                                        <XCircle className="h-6 w-6 text-red-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Failed</p>
                                        <p className="text-2xl font-bold text-gray-900">{failedConversions}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* History Table */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">Recent Conversions</h2>
                            </div>

                            <div className="overflow-x-auto">
                                {loading ? (
                                    <div className="flex justify-center items-center py-8">
                                        <div className="text-gray-500">Loading...</div>
                                    </div>
                                ) : error ? (
                                    <div className="flex justify-center items-center py-8">
                                        <div className="text-red-500">Error: {error}</div>
                                    </div>
                                ) : transformedData.length === 0 ? (
                                    <div className="flex justify-center items-center py-8">
                                        <div className="text-gray-500">No conversion history found</div>
                                    </div>
                                ) : (
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    File Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Upload Date
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    File ID
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {transformedData.map((item) => (
                                                <tr key={item.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <FileText className="h-5 w-5 text-red-500 mr-3" />
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">{item.fileName}</div>
                                                                <div className="text-xs text-gray-500">{item.format.toUpperCase()}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {formatDate(item.uploadDate)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === "Success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                                                }`}
                                                        >
                                                            {item.status === "Success" ? (
                                                                <CheckCircle className="h-3 w-3 mr-1" />
                                                            ) : (
                                                                <XCircle className="h-3 w-3 mr-1" />
                                                            )}
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                                                        {item.fileId}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>

                            {/* Pagination */}
                            {transformedData.length > 0 && (
                                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                                    <div className="flex-1 flex justify-between sm:hidden">
                                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                            Previous
                                        </button>
                                        <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                            Next
                                        </button>
                                    </div>
                                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm text-gray-700">
                                                Showing <span className="font-medium">1</span> to <span className="font-medium">{transformedData.length}</span> of{" "}
                                                <span className="font-medium">{totalConversions}</span> results
                                            </p>
                                        </div>
                                        <div>
                                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                    Previous
                                                </button>
                                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600">
                                                    1
                                                </button>
                                                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                    Next
                                                </button>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}