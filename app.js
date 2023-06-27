const express = require('express');
const index = require('./routes/index');
const connect = require('./schemas');
const cookieParser = require('cookie-parser');
//dotenv 설정 후 은닉화
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT;

connect();
const app = express();
//mongoose 연결

//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // urlencoded : 폼 데이터를 받을 수 있는 기능
app.use(cookieParser());
//index 미들웨어 연결
app.use('/api', index);

app.listen(PORT);
console.log(`동작해라! http://${PORT}`);
