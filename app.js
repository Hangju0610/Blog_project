const express = require('express');
const index = require('./routes/index');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

//body-parser
app.use(express.json());
//index 미들웨어 연결
app.use('/', index);

app.listen(PORT, HOST);
console.log(`동작해라! http://${HOST}:${PORT}`);
