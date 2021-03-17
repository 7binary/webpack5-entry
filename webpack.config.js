const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin: CleanPlugin } = require('clean-webpack-plugin');

module.exports = (env) => {
  const isDev = env.development === true;
  const isProd = env.production === true;
  console.log('> IS_PROD:', isProd);
  console.log('> IS_DEV:', isDev);

  const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

  return {
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: ['@babel/polyfill', './index.js'],
      analytics: './analytics.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: filename('js'),
    },
    resolve: {
      extensions: ['.js', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@models': path.resolve(__dirname, 'src/models'),
      },
    },
    optimization: {
      splitChunks: { chunks: 'all' },
      minimize: isProd,
      minimizer: [
        new TerserPlugin(),
        new OptimizeCssAssetsPlugin(),
      ],
    },
    devServer: {
      port: 4200,
      hot: isDev,
    },
    plugins: [
      new CleanPlugin(),
      new MiniCssExtractPlugin({
        filename: filename('css'),
      }),
      new HtmlPlugin({
        title: 'Webpack5',
        favicon: path.resolve(__dirname, 'src/favicon.ico'),
        template: './template.html', // шаблон
        filename: 'index.html', // выходной файл
        minify: {
          collapseWhitespace: isProd,
        },
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties'],
            },
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            // 'postcss-loader',
            'sass-loader',
          ],
        },
        { test: /\.(png|jpe?g|svg|gif)$/i, use: ['file-loader'] },
        { test: /\.(ttf|woff2?|eot)$/i, use: ['file-loader'] },
        { test: /\.xml$/i, use: ['xml-loader'] },
        { test: /\.csv$/i, use: ['csv-loader'] },
      ],
    },
  };
};
