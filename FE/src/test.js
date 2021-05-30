const { workerData } = require("worker_threads");
const socketIOClient = require("socket.io-client");
// const ENDPOINT = "http://192.168.100.130:4001";
const ENDPOINT = "http://localhost:4001";

const runService = () => {
    var socket = socketIOClient(ENDPOINT, { forceNew: true });
    socket.on("connect", function () {
        socket.on("FEEDBACK", function (data) {
            console.log("FEEDBACK", data);
        });
        socket.on("TIMESTAMP", function (data) {
            console.log("TIMESTAMP", data);
        });
    });
};

// for (var i = 0; i < 1; i++) {
//     runService();
// }
runService();

module.exports = runService;
