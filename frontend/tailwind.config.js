/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        ink: '#08111F',
        brand: '#2563EB',
        aqua: '#06B6D4',
        violet: '#7C3AED'
      },
      boxShadow: {
        soft: '0 24px 80px rgba(15, 23, 42, 0.12)',
        glow: '0 24px 70px rgba(37, 99, 235, 0.25)'
      },
      animation: {
        float: 'float 7s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' }
        }
      }
    }
  },
  plugins: []
};
