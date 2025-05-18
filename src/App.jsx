import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { FavoritesProvider } from "./context/FavoritesContext"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import AdminSignup from "./pages/AdminSignup"
import Dashboard from "./pages/Dashboard"
import CountryList from "./pages/CountryList"
import CountryDetail from "./pages/CountryDetail"
import Favorites from "./pages/Favorites"
import Profile from "./pages/Profile"
import ProtectedRoute from "./components/ProtectedRoute"
import "./styles.css"

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin-signup" element={<AdminSignup />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/countries"
              element={
                <ProtectedRoute>
                  <CountryList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/countries/:name"
              element={
                <ProtectedRoute>
                  <CountryDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </FavoritesProvider>
    </AuthProvider>
  )
}

export default App
