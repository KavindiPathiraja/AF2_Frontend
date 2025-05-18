"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getCountryByName } from "../services/api"
import Header from "../components/Header"
import Footer from "../components/Footer"
import AlertBanner from "../components/AlertBanner"
import { useFavorites } from "../context/FavoritesContext"
import {
  FaArrowLeft,
  FaUsers,
  FaMapMarkerAlt,
  FaGlobeAmericas,
  FaLanguage,
  FaMoneyBillWave,
  FaRulerCombined,
  FaClock,
  FaExternalLinkAlt,
  FaMap,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa"

const CountryDetail = () => {
  const { name } = useParams()
  const navigate = useNavigate()
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const data = await getCountryByName(name)
        if (data && data.length > 0) {
          setCountry(data[0])
        } else {
          setError("Country not found")
        }
      } catch (err) {
        setError(`Failed to fetch country: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchCountry()
  }, [name])

  const handleFavoriteToggle = () => {
    if (!country) return

    if (isFavorite(country.cca3)) {
      removeFavorite(country.cca3)
    } else {
      addFavorite(country.cca3)
    }
  }

  if (loading) {
    return (
      <>
        <AlertBanner message="Welcome to WorldExplorer - Discover the world's countries and cultures" />
        <Header />
        <div style={{ display: "flex", justifyContent: "center", padding: "100px 0" }}>
          <div className="loader">Loading...</div>
        </div>
        <Footer />
      </>
    )
  }

  if (error || !country) {
    return (
      <>
        <AlertBanner message="Welcome to WorldExplorer - Discover the world's countries and cultures" />
        <Header />
        <div className="container" style={{ padding: "50px 0" }}>
          <div className="alert alert-error">{error || "Country not found"}</div>
        </div>
        <Footer />
      </>
    )
  }

  // Format languages
  const languages = country.languages ? Object.values(country.languages).join(", ") : "N/A"

  // Format currencies
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((currency) => `${currency.name} (${currency.symbol})`)
        .join(", ")
    : "N/A"

  const isCountryFavorite = isFavorite(country.cca3)

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="country-detail-hero">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <button onClick={() => navigate(-1)} className="back-button">
              <FaArrowLeft /> Back to Countries
            </button>

            <button
              onClick={handleFavoriteToggle}
              className="favorite-button"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "4px",
                border: "none",
                background: isCountryFavorite ? "#f8d7da" : "#e2e8f0",
                color: isCountryFavorite ? "#dc3545" : "#4a5568",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {isCountryFavorite ? (
                <>
                  <FaHeart style={{ color: "#dc3545" }} /> Remove from Favorites
                </>
              ) : (
                <>
                  <FaRegHeart /> Add to Favorites
                </>
              )}
            </button>
          </div>

          <div className="country-detail-header">
            <div className="country-detail-name">
              <h1>{country.name.common}</h1>
              <p>{country.name.official}</p>
            </div>
            <img
              src={country.flags.png || "/placeholder.svg"}
              alt={`Flag of ${country.name.common}`}
              className="country-detail-flag"
            />
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: "40px 0" }}>
        {/* Tabs */}
        <div className="country-tabs">
          <div
            className={`country-tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </div>
          <div
            className={`country-tab ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </div>
          <div className={`country-tab ${activeTab === "maps" ? "active" : ""}`} onClick={() => setActiveTab("maps")}>
            Maps
          </div>
        </div>

        {/* Tab Content */}
        <div className="country-detail-content">
          {activeTab === "overview" && (
            <div className="country-detail-grid">
              <div>
                <img
                  src={country.flags.png || "/placeholder.svg"}
                  alt={`Flag of ${country.name.common}`}
                  style={{ width: "100%", borderRadius: "8px", marginBottom: "20px" }}
                />
                <h3 style={{ fontSize: "1.5rem", marginBottom: "15px", color: "#2c3e50" }}>Quick Facts</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <div className="detail-item">
                    <div className="detail-icon blue">
                      <FaMapMarkerAlt />
                    </div>
                    <div className="detail-info">
                      <h4>Capital</h4>
                      <p>{country.capital?.[0] || "N/A"}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-icon green">
                      <FaGlobeAmericas />
                    </div>
                    <div className="detail-info">
                      <h4>Region</h4>
                      <p>
                        {country.region} {country.subregion ? `(${country.subregion})` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-icon orange">
                      <FaUsers />
                    </div>
                    <div className="detail-info">
                      <h4>Population</h4>
                      <p>{country.population.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-icon purple">
                      <FaLanguage />
                    </div>
                    <div className="detail-info">
                      <h4>Languages</h4>
                      <p>{languages}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "15px", color: "#2c3e50" }}>
                  About {country.name.common}
                </h3>
                <p style={{ color: "#666", marginBottom: "20px", lineHeight: "1.6" }}>
                  {country.name.common} is a country located in {country.region}
                  {country.subregion ? `, specifically in the ${country.subregion} region` : ""}.
                  {country.capital?.[0] ? ` Its capital city is ${country.capital[0]}.` : ""}
                  {country.independent ? " It is an independent country." : " It is not an independent country."}
                  {country.unMember
                    ? " It is a member of the United Nations."
                    : " It is not a member of the United Nations."}
                </p>

                <h4 style={{ fontSize: "1.2rem", marginBottom: "15px", color: "#2c3e50" }}>Economy</h4>
                <div className="detail-item">
                  <div className="detail-icon orange">
                    <FaMoneyBillWave />
                  </div>
                  <div className="detail-info">
                    <h4>Currencies</h4>
                    <p>{currencies}</p>
                  </div>
                </div>

                <h4 style={{ fontSize: "1.2rem", margin: "25px 0 15px", color: "#2c3e50" }}>Geography</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <div className="detail-item">
                    <div className="detail-icon blue">
                      <FaRulerCombined />
                    </div>
                    <div className="detail-info">
                      <h4>Area</h4>
                      <p>{country.area ? `${country.area.toLocaleString()} km²` : "N/A"}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-icon green">
                      <FaClock />
                    </div>
                    <div className="detail-info">
                      <h4>Timezones</h4>
                      <p>{country.timezones ? country.timezones.join(", ") : "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "details" && (
            <div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "20px", color: "#2c3e50" }}>Detailed Information</h3>
              <div className="country-detail-grid">
                <div>
                  <div className="detail-group">
                    <h3>General</h3>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <tbody>
                        <tr style={{ borderBottom: "1px solid #eee" }}>
                          <td style={{ padding: "10px 0", color: "#666", fontWeight: "500" }}>Official Name</td>
                          <td style={{ padding: "10px 0" }}>{country.name.official}</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #eee" }}>
                          <td style={{ padding: "10px 0", color: "#666", fontWeight: "500" }}>Common Name</td>
                          <td style={{ padding: "10px 0" }}>{country.name.common}</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #eee" }}>
                          <td style={{ padding: "10px 0", color: "#666", fontWeight: "500" }}>Capital</td>
                          <td style={{ padding: "10px 0" }}>{country.capital?.[0] || "N/A"}</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #eee" }}>
                          <td style={{ padding: "10px 0", color: "#666", fontWeight: "500" }}>Region</td>
                          <td style={{ padding: "10px 0" }}>{country.region}</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #eee" }}>
                          <td style={{ padding: "10px 0", color: "#666", fontWeight: "500" }}>Subregion</td>
                          <td style={{ padding: "10px 0" }}>{country.subregion || "N/A"}</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #eee" }}>
                          <td style={{ padding: "10px 0", color: "#666", fontWeight: "500" }}>Population</td>
                          <td style={{ padding: "10px 0" }}>{country.population.toLocaleString()}</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #eee" }}>
                          <td style={{ padding: "10px 0", color: "#666", fontWeight: "500" }}>Area</td>
                          <td style={{ padding: "10px 0" }}>
                            {country.area ? `${country.area.toLocaleString()} km²` : "N/A"}
                          </td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #eee" }}>
                          <td style={{ padding: "10px 0", color: "#666", fontWeight: "500" }}>Languages</td>
                          <td style={{ padding: "10px 0" }}>{languages}</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #eee" }}>
                          <td style={{ padding: "10px 0", color: "#666", fontWeight: "500" }}>Currencies</td>
                          <td style={{ padding: "10px 0" }}>{currencies}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <div className="detail-group">
                    <h3>Additional Information</h3>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <tbody>
                        <tr style={{ borderBottom: "1px solid #eee" }}>
                          <td style={{ padding: "10px 0", color: "#666", fontWeight: "500" }}>Independent</td>
                          <td style={{ padding: "10px 0" }}>{country.independent ? "Yes" : "No"}</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #eee" }}>
                          <td style={{ padding: "10px 0", color: "#666", fontWeight: "500" }}>UN Member</td>
                          <td style={{ padding: "10px 0" }}>{country.unMember ? "Yes" : "No"}</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #eee" }}>
                          <td style={{ padding: "10px 0", color: "#666", fontWeight: "500" }}>Timezones</td>
                          <td style={{ padding: "10px 0" }}>
                            {country.timezones ? country.timezones.join(", ") : "N/A"}
                          </td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #eee" }}>
                          <td style={{ padding: "10px 0", color: "#666", fontWeight: "500" }}>Borders</td>
                          <td style={{ padding: "10px 0" }}>
                            {country.borders && country.borders.length > 0 ? (
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                                {country.borders.map((border) => (
                                  <span
                                    key={border}
                                    style={{
                                      display: "inline-block",
                                      background: "rgba(52, 152, 219, 0.1)",
                                      color: "#3498db",
                                      padding: "2px 8px",
                                      borderRadius: "12px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {border}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              "No bordering countries"
                            )}
                          </td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #eee" }}>
                          <td style={{ padding: "10px 0", color: "#666", fontWeight: "500" }}>Top Level Domain</td>
                          <td style={{ padding: "10px 0" }}>{country.tld ? country.tld.join(", ") : "N/A"}</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #eee" }}>
                          <td style={{ padding: "10px 0", color: "#666", fontWeight: "500" }}>Car Side</td>
                          <td style={{ padding: "10px 0" }}>{country.car?.side || "N/A"}</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #eee" }}>
                          <td style={{ padding: "10px 0", color: "#666", fontWeight: "500" }}>Start of Week</td>
                          <td style={{ padding: "10px 0" }}>
                            {country.startOfWeek
                              ? country.startOfWeek.charAt(0).toUpperCase() + country.startOfWeek.slice(1)
                              : "N/A"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "maps" && (
            <div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "20px", color: "#2c3e50" }}>Maps</h3>
              {country.maps ? (
                <div className="country-detail-grid">
                  {country.maps.googleMaps && (
                    <div
                      style={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        overflow: "hidden",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div style={{ padding: "15px", backgroundColor: "#f8f9fa", borderBottom: "1px solid #eee" }}>
                        <h4 style={{ fontSize: "1.2rem", color: "#2c3e50" }}>Google Maps</h4>
                      </div>
                      <div style={{ padding: "20px" }}>
                        <p style={{ color: "#666", marginBottom: "15px" }}>
                          View {country.name.common} on Google Maps for detailed navigation and satellite imagery.
                        </p>
                        <a
                          href={country.maps.googleMaps}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="map-link google"
                        >
                          <FaMap /> Open in Google Maps{" "}
                          <FaExternalLinkAlt style={{ marginLeft: "5px", fontSize: "0.8rem" }} />
                        </a>
                      </div>
                    </div>
                  )}
                  {country.maps.openStreetMaps && (
                    <div
                      style={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        overflow: "hidden",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div style={{ padding: "15px", backgroundColor: "#f8f9fa", borderBottom: "1px solid #eee" }}>
                        <h4 style={{ fontSize: "1.2rem", color: "#2c3e50" }}>OpenStreetMap</h4>
                      </div>
                      <div style={{ padding: "20px" }}>
                        <p style={{ color: "#666", marginBottom: "15px" }}>
                          View {country.name.common} on OpenStreetMap for community-created maps with rich detail.
                        </p>
                        <a
                          href={country.maps.openStreetMaps}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="map-link osm"
                        >
                          <FaMap /> Open in OpenStreetMap{" "}
                          <FaExternalLinkAlt style={{ marginLeft: "5px", fontSize: "0.8rem" }} />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
                  <p style={{ color: "#666" }}>No map information available for this country.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default CountryDetail
