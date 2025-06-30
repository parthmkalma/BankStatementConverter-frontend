"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export function useAuth() {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [authError, setAuthError] = useState(null)
    const router = useRouter()

    useEffect(() => {
        axios.defaults.baseURL = API_BASE_URL
        axios.defaults.withCredentials = true

        const fetchUser = async () => {
            setIsLoading(true)
            try {
                const res = await axios.get("/auth/me")
                setUser(res.data)
            } catch (err) {
                console.log("Auth check failed:", err.response || err)
                setUser(null)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUser()
    }, [])

    const logout = async () => {
        setIsLoading(true)
        try {
            await axios.post("/auth/logout")
            setUser(null)
            router.push("/login")
        } catch (err) {
            console.error("Logout failed:", err.response || err)
        } finally {
            setIsLoading(false)
        }
    }

    const isAuthenticated = !!user

    return {
        user,
        isAuthenticated,
        isLoading,
        authError,
        logout,
    }
}
