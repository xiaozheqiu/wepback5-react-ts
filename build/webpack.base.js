const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 把最终构建好的静态资源都引入到一个html文件中
const isDev = process.env.NODE_ENV === "development"; // 是否是开发模式
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // css抽离到单文件
console.log(isDev, "isDev");

module.exports = {
  // 配置入口文件
  entry: path.join(__dirname, "../src/index.tsx"),
  // 配置打包出口文件
  output: {
    filename: "static/js/[name].[chunkhash:8].js", // 输出文件自己的名字&& 加上[chunkhash:8]
    path: path.join(__dirname, "../dist"), // 打包输出路径
    clean: true, // 每次打包清除原有文件
    publicPath: "/", // 打包后文件的公共前缀路径
  },
  resolve: {
    extensions: [".js", ".tsx", ".ts", ".json"],
    alias: {
      // 配置alias别名
      "@": path.join(__dirname, "../src"),
    },
    modules: [path.resolve(__dirname, "../node_modules")], // 查找第三方模块只在本项目的node_modules中查找
  },
  cache: {
    type: "filesystem", // 使用文件缓存
  },
  module: {
    rules: [
      // 解析.ts tsx文件
      {
        include: path.resolve(__dirname, "../src"), // 只处理src目录下文件，其他文件不处理
        test: /.(ts|tsx)$/,
        use: [
          "thread-loader", // 开启多线程loader
          "babel-loader",
        ],
      },
      //解析 css 文件
      {
        test: /.css$/,
        include: path.resolve(__dirname, "../src"),
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader, // 开发环境使用style-loader,打包模式抽离css
          "css-loader",
          "postcss-loader",
        ],
      },
      // 解析 less 文件
      {
        test: /.less$/,
        include: path.resolve(__dirname, "../src"),
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      // 解析 sass 文件
      {
        test: /\.s[ac]ss$/i,
        include: path.resolve(__dirname, "../src"),
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      // 解析图片文件
      {
        test: /.(png|jpg|jpeg|gif|svg|ico)$/, // 匹配图片文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/images/[name].[contenthash:8][ext]", // 文件输出目录和命名
        },
      },
      // 解析字体图标文件
      {
        test: /.(woff2?|eot|ttf|otf)$/,
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/fonts/[name].[contenthash:8][ext]", // 文件输出目录和命名
        },
      },
      // 解析媒体文件
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/media/[name].[contenthash:8][ext]", // 文件输出目录和命名
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"), // 模板取定义root节点的模板
      inject: true, // 自动注入静态资源
    }),
  ],
};

/**
 * tips:
 * [contenthash:8][ext] 为浏览器缓存hash
 */
