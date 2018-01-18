'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = {
    // The entry file. All your app roots from here.
    entry: [
        // Polyfills go here too, like babel-polyfill or whatwg-fetch
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
    // Where you want the output to go
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]-[hash].min.js',
        publicPath: '/'
    },
    plugins: [
        // handles creating an index.html file and injecting assets. necessary because assets
        // change name because the hash part changes. We want hash name changes to bust cache
        // on client browsers.
        new HtmlWebpackPlugin({
            template: 'app/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),
        // extracts the css from the js files and puts them on a separate .css file. this is for
        // performance and is used in prod environments. Styles load faster on their own .css
        // file as they dont have to wait for the JS to load.
        new ExtractTextPlugin('[name]-[hash].min.css'),
        // creates a stats.json
        new StatsPlugin('webpack.stats.json', {
            source: false,
            modules: false
        }),
        // plugin for passing in data to the js, like what NODE_ENV we are in.
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],

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
    }
};
