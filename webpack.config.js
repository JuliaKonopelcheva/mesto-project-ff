const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/scripts/index.js', // Точка входа
  output: {
    path: path.resolve(__dirname, 'dist'), // Куда собирать файлы
    filename: 'main.js',
    clean: true // Очищает папку dist перед сборкой
  },
  mode: 'development',

  devServer: {
    static: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 8080,
    open: true,
    hot: true 
  },

  module: {
    rules: [
      {
        test: /\.js$/, // Обработка JS
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/, // Обработка CSS
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Обработка изображений
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // Обработка шрифтов
        type: 'asset/resource'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // HTML-шаблон
    }),
    new MiniCssExtractPlugin() // Для обработки CSS
  ]
};
