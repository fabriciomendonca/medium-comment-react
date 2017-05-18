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

const VENDORS = ['react', 'axios'];
const config = {
  entry: {
    bundle: path.join(PATHS.src, '/index.js'),
    vendor: VENDORS
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },

  output: {
    filename: '[name].js',
    path: PATHS.dist,
    publicPath: '/'
  },

  devServer: {
    port: 3000,
    inline: true,
    historyApiFallback: true,
    publicPath: '/'
  },

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
        test:/\.(woff|woff2|svg)$/,
        use: 'url-loader?limit=24000&publicPath=/&outputPath=/assets/fonts/&name=[name].[ext]',
        include: PATHS.fonts
      },
      {
        test:/\.(jpg|gif|png)$/i,
        use: 'url-loader?limit=24000&publicPath=/&outputPath=/assets/img/&name=[name].[ext]',
        include: PATHS.img
      }
    ]
  },

  plugins: [
    new HtmlPlugin({
      template: path.join(PATHS.src, '/index.html')
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js'
    })
  ]
}

module.exports = config;