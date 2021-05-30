const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

app.use("/types", index);

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "*",
        // methods: ["GET", "POST"],
    },
});

let interval;

// connection
io.on("connection", (socket) => {
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => {
        const response = new Date();
        // Emitting a new message. Will be consumed by the client
        socket.broadcast.emit("TIMESTAMP", response);
        console.log("TIMESTAMP", response);
    }, 5000);
    socket.on("disconnect", () => {
        // console.log("Client disconnected");
        clearInterval(interval);
    });
});

io.on("connection", (socket) => {
    socket.on("USERINPUT", (data) => {
        console.log("FEEDBACK", data);
        socket.broadcast.emit("FEEDBACK", data);
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
