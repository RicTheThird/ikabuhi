// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://localhost:7002/api',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': '', // Remove /api prefix when forwarding the request
      },
    })
  );
};
