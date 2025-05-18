"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { FaGlobeAmericas, FaEnvelope, FaLock } from "react-icons/fa"

const Login = () => {
  const { login, loading: authLoading, error: authError } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const success = await login(formData.email, formData.password)
      if (success) {
        navigate("/dashboard")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError(err.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <FaGlobeAmericas />
          </div>
          <h2 className="auth-title">Sign in to WorldExplorer</h2>
          <p className="auth-subtitle">Enter your credentials to access your account</p>
        </div>

        {(error || authError) && <div className="alert alert-error">{error || authError}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <FaEnvelope
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#aaa",
                }}
              />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                style={{ paddingLeft: "35px" }}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div style={{ position: "relative" }}>
              <FaLock
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#aaa",
                }}
              />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                style={{ paddingLeft: "35px" }}
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-btn" disabled={loading || authLoading}>
            {loading || authLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="auth-divider">
          <span>Or</span>
        </div>

        <div className="auth-links">
          <Link to="/signup" className="auth-link">
            Sign up
          </Link>
          <Link to="/admin-signup" className="auth-link">
            Admin Sign up
          </Link>
        </div>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/signup">Create one now</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
