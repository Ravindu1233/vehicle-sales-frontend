// src/components/WhyChooseUs.jsx
import React from "react";

const WhyChooseUs = () => {
  return (
    <div className="text-center py-16 bg-background-light dark:bg-background-dark">
      <h2 className="text-3xl font-bold text-white">Why Choose Us?</h2>
      <p className="text-lg text-text-muted-dark">
        We leverage cutting-edge technology to provide a secure, comprehensive,
        and user-friendly car buying experience.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        {/* Example features, you can change these as needed */}
        <div className="bg-card-dark p-6 rounded-lg text-white">
          <h3 className="text-xl font-bold">AI-Powered Fraud Detection</h3>
          <p className="text-sm">
            Our AI analyzes listings to protect you from scams.
          </p>
        </div>
        <div className="bg-card-dark p-6 rounded-lg text-white">
          <h3 className="text-xl font-bold">The Widest Selection</h3>
          <p className="text-sm">
            Access over a million listings from thousands of sellers.
          </p>
        </div>
        <div className="bg-card-dark p-6 rounded-lg text-white">
          <h3 className="text-xl font-bold">Verified Sellers</h3>
          <p className="text-sm">Buy with confidence from reputable sellers.</p>
        </div>
        <div className="bg-card-dark p-6 rounded-lg text-white">
          <h3 className="text-xl font-bold">Transparent Pricing</h3>
          <p className="text-sm">Clear, upfront pricing with no hidden fees.</p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
