const WebpackBar = require("webpackbar");
const path = require("path");
const Happypack = require('happypack');
const { override, addWebpackAlias } = require("customize-cra");

module.exports = {
  entry: path.resolve(__dirname, "src/index.tsx"),
  webpack: override(
    // 设置别名
    addWebpackAlias({
      src: path.resolve(__dirname, "src"),
      apis: path.resolve(__dirname, "src/apis"),
      assets: path.resolve(__dirname, "src/assets"),
      styles: path.resolve(__dirname, "src/assets/styles"),
      pages: path.resolve(__dirname, "src/pages"),
      components: path.resolve(__dirname, "src/components"),
      utils: path.resolve(__dirname, "src/utils"),
    }),
    (config) => {
      config.plugins.push(new WebpackBar());
      return config;
    }
  ),
};
