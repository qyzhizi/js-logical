const path = require('path');

module.exports = {
  entry: './dist/test.js',
  output: {
              path: path.resolve(__dirname, 'dist'),
              filename: 'bundle.js',
            },
  mode: 'production',
};
