import addBaseStyles from '@zyxui/theme/src/tailwindConfig';

module.exports = {
  presets: [require('@zyxui/config/tailwind.config')],
  theme: {
    extend: {},
  },
  plugins: [addBaseStyles],
};
