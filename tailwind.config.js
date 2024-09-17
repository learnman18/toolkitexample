/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  
  theme: {

    fontSize: {
      "12" : ["12px" , "18px"], //[font size , lineHeight]
      sm: ['14px', '20px'], 
      base: ['16px', '24px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
      "28": ['28px', '36px'],
      "32" : ['32px', '40px'],
    },

    extend: {
      colors: {
        "slate-800" : "#1e293b",
        "burlywood ": "#deb887",
        'burly': "#deb887",
        'lightRed': '#be123c',
        'limeLight' : '#84cc16',
        'emeraledLight' : '#34d399',
      },
    },
    screens: {
      sm: {max: '768px'},
      md: {min : '768px' , max: '1024px'},
      lg: {min: '1024px' , max:'1280px'},
      xl: {min: '1280px'}
    },
    
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

