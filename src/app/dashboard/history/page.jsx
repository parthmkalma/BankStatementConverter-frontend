"use client"

import Link from "next/link"
import { FileText, Download, User, LogOut, Upload, History, CreditCard, CheckCircle, XCircle } from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useAuth } from "@/hooks/useAuth"

export default function HistoryPage() {
    const { user, logout } = useAuth()

    const historyData = [
        {
            id: 1,
            fileName: "chase_statement_jan_2024.pdf",
            uploadDate: "2024-01-20",
            status: "Success",
            downloadUrl: "#",
        },
        {
            id: 2,
            fileName: "wells_fargo_dec_2023.pdf",
            uploadDate: "2024-01-18",
            status: "Success",
            downloadUrl: "#",
        },
        {
            id: 3,
            fileName: "bank_statement_nov_2023.pdf",
            uploadDate: "2024-01-15",
            status: "Failed",
            downloadUrl: null,
        },
        {
            id: 4,
            fileName: "bofa_statement_oct_2023.pdf",
            uploadDate: "2024-01-12",
            status: "Success",
            downloadUrl: "#",
        },
        {
            id: 5,
            fileName: "credit_union_sep_2023.pdf",
            uploadDate: "2024-01-10",
            status: "Success",
            downloadUrl: "#",
        },
    ]

    return (
        <ProtectedRoute>
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
                                            <p className="text-2xl font-bold text-gray-900">24</p>
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
                                            <p className="text-2xl font-bold text-gray-900">22</p>
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
                                            <p className="text-2xl font-bold text-gray-900">2</p>
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
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {historyData.map((item) => (
                                                <tr key={item.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <FileText className="h-5 w-5 text-red-500 mr-3" />
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">{item.fileName}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {new Date(item.uploadDate).toLocaleDateString()}
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
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        {item.downloadUrl ? (
                                                            <button className="flex items-center text-blue-600 hover:text-blue-900">
                                                                <Download className="h-4 w-4 mr-1" />
                                                                Download
                                                            </button>
                                                        ) : (
                                                            <span className="text-gray-400">Not available</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
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
                                                Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{" "}
                                                <span className="font-medium">24</span> results
                                            </p>
                                        </div>
                                        <div>
                                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                    Previous
                                                </button>
                                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                                    1
                                                </button>
                                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600">
                                                    2
                                                </button>
                                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                                    3
                                                </button>
                                                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                    Next
                                                </button>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}
