"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { updateUserProfile, changePassword } from "../services/api"
import Header from "../components/Header"
import Footer from "../components/Footer"
import AlertBanner from "../components/AlertBanner"
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaIdCard, FaUserTag, FaCalendarAlt, FaLock, FaKey } from "react-icons/fa"

const Profile = () => {
  const { user } = useAuth()
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    country: "",
  })
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [activeTab, setActiveTab] = useState("profile")

  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.fullName || "",
        email: user.email || "",
        country: user.country || "",
      })
    }
  }, [user])

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      await updateUserProfile(user._id, profileData)
      // Update local user data
      const updatedUser = { ...user, ...profileData }
      localStorage.setItem("user", JSON.stringify(updatedUser))

      setSuccess("Profile updated successfully")
    } catch (err) {
      setError(err.message || "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      await changePassword(user._id, passwordData.newPassword)
      setSuccess("Password changed successfully")
      setPasswordData({
        newPassword: "",
        confirmPassword: "",
      })
    } catch (err) {
      setError(err.message || "Failed to change password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* <AlertBanner message="Welcome to WorldExplorer - Discover the world's countries and cultures" /> */}
      <Header />

      <div className="container profile-container">
        <div className="profile-header">
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#2c3e50", marginBottom: "10px" }}>Your Profile</h1>
          <p style={{ color: "#666" }}>View and update your profile information</p>
        </div>

        <div className="profile-grid">
          <div className="profile-card">
            <div className="profile-avatar">{user?.fullName ? user.fullName.charAt(0) : "U"}</div>
            <h2 className="profile-name">{user?.fullName}</h2>
            <div className="profile-email">
              <FaEnvelope />
              {user?.email}
            </div>
            <div className="profile-badge">{user?.role}</div>

            <div className="profile-details">
              <div className="profile-detail">
                <div className="profile-detail-label">
                  <FaIdCard /> User ID
                </div>
                <div className="profile-detail-value">{user?.userId}</div>
              </div>
              <div className="profile-detail">
                <div className="profile-detail-label">
                  <FaUserTag /> Role
                </div>
                <div className="profile-detail-value" style={{ textTransform: "capitalize" }}>
                  {user?.role}
                </div>
              </div>
              <div className="profile-detail">
                <div className="profile-detail-label">
                  <FaMapMarkerAlt /> Country
                </div>
                <div className="profile-detail-value">{user?.country}</div>
              </div>
              <div className="profile-detail">
                <div className="profile-detail-label">
                  <FaCalendarAlt /> Joined
                </div>
                <div className="profile-detail-value">{new Date(user?.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          </div>

          <div className="profile-tabs">
            <div className="profile-tab-header">
              <div
                className={`profile-tab ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                Edit Profile
              </div>
              <div
                className={`profile-tab ${activeTab === "password" ? "active" : ""}`}
                onClick={() => setActiveTab("password")}
              >
                Change Password
              </div>
            </div>

            <div className="profile-tab-content">
              {error && <div className="alert alert-error">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              {activeTab === "profile" ? (
                <form onSubmit={handleProfileSubmit}>
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
                        value={profileData.fullName}
                        onChange={handleProfileChange}
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
                        value={profileData.email}
                        onChange={handleProfileChange}
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
                        value={profileData.country}
                        onChange={handleProfileChange}
                        className="form-input"
                        style={{ paddingLeft: "35px" }}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handlePasswordSubmit}>
                  <div className="form-group">
                    <label htmlFor="newPassword" className="form-label">
                      New Password
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
                        id="newPassword"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="form-input"
                        style={{ paddingLeft: "35px" }}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <div style={{ position: "relative" }}>
                      <FaKey
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
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="form-input"
                        style={{ paddingLeft: "35px" }}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Changing..." : "Change Password"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Profile
