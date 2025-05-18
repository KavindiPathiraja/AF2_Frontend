import { Link } from "react-router-dom"
import { FaGlobeAmericas, FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaPaperPlane } from "react-icons/fa"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer" style={{ background: "linear-gradient(to right, #2E5077, #4DA1A9)" }}>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-column">
            <Link to="/dashboard" className="logo">
              <FaGlobeAmericas />
              <span>WorldExplorer</span>
            </Link>
            <p>
              Discover detailed information about every nation on Earth. From population statistics to cultural
              insights.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <FaTwitter />
              </a>
              <a href="#" className="social-link">
                <FaFacebook />
              </a>
              <a href="#" className="social-link">
                <FaInstagram />
              </a>
              <a href="#" className="social-link">
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/countries">Countries</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Resources</h3>
            <ul className="footer-links">
              <li>
                <a href="#">API Documentation</a>
              </li>
              <li>
                <a href="#">Country Data</a>
              </li>
              <li>
                <a href="#">Travel Guides</a>
              </li>
              <li>
                <a href="#">Cultural Insights</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Newsletter</h3>
            <p>Subscribe to our newsletter for updates on new countries and features.</p>
            <form className="newsletter-form">
              <input type="email" className="newsletter-input" placeholder="Your email" />
              <button type="submit" className="newsletter-btn">
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">&copy; {currentYear} WorldExplorer. All rights reserved.</p>
          <div className="footer-nav">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
