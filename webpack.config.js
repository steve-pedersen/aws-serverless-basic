const webpack = require('webpack');
const slsw = require('serverless-webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = (async () => {
  const accountId = await slsw.lib.serverless.providers.aws.getAccountId();
  return {
    target: 'node',
    entry: slsw.lib.entries,
    externals: [
      nodeExternals({
        whitelist: [/^core-js/, /^regenerator-runtime/],
      }),
    ],
    optimization: {
      nodeEnv: false,
    },
    mode: 'production',
    plugins: [
      new webpack.DefinePlugin({
        AWS_ACCOUNT_ID: `${accountId}`,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|dependency_layer)/,
          loader: 'babel-loader',
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /(node_modules|dependency_layer)/,
        },
      ],
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
      },
      extensions: ['.ts', '.js'],
    },
  };
})();
