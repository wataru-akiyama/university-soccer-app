/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // カスタムグラデーションが必要な場合
      backgroundImage: {
        'header-gradient': 'linear-gradient(to right, #166534, #15803d)',
      },
    },
  },
  plugins: [],
}
