const WebSocket = require("ws");
const PORT = process.env.PORT || 10000;

const wss = new WebSocket.Server({ port: PORT });

console.log("WebSocket server running on port: " + PORT);

wss.on("connection", function (ws) {
    console.log("Client connected");
    ws.send("CONNECTED");

    ws.on("message", function (msg) {
        wss.clients.forEach(function (client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(msg);
            }
        });
    });

    ws.on("close", () => console.log("Client disconnected"));
});
