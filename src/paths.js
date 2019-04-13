const path = require('path');

const cwd = process.cwd();
const distPath = path.resolve(cwd, 'dist');
const webpackPath = path.resolve(cwd, 'internals', 'webpack');

module.exports = {
  dist: distPath,
  distEject: path.resolve(distPath, 'eject'),
  distPublicBundle: path.resolve(distPath, 'bundle'),
  distUniversal: path.resolve(distPath, 'universal'),
  src: path.resolve(cwd, 'src'),
  webpackConfigClientLocalWeb: path.resolve(webpackPath, 'webpack.config.client.local.web'),
  webpackConfigClientProdWeb: path.resolve(webpackPath, 'webpack.config.client.prod.web'),
  webpackConfigUniversalLocal: path.resolve(webpackPath, 'webpack.config.universal.local'),
  webpackConfigUniversalProd: path.resolve(webpackPath, 'webpack.config.universal.prod'),
};
