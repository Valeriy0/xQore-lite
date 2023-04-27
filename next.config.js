const { i18n } = require('./next-i18next.config');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

module.exports = {
  webpack: (config) => {
    // Important: return the modified config
    if (process.env.NODE_ENV !== 'development' && process.env.STAND === 'prod') {
      config.devtool = 'source-map';
      const urlPrefix = '~/_next';

      config.plugins.push(
        new SentryWebpackPlugin({
          org: 'forsage-6o',
          project: 'busd-app',

          // Specify the directory containing build artifacts
          include: [
            { paths: [`.next/static/chunks/pages`], urlPrefix: `${urlPrefix}/static/chunks/pages` },
            { paths: [`.next/static/chunks/app`], urlPrefix: `${urlPrefix}/static/chunks/app` },
          ],

          // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
          // and needs the `project:releases` and `org:read` scopes
          authToken: '669b37e2da27455c8086faa75520a09f57a383d54dc14ae9be97b803732e0d59',

          // Optionally uncomment the line below to override automatic release name detection
          // release: process.env.RELEASE,
        }),
      );
    }

    return config;
  },
  i18n,
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    SCAN_NETWORK: process.env.SCAN_NETWORK,
    SCAN_NETWORK_ADDRESS: process.env.SCAN_NETWORK_ADDRESS,
    CONTRACT_XBASE: process.env.CONTRACT_XBASE,
    CONTRACT_TOKEN: process.env.CONTRACT_TOKEN,
    CONTRACT_XXX: process.env.CONTRACT_XXX,
    CONTRACT_XGOLD: process.env.CONTRACT_XGOLD,
    CONTRACT_XQORE: process.env.CONTRACT_XQORE,
    ALLOWED_CHAIN_ID: process.env.ALLOWED_CHAIN_ID,
    STAND: process.env.STAND,
    PANCAKE_SWAP_CONTRACT: process.env.PANCAKE_SWAP_CONTRACT,
    CONTRACT_ADDRESS_ROUTER: process.env.CONTRACT_ADDRESS_ROUTER,
    CONTRACT_PANCAKE_EXCHANGE: process.env.CONTRACT_PANCAKE_EXCHANGE,
  },
};
