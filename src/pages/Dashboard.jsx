"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { getAllCountries } from "../services/api"
import Header from "../components/Header"
import Footer from "../components/Footer"
import AlertBanner from "../components/AlertBanner"
import CountryCard from "../components/CountryCard"
import { FaGlobeAmericas, FaMapMarkerAlt, FaUsers, FaChevronRight } from "react-icons/fa"
import { MdTrendingUp, MdTrendingDown } from "react-icons/md"

const Dashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalCountries: 0,
    regions: [],
    smallestCountry: null,
    largestCountry: null,
  })
  const [featuredCountries, setFeaturedCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countries = await getAllCountries()

        // Get total count
        const totalCountries = countries.length

        // Get unique regions
        const regions = [...new Set(countries.map((country) => country.region))].filter(Boolean)

        // Find smallest and largest countries by population
        const sortedByPopulation = [...countries].sort((a, b) => a.population - b.population)
        const smallestCountry = sortedByPopulation[0]
        const largestCountry = sortedByPopulation[sortedByPopulation.length - 1]

        // Get 4 random countries for featured section
        const randomCountries = [...countries].sort(() => 0.5 - Math.random()).slice(0, 4)

        setStats({
          totalCountries,
          regions,
          smallestCountry,
          largestCountry,
        })
        setFeaturedCountries(randomCountries)
      } catch (err) {
        setError("Failed to load country statistics")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="loader">Loading...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <>
      {/* <AlertBanner message="Welcome to WorldExplorer - Discover the world's countries and cultures" /> */}
      <Header />

      {/* Hero Section */}
      <section
        className="w-full bg-cover bg-center relative"
        style={{
          backgroundImage:
            "linear-gradient(rgba(46, 80, 119, 0.85), rgba(77, 161, 169, 0.85)), url('https://images.unsplash.com/photo-1526778855283-5fa896f21f2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')",
          minHeight: "500px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container mx-auto px-4 py-16 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore the World's Countries</h1>
            <p className="text-xl mb-8 opacity-90">
              Discover detailed information about every nation on Earth. From population statistics to cultural
              insights.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/countries"
                className="px-6 py-3 bg-accent text-white font-medium rounded-md hover:bg-accent-dark transition-colors"
              >
                Browse Countries
              </Link>
              <Link
                to="/profile"
                className="px-6 py-3 bg-white text-primary font-medium rounded-md hover:bg-gray-100 transition-colors"
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="section-title">
            <h2>Global Statistics</h2>
            <p>Key facts and figures about our world</p>
          </div>

          <div className="stats-grid">
            {/* Total Countries */}
            <div className="stat-card">
              <div className="stat-icon blue">
                <FaGlobeAmericas />
              </div>
              <div className="stat-value">{stats.totalCountries}</div>
              <div className="stat-label">Total Countries</div>
              <Link to="/countries" className="stat-link">
                View all countries <FaChevronRight />
              </Link>
            </div>

            {/* Regions */}
            <div className="stat-card">
              <div className="stat-icon green">
                <FaMapMarkerAlt />
              </div>
              <div className="stat-value">{stats.regions.length}</div>
              <div className="stat-label">Regions</div>
              <div style={{ marginTop: "10px" }}>
                {stats.regions.slice(0, 3).map((region) => (
                  <span
                    key={region}
                    style={{
                      display: "inline-block",
                      background: "rgba(77, 161, 169, 0.1)",
                      color: "#4DA1A9",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      marginRight: "5px",
                      marginBottom: "5px",
                    }}
                  >
                    {region}
                  </span>
                ))}
                {stats.regions.length > 3 && (
                  <span
                    style={{
                      display: "inline-block",
                      background: "#f1f1f1",
                      color: "#666",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  >
                    +{stats.regions.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Largest Country */}
            {stats.largestCountry && (
              <div className="stat-card">
                <div className="stat-icon orange">
                  <MdTrendingUp />
                </div>
                <div className="stat-value">{stats.largestCountry.name.common}</div>
                <div className="stat-label">Largest Population</div>
                <div style={{ display: "flex", alignItems: "center", marginTop: "10px", color: "#666" }}>
                  <FaUsers style={{ marginRight: "5px" }} />
                  <span>{stats.largestCountry.population.toLocaleString()}</span>
                </div>
                <Link to={`/countries/${stats.largestCountry.name.common}`} className="stat-link">
                  View details <FaChevronRight />
                </Link>
              </div>
            )}

            {/* Smallest Country */}
            {stats.smallestCountry && (
              <div className="stat-card">
                <div className="stat-icon red">
                  <MdTrendingDown />
                </div>
                <div className="stat-value">{stats.smallestCountry.name.common}</div>
                <div className="stat-label">Smallest Population</div>
                <div style={{ display: "flex", alignItems: "center", marginTop: "10px", color: "#666" }}>
                  <FaUsers style={{ marginRight: "5px" }} />
                  <span>{stats.smallestCountry.population.toLocaleString()}</span>
                </div>
                <Link to={`/countries/${stats.smallestCountry.name.common}`} className="stat-link">
                  View details <FaChevronRight />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Countries Section */}
      <section className="countries-section">
        <div className="container">
          <div className="section-title">
            <h2>Featured Countries</h2>
            <p>Explore some of the world's fascinating nations</p>
          </div>

          <div className="countries-grid">
            {featuredCountries.map((country) => (
              <CountryCard key={country.cca3} country={country} featured={true} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link to="/countries" className="btn btn-primary">
              View All Countries <FaChevronRight style={{ marginLeft: "5px" }} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Dashboard
