const baseConfig = require("./webpack.config.base");
const { merge } = require("webpack-merge");
const path = require("path");

const [client] = baseConfig;

module.exports = [
  merge(client, {
    mode: "development",
    devtool: "source-map",
    devServer: {
      contentBase: path.join(__dirname, "../dist"),
      port: process.env.PORT || process.env.NODE_PORT || 3000,
    },
    output: {
      ...client.output,
      publicPath: "/",
    },
  }),
];
