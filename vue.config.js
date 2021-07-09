module.exports = {
  chainWebpack: (config) => {
    config.module.rules.delete("eslint");
  },
  devServer: {
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: { "^/api": "/" },
      },
    },
  },
};
