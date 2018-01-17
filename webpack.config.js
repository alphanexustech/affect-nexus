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
          presets: ['es2015', 'react']
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
  }
};
