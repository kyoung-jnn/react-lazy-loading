const path = require('path');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const TEMPLATE_PATH = path.resolve(PROJECT_ROOT, 'public');
const SRC_PATH = path.resolve(PROJECT_ROOT, 'src');
const ASSETS_PATH = path.resolve(SRC_PATH, 'assets');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.s?css?$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(TEMPLATE_PATH, 'index.html'), // 템플릿 경로 설정
      templateParameters: {
        // 템플릿에 주입할 파라매터 변수 지정
        env: '',
      },
      favicon: path.resolve(ASSETS_PATH, 'favicon.ico'),
      minify: {
        // 배포 모드시 최적화
        collapseWhitespace: true, // 빈칸 제거
        removeComments: true, // 주석 제거
      },
    }),
    new CleanWebpackPlugin(), // 새로운 빌드시 이전 빌드 결과물 제거
    new MiniCssExtractPlugin({ filename: `[name].css` }), // 빌드 결과에서 스타일 분리
  ],
});
