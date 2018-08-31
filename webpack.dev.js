const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var SRC_DIR = path.join(__dirname, '/client');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  target: 'node',
  mode: 'production',
  entry: {
    app: ['babel-polyfill', `${SRC_DIR}/index.jsx`]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),    
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  }, 
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx?$/],
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: { 
          presets: ['env', 'react', 'stage-0']
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  externals: [
    'pg-native'
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};