import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-card-dark/80 backdrop-blur-lg sticky top-0 z-50 border-b border-border-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8"
                style={{
                  backgroundImage: 'url("https://link-to-your-logo-image.com")',
                }}
              ></div>
              <span className="text-lg font-bold text-white">VehicleHub</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                className="text-sm font-medium text-text-muted-dark hover:text-white transition-colors"
                to="/"
              >
                Home
              </Link>
              <Link
                className="text-sm font-medium text-text-muted-dark hover:text-white transition-colors"
                to="/search"
              >
                Search
              </Link>
              <Link
                className="text-sm font-medium text-text-muted-dark hover:text-white transition-colors"
                to="/saved-listings"
              >
                Saved Listings
              </Link>
              <Link
                className="text-sm font-medium text-text-muted-dark hover:text-white transition-colors"
                to="/compare"
              >
                Compare
              </Link>
              <Link
                className="text-sm font-medium text-text-muted-dark hover:text-white transition-colors"
                to="/alerts"
              >
                Alerts
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="rounded-lg bg-primary py-2 px-4 text-sm font-bold text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="rounded-lg bg-primary py-2 px-4 text-sm font-bold text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-500 py-2 px-4 text-sm font-bold text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-background-dark transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
