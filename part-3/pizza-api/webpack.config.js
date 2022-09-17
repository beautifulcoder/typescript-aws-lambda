const path = require('path');

module.exports = {
  entry: [
    path.join(__dirname, 'dist/api.js')
  ],
  output: {
    path: path.join(__dirname, 'pub'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs'
  },
  target: "node",
  mode: "production"
};
