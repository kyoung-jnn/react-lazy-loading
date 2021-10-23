const path = require('path');
const dotenv = require('dotenv-webpack');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DIST_PATH = path.resolve(PROJECT_ROOT, 'dist');
const SRC_PATH = path.resolve(PROJECT_ROOT, 'src');

module.exports = {
  entry: path.resolve(SRC_PATH, 'index.tsx'),
  output: {
    filename: 'bundle.js',
    path: DIST_PATH,
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@src': SRC_PATH,
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_module/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]?[hash]',
            outputPath: 'assets',
            limit: 10000, // 10kb 미만 파일만 data url로 처리
          },
        },
      },
    ],
  },
  plugins: [new dotenv()], // env 설정
};
