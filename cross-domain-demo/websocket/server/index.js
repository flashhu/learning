let WebSocket = require('ws');//记得安装ws
let wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', function (ws) {
    ws.on('message', function (data) {
        console.log(data);
        ws.send('ok')
    });
})