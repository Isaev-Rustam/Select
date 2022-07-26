const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

//Модуль gh-pages Размещает  папку Dist на git hub

module.exports = {
  // Входной файл
  entry: ["./src/js/index.js"],

  // Выходной файл И очистка выходной папки
  output: {
    filename: "./js/bundle.js",
    clean: true,
  },

  // Source maps для удобства отладки
  devtool: "source-map",

  module: {

    rules: [
      // Транспилируем js с babel
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src/js"),
        exclude: /node_modules/,
      },

      // Компилируем SCSS в CSS
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // Extract css to separate file
          "css-loader", // translates CSS into CommonJS
          {
            loader: "postcss-loader", // parse CSS and add vendor prefixes to CSS rules
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
          "sass-loader", // compiles Sass to CSS, using Node Sass by default
        ],
      },

      // Подключаем шрифты из css
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: "file-loader?name=./fonts/[name].[ext]",
          },
        ],
      },

      // Подключаем картинки из css
      {
        test: /\.(svg|png|jpg|jpeg|webp)$/,
        use: [
          {
            loader: "file-loader?name=./static/[name].[ext]",
          },
        ],
      },
    ],
  },
  plugins: [
    // Подключаем файл html, стили и скрипты встроятся автоматически
    new HtmlWebpackPlugin({
      title: "GitHub api",
      template: "./src/index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false,
      },
    }),

    // Кладем стили в отдельный файлик
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),

    // Копируем картинки

    new CopyWebpackPlugin({
      patterns: [{ from: "./src/img", to: "img" }],
    }),
  ],
};
