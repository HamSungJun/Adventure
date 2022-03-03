const { merge } = require("webpack-merge");
const common = require("./webpack/webpack.esbuild");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    open: true,
  },
});
