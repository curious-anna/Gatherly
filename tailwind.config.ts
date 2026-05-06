import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#fbfaf7',
        ink: '#292622',
      },
      boxShadow: {
        soft: '0 18px 50px rgba(41, 38, 34, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
