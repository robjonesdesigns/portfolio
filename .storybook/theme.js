import { create } from 'storybook/theming';

export default create({
  base: 'light',

  brandTitle: 'Rob Jones — UI Kit',
  brandUrl:   'https://www.designedbyrob.com',
  brandImage: '/logo.svg',

  // Brand colors
  colorPrimary:   '#813746',
  colorSecondary: '#813746',

  // Shell backgrounds
  appBg:           '#f7f3f5',
  appContentBg:    '#fffbf5',
  appBorderColor:  'rgba(34, 34, 34, 0.1)',
  appBorderRadius: 8,

  // Typography
  fontBase: '"Areal", Arial, sans-serif',
  fontCode: 'monospace',

  // Text
  textColor:        '#222222',
  textInverseColor: '#fffbf5',

  // Toolbar
  barTextColor:     '#888',
  barHoverColor:    '#813746',
  barSelectedColor: '#813746',
  barBg:            '#fffbf5',

  // Form inputs
  inputBg:           '#fffbf5',
  inputBorder:       'rgba(34, 34, 34, 0.2)',
  inputTextColor:    '#222222',
  inputBorderRadius: 4,
});
