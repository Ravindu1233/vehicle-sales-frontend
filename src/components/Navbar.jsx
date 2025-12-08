import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-card-dark/80 backdrop-blur-lg sticky top-0 z-50 border-b border-border-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCdXW7CcM6qIV551q1CIf-IjHw8wpnBFhWoVHyNur1P2p0EVr69r-9dk1sQruE96o-RzUnriUwgjCKMx2yPiJwqMR3rEy_OxBPfgCock4xhwnqIPhzsK8PjS0pIOa26ZkhnmCSPmmiP-w-YqJY7KR5VqJ0-aOzJxgQejIeOempBF53SpQpfRDZf-joZRFa9yRpXpvwUZniDxmULD590YJLLn-3oKK5fIu21GnoX_HePrL5ScSmZ-gNIPLWeOHxxZdOHy-sk0SfDURY')",
                }}
              ></div>
              <span className="text-lg font-bold text-white">VehicleHub</span>
            </Link>
            {/* Nav links */}
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
          {/* Login/Signup Section */}
          <div className="flex items-center gap-4">
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
