// src/components/TrendingCars.jsx
import React from "react";

const TrendingCars = () => {
  return (
    <div className="py-16 bg-background-light dark:bg-background-dark">
      <h2 className="text-3xl font-bold text-center text-white">
        Top Trending Cars
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {/* Example Trending Cars */}
        <div className="bg-card-dark p-6 rounded-lg text-white">
          <img
            src="https://link-to-car-image"
            alt="Car 1"
            className="w-full h-48 object-cover rounded-lg"
          />
          <h3 className="text-xl font-bold mt-4">2023 Tesla Model 3</h3>
          <p className="text-lg text-primary">$45,000</p>
        </div>
        <div className="bg-card-dark p-6 rounded-lg text-white">
          <img
            src="https://link-to-car-image"
            alt="Car 2"
            className="w-full h-48 object-cover rounded-lg"
          />
          <h3 className="text-xl font-bold mt-4">2022 Ford Mustang GT</h3>
          <p className="text-lg text-primary">$52,300</p>
        </div>
        <div className="bg-card-dark p-6 rounded-lg text-white">
          <img
            src="https://link-to-car-image"
            alt="Car 3"
            className="w-full h-48 object-cover rounded-lg"
          />
          <h3 className="text-xl font-bold mt-4">2023 BMW X5</h3>
          <p className="text-lg text-primary">$68,500</p>
        </div>
      </div>
    </div>
  );
};

export default TrendingCars;
