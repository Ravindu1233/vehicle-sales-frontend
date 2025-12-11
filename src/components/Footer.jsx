import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card-dark text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold">VehicleHub</h3>
            <p className="text-sm text-text-muted-dark mt-2">
              The best place to find your next vehicle with trust and security.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  className="text-sm text-text-muted-dark hover:text-white transition-colors"
                  to="/about"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-text-muted-dark hover:text-white transition-colors"
                  to="/careers"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-text-muted-dark hover:text-white transition-colors"
                  to="/blog"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  className="text-sm text-text-muted-dark hover:text-white transition-colors"
                  to="/faq"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-text-muted-dark hover:text-white transition-colors"
                  to="/contact"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-text-muted-dark hover:text-white transition-colors"
                  to="/help-center"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  className="text-sm text-text-muted-dark hover:text-white transition-colors"
                  to="/terms"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-text-muted-dark hover:text-white transition-colors"
                  to="/privacy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-text-muted-dark hover:text-white transition-colors"
                  to="/cookie-policy"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center text-sm text-text-muted-dark">
          <p>© 2024 VehicleHub. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
