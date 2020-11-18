const express = require('express');
const pino = require('pino-http')();

const app = express();
app.use(pino);
app.use(express.static('./public'));

app.listen(process.env.PORT || 8080, () => console.log(`server alive and kickin on ${process.env.PORT || 8080}!`));