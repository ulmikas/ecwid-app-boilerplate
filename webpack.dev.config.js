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
    path: `${__dirname}/dist`,
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
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },

      // {
      //   test: /\.pug$/,
      //   use: [
      //     'html-loader',
      //     {
      //       loader: 'pug-html-loader',
      //       query: {
      //         pretty: true,
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: /\.html$/,
      //   use: ['html-loader'],
      // },
    ],
  },
  devServer: {
    port: 5757,
    watchOptions: {
      aggregateTimeout: 100,
      poll: 1000,
    },
    contentBase: './dist',
    hot: true,
    inline: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
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