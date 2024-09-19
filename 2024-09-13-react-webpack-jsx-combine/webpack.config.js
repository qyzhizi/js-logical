const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  // mode: 'production', // 使用生产模式
  entry: './src/index.jsx', // 入口文件
  output: {
    // filename: 'bundle.js',
    filename: '[name].[contenthash].js', // 使用内容哈希生成文件名
    path: path.resolve(__dirname, 'build'),
    publicPath: '/', // 使得应用能够正确地加载资源
    assetModuleFilename: "images/[hash][ext]"
  },
  module: {
     rules: [
       {
         test: /\.(js|jsx)$/, // Include both .js and .jsx
         exclude: /node_modules/,
         use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
         }
       },
      {
        test: /\.(png|jpg|svg|ico)$/,
        type: "asset"
      },
      {
        test: /(manifest.json|robots.txt)$/,
        type: "asset"
      }
     ],
//    rules: [
//      {
//        test: /\.js$/,
//        loader: 'esbuild-loader',
//        options: {
//         //  loader: 'jsx', // Remove this if you don't use JSX
//          target: 'es2015'  
//        }
//      }
//    ]
  },
  plugins: [
    new CleanWebpackPlugin(), // 在每次构建前清理 build 文件夹
    new HtmlWebpackPlugin({
      template: './public/index.html', // HTML 模板
      favicon: './public/favicon.ico',
      // manifest: './public/manifest.json'
    }),
  ],
  optimization: {
    minimize: true, // 启用代码压缩
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 去掉 console.log
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all', // 代码分割
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // 指定静态资源目录
    },
    compress: true, // 启用 gzip 压缩
    port: 9000, // 指定端口
    hot: true, // 启用热模块替换
  },
  // devtool: 'source-map', // 生成源映射文件
};