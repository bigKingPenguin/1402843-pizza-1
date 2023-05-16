module.exports = {
  devServer: {
    host: 'localhost',
    proxy: {
      "^/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: false,
        pathRewrite: {"^/api/": "/"},
      },
      "^/public": {
        target: "http://127.0.0.1:3000",
        changeOrigin: false,
        pathRewrite: {"^/public/": "/public/"},
      },
      "/explorer": {
        target: "http://127.0.0.1:3000",
        changeOrigin: false,
        proxyTimeout: 1000 * 60 * 10,
        pathRewrite: {"/docs/explorer": "/explorer"},
      },
    },
  },
};
