/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  daisyui: {
    themes: [
      {
        mytheme: {
          'primary': '#b1c9ef',
          'secondary': '#8aaee0',
          'accent': '#628ecb',
          'neutral': '#395886',
          'base-100': '#f0f3fa',
          'info': '#d5deef',
          'success': '#65a30d',
          'warning': '#f59e0b',
          'error': '#dc2626',
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
