"use client"

import { Link } from "react-router-dom"
import { FaUsers, FaMapMarkerAlt, FaCity, FaChevronRight, FaHeart, FaRegHeart } from "react-icons/fa"
import { useFavorites } from "../context/FavoritesContext"
import { useAuth } from "../hooks/useAuth"

const CountryCard = ({ country, featured = false }) => {
  const { user } = useAuth()
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const isCountryFavorite = user && isFavorite(country.cca3)

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) return // Don't do anything if user is not logged in

    if (isCountryFavorite) {
      removeFavorite(country.cca3)
    } else {
      addFavorite(country.cca3)
    }
  }

  return (
    <Link to={`/countries/${country.name.common}`} className="country-card">
      <div className="country-flag">
        <img src={country.flags.png || "/placeholder.svg"} alt={`Flag of ${country.name.common}`} />
        {featured && <div className="featured-badge">Featured</div>}
      </div>
      <div className="country-info">
        <div className="flex justify-between items-start">
          <h3 className="country-name">{country.name.common}</h3>
          {user && (
            <button
              onClick={handleFavoriteClick}
              className="favorite-btn"
              aria-label={isCountryFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isCountryFavorite ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-400 hover:text-red-500" />
              )}
            </button>
          )}
        </div>
        <div className="country-details">
          <div className="country-detail">
            <FaUsers />
            <span className="country-detail-label">Population:</span>
            <span>{country.population.toLocaleString()}</span>
          </div>
          <div className="country-detail">
            <FaMapMarkerAlt />
            <span className="country-detail-label">Region:</span>
            <span>{country.region}</span>
          </div>
          <div className="country-detail">
            <FaCity />
            <span className="country-detail-label">Capital:</span>
            <span>{country.capital?.[0] || "N/A"}</span>
          </div>
        </div>
        <div className="country-footer">
          <span className="view-details">
            View details <FaChevronRight />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default CountryCard
