"use client"

import { useState, useEffect } from "react"
import { getAllCountries } from "../services/api"
import Header from "../components/Header"
import Footer from "../components/Footer"
import AlertBanner from "../components/AlertBanner"
import CountryCard from "../components/CountryCard"
import { FaSearch, FaFilter, FaGlobeAmericas, FaSortAmountDown, FaSearch as FaSearchIcon } from "react-icons/fa"

const CountryList = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [regions, setRegions] = useState([])
  const [sortBy, setSortBy] = useState("name")

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getAllCountries()
        setCountries(data)
        setFilteredCountries(data)

        // Extract unique regions
        const uniqueRegions = [...new Set(data.map((country) => country.region))].filter(Boolean)
        setRegions(uniqueRegions)
      } catch (err) {
        setError("Failed to fetch countries")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  useEffect(() => {
    // Filter countries based on search term and selected region
    let result = countries

    if (searchTerm) {
      result = result.filter(
        (country) =>
          country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (country.capital &&
            country.capital[0] &&
            country.capital[0].toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedRegion) {
      result = result.filter((country) => country.region === selectedRegion)
    }

    // Sort countries
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.common.localeCompare(b.name.common)
        case "population":
          return b.population - a.population
        case "area":
          return b.area - a.area
        default:
          return 0
      }
    })

    setFilteredCountries(result)
  }, [searchTerm, selectedRegion, countries, sortBy])

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value)
  }

  return (
    <>
      {/* <AlertBanner message="Welcome to WorldExplorer - Discover the world's countries and cultures" /> */}
      <Header />

      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="container">
          <h1>
            <FaGlobeAmericas style={{ marginRight: "15px", display: "inline" }} />
            Countries Directory
          </h1>
          <p>Explore our comprehensive database of countries from around the world</p>
        </div>
      </section>

      <div className="container" style={{ padding: "40px 0" }}>
        {/* Search and Filter Section */}
        <div className="filter-section">
          <div className="filter-grid">
            {/* Search */}
            <div className="filter-group">
              <label htmlFor="search">
                <FaSearch style={{ marginRight: "5px" }} />
                Search Countries
              </label>
              <input
                type="text"
                id="search"
                className="filter-input"
                placeholder="Search by name or capital..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Region Filter */}
            <div className="filter-group">
              <label htmlFor="region">
                <FaFilter style={{ marginRight: "5px" }} />
                Filter by Region
              </label>
              <select id="region" className="filter-select" value={selectedRegion} onChange={handleRegionChange}>
                <option value="">All Regions</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="filter-group">
              <label htmlFor="sortBy">
                <FaSortAmountDown style={{ marginRight: "5px" }} />
                Sort By
              </label>
              <select id="sortBy" className="filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">Name (A-Z)</option>
                <option value="population">Population (Highest)</option>
                <option value="area">Area (Largest)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "30px 0 20px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2c3e50" }}>All Countries</h2>
          <p style={{ color: "#666" }}>
            Showing {filteredCountries.length} of {countries.length} countries
          </p>
        </div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "50px 0" }}>
            <div className="loader">Loading...</div>
          </div>
        ) : error ? (
          <div className="alert alert-error">{error}</div>
        ) : filteredCountries.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "50px 0",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <FaSearchIcon style={{ fontSize: "3rem", color: "#ddd", marginBottom: "20px" }} />
            <p style={{ color: "#666", fontSize: "1.2rem", marginBottom: "20px" }}>
              No countries found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedRegion("")
                setSortBy("name")
              }}
              className="btn btn-primary"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="countries-grid">
            {filteredCountries.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}

export default CountryList
