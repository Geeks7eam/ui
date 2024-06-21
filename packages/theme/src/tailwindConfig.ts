import { PluginAPI } from 'tailwindcss/types/config';

const addBaseStyles = ({ addBase }: PluginAPI) => {
  addBase({
    ':root': {
      '--background': '0 0% 100%',
      '--foreground': '222.2 84% 4.9%',

      '--muted': '210 40% 96.1%',
      '--muted-foreground': '215.4 16.3% 46.9%',

      '--popover': '0 0% 100%',
      '--popover-foreground': '222.2 84% 4.9%',

      '--card': '0 0% 100%',
      '--card-foreground': '222.2 84% 4.9%',

      '--border': '214.3 31.8% 91.4%',
      '--input': '214.3 31.8% 91.4%',

      '--primary': '222.2 47.4% 11.2%',
      '--primary-foreground': '210 40% 98%',

      '--secondary': '210 40% 96.1%',
      '--secondary-foreground': '222.2 47.4% 11.2%',

      '--accent': '210 40% 96.1%',
      '--accent-foreground': '222.2 47.4% 11.2%',

      '--error': '0 84.2% 60.2%',
      '--error-foreground': '210 40% 98%',

      '--success': '159 52% 39%',
      '--success-foreground': '0 85.7% 97.3%',

      '--warning': '36 93% 56%',
      '--warning-foreground': '0 85.7% 97.3%',

      '--ring': '215 20.2% 65.1%',

      '--radius': '0.5rem',
    },
    '.dark': {
      '--background': '222.2 84% 4.9%',
      '--foreground': '210 40% 98%',

      '--muted': '217.2 32.6% 17.5%',
      '--muted-foreground': '215 20.2% 65.1%',

      '--popover': '222.2 84% 4.9%',
      '--popover-foreground': '210 40% 98%',

      '--card': '222.2 84% 4.9%',
      '--card-foreground': '210 40% 98%',

      '--border': '217.2 32.6% 17.5%',
      '--input': '217.2 32.6% 17.5%',

      '--primary': '210 40% 98%',
      '--primary-foreground': '222.2 47.4% 11.2%',

      '--secondary': '217.2 32.6% 17.5%',
      '--secondary-foreground': '210 40% 98%',

      '--accent': '217.2 32.6% 17.5%',
      '--accent-foreground': '210 40% 98%',

      '--error': '0 62.8% 30.6%',
      '--error-foreground': '0 85.7% 97.3%',

      '--warning': '36 93% 56%',
      '--warning-foreground': '0 85.7% 97.3%',

      '--success': '159 52% 39%',
      '--success-foreground': '0 85.7% 97.3%',

      '--ring': '217.2 32.6% 17.5%',
    },
  });
};

export default addBaseStyles;
