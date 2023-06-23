const path = require('path');

module.exports = {
  entry: {
    adminEditor: './js-develop/admin-editor.js',
    clientEditor: './js-develop/client-editor.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'assets/js'),
  },
};