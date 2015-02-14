var str = require('virtual-dom-stringify');
var http = require('http');
var hyperstream = require('hyperstream');
var fs = require('fs');
var path = require('path');

var chart = require('./chart.js');
var ecstatic = require('ecstatic')(__dirname + '/static');

var server = http.createServer(function (req, res) {
    if (req.url === '/') {
        read('static/index.html').pipe(hyperstream({
            '#chart': str(chart.tree())
        })).pipe(res);
    }
    else ecstatic(req, res);
});
server.listen(5000);

function read (s) { return fs.createReadStream(path.resolve(__dirname, s)) }
