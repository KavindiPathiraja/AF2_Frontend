"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Notification from "./Notification"
import { FaArrowUp } from "react-icons/fa"

const Layout = ({ children }) => {
  const { user } = useAuth()
  const location = useLocation()
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Notification message={`Welcome to WorldExplorer - Discover the world's countries and cultures`} />
      <Navbar />

      {/* Main content */}
      <main className="flex-grow">{children}</main>

      <Footer />

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  )
}

export default Layout
