const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const dbUrl = process.env.DB_URL;

// 몽구스 연결 함수
// 에러가 발생할 경우 .catch로 에러 형성
const connect = async () => {
    mongoose.connect(dbUrl).catch((err) => console.log(err));
};

module.exports = connect;
