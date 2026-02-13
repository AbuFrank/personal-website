// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-900': '#0c1437', // Dark blue background
        'purple-900': '#2e1b5a', // Deep purple background
        'indigo-900': '#2d1b69', // Dark indigo background
        'blue-500': '#3b82f6', // Light blue for blobs
        'purple-500': '#8b5cf6', // Purple for blobs
        'indigo-500': '#6366f1', // Indigo for blobs
        'blue-100': '#dbeafe', // Light text color
      },
      animation: {
        blob: 'blob 15s infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1);' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1);' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9);' },
          '100%': { transform: 'translate(0px, 0px) scale(1);' },
        },
      },
    },
  },
  plugins: [],
};