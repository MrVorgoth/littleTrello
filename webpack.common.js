const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    main: './src/js/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: 'babel-loader' }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader' }, { loader: 'postcss-loader' }, { loader: 'sass-loader' }]
      },
      {
        test: /\.html$/,
        use: [
          { loader: 'file-loader', options: { name: '[name].html' }},
          { loader: 'extract-loader' },
          { loader: 'html-loader', options: { attrs: ["img:src"] }}
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|ico|svg)$/,
        use: [
          { loader: 'file-loader', options: { name: 'assets/img/[name].[ext]' }}
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [{ loader: 'file-loader', options: { name: 'assets/fonts/[name].[ext]' }}]
      }
    ]
  },
  plugins: [
    new OptimizeCssAssetsPlugin(),
    new MiniCssExtractPlugin()
  ]
};