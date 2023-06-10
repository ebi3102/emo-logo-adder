const path = require('path');

module.exports = {
  entry: './js-develop/index.js',
  output: {
    filename: 'image-editor.js',
    path: path.resolve(__dirname, 'assets/js'),
  },
};