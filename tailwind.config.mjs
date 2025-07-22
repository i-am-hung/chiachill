import { heroui } from '@heroui/react';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4FD1C5', // Mint pastel
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#FBBF24', // Peach pastel
          foreground: '#1F2937',
        },
      },
    },
  },
  plugins: [heroui()],
};

export default config;
