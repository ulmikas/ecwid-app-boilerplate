const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const appName = 'app-name';
const extractCSS = new ExtractTextPlugin('[name]/' + appName + '-[name].css');

module.exports = {
  context: __dirname,
  entry: {
    'admin': './admin',
    'storefront': './storefront'
  },
  output: {
    path: path.resolve('dist'),
    publicPath: '',
    filename: '[name]/' + appName + '-[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015'],
            },
          },
        ],
      },
      // {
      //   test: /\.(jpe?g|png|gif)$/i,
      //   loaders: [
      //     'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
      //     'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false',
      //   ],
      // },
      {
        test: /\.css$/,
        use: extractCSS.extract(['css-loader']),
      },
      {
        test: /\.scss/i,
        use: extractCSS.extract([{
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [require('autoprefixer')],
            postcss: [
              autoprefixer({
                browsers: ['last 4 version'],
              }),
            ],
            sourceMap: true,
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        }]),
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './admin/index.html',
      filename: 'admin/index.html',
      appName: appName + '-admin',
      title: 'App Proto Admin',
      chunks: []
    }),
    new HtmlWebpackPlugin({
      template: './storefront/index.html',
      filename: 'storefront/index.html',
      appName: appName + '-storefront',
      title: 'App Proto Storefront',
      chunks: []
    }),
    extractCSS,
  ]
}