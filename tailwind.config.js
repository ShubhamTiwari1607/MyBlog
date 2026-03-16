/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      keyframes: {
        risingstar: {
          from: {
            transform: 'translateY(0px)',
          },
          to: {
            transform: 'translateY(-3840px)',
          },
        },
      },
      animation: {
        risingstar: 'risingstar 1000s linear infinite',
      },
    },
  },
  plugins: [],
};