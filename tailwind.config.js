/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: { center: true, padding: '1rem' },
      backgroundImage: {
        'banner-news': "url('/news.jpeg')",
      },
      gridTemplateColumns: {
        list: 'repeat(auto-fill,minmax(280px, 1fr))',
      },
      colors: {
        primary: {
          100: '#e6f7ff',
          200: '#bae7ff',
          300: '#91d5ff',
          400: '#69c0ff',
          500: '#40a9ff',
          600: '#1890ff',
          DEFAULT: '#1890ff',
          700: '#096dd9',
          800: '#0050b3',
          900: '#003a8c',
          950: '#002766',

          // 100: '#e6fffb',
          // 200: '#b5f5ec',
          // 300: '#87e8de',
          // 400: '#5cdbd3',
          // 500: '#36cfc9',
          // 600: '#13c2c2',
          // DEFAULT: '#13c2c2',
          // 700: '#08979c',
          // 800: '#006d75',
          // 900: '#00474f',
          // 950: '#002329',
        },
      },
    },
  },
  plugins: [],
};
