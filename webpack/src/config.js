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
      head: {
        titleTemplate: 'Cookie consent: %s',
        meta: [
          {
            name: 'description',
            content: 'A proposal for genuine cookie consent',
          },
          { charset: 'utf-8' },
          {
            property: 'og:site_name',
            content: 'A proposal for genuine cookie consent',
          },
          {
            property: 'og:image',
            content:
              'https://cookie-consent-corrected.herokuapp.com/favico.ico',
          },
          { property: 'og:locale', content: 'en_GB' },
          {
            property: 'og:title',
            content: 'A proposal for genuine cookie consent',
          },
          { property: 'og:description', content: 'Cookie consent - corrected' },
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
