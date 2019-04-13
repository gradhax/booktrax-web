const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

const babelRc = require('../../internals/.babelrc');

module.exports = {
  context: __dirname,
  externals: {},
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.[jt]sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: babelRc,
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { 
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|jpg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
            },
          },
        ],
      },  
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ 
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: [
      '.js', 
      '.jsx', 
      '.ts', 
      '.tsx',

      // https://github.com/apollographql/apollo-link-state/issues/302#issuecomment-431219631
      '*', '.mjs', '.gql', '.graphql', 
    ],
  },
  target: 'web',
};
