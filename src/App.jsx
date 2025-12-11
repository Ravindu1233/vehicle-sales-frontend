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
import NotFoundPage from "./pages/NotFoundPage"; // Add a NotFound page

const AppLayout = () => {
  const location = useLocation();

  // Hide Navbar & Footer on these routes
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="bg-background-dark text-white min-h-screen flex flex-col">
      {!hideLayout && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-listing" element={<AddListing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} /> {/* 404 Route */}
        </Routes>
      </main>

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
