const path = require('path')
const args = require('yargs').argv
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackStripLoader = require('strip-loader')
const webpack = require('webpack')


let devtool = false
let nodeEnv = 'development'
const plugins = []
const externals = []

const rules = [
  {
    test: /\.js$/,
    exclude: path.resolve(__dirname, 'node_modules'),
    loader: 'babel-loader',
    options: {
      ignore: [
        '**/__tests__',
      ],
      presets: [
        'env',
        'flow',
        'react',
        'stage-0',
      ],
      plugins: ['transform-decorators-legacy'],
    },
  },
  {
    test: /\.(css|less)$/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      { loader: 'less-loader' },
    ],
  },
]

// development
if (!args.p && args.mode !== 'production') {
  rules.push({
    test: /\.html$/,
    loader: 'html-loader',
  })
// production
} else {
  nodeEnv = 'production'
  devtool = 'source-map'
  externals.push(
    'lodash',
    'node-forge',
    'react',
    'react-dom',
    'react-router-dom',
  )
  rules.push(
    {
      test: /\.js$/,
      exclude: path.resolve(__dirname, 'node_modules'),
      loader: WebpackStripLoader.loader('console.log'),
    },
    {
      test: /\.html$/,
      loader: 'html-loader',
      options: { minimize: true },
    }
  )
}

plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
    },
  }),
  new HtmlWebPackPlugin({
    template: './src/statics/index.html',
    inject: false,
  }),
  new CopyWebpackPlugin([
    { from: './src/statics/*', to: './', flatten: true },
    { from: './src/statics/js/*', to: './js/', flatten: true },
    { from: './vendor/*', to: './js/', flatten: true },
  ]),
)

module.exports = {
  devtool,
  externals,
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/main.js',
    libraryTarget: 'umd',
  },
  module: {
    rules,
  },
  plugins,
  resolve: {
    alias: {
      '@utilities': path.resolve(__dirname, 'src/utilities'),
    },
  },
}
