const baseConfig = require("./webpack.config.base");
const { merge } = require("webpack-merge");
const path = require("path");

const [client] = baseConfig;

module.exports = [
  merge(client, {
    mode: "production",
  }),
];
