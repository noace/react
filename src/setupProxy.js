module.exports = app => {

    const httpProxy = require('http-proxy');
    const apiProxy = httpProxy.createProxyServer({
        target: 'http://localhost:3001',
        // target: 'http://10.10.92.21:8001',
        // target: 'http://localhost:8001',
        // target: 'http://52.185.134.4:8001',
        changeOrigin: true,
    });

    app.all(['/api/*'], (req, res) => apiProxy.web(req, res));
};
