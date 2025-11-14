/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'sheetlink-green': {
          900: '#023820',
          700: '#0B703A',
        },
        'sheetlink-bg': '#F6F7F5',
        'sheetlink-accent': '#00C474',
        'sheetlink-text': '#1A1A1A',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
