"use client"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import {
  FaHome,
  FaGlobeAmericas,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaEnvelope,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaHeart,
} from "react-icons/fa"
import { MdDashboard, MdAccountCircle } from "react-icons/md"
import { IoEarth, IoStatsChart, IoSearch, IoSettingsSharp } from "react-icons/io5"
import { RiUserSmileLine } from "react-icons/ri"
import { BiBookmark, BiHelpCircle } from "react-icons/bi"
import { WiDaySunny } from "react-icons/wi"
import { GiEarthAmerica } from "react-icons/gi"

const DashboardLayout = ({ children }) => {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  const isActive = (path) => {
    return location.pathname === path ? "bg-primary-dark" : ""
  }

  return (
    <div className="min-h-screen bg-background-light flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/dashboard" className="flex items-center">
                  <GiEarthAmerica className="h-6 w-6 text-primary" />
                  <span className="ml-2 text-xl font-bold text-gray-900">WorldExplorer</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <Link
                  to="/dashboard"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    location.pathname === "/dashboard"
                      ? "border-primary text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  <MdDashboard className="mr-1 h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  to="/countries"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    location.pathname.includes("/countries")
                      ? "border-primary text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  <IoEarth className="mr-1 h-4 w-4" />
                  Countries
                </Link>
                <Link
                  to="/profile"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    location.pathname === "/profile"
                      ? "border-primary text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  <MdAccountCircle className="mr-1 h-4 w-4" />
                  Profile
                </Link>
              </div>
              <div className="hidden md:ml-6 md:flex md:items-center">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
                        {user?.fullName?.charAt(0) || "U"}
                      </div>
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-700">{user?.fullName}</div>
                    <div className="text-xs text-gray-500">{user?.role}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-4 flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  <FaSignOutAlt className="h-3.5 w-3.5 mr-1" />
                  Logout
                </button>
              </div>
            </div>
            <div className="-mr-2 flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              >
                <span className="sr-only">Open main menu</span>
                {!isMobileMenuOpen ? (
                  <FaBars className="block h-5 w-5" aria-hidden="true" />
                ) : (
                  <FaTimes className="block h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/dashboard"
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  location.pathname === "/dashboard"
                    ? "border-primary text-primary bg-primary-light bg-opacity-10"
                    : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center">
                  <MdDashboard className="mr-2 h-5 w-5" />
                  Dashboard
                </div>
              </Link>
              <Link
                to="/countries"
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  location.pathname.includes("/countries")
                    ? "border-primary text-primary bg-primary-light bg-opacity-10"
                    : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center">
                  <IoEarth className="mr-2 h-5 w-5" />
                  Countries
                </div>
              </Link>
              <Link
                to="/profile"
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  location.pathname === "/profile"
                    ? "border-primary text-primary bg-primary-light bg-opacity-10"
                    : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center">
                  <MdAccountCircle className="mr-2 h-5 w-5" />
                  Profile
                </div>
              </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
                    {user?.fullName?.charAt(0) || "U"}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user?.fullName}</div>
                  <div className="text-sm font-medium text-gray-500">{user?.role}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <FaSignOutAlt className="mr-2 h-5 w-5" />
                    Logout
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Navigation */}
      <nav className="bg-gradient-to-r from-primary to-primary-dark text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="flex items-baseline space-x-4">
                  <Link
                    to="/dashboard"
                    className={`flex items-center space-x-2 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-dark ${isActive("/dashboard")}`}
                  >
                    <FaHome className="h-3.5 w-3.5" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/countries"
                    className={`flex items-center space-x-2 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-dark ${isActive("/countries")}`}
                  >
                    <FaGlobeAmericas className="h-3.5 w-3.5" />
                    <span>Countries</span>
                  </Link>
                  <Link
                    to="/profile"
                    className={`flex items-center space-x-2 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-dark ${isActive("/profile")}`}
                  >
                    <FaUser className="h-3.5 w-3.5" />
                    <span>Profile</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center text-sm text-white opacity-75">
                <WiDaySunny className="h-5 w-5 mr-1" />
                <span>Explore the world with WorldExplorer</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center">
                <GiEarthAmerica className="h-6 w-6 text-primary" />
                <span className="ml-2 text-lg font-bold text-gray-900">WorldExplorer</span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Explore countries from around the world with our comprehensive database.
              </p>
              <div className="mt-4 flex space-x-3">
                <a href="#" className="text-primary hover:text-primary-dark">
                  <FaHeart className="h-5 w-5" />
                </a>
                <a href="#" className="text-primary hover:text-primary-dark">
                  <BiBookmark className="h-5 w-5" />
                </a>
                <a href="#" className="text-primary hover:text-primary-dark">
                  <IoSearch className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-900 flex items-center">
                    <BiHelpCircle className="mr-2 h-4 w-4 text-primary" />
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-900 flex items-center">
                    <IoSettingsSharp className="mr-2 h-4 w-4 text-primary" />
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-900 flex items-center">
                    <RiUserSmileLine className="mr-2 h-4 w-4 text-primary" />
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-900 flex items-center">
                    <IoStatsChart className="mr-2 h-4 w-4 text-primary" />
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Connect</h3>
              <div className="mt-4 flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Twitter</span>
                  <FaTwitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">GitHub</span>
                  <FaGithub className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">LinkedIn</span>
                  <FaLinkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Email</span>
                  <FaEnvelope className="h-5 w-5" />
                </a>
              </div>
              <div className="mt-4">
                <form className="sm:flex">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="Enter your email"
                  />
                  <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Privacy</span>
                <span className="text-xs">Privacy</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Terms</span>
                <span className="text-xs">Terms</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Contact</span>
                <span className="text-xs">Contact</span>
              </a>
            </div>
            <p className="mt-8 text-xs text-gray-500 md:mt-0 md:order-1">
              &copy; {new Date().getFullYear()} WorldExplorer. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default DashboardLayout
