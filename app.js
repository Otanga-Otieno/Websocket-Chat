var http = require('http');
var fs = require('fs');
var static = require('node-static');

var file = new (static.Server)("ui/");

var server = http.createServer(function(req, res) {
    file.serve(req, res);
});
server.listen(8001); 