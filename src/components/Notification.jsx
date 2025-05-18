"use client"

import { useState } from "react"
import { FaTimes } from "react-icons/fa"

const Notification = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-red-500 text-white py-2 px-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm text-center flex-grow">{message}</p>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white hover:text-gray-200 focus:outline-none"
          aria-label="Close notification"
        >
          <FaTimes className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default Notification
