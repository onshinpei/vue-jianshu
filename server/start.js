// 支持es6 import等语法

require("babel-core/register")({
    presets: ['es2015', 'stage-0']
})
require("babel-polyfill")
var app = require('./app')

module.exports = app;
