const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const dbUrl = process.env.DB_URL;

const connect = async () => {
    mongoose.connect(dbUrl).catch((err) => console.log(err));
};

module.exports = connect;
