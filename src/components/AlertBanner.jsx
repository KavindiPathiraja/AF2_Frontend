import { useState } from "react"
import { FaTimes } from "react-icons/fa"

const AlertBanner = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="alert-banner">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p>{message}</p>
          <button onClick={() => setIsVisible(false)} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>
            <FaTimes />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AlertBanner
