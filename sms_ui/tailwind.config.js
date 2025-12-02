/** @type {import('tailwindcss').Config} */
export default {
  content: [
<<<<<<< Updated upstream
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
=======
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
>>>>>>> Stashed changes
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Poppins", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
      },
      colors: {
<<<<<<< Updated upstream
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
=======
        primary: '#3B82F6',
        secondary: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
        dark: '#1F2937',
        light: '#F3F4F6'
      }
    }
  },
  plugins: []
}
>>>>>>> Stashed changes
