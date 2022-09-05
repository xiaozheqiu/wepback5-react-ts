const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
console.log('NODE_ENV', process.env.NODE_ENV)

// 合并公共配置，并添加到开发环境配置中
module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "eval-cheap-module-source-map", // 源码调试
  devServer: {
    port: 3333,
    compress: false, // gzip压缩，开发环境不开启，提升热更新速度
    hot: true, // 开启热更新
    historyApiFallback: true, // 解决history路由404的问题
    static: {
      directory: path.join(__dirname, "../public"), // 托管静态资源public文件夹
    },
  },
  plugins: [
    new ReactRefreshWebpackPlugin(), // 添加热更新插件
  ],
});
