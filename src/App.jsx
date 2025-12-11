import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AddListing from "./pages/AddListing";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Footer from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from "./pages/SearchPage";

const AppLayout = () => {
  const location = useLocation();

  // Check if the current page is login or signup to hide the navbar and footer
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="bg-background-dark text-white min-h-screen flex flex-col">
      {/* Only render Navbar if not on Login or Signup page */}
      {!hideLayout && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-listing" element={<AddListing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </main>

      {/* Only render Footer if not on Login or Signup page */}
      {!hideLayout && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
