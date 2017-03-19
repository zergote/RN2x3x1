const path = require('path');
const webpack = require('webpack');
module.exports = {
  context: path.resolve(__dirname, './js'),
  entry: {
    app: './app.js',
  },
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'bundle.js',
  },
};