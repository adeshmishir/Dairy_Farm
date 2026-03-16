/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'slide-in-from-right': { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(0)' } },
        'slide-out-to-right':  { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(100%)' } },
        'slide-in-from-left':  { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(0)' } },
        'slide-out-to-left':   { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-100%)' } },
        'fade-in':  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'fade-out': { '0%': { opacity: '1' }, '100%': { opacity: '0' } },
        'zoom-in':  { '0%': { transform: 'scale(0.95)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        'zoom-out': { '0%': { transform: 'scale(1)', opacity: '1' }, '100%': { transform: 'scale(0.95)', opacity: '0' } },
      },
      animation: {
        'in': 'fade-in 0.3s ease-out',
        'out': 'fade-out 0.3s ease-in',
        'slide-in-from-right': 'slide-in-from-right 0.4s ease-out',
        'slide-out-to-right': 'slide-out-to-right 0.3s ease-in',
        'slide-in-from-left': 'slide-in-from-left 0.4s ease-out',
        'slide-out-to-left': 'slide-out-to-left 0.3s ease-in',
      },
    },
  },
  plugins: [],
};
