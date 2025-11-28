/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'off-white': '#FAF0E6',
        'soft-purple': '#A89BCE',
        'soft-teal': '#78D5D7',
        'soft-cream': '#FDFD96',
        'coral-red': '#FF4500',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};