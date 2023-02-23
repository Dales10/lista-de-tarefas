/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#07080B',
        green: '#00CC00',
        red: '#FF0000',
        border: '#D5D5D5',
        input: '#393f54cc',
        taskCompleted: '#1D1D1D',
        buttonClose: '#202124',
        cyan: '#57E6E6',
      },
      borderRadius: {
        default: '1.25rem',
      }
    },
  },
  plugins: [],
}
