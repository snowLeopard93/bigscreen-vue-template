const path = require("path");
const webpack = require("webpack");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "./",
  // 设置是否生成源映射
  productionSourceMap: true,
  configureWebpack: (config) => {
    config.resolve.alias = {
      "@": resolve("src"),
    };
    // 忽略moment的语言包
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
  },
  chainWebpack: (config) => {
    config.optimization.splitChunks({
      chunks: "all",
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial", // only package third parties that are initially dependent
        },
        echarts: {
          name: "chunk-echarts",
          priority: 30,
          test: /[\\/]node_modules[\\/]_?echarts(.*)/,
        },
      },
    });
  },
  filenameHashing: false,
  devServer: {
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true,
      },
    },
  },
};
