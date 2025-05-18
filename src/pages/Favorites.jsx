"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getCountryByCode } from "../services/api"
import { useFavorites } from "../context/FavoritesContext"
import CountryCard from "../components/CountryCard"
import Header from "../components/Header"
import Footer from "../components/Footer"
import AlertBanner from "../components/AlertBanner"
import { FaHeart, FaArrowLeft } from "react-icons/fa"

const Favorites = () => {
  const { favorites, loading: favoritesLoading } = useFavorites()
  const [favoriteCountries, setFavoriteCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFavoriteCountries = async () => {
      if (favorites.length === 0) {
        setFavoriteCountries([])
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const countriesPromises = favorites.map((code) => getCountryByCode(code))
        const countriesData = await Promise.all(countriesPromises)
        setFavoriteCountries(countriesData.map((country) => country[0]))
        setLoading(false)
      } catch (err) {
        setError("Failed to load favorite countries")
        setLoading(false)
      }
    }

    if (!favoritesLoading) {
      fetchFavoriteCountries()
    }
  }, [favorites, favoritesLoading])

  return (
    <>
      <Header />

      <div className="container" style={{ padding: "40px 0" }}>
        <div style={{ marginBottom: "20px" }}>
          <Link to="/countries" className="back-button">
            <FaArrowLeft /> Back to Countries
          </Link>
        </div>

        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              color: "#2c3e50",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaHeart style={{ color: "#e74c3c", marginRight: "10px" }} /> My Favorite Countries
          </h1>
          <p style={{ color: "#666" }}>Countries you've saved for quick access</p>
        </div>

        {loading || favoritesLoading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "50px 0" }}>
            <div className="loader">Loading...</div>
          </div>
        ) : error ? (
          <div className="alert alert-error">{error}</div>
        ) : favoriteCountries.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px 20px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
            <FaHeart style={{ fontSize: "3rem", color: "#e0e0e0", marginBottom: "20px" }} />
            <h2 style={{ fontSize: "1.5rem", color: "#2c3e50", marginBottom: "10px" }}>No Favorite Countries Yet</h2>
            <p style={{ color: "#666", marginBottom: "20px" }}>
              Start exploring and add countries to your favorites by clicking the heart icon on the country detail page.
            </p>
            <Link
              to="/countries"
              style={{
                display: "inline-block",
                padding: "10px 20px",
                backgroundColor: "#4DA1A9",
                color: "white",
                borderRadius: "4px",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Explore Countries
            </Link>
          </div>
        ) : (
          <div
            className="countries-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}
          >
            {favoriteCountries.map((country) => (
              <div key={country.cca3}>
                <CountryCard country={country} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}

export default Favorites
