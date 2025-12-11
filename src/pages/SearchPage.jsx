import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000";

const SearchPage = () => {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({
    price: { min: 0, max: 100000 },
    year: { min: 2000, max: 2023 },
    mileage: { min: 0, max: 200000 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/listings`);
        setListings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listings", error);
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: {
        ...filters[e.target.name],
        [e.target.id]: e.target.value,
      },
    });
  };

  const filteredListings = listings.filter((listing) => {
    return (
      listing.price >= filters.price.min &&
      listing.price <= filters.price.max &&
      listing.year >= filters.year.min &&
      listing.year <= filters.year.max &&
      listing.mileage >= filters.mileage.min &&
      listing.mileage <= filters.mileage.max
    );
  });

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3 bg-background-dark/80">
        <h2 className="text-white text-lg font-bold">
          Vehicle Sales Aggregator
        </h2>
      </header>
      <main className="flex-grow w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4 xl:w-1/5 flex-shrink-0">
            <div className="sticky top-28 flex flex-col gap-4 bg-white/5 rounded-xl p-6">
              <h1 className="text-white text-base font-medium">
                Advanced Filters
              </h1>
              <div className="flex flex-col gap-4">
                {/* Price Filter */}
                <div>
                  <h2 className="text-white text-sm font-medium">
                    Price Range
                  </h2>
                  <input
                    type="number"
                    id="min"
                    name="price"
                    value={filters.price.min}
                    onChange={handleFilterChange}
                    className="w-full bg-background-dark text-white rounded p-2"
                    placeholder="Min Price"
                  />
                  <input
                    type="number"
                    id="max"
                    name="price"
                    value={filters.price.max}
                    onChange={handleFilterChange}
                    className="w-full bg-background-dark text-white rounded p-2 mt-2"
                    placeholder="Max Price"
                  />
                </div>

                {/* Year Filter */}
                <div>
                  <h2 className="text-white text-sm font-medium">Year Range</h2>
                  <input
                    type="number"
                    id="min"
                    name="year"
                    value={filters.year.min}
                    onChange={handleFilterChange}
                    className="w-full bg-background-dark text-white rounded p-2"
                    placeholder="Min Year"
                  />
                  <input
                    type="number"
                    id="max"
                    name="year"
                    value={filters.year.max}
                    onChange={handleFilterChange}
                    className="w-full bg-background-dark text-white rounded p-2 mt-2"
                    placeholder="Max Year"
                  />
                </div>

                {/* Mileage Filter */}
                <div>
                  <h2 className="text-white text-sm font-medium">
                    Mileage Range
                  </h2>
                  <input
                    type="number"
                    id="min"
                    name="mileage"
                    value={filters.mileage.min}
                    onChange={handleFilterChange}
                    className="w-full bg-background-dark text-white rounded p-2"
                    placeholder="Min Mileage"
                  />
                  <input
                    type="number"
                    id="max"
                    name="mileage"
                    value={filters.mileage.max}
                    onChange={handleFilterChange}
                    className="w-full bg-background-dark text-white rounded p-2 mt-2"
                    placeholder="Max Mileage"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Listings Section */}
          <div className="w-full lg:w-3/4 xl:w-4/5">
            <div className="flex flex-wrap justify-between items-baseline gap-4 mb-4">
              <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                Find Your Next Vehicle
              </p>
              <p className="text-white/60 text-base font-normal">
                Showing {filteredListings.length} vehicles
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading ? (
                <div>Loading...</div>
              ) : (
                filteredListings.map((listing) => (
                  <div
                    key={listing._id}
                    className="flex flex-col bg-white/5 rounded-xl overflow-hidden shadow-lg hover:ring-2 hover:ring-primary/50 transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        className="w-full h-48 object-cover"
                        src={
                          listing.images[0]?.image_url ||
                          "https://via.placeholder.com/500"
                        }
                        alt={listing.title}
                      />
                      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {listing.make}
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-white text-lg font-bold">
                        {listing.year} {listing.make} {listing.model}
                      </h3>
                      <p className="text-primary text-xl font-black mt-1">
                        ${listing.price}
                      </p>
                      <div className="flex items-center text-white/60 text-sm mt-3 gap-4">
                        <span>{listing.year}</span>
                        <span>•</span>
                        <span>{listing.mileage} mi</span>
                        <span>•</span>
                        <span>{listing.transmission}</span>
                      </div>
                      <div className="mt-auto pt-4">
                        <Link
                          to={`/listing/${listing._id}`}
                          className="w-full text-center bg-primary/20 text-primary font-bold py-2 px-4 rounded-lg hover:bg-primary/30 transition-colors text-sm"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
