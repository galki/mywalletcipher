const path = require('path')
const args = require('yargs').argv
const HtmlWebPackPlugin = require('html-webpack-plugin')
const WebpackStripLoader = require('strip-loader')
const webpack = require('webpack')


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
  // {
  //   test: /\.md$/,
  //   use: [
  //     { loader: 'html-loader' },
  //     { loader: 'markdown-loader' },
  //   ],
  // },
  {
    test: /\.html$/,
    use: [
      {
        loader: 'html-loader',
        options: { minimize: true },
      },
    ],
  },
]

let devtool = false
let nodeEnv = 'development'
const plugins = []
const externals = []

// development
if (!args.p) {
  plugins.push(
    new HtmlWebPackPlugin({
      template: './src/statics/index.html',
    })
  )
// production
} else {
  nodeEnv = 'production'
  // devtool = 'source-map'
  // externals.push('react', 'react-dom', 'material-ui')
  rules.push({
    test: /\.js$/,
    exclude: path.resolve(__dirname, 'node_modules'),
    loader: WebpackStripLoader.loader('console.log'),
  })
  plugins.push(
    new HtmlWebPackPlugin({
      template: './src/statics/index.html',
    })
  )
}

plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(nodeEnv),
    },
  })
)

module.exports = {
  devtool,
  externals,
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/main.js',
  //   // filename: 'material-ui-form.min.js',
  //   // library: 'MaterialUIForm',
  //   libraryTarget: 'umd',
  //   // path: path.resolve(__dirname, 'bundle'),
  //   // umdNamedDefine: true,
  },
  module: {
    rules,
  },
  plugins,
}
