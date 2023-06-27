const express = require("express");
const User = require("../schemas/user.js");
const router = express.Router();

router.post("/", (req, res) => {
  try {
    const { nickname, password, confirmPassword } = req.body;
    const existUser = User.findOne({ nickname });
    const regexp = new RegExp(`${nickname}`);

<<<<<<< HEAD
        // ERROR 처리
        if ((nickname = existUser.nickname)) {
            res.status(412).json({ errorMessage: '중복된 닉네임입니다.' });
        } else if (password !== confirmPassword) {
            res.status(412).json({ errorMessage: '비밀번호가 일치하지 않습니다.' });
        } else if (nickname.length < 3) {
            res.status(412).json({ errorMessage: '닉네임의 형식이 일치하지 않습니다.' });
        } else if (password.length < 4) {
            res.status(412).json({ errorMessage: '비밀번호 형식이 일치하지 않습니다.' });
        } else if (regexp.test(password)) {
            res.status(412).json({ errorMessage: '패스워드에 닉네임이 포함되어 있습니다.' });
        } else {
            const newUser = new User({ nickname, password });
            newUser.save();
            res.status(201).json({ message: '회원 가입에 성공하였습니다.' });
        }
    } catch (err) {
        res.status(400).json({ errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' });
    }
=======
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
>>>>>>> 21db1cfb1443cd599d572edee01f6a0a2c24a365
});

module.exports = router;
