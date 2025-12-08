module.exports = {
  darkMode: "class", // Enables dark mode using a class
  content: [
    "./index.html", // If you are using plain HTML files
    "./src/**/*.{js,jsx,ts,tsx}", // Scans JavaScript/JSX/TSX files in your src folder
  ],
  theme: {
    extend: {
      colors: {
        primary: "#259df4", // Custom primary color
        "background-light": "#f5f7f8", // Light background for light mode
        "background-dark": "#101a22", // Dark background for dark mode
      },
      fontFamily: {
        display: ["Inter", "sans-serif"], // Custom font family for headings and main content
      },
      borderRadius: {
        DEFAULT: "0.25rem", // Default border radius
        lg: "0.5rem", // Large border radius
        xl: "0.75rem", // Extra large border radius
        full: "9999px", // Full border radius for round elements
      },
    },
  },
  plugins: [],
};
