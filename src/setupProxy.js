const { createProxyMiddleware } = require('http-proxy-middleware');

const TARGET = process.env.REACT_APP_API_PROXY_TARGET || 'http://127.0.0.1:5003';

module.exports = function proxySetup(app) {
  const routes = ['/api', '/healthz'];

  app.use(
    routes,
    createProxyMiddleware({
      target: TARGET,
      changeOrigin: true,
      logLevel: 'warn',
      onError(err, req, res) {
        console.error('Proxy error', err.message);
        if (!res.headersSent) {
          res.writeHead(502, { 'Content-Type': 'application/json' });
        }
        res.end(
          JSON.stringify({
            status: 'error',
            message: 'API service is unavailable. Start the Flask server or set REACT_APP_API_PROXY_TARGET.'
          })
        );
      }
    })
  );
};
