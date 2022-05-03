const WebSocket = require('ws');
var https = require('https');
var fs = require('fs');

var options = {
    key: fs.readFileSync("/etc/letsencrypt/live/server.otanga.co.ke/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/server.otanga.co.ke/fullchain.pem")
};

var server = https.createServer(options, (req, res) => {
    //do nothing
});

const socketServer = new WebSocket.Server(server);
server.listen(9002);

socketServer.on("connection", (stream, req) => {

    stream.id = req.headers['sec-websocket-key'];
    stream.room = req.url;

    stream.on("message", (data) => {
        socketServer.clients.forEach(client => {

            let roomName = stream.room
            if(client.readyState == WebSocket.OPEN && client.room === roomName) {

                if(client !== stream) {
                    client.send(stream.id + " says: " + data.toString());
                } else {
                    client.send("You say: " + data.toString() + "");
                }
            }

        })
    });

});

socketServer.on('upgrade', async function upgrade(request, socket, head) {

    if(Math.random() > 0.5){
        return socket.end("HTTP/1.1 401 Unauthorized\r\n", "ascii");
    }

    socketServer.handleUpgrade(request, socket, head, function done(ws) {
    socketServer.emit('connection', ws, request);
    });

});