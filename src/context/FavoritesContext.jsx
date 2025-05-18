"use client"

import { createContext, useState, useEffect, useContext } from "react"
import { useAuth } from "../hooks/useAuth"
import { addFavoriteCountry, removeFavoriteCountry, getFavoriteCountries } from "../services/api"

const FavoritesContext = createContext()

export const useFavorites = () => {
  return useContext(FavoritesContext)
}

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load user's favorites when component mounts or user changes
  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        setFavorites([])
        return
      }

      setLoading(true)
      try {
        const data = await getFavoriteCountries(user._id)
        setFavorites(data.favorites || [])
      } catch (err) {
        console.error("Failed to load favorites:", err)
        setError("Failed to load favorites")
      } finally {
        setLoading(false)
      }
    }

    loadFavorites()
  }, [user])

  // Add a country to favorites
  const addFavorite = async (countryCode) => {
    if (!user) return

    setLoading(true)
    try {
      await addFavoriteCountry(user._id, countryCode)
      setFavorites((prev) => [...prev, countryCode])
    } catch (err) {
      console.error("Failed to add favorite:", err)
      setError("Failed to add to favorites")
    } finally {
      setLoading(false)
    }
  }

  // Remove a country from favorites
  const removeFavorite = async (countryCode) => {
    if (!user) return

    setLoading(true)
    try {
      await removeFavoriteCountry(user._id, countryCode)
      setFavorites((prev) => prev.filter((code) => code !== countryCode))
    } catch (err) {
      console.error("Failed to remove favorite:", err)
      setError("Failed to remove from favorites")
    } finally {
      setLoading(false)
    }
  }

  // Check if a country is in favorites
  const isFavorite = (countryCode) => {
    return favorites.includes(countryCode)
  }

  const value = {
    favorites,
    loading,
    error,
    addFavorite,
    removeFavorite,
    isFavorite,
  }

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
