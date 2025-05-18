"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { FaGlobeAmericas, FaBars, FaTimes, FaUserCircle, FaSignOutAlt } from "react-icons/fa"

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header
      className={`${scrolled ? "bg-white shadow-md" : "bg-gradient-to-r from-primary to-secondary"} transition-all duration-300 sticky top-0 z-50`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/dashboard" className="flex items-center">
              <div className={`rounded-full p-2 ${scrolled ? "bg-primary text-white" : "bg-white text-primary"}`}>
                <FaGlobeAmericas className="h-6 w-6" />
              </div>
              <span className={`ml-2 text-xl font-bold ${scrolled ? "text-primary" : "text-white"}`}>
                WorldExplorer
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/dashboard"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive("/dashboard")
                  ? scrolled
                    ? "text-primary border-b-2 border-primary"
                    : "text-white border-b-2 border-white"
                  : scrolled
                    ? "text-gray-700 hover:text-primary"
                    : "text-white/80 hover:text-white"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/countries"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive("/countries") || location.pathname.includes("/countries/")
                  ? scrolled
                    ? "text-primary border-b-2 border-primary"
                    : "text-white border-b-2 border-white"
                  : scrolled
                    ? "text-gray-700 hover:text-primary"
                    : "text-white/80 hover:text-white"
              }`}
            >
              Countries
            </Link>
            <Link
              to="/profile"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive("/profile")
                  ? scrolled
                    ? "text-primary border-b-2 border-primary"
                    : "text-white border-b-2 border-white"
                  : scrolled
                    ? "text-gray-700 hover:text-primary"
                    : "text-white/80 hover:text-white"
              }`}
            >
              Profile
            </Link>
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center">
              <div className="relative group">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${scrolled ? "bg-primary text-white" : "bg-white text-primary"}`}
                  >
                    {user?.fullName?.charAt(0) || <FaUserCircle />}
                  </div>
                  <span className={`text-sm font-medium ${scrolled ? "text-gray-700" : "text-white"}`}>
                    {user?.fullName?.split(" ")[0]}
                  </span>
                </button>
                <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-1">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Your Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md focus:outline-none ${scrolled ? "text-primary" : "text-white"}`}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <FaTimes className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"} bg-white shadow-lg`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/dashboard"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/dashboard") ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/countries"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/countries") || location.pathname.includes("/countries/")
                ? "bg-primary text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Countries
          </Link>
          <Link
            to="/profile"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/profile") ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Profile
          </Link>
          <button
            onClick={() => {
              handleLogout()
              setIsMobileMenuOpen(false)
            }}
            className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
          >
            <FaSignOutAlt className="mr-2 h-5 w-5 text-gray-500" />
            Sign out
          </button>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                {user?.fullName?.charAt(0) || <FaUserCircle className="h-6 w-6" />}
              </div>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">{user?.fullName}</div>
              <div className="text-sm font-medium text-gray-500">{user?.email}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
