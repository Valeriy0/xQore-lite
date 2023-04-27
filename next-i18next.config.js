const plural = require('i18next-intervalplural-postprocessor');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    use: [plural],
  },
  serializeConfig: false,
};
