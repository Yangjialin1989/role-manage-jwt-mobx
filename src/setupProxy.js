const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(

        createProxyMiddleware('/api',{
            target: 'http://127.0.0.1:6006',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '',
            }
        }),
        //
        createProxyMiddleware('/dev-api',{
            target: 'http://127.0.0.1:6006',
            changeOrigin: true,
            pathRewrite: {
                '^/dev-api': '',
            }
        })
    );

};
