import { useState, useEffect, useRef } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { FaGlobeAmericas, FaBars, FaTimes, FaSignOutAlt, FaUser } from "react-icons/fa"

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const dropdownRef = useRef(null)

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + "/")
  }

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/dashboard" className="logo">
          <FaGlobeAmericas />
          <span>WorldExplorer</span>
        </Link>

        <nav>
          <ul className="nav-menu">
            <li>
              <Link to="/dashboard" className={isActive("/dashboard") ? "active" : ""}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/countries" className={isActive("/countries") ? "active" : ""}>
                Countries
              </Link>
            </li>
            <li>
              <Link to="/favorites" className={isActive("/favorites") ? "active" : ""}>
                Favorites
              </Link>
            </li>
            <li>
              <Link to="/profile" className={isActive("/profile") ? "active" : ""}>
                Profile
              </Link>
            </li>
          </ul>
        </nav>

        {user && (
          <div className="user-menu">
            <div className="user-info" onClick={(e) => {
              e.stopPropagation(); // Prevent event propagation to the parent container
              setDropdownOpen(!dropdownOpen); // Toggle the dropdown state
            }}>
              <div className="user-avatar">{user.fullName ? user.fullName.charAt(0) : "U"}</div>
              <span className="user-name">{user.fullName}</span>
            </div>

            <div
              className={`dropdown-menu ${dropdownOpen ? "show" : ""}`} 
              ref={dropdownRef}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={handleLogout}>
                <FaSignOutAlt /> Sign out
              </button>
            </div>
          </div>
        )}

        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
          <FaBars />
        </button>
      </div>
    </header>
  )
}

export default Header
