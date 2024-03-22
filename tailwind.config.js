/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      /* Customized colors */
      colors: {
        'custom-green': '#42b883'
      }
    },
    /* Customized breakpoints */
    screens: {
      /* modifying of value of a default breakpoint */
      md: '400px',
      /* creating custom breakpoints */
      tablet: '640px',
      // => @media (min-width: 640px) { ... }

      laptop: '1024px',
      // => @media (min-width: 1024px) { ... }

      desktop: '1280px'
      // => @media (min-width: 1280px) { ... }
    },
    /* Customized font-families*/
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif']
    }
  },
  plugins: []
}
