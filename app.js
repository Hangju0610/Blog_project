const express = require('express');
const index = require('./routes/index');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.get('/', index);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
