// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'card-raised': '0 1px 2px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1), 0 16px 48px rgba(0, 0, 0, 0.05)',
        'card-dipped': 'inset 0 2px 4px rgba(0, 0, 0, 0.4), inset 0 -1px 2px rgba(255, 255, 255, 0.08)',
      },
    },
  },
  plugins: [],
};