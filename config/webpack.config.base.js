const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = [
  {
    entry: "./src/app/index.js",
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "../dist"),
      clean: true,
      publicPath: "/",
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: "src/app/pool8/assets",
            to: path.resolve(__dirname, "../dist/assets"),
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192,
              },
            },
          ],
        },
      ],
    },
  },
];
