import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const AddListing = () => {
  const [listingData, setListingData] = useState({
    title: "",
    make: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    fuel_type: "",
    transmission: "",
    condition: "",
    description: "",
  });

  const [selectedImages, setSelectedImages] = useState([]); // Use array to store selected images
  const [uploadedImages, setUploadedImages] = useState([]); // Store images returned from backend

  // Handle changes in form inputs
  const handleChange = (e) => {
    setListingData({
      ...listingData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image selection by user
  const handleImageChange = (e) => {
    const files = e.target.files;
    // Add new selected images to the existing ones
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  // Submit form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append listing data to formData
    Object.keys(listingData).forEach((key) => {
      formData.append(key, listingData[key]);
    });

    // Append selected images to formData
    if (selectedImages.length > 0) {
      for (let i = 0; i < selectedImages.length; i++) {
        formData.append("images", selectedImages[i]);
      }
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to create a listing.");
        return;
      }

      // Send formData to the backend
      const response = await axios.post(
        `${API_BASE_URL}/api/listings`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Listing created:", response.data);
      alert("Listing Created Successfully");

      // Store uploaded image URLs from the backend
      setUploadedImages(response.data.images); // Assuming the server returns an "images" array with the URLs

      // Reset form data and selected images after submission
      setListingData({
        title: "",
        make: "",
        model: "",
        year: "",
        price: "",
        mileage: "",
        fuel_type: "",
        transmission: "",
        condition: "",
        description: "",
      });
      setSelectedImages([]); // Clear selected images after submission
    } catch (error) {
      console.error(
        "Error while creating the listing:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message ||
          "An error occurred while submitting the form. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-white">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Add a New Vehicle Listing
            </h1>
            <p className="mt-2 text-text-muted-dark">
              Fill out the details below to create your listing.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Vehicle Details Section */}
            <div className="space-y-6 bg-card-dark p-8 rounded-xl border border-border-dark shadow-2xl shadow-black/25">
              <h2 className="text-xl font-semibold text-white">
                Vehicle Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="md:col-span-2">
                  <label
                    className="block text-sm font-medium text-text-muted-dark"
                    htmlFor="title"
                  >
                    Listing Title
                  </label>
                  <input
                    className="mt-1 block w-full appearance-none rounded-lg border border-border-dark bg-background-dark px-3 py-2.5 placeholder-text-muted-dark/50 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    id="title"
                    name="title"
                    value={listingData.title}
                    onChange={handleChange}
                    placeholder="e.g. 2019 Toyota Corolla G Superior"
                    type="text"
                    required
                  />
                </div>

                {/* Make */}
                <div>
                  <label
                    className="block text-sm font-medium text-text-muted-dark"
                    htmlFor="make"
                  >
                    Make
                  </label>
                  <select
                    className="mt-1 block w-full appearance-none rounded-lg border border-border-dark bg-background-dark px-3 py-2.5 placeholder-text-muted-dark/50 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    id="make"
                    name="make"
                    value={listingData.make}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Make</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="Ford">Ford</option>
                  </select>
                </div>

                {/* Model */}
                <div>
                  <label
                    className="block text-sm font-medium text-text-muted-dark"
                    htmlFor="model"
                  >
                    Model
                  </label>
                  <input
                    className="mt-1 block w-full appearance-none rounded-lg border border-border-dark bg-background-dark px-3 py-2.5 placeholder-text-muted-dark/50 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    id="model"
                    name="model"
                    value={listingData.model}
                    onChange={handleChange}
                    placeholder="e.g. Corolla"
                    type="text"
                    required
                  />
                </div>

                {/* Year */}
                <div>
                  <label
                    className="block text-sm font-medium text-text-muted-dark"
                    htmlFor="year"
                  >
                    Year
                  </label>
                  <input
                    className="mt-1 block w-full appearance-none rounded-lg border border-border-dark bg-background-dark px-3 py-2.5 placeholder-text-muted-dark/50 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    id="year"
                    name="year"
                    value={listingData.year}
                    onChange={handleChange}
                    placeholder="e.g. 2020"
                    type="number"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label
                    className="block text-sm font-medium text-text-muted-dark"
                    htmlFor="price"
                  >
                    Price (USD)
                  </label>
                  <input
                    className="mt-1 block w-full appearance-none rounded-lg border border-border-dark bg-background-dark px-3 py-2.5 placeholder-text-muted-dark/50 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    id="price"
                    name="price"
                    value={listingData.price}
                    onChange={handleChange}
                    placeholder="e.g. 25000"
                    type="number"
                    required
                  />
                </div>

                {/* Mileage */}
                <div>
                  <label
                    className="block text-sm font-medium text-text-muted-dark"
                    htmlFor="mileage"
                  >
                    Mileage
                  </label>
                  <input
                    className="mt-1 block w-full appearance-none rounded-lg border border-border-dark bg-background-dark px-3 py-2.5 placeholder-text-muted-dark/50 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    id="mileage"
                    name="mileage"
                    value={listingData.mileage}
                    onChange={handleChange}
                    placeholder="e.g. 15000"
                    type="number"
                  />
                </div>

                {/* Condition */}
                <div>
                  <label
                    className="block text-sm font-medium text-text-muted-dark"
                    htmlFor="condition"
                  >
                    Condition
                  </label>
                  <select
                    className="mt-1 block w-full appearance-none rounded-lg border border-border-dark bg-background-dark px-3 py-2.5 placeholder-text-muted-dark/50 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    id="condition"
                    name="condition"
                    value={listingData.condition}
                    onChange={handleChange}
                  >
                    <option value="">Select Condition</option>
                    <option value="New">New</option>
                    <option value="Used - Like New">Used - Like New</option>
                    <option value="Used - Good">Used - Good</option>
                    <option value="Used - Fair">Used - Fair</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  className="block text-sm font-medium text-text-muted-dark"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="mt-1 block w-full appearance-none rounded-lg border border-border-dark bg-background-dark px-3 py-2.5 placeholder-text-muted-dark/50 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  id="description"
                  name="description"
                  value={listingData.description}
                  onChange={handleChange}
                  placeholder="Provide a detailed description of the vehicle..."
                  rows="5"
                ></textarea>
              </div>
            </div>

            {/* Upload Photos Section */}
            <div className="space-y-6 bg-card-dark p-8 rounded-xl border border-border-dark shadow-2xl shadow-black/25">
              <h2 className="text-xl font-semibold text-white">
                Upload Photos
              </h2>
              <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-border-dark px-6 pt-10 pb-12">
                <div className="text-center">
                  <span className="material-symbols-outlined text-6xl text-text-muted-dark">
                    upload_file
                  </span>
                  <div className="mt-4 flex text-sm leading-6 text-text-muted-dark">
                    <label
                      className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background-dark hover:text-primary/90"
                      htmlFor="file-upload"
                    >
                      <span>Upload files</span>
                      <input
                        className="sr-only"
                        id="file-upload"
                        multiple
                        onChange={handleImageChange}
                        name="file-upload"
                        type="file"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-text-muted-dark/70">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            {/* Display Selected Images as Preview */}
            {selectedImages && (
              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  Preview Uploaded Images
                </h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {Array.from(selectedImages).map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={`uploaded-image-${index}`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Buttons Section */}
            <div className="flex justify-end gap-4">
              <button
                className="rounded-lg border border-border-dark bg-background-dark py-3 px-6 text-sm font-bold text-white shadow-sm"
                type="button"
              >
                Save as Draft
              </button>
              <button
                className="flex w-full sm:w-auto justify-center rounded-lg border border-transparent bg-primary py-3 px-6 text-sm font-bold text-white shadow-sm"
                type="submit"
              >
                Publish Listing
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddListing;
