"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { userSignup } from "../services/api"
import { FaGlobeAmericas, FaUser, FaEnvelope, FaLock, FaMapMarkerAlt } from "react-icons/fa"

const Signup = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    country: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await userSignup(formData)
      navigate("/login", { state: { message: "Account created successfully. Please log in." } })
    } catch (err) {
      setError(err.message || "Failed to create account")
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
          <h2 className="auth-title">Create your account</h2>
          <p className="auth-subtitle">Sign up to explore the world with WorldExplorer</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <div style={{ position: "relative" }}>
              <FaUser
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#aaa",
                }}
              />
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="form-input"
                style={{ paddingLeft: "35px" }}
                required
              />
            </div>
          </div>

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

          <div className="form-group">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <div style={{ position: "relative" }}>
              <FaMapMarkerAlt
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#aaa",
                }}
              />
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-input"
                style={{ paddingLeft: "35px" }}
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <div className="auth-divider">
          <span>Or</span>
        </div>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
