/* eslint-env jest */
/* eslint-disable no-undef */

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index.js",

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },

  mode: "production",

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/img/',
                },
            },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'source-map',

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },

  plugins: [
    new FaviconsWebpackPlugin("./src/img/favicon.png"),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "WebGL",
      template: path.resolve(__dirname, "./src/template.html"), // шаблон
      filename: "index.html", // название выходного файла
    }),
    new CopyWebpackPlugin({
      patterns: [
          {
              from: path.resolve(__dirname, 'src/img'),
              to: path.resolve(__dirname, 'dist/img')
          },
          { from: 'src/style.css', to: path.resolve(__dirname, 'dist') },
          {
            from: path.resolve(__dirname, 'src/models'),
            to: path.resolve(__dirname, 'dist/models')
        },
      ]
    }),
  ],
};
