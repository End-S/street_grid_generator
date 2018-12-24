const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/index.ts',
  devtool: "inline-source-map",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/dist"
  },
  resolve: {
    extensions: ['.ts', '.js', '.css', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    hash: true,
    template: './src/index.html',
    path: path.join(__dirname, 'dist'),
    filename: 'index.html',
  }),
  ],
};
