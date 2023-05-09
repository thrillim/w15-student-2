/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#2B6488",
          "secondary": "#14253D",
          "accent": "#A80505",
          "neutral": "#FFE7CC",
          "base-100": "#FAFAFF",
          "info": "#8CC6D9",
          "success": "#18AF7A",
          "warning": "#F9CF43",
          "error": "#F16A6C",
        },
      },
      "dark",
      // "coffee",
    ],
  }
}