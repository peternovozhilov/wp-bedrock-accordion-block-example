const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const glob = require("glob");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: {
      ...Object.fromEntries(
        glob.sync("./assets/scss/**/*.scss").map(file => [
          `css/${path.basename(file, path.extname(file))}`,
          path.resolve(__dirname, file)
        ])
      )
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      clean: true // Cleans old files in dist before each build
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader"
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css" // Ensure CSS is output correctly
      }),
      new CopyPlugin({
        patterns: [
          { from: "assets/js", to: "js" } // Only copy JS files, no processing
        ]
      })
    ],
    optimization: {
      minimize: isProduction,
      minimizer: [new CssMinimizerPlugin()]
    },
    devtool: isProduction ? false : "source-map",
    devServer: {
      static: {
        directory: path.resolve(__dirname, "dist")
      },
      compress: true,
      port: 3000,
      hot: true
    }
  };
};
