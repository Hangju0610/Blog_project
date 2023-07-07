const express = require("express");
const LoginController = require("../controllers/login.controller");
const loginController = new LoginController();

const router = express.Router();

// 로그인 api 인가된 사람인지 확인하고 토큰을 발급하며 로그인을 하는 기능
router.post("/", loginController.findUser);

module.exports = router;
