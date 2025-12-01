/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Poppins", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
      },
      colors: {
        primary: "#3b82f6",
        secondary: "#10b981",
        danger: "#ef4444",
        warning: "#f59e0b",
        brand: {
          magenta: "#FF00FF",
          blue: "#007BFF",
          indigo: "#1b1b3a",
        },
      },
    },
  },
  plugins: [],
};
