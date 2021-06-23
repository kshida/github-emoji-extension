const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    main: './src/main.tsx',
    background: './src/background.js',
  },
  output: {
    path: __dirname + '/dist',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: true,
      }),
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: './manifest.json',
          to: 'manifest.json',
        },
        {
          from: './icons',
          to: 'icons',
        },
      ],
    }),
  ],
}

