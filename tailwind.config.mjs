import { heroui } from '@heroui/react';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-lexend)', 'ui-sans-serif', 'system-ui'],
      },
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
  darkMode: 'class',
  plugins: [heroui()],
};

export default config;
