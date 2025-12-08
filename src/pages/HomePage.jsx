// src/pages/HomePage.jsx
import React from "react";
import HeroSection from "../components/HeroSection"; // Make sure HeroSection is in the components folder
import WhyChooseUs from "../components/WhyChooseUs"; // Create this component for the 'Why Choose Us' section
import TrendingCars from "../components/TrendingCars"; // Create this component for the 'Top Trending Cars' section

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <WhyChooseUs />
      <TrendingCars />
    </div>
  );
};

export default HomePage;
