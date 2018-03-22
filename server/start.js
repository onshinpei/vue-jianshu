require("babel-core/register")({
    presets: ['es2016']
})
require("babel-polyfill")
var app = require('./app')
