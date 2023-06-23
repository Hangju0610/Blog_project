const express = require('express');
const index = require('./routes/index');
const connect = require('./schemas');
//dotenv 설정 후 은닉화
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

connect();
const app = express();
//mongoose 연결

//body-parser
app.use(express.json());
//index 미들웨어 연결
app.use('/', index);

app.listen(PORT, HOST);
console.log(`동작해라! http://${HOST}:${PORT}`);
