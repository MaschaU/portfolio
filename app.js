const express = require("express");
const pino = require("pino-http")();
const fetch = require("node-fetch");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const { PUBLIC_URL, BOT_TOKEN, PORT = 8080 } = process.env;
const WEBHOOK_TOKEN = `wh${(Math.random() * 10000000).toFixed()}`;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let outboundSocket;
io.on("connection", (socket) => {
  console.log("a user connected", socket);
  if (!outboundSocket) {
    outboundSocket = socket;
    // socket.on('message', () => { });
    socket.on("disconnect", () => {
      outboundSocket = null;
    });
  }
});

app.use(express.json());

app.post(`/webhook/telegram/${WEBHOOK_TOKEN}`, (req, res, next) => {
  console.log("telegram webhook", req.body);
  if (outboundSocket) {
    outboundSocket.emit("webhook", req.body);
  }
  next();
});

app.use(pino);

app.use(express.static("./public"));

const sendCommand = (commandName, body) =>
  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${commandName}`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());

http.listen(PORT, () => {
  // when starting the app, ensure the webhook is setup
  sendCommand("setWebhook", {
    url: `${PUBLIC_URL}/webhook/telegram/${WEBHOOK_TOKEN}`,
  })
    .then((resJson) => {
      console.log("setWebhook response", resJson);
    })
    .catch((err) => console.log("setWebhook", err.message));
  console.log(
    `server alive and kickin on ${PORT}! (${PUBLIC_URL}, ${BOT_TOKEN})`
  );
});
