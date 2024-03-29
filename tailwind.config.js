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
        primary: '#344942',
        accent: '#609966',
        secondary: '#9DC08B',
        third: '#fdf3e7',
      },
      borderColor: {
        primary: '#344942',
        accent: '#609966',
        secondary: '#9DC08B',
        third: '#EDF1D6',
      },
      color: {
        primary: '#344942',
        accent: '#609966',
        secondary: '#9DC08B',
        third: '#EDF1D6',
      },
    },
  },
};
