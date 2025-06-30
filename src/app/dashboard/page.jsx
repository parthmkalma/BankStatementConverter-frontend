"use client"

import { useState } from "react"
import Link from "next/link"
import axios from "axios"
import { FileText, Upload, Download, History, CreditCard, LogOut, User, CheckCircle, Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

export default function Dashboard() {
    const { user, logout } = useAuth()
    const [uploadedFile, setUploadedFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isProcessed, setIsProcessed] = useState(false)
    const [dragActive, setDragActive] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [error, setError] = useState(null)
    const [processedData, setProcessedData] = useState([])
    const [isDownloading, setIsDownloading] = useState(false)

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
            setError(null)
            setIsProcessed(false)
            setProcessedData([])
        }
    }

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedFile(e.target.files[0])
            setError(null)
            setIsProcessed(false)
            setProcessedData([])
        }
    }

    const handleProcess = async () => {
        if (!uploadedFile) {
            setError("Please select a file first")
            return
        }

        setIsProcessing(true)
        setError(null)
        setUploadProgress(0)

        try {
            const formData = new FormData()
            formData.append('file', uploadedFile)

            // Get token from your auth context or cookie
            const token = user?.token // ✅ Replace this line with your actual way of getting the JWT!

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/upload/parse`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        )
                        setUploadProgress(percentCompleted)
                    },
                    timeout: 30000
                }
            )

            if (response.data) {
                setProcessedData(response.data.parsed_data || [])
                setIsProcessed(true)
            } else {
                throw new Error('No data returned from server')
            }

        } catch (err) {
            console.error('Upload error:', err)

            if (err.code === 'ECONNABORTED') {
                setError('Upload timeout. Please try again with a smaller file.')
            } else if (err.response?.status === 413) {
                setError('File too large. Please upload a file smaller than 10MB.')
            } else if (err.response?.status === 400) {
                setError(err.response.data.detail || 'Invalid file format. Please upload a PDF or CSV file.')
            } else if (err.response?.status === 500) {
                setError('Server error. Please try again later.')
            } else {
                setError(err.message || 'An error occurred while processing the file.')
            }
        } finally {
            setIsProcessing(false)
            setUploadProgress(0)
        }
    }

    const handleDownload = async () => {
        if (!uploadedFile) {
            setError("No file available for download")
            return
        }

        setIsDownloading(true)
        setError(null)

        try {
            const formData = new FormData()
            formData.append('file', uploadedFile)

            // Get token from your auth context
            const token = user?.token

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/convert/file`, // or whatever your download endpoint is
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    },
                    responseType: 'blob',
                    timeout: 30000
                }
            )

            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `processed_statement_${new Date().getTime()}.xlsx`)
            document.body.appendChild(link)
            link.click()
            link.remove()
            window.URL.revokeObjectURL(url)

        } catch (err) {
            console.log('Download error:', err)
            if (err.code === 'ECONNABORTED') {
                setError('Download timeout. Please try again.')
            } else if (err.response?.status === 404) {
                setError('File not found. Please process the file again.')
            } else if (err.response?.status === 500) {
                setError('Server error during download. Please try again later.')
            }
            else if (err.response?.status === 402) {
                setError('Payment required. Please upgrade your plan to download files.')
            } else {
                setError('Failed to download file. Please try again.')
            }
        } finally {
            setIsDownloading(false)
        }
    }

    return (
        <div className="h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <div className="flex h-full">
                <div className="w-64 bg-white shadow-sm flex flex-col">
                    <div className="p-6">
                        <div className="flex items-center">
                            <FileText className="h-8 w-8 text-blue-600" />
                            <span className="ml-2 text-xl font-bold text-gray-900">StatementPro</span>
                        </div>
                    </div>

                    <nav className="mt-6 flex-1">
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

                    <div className="p-6 border-t border-gray-200">
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
                <div className="flex-1 overflow-auto">
                    <div className="p-8">
                        <div className="max-w-6xl mx-auto">
                            <h1 className="text-2xl font-bold text-gray-900 mb-8">Upload Bank Statement</h1>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-red-800">{error}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

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
                                                    <p className="text-xs text-gray-500">{(uploadedFile.size / 1024 / 1024)?.toFixed(2)} MB</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setUploadedFile(null)
                                                    setIsProcessed(false)
                                                    setError(null)
                                                    setProcessedData([])
                                                }}
                                                className="text-gray-400 hover:text-gray-600"
                                                disabled={isProcessing}
                                            >
                                                ×
                                            </button>
                                        </div>

                                        {!isProcessing && !isProcessed && (
                                            <button
                                                onClick={handleProcess}
                                                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={isProcessing}
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
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${uploadProgress}%` }}
                                        ></div>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-600">
                                        {uploadProgress}% complete
                                    </p>
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
                                        <button
                                            onClick={handleDownload}
                                            disabled={isDownloading}
                                            className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isDownloading ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                    Downloading...
                                                </>
                                            ) : (
                                                <>
                                                    <Download className="h-4 w-4 mr-2" />
                                                    Download Excel
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Data Preview */}
                            {isProcessed && processedData.length > 0 && (
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Extracted Data Preview</h2>

                                    {/* Table Container with Internal Scroll */}
                                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                                        <div className="overflow-x-auto max-h-96 overflow-y-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50 sticky top-0 z-10">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Date
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Description
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Ref No
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Debit
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Credit
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Balance
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {processedData.map((row, index) => (
                                                        <tr key={index} className="hover:bg-gray-50">
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {row.date}
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate" title={row.description}>
                                                                {row.description}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {row.ref_no || '-'}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                                                                {row.debit ? `₹${row.debit.toFixed(2)}` : '-'}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                                                                {row.credit ? `₹${row.credit.toFixed(2)}` : '-'}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                ₹{row.balance?.toFixed(2)}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                                        <p>
                                            Showing {processedData.length} transactions
                                        </p>
                                        <p>
                                            Download the complete Excel file to get all data in a structured format
                                        </p>
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