var path = require('path');
var webpack = require('webpack');

var ip = '0.0.0.0';

module.exports = {
  devtool: 'eval',
  entry: [
    'babel-polyfill', // Load this first
    'react', // Include this to enforce order
    'react-dom', // Include this to enforce order
    './app/index',
    './app/css/bootstrap.css',
    './app/css/bootstrap-overrides.css',
    './app/css/main.css',
    './app/css/radiant.css',
    path.join(__dirname, 'app/index.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2017', 'react']
        }
      },
      {
        test: /\.css$/, // Only .css files
        loader: 'style-loader!css-loader', // Run both loaders
        include: path.join(__dirname, 'app')
      },
      {
        test: /.*\.(gif|png|jpeg|svg|mp4)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name]_[hash:7].[ext]',
            }
          },
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
  }
};
