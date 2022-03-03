const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgeCSSExtractPlugin = require("purgecss-webpack-plugin");
const common = require("./webpack/webpack.esbuild");
const glob = require("glob-all");
const path = require("path");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  output: {
    filename: "[name].[contenthash].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      linkType: "text/css",
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    new PurgeCSSExtractPlugin({
      paths: [
        ...glob.sync([
          `${path.join(__dirname, "src")}/**/*.{ts,tsx}`,
          `${path.join(__dirname, "pages")}/**/*.{ts,tsx}`,
        ]),
      ],
      safelist: [/^switch/],
    }),
  ],
});
