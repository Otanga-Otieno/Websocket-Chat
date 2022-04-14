var http = require('http');
var static = require('node-static');

var file = new static.Server('./ui');

var server = http.createServer(function(req, res) {
    if(req.url === "/") req.url = "/index.htm";
    file.serve(req, res);
});
server.listen(9001);