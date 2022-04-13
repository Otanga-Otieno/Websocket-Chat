var server;

function createWebsocketServer () {

    if(server) {
        console.log("You disconnected from current room ");
        server.close(); //CLOSED = true;
    }
    const roomName = document.querySelector("#roomname").value;
    console.log("You joined room " + roomName);
    const url = "ws://localhost:8002/" + roomName;
    server = new WebSocket(url);

    var msg = document.getElementById("messages");
    server.onmessage = (message)=> {
        
        let spn2 = document.createElement("span");
        spn2.style.color = "green";
        let spn = document.createElement("span");
        spn.style.color = "yellow";
        let br = document.createElement("br");
        let string = message.data.split(/:(.+)/);
        let user = string[0];
        let text = string[1];
        spn.innerText = user + ": "
        spn2.innerText = text;
        msg.appendChild(spn).appendChild(spn2).appendChild(br);

    }

}


function sendMessage() {
    
    if(!server) return;
    let sendButton = document.getElementById("squeal");
    let currentMessage = document.getElementById("textbox");
    let message = currentMessage.value;
    server.send(message);
    currentMessage.value = "";

}