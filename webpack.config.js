var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
var config = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].build.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: '/\.js$/',
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',

          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            }
          }]
      }, {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
  , resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.json', '.css'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      "@": path.resolve(__dirname, 'src'),
      "components": path.resolve(__dirname, '/src/components'),
      "utils": path.resolve(__dirname + '/src/utils'),
    },
    modules: ['node_modules']
  },
  plugins: [

    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin()

  ]

}
module.exports = config;