import axios from "axios"

const API_URL = "https://af2-backend.onrender.com" 
const COUNTRIES_API_URL = "https://restcountries.com/v3.1"

// Create axios instance for our backend
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

// Create axios instance for countries API
const countriesApi = axios.create({
  baseURL: COUNTRIES_API_URL,
})

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Authentication services
export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed")
  }
}

export const userSignup = async (userData) => {
  try {
    const response = await api.post("/auth/userSignup", userData)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Signup failed")
  }
}

export const adminSignup = async (userData) => {
  try {
    const response = await api.post("/auth/adminSignup", userData)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Admin signup failed")
  }
}

export const refreshToken = async () => {
  try {
    const response = await api.post("/auth/refreshToken")
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Token refresh failed")
  }
}

export const logout = async () => {
  try {
    const response = await api.post("/auth/logout")
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed")
  }
}

// User services
export const updateUserProfile = async (userId, userData) => {
  try {
    const response = await api.put(`/users/${userId}`, userData)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Update failed")
  }
}

export const changePassword = async (userId, newPassword) => {
  try {
    const response = await api.put(`/users/change-password/${userId}`, { newPassword })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Password change failed")
  }
}

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to get user")
  }
}

// Countries API services
export const getAllCountries = async () => {
  try {
    const response = await countriesApi.get("/all")
    return response.data
  } catch (error) {
    throw new Error("Failed to fetch countries")
  }
}

export const getCountryByName = async (name) => {
  try {
    const response = await countriesApi.get(`/name/${name}`)
    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch country: ${name}`)
  }
}

export const getCountriesByRegion = async (region) => {
  try {
    const response = await countriesApi.get(`/region/${region}`)
    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch countries in region: ${region}`)
  }
}

export const getCountryByCode = async (code) => {
  try {
    const response = await countriesApi.get(`/alpha/${code}`)
    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch country with code: ${code}`)
  }
}

// Favorites services - Add these new functions
export const addFavoriteCountry = async (userId, countryCode) => {
  try {
    const response = await api.post(`/users/${userId}/favorites`, { countryCode })
    return response.data
  } catch (error) {
    throw new Error("Failed to add country to favorites")
  }
}

export const removeFavoriteCountry = async (userId, countryCode) => {
  try {
    const response = await api.delete(`/users/${userId}/favorites/${countryCode}`)
    return response.data
  } catch (error) {
    throw new Error("Failed to remove country from favorites")
  }
}

export const getFavoriteCountries = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/favorites`)
    return response.data
  } catch (error) {
    throw new Error("Failed to get favorite countries")
  }
}

export const getCountriesByLanguage = async (lang) => {
  try {
    const response = await countriesApi.get(`/lang/${lang}`)
    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch countries by language: ${lang}`)
  }
}
