var path = require('path');
var webpack = require('webpack');

var ip = '127.0.0.1';

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://' + ip + ':2000',
    './app/index',
    './app/css/bootstrap.css',
    './app/css/bootstrap-overrides.css',
    './app/css/main.css',
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
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.css$/, // Only .css files
        loader: 'style-loader!css-loader', // Run both loaders
        include: path.join(__dirname, 'app')
      },
      {
        test: /.*\.(gif|png|jpeg|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name]_[hash:7].[ext]',
            }
          },
        ]
      }
    ]
  }
};