const path = require('path');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const TEMPLATE_PATH = path.resolve(PROJECT_ROOT, 'public');
const SRC_PATH = path.resolve(PROJECT_ROOT, 'src');
const ASSETS_PATH = path.resolve(SRC_PATH, 'assets');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    historyApiFallback: false,
    port: 3000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.s?css?$/,
        exclude: /node_module/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(TEMPLATE_PATH, 'index.html'), // 템플릿 경로 설정
      templateParameters: {
        // 템플릿에 주입할 파라매터 변수 지정
        env: '(개발용)',
      },
      favicon: path.resolve(ASSETS_PATH, 'favicon.ico'), // 파비콘!
      minify: {
        removeComments: true, // 주석 제거
      },
    }),
  ],
});
