const express = require("express");
const app = express();
const server = require("http").createServer(app)
const io = require("socket.io").listen(server);
require("dotenv").config();

app.use(express.static("./src/frontend"));

io.on("connection", (client) => {
	console.log("Connected");
	client.on("msg", (data) => {
		console.log(client);
		console.log(data);
		client.broadcast.emit("newMsg", { from: "other", message: data });
	});
});

server.listen(process.env.PORT, () => {
	console.log("Listening");
});
