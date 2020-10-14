const express = require("express");
const app = express();

app.use(express.static("./src/frontend"));

const io = require("socket.io")();
io.on("connection", (client) => {
	console.log("Connected");
	client.on("msg", (data) => {
		console.log(client);
		console.log(data);
		client.broadcast.emit("newMsg", {from: "other", message: data});
	});
});

io.listen(8081);

app.listen(8080, () => {
	console.log("Listening");
});
