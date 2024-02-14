// Import necessary modules and components from React and external libraries
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import AdminHome from "./pages/Admin/AdminHome";
import AdminBuses from "./pages/Admin/AdminBuses";
import AdminUsers from "./pages/Admin/AdminUsers";
import BookNow from "./pages/BookNow";
import Bookings from "./pages/Bookings";
import AdminBookings from "./pages/Admin/AdminBookings";

// Main application component
function App() {
  // Retrieve loading state from Redux store
  const { loading } = useSelector((state) => state.alerts);

  return (
    <div>
      {/* Display loader when loading state is true */}
      {loading && <Loader />}

      {/* Set up the application routing with BrowserRouter and Routes */}
      <BrowserRouter>
        <Routes>
          {/* Define routes for different pages with appropriate protection */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {/* Home page accessible after authentication */}
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-now/:id"
            element={
              <ProtectedRoute>
                {/* Page for booking a seat, protected route */}
                <BookNow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                {/* User's bookings page, protected route */}
                <Bookings />
              </ProtectedRoute>
            }
          />

          {/* Admin routes with protected access */}
          <Route
            path="/admin/buses"
            element={
              <ProtectedRoute>
                {/* Admin page for managing buses */}
                <AdminBuses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                {/* Admin page for managing users */}
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <ProtectedRoute>
                {/* Admin page for managing bookings */}
                <AdminBookings />
              </ProtectedRoute>
            }
          />

          {/* Public routes accessible without authentication */}
          <Route
            path="/register"
            element={
              <PublicRoute>
                {/* User registration page, public route */}
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                {/* Login page, public route */}
                <Login />
              </PublicRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Export the App component as the main entry point for the application
export default App;
