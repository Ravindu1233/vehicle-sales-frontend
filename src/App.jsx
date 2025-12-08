import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Navbar component
import HomePage from "./pages/HomePage"; // Import HomePage
import AddListing from "./pages/AddListing"; // Add Listing Page
import LoginPage from "./pages/LoginPage"; // Import LoginPage
import SignupPage from "./pages/SignupPage"; // Import SignupPage
import Footer from "./components/Footer"; // Footer component

function App() {
  return (
    <Router>
      <div className="bg-background-dark text-white">
        {/* Conditionally render Navbar and Footer based on the current route */}
        {window.location.pathname !== "/login" &&
          window.location.pathname !== "/signup" && (
            <>
              <Navbar /> {/* Navbar for navigation */}
            </>
          )}

        <Routes>
          {/* Home Page Route */}
          <Route path="/" element={<HomePage />} />
          {/* Add Listing Route */}
          <Route path="/add-listing" element={<AddListing />} />
          {/* Login Route */}
          <Route path="/login" element={<LoginPage />} />
          {/* Signup Route */}
          <Route path="/signup" element={<SignupPage />} />
        </Routes>

        {/* Conditionally render Footer only for non-login/signup routes */}
        {window.location.pathname !== "/login" &&
          window.location.pathname !== "/signup" && (
            <>
              <Footer /> {/* Footer for all pages */}
            </>
          )}
      </div>
    </Router>
  );
}

export default App;
