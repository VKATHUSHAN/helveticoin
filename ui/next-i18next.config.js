module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nl', 'fr', 'it', 'ta', 'es'],
    localePath: './public/locales',
    localeDetection: true,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};