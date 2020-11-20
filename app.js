const express = require("express");
// const pino = require("pino-http")();
const fetch = require("node-fetch");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const { PUBLIC_URL, BOT_TOKEN, PORT = 8080 } = process.env;

// app.use(pino);
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let outboundSocket;
io.on("connection", (socket) => {
  outboundSocket = socket;
  console.log("a user connected");
});

app.use(express.json());

app.post("/webhook/telegram", (req, res, next) => {
  console.log(req.body);
  if (outboundSocket) outboundSocket.emit(req.body);
  next();
});

const sendCommand = (commandName, body) => {
  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${commandName}`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
};

app.listen(PORT, () => {
  // when starting the app, ensure the webhook is setup
  sendCommand("setWebhook", {
    url: `${PUBLIC_URL}/webhook/telegram`,
  });
  console.log(`server alive and kickin on ${PORT}!`);
});
