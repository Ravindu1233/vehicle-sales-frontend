module.exports = {
  darkMode: "class", // Enables dark mode using a class
  content: [
    "./index.html", // Scans HTML files
    "./src/**/*.{js,jsx,ts,tsx}", // Scans JS/JSX/TSX files in your src folder
    "./src/components/**/*.{js,jsx,ts,tsx}", // Add if using a components folder
  ],
  theme: {
    extend: {
      colors: {
        primary: "#259df4", // Custom primary color
        "background-light": "#f5f7f8", // Light background for light mode
        "background-dark": "#101a22", // Dark background for dark mode
        "card-dark": "#1a202c", // Dark background for cards
        "primary-light": "#61dafb", // Lighter version of primary for hover
      },
      fontFamily: {
        display: ["Inter", "sans-serif"], // Custom font family for headings and main content
      },
      borderRadius: {
        DEFAULT: "0.25rem", // Default border radius
        sm: "0.125rem", // Small radius for fine-grained control
        md: "0.375rem", // Medium radius
        lg: "0.5rem", // Large radius
        xl: "0.75rem", // Extra large radius
        full: "9999px", // Full radius for round elements
      },
      boxShadow: {
        "lg-primary":
          "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1)", // Soft shadow
        "card-hover": "0 10px 20px rgba(0, 0, 0, 0.2)", // Stronger shadow for cards on hover
      },
    },
  },
  plugins: [],
};
