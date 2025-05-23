/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        'neutral-light': 'var(--neutral-light)',
        'neutral-gray': 'var(--neutral-gray)',
        'glass-bg': 'var(--glass-bg)',
      },
    },
  },
  plugins: [],
}