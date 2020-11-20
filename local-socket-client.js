const io = require("socket.io-client");

console.log("start client for great success");
const socket = io("https://masautkovic.de");

socket.on("connect", function (...args) {
  console.log("connection established, woop, woop!", ...args);
});

socket.on("connect_error", function (...args) {
  console.log("connection errored, woop, woop!", ...args);
});
socket.on("error", function (...args) {
  console.log("connection errored, woop, woop!", ...args);
});

socket.on("webhook", function (...args) {
  console.log("webhook call on server, Yaaaaayyy!", ...args);
});

console.log(socket);
