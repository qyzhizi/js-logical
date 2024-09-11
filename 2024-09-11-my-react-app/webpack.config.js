const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // mode: 'development',
  mode: 'production', // 使用生产模式
  entry: './src/index.js', // 入口文件
  output: {
    // filename: 'bundle.js',
    filename: '[name].[contenthash].js', // 使用内容哈希生成文件名
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // 使得应用能够正确地加载资源
  },
  module: {
    // rules: [
    //   {
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     use: 'babel-loader', // 使用 raw-loader 作为普通加载器
    //   },
    // ],
    rules: [
      {
        test: /\.js$/,
        loader: 'esbuild-loader',
        options: {
          // loader: 'jsx', // Remove this if you don't use JSX
          target: 'es2015'  
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // HTML 模板
    }),
  ],
  devtool: 'source-map', // 生成源映射文件
};
