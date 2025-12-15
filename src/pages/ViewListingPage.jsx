import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000";

const ViewListingPage = () => {
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/listings/${listingId}`
        );
        setListing(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listing", error);
        setLoading(false);
      }
    };

    fetchListing();
  }, [listingId]);

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!listing) {
    return <div className="text-white">Listing not found.</div>;
  }

  return (
    <div className="min-h-screen bg-background-dark text-white font-display">
      <div className="flex flex-col">
        {/* Main content */}
        <main className="px-4 sm:px-8 lg:px-16 py-8 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Vehicle Images */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {/* Main Image */}
              <div
                className="bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-[480px] w-full"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%), url("${
                    listing.images[currentImageIndex]?.image_url
                      ? `${API_BASE_URL}${listing.images[currentImageIndex].image_url}`
                      : "https://via.placeholder.com/500"
                  }")`,
                }}
              ></div>
              {/* Image Thumbnails with Dots */}
              <div className="flex justify-center gap-2 p-5 mt-4">
                {listing.images.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`${
                      currentImageIndex === index
                        ? "bg-primary"
                        : "bg-white opacity-50"
                    } w-2.5 h-2.5 rounded-full cursor-pointer transition-colors`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="flex flex-col gap-6">
              <div className="border border-gray-200 dark:border-[#223949] bg-white dark:bg-[#101b23] rounded-xl p-6 flex flex-col gap-4 shadow-sm">
                <div className="flex flex-col gap-2">
                  <p className="text-black dark:text-white text-3xl font-black">
                    {listing.year} {listing.make} {listing.model}
                  </p>
                  <div className="flex items-center gap-1.5 text-green-500 dark:text-green-400">
                    <p className="text-sm font-medium">Verified Listing</p>
                  </div>
                </div>
                <p className="text-primary text-4xl font-bold">
                  ${listing.price}
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-gray-200 dark:border-t-[#315168] pt-4">
                  <div className="flex flex-col gap-0">
                    <p className="text-gray-600 dark:text-[#90b2cb] text-xs font-normal">
                      MILEAGE
                    </p>
                    <p className="text-black dark:text-white text-sm font-medium">
                      {listing.mileage || "N/A"} miles
                    </p>
                  </div>
                  <div className="flex flex-col gap-0">
                    <p className="text-gray-600 dark:text-[#90b2cb] text-xs font-normal">
                      FUEL TYPE
                    </p>
                    <p className="text-black dark:text-white text-sm font-medium">
                      {listing.fuel_type || "N/A"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-0">
                    <p className="text-gray-600 dark:text-[#90b2cb] text-xs font-normal">
                      TRANSMISSION
                    </p>
                    <p className="text-black dark:text-white text-sm font-medium">
                      {listing.transmission || "N/A"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-0">
                    <p className="text-gray-600 dark:text-[#90b2cb] text-xs font-normal">
                      YEAR
                    </p>
                    <p className="text-black dark:text-white text-sm font-medium">
                      {listing.year || "N/A"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-0">
                    <p className="text-gray-600 dark:text-[#90b2cb] text-xs font-normal">
                      Description
                    </p>
                    <p className="text-black dark:text-white text-sm font-medium">
                      {listing.description || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pt-4">
                  <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal hover:bg-primary/90 transition-colors">
                    <span>View Original Ad</span>
                  </button>
                  <div className="flex gap-3">
                    <button className="flex flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-gray-200 dark:bg-[#223949] text-black dark:text-white text-base font-bold leading-normal hover:bg-gray-300 dark:hover:bg-[#2e475a] transition-colors gap-2">
                      <span className="material-symbols-outlined text-xl">
                        compare_arrows
                      </span>
                      <span>Compare</span>
                    </button>
                    <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 w-12 bg-gray-200 dark:bg-[#223949] text-black dark:text-white text-base font-bold leading-normal hover:bg-gray-300 dark:hover:bg-[#2e475a] transition-colors">
                      <span className="material-symbols-outlined">
                        favorite_border
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Seller Info */}
              <div className="border border-gray-200 dark:border-[#223949] bg-white dark:bg-[#101b23] rounded-xl p-6 flex flex-col gap-4 shadow-sm">
                <h3 className="text-black dark:text-white text-lg font-bold">
                  Seller Information
                </h3>
                <div className="flex items-center gap-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
                    style={{
                      backgroundImage: `url("${
                        listing.seller_logo_url || ""
                      }")`,
                    }}
                  ></div>
                  <div className="flex flex-col">
                    <p className="text-black dark:text-white font-semibold">
                      {listing.seller_name || "Unknown"}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {listing.seller_location || "Unknown"}
                    </p>
                  </div>
                </div>
                <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-6 border border-primary text-primary text-sm font-bold leading-normal hover:bg-primary/10 transition-colors">
                  <span>Contact Dealer</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ViewListingPage;
