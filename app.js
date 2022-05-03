var https = require('https');
var fs = require('fs');
var static = require('node-static');

var file = new static.Server('./ui');

var options = {
    key: fs.readFileSync("/etc/letsencrypt/live/server.otanga.co.ke/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/server.otanga.co.ke/fullchain.pem")
};

var server = https.createServer(options, function(req, res) {
    if(req.url === "/") req.url = "/index.htm";
    file.serve(req, res);
});
server.listen(9001);