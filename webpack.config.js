const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'image-editor.js',
    path: path.resolve(__dirname, 'assets/js'),
  },
};