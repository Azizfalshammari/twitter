		/** @type {import('tailwindcss').Config} */
    export default {
      content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      ],
      daisyui: {
        themes: [
          {
            mytheme: {
              
    "primary": "#1D9BF0",
              
    "secondary": "#25c700",
              
    "accent": "#009dff",
              
    "neutral": "#0f0a08",
              
    "base-100": "#000000",
              
    "info": "#00ebff",
              
    "success": "#00c123",
              
    "warning": "#a67a00",
              
    "error": "#ff4366",
              },
            },
          ],
        },
      theme: {
      extend: {},
      },
      plugins: [require("@tailwindcss/typography"),require('daisyui')],
    }