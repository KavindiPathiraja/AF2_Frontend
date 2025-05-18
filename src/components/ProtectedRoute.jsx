"use client"
import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/dashboard" />
  }

  return children
}

export default ProtectedRoute
