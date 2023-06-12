module.exports = {
  content: [
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      minWidth: {
        360: '360px',
        'screen-xs': '480px',
        'screen-sm': '576px',
        'screen-md': '768px',
        'screen-lg': '992px',
        'screen-xl': '1200px',
        'screen-xxl': '1600px',
      },
      backgroundColor: {
        primary: '#40513B',
        accent: '#609966',
        secondary: '#9DC08B',
        third: '#EDF1D6'
      },
      borderColor: {
        primary: '#40513B',
        accent: '#609966',
        secondary: '#9DC08B',
        third: '#EDF1D6'
      },
      color: {
        primary: '#40513B',
        accent: '#609966',
        secondary: '#9DC08B',
        third: '#EDF1D6'
      },
    },
  },
};
