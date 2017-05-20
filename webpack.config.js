const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');

const PATHS = {
  dist: path.join(__dirname, '/dist'),
  src: path.join(__dirname, '/src'),
  assets: path.join(__dirname, '/assets'),
  img: path.join(__dirname, '/assets/img'),
  scss: path.join(__dirname, '/assets/scss'),
  fonts: path.join(__dirname, '/assets/fonts')
};

const VENDORS = ['react', 'react-dom', 'redux', 'redux-thunk', 'react-redux', 'react-router', 'react-router-dom', 'axios'];

const config = {
  entry: {
    bundle: [
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      path.join(PATHS.src, '/index.js')
    ],
    vendor: VENDORS
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },

  output: {
    filename: 'public/scripts/[name].[hash].js',
    path: PATHS.dist,
    publicPath: '/'
  },

  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    publicPath: '/'
  },

  devtool: 'cheap-eval-source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        include: PATHS.src
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: PATHS.scss
      },
      {
        test: /\.(woff|woff2|svg)$/,
        use: 'url-loader?limit=24000&publicPath=/&outputPath=/public/fonts/&name=[name].[ext]',
        include: PATHS.fonts
      },
      {
        test: /\.(jpg|gif|png)$/i,
        use: 'url-loader?limit=10000&publicPath=/&outputPath=/public/img/&name=[name].[ext]',
        include: PATHS.img
      }
    ]
  },

  plugins: [
    new HtmlPlugin({
      template: path.join(PATHS.src, '/index.html')
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest']
    }),

    new webpack.HotModuleReplacementPlugin(),
    
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),

    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL || null)
    })
  ]
};

module.exports = config;