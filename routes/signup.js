const express = require("express");

const SignupController = require("../controllers/signup.controller.js");
const signupController = new SignupController();

const router = express.Router();

// 회원가입 api
router.post("/", signupController.signup);

module.exports = router;
