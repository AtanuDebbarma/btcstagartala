import type {Config} from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xl: {min: '1280px'},
      lg: {min: '1024px'},
      md: {min: '820px'},
      sm: {min: '766px'},
      xs: {min: '580px'},
      xxs: {min: '430px'},
      xxxs: {min: '410px'},
      xxxxs: {min: '380px'},
      xxxxxs: {min: '350px'},
    },
    extend: {
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0d9488 0%, #115e59 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        'gradient-light': 'linear-gradient(180deg, #ffffff 0%, #f0fdfa 100%)',
        'gradient-section': 'linear-gradient(135deg, #ccfbf1 0%, #e0f2fe 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
