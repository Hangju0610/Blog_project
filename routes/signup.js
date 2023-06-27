const express = require("express");
const User = require("../schemas/user.js");
const router = express.Router();

router.post("/", (req, res) => {
  try {
    const { nickname, password, confirmPassword } = req.body;
    const existUser = User.findOne({ nickname });
    const regexp = new RegExp(`${nickname}`);

    // ERROR 처리
    if ((nickname = existUser.nickname)) {
      res.status(412).json({ message: "중복된 닉네임입니다." });
    } else if (password !== confirmPassword) {
      res.status(412).json({ message: "비밀번호가 일치하지 않습니다." });
    } else if (nickname.length < 3) {
      res.status(412).json({ message: "닉네임의 형식이 일치하지 않습니다." });
    } else if (password.length < 4) {
      res.status(412).json({ message: "비밀번호 형식이 일치하지 않습니다." });
    } else if (regexp.test(password)) {
      res
        .status(412)
        .json({ message: "패스워드에 닉네임이 포함되어 있습니다." });
    }
  } catch (err) {}
});

module.exports = router;
