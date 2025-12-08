import React from "react";

const HeroSection = () => {
  return (
    <div
      className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat p-4"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(16, 26, 34, 1) 100%), url("https://link-to-your-image.com")',
      }}
    >
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-white text-4xl font-black">
          Find Your Next Car, Faster.
        </h1>
        <h2 className="text-white/80 text-sm">
          Search 1M+ Verified Vehicle Listings From Thousands of Sellers.
        </h2>
      </div>
      <label className="flex flex-col w-full max-w-[480px] mx-auto">
        <div className="flex items-center rounded-lg bg-[#182934] p-2">
          <input
            className="flex-1 p-2 rounded-l-lg text-white bg-[#182934] placeholder:text-[#90b2cb] border-0"
            placeholder="Enter make, model, or keyword"
          />
          <button className="bg-primary text-white px-4 py-2 rounded-r-lg">
            Search
          </button>
        </div>
      </label>
    </div>
  );
};

export default HeroSection;
