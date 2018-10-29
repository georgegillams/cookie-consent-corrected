require('babel-polyfill');

const environment = {
  development: {
    isProduction: false,
  },
  production: {
    isProduction: true,
  },
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign(
  {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT,
    apiHost: process.env.APIHOST || 'localhost',
    apiPort: process.env.APIPORT,
    app: {
      title: 'Cookie consent - corrected',
      description: '',
      head: {
        titleTemplate: 'Cookie consent - corrected: %s',
        meta: [
          {
            name: 'description',
            content:
              'A draft proposal for an improved mechanism for cookie consent on the web.',
          },
          { charset: 'utf-8' },
          { property: 'og:site_name', content: '' },
          {
            property: 'og:image',
            content:
              'https://cookie-consent-corrected.herokuapp.com/favicon.ico',
          },
          { property: 'og:locale', content: 'en_GB' },
          {
            property: 'og:title',
            content:
              'A draft proposal for an improved mechanism for cookie consent on the web.',
          },
          {
            property: 'og:description',
            content: 'Cookie consent - corrected',
          },
          { property: 'og:card', content: 'summary' },
          { property: 'og:creator', content: '@georgeillams' },
          { property: 'og:image:width', content: '200' },
          { property: 'og:image:height', content: '200' },
        ],
      },
    },
  },
  environment,
);
