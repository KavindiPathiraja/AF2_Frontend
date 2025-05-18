"use client"

import { createContext, useState, useEffect } from "react"
import { login, refreshToken, logout } from '../services/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const storedUser = localStorage.getItem("user")
      const storedToken = localStorage.getItem("accessToken")

      if (storedUser && storedToken) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (error) {
          console.error("Failed to parse stored user:", error)
          localStorage.removeItem("user")
          localStorage.removeItem("accessToken")
        }
      }

      setLoading(false)
    }

    checkAuth()
  }, [])

  const handleLogin = async (email, password) => {
    setLoading(true)
    setError(null)

    try {
      const response = await login(email, password)

      if (response.accessToken && response.user) {
        localStorage.setItem("accessToken", response.accessToken)
        localStorage.setItem("user", JSON.stringify(response.user))
        setUser(response.user)
        return true
      } else {
        throw new Error("Invalid response from server")
      }
    } catch (error) {
      setError(error.message || "Login failed")
      return false
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    setLoading(true)

    try {
      await logout()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("user")
      setUser(null)
      setLoading(false)
    }
  }

  const refreshAccessToken = async () => {
    try {
      const response = await refreshToken()
      if (response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken)
        return true
      }
      return false
    } catch (error) {
      console.error("Token refresh failed:", error)
      return false
    }
  }

  const value = {
    user,
    loading,
    error,
    login: handleLogin,
    logout: handleLogout,
    refreshToken: refreshAccessToken,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
