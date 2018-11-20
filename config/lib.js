const path = require('path');
const base = require('./base');
const uglify = require('uglifyjs-webpack-plugin');

base.mode = 'production'; // development
base.entry = {
    'DotLine': path.join(__dirname, '../src/index.js')
};
base.output.library = 'DotLine';
base.output.libraryTarget = 'umd';
base.plugins.push(new uglify({
    sourceMap: false
}));

module.exports = base;
