const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const User = require("../schemas/user");

router.post("/", async (req, res) => {
  try {
    const { nickname, password } = req.body;
    const findUser = await User.findOne({ nickname });
    console.log(findUser);
    if (
      !findUser ||
      findUser.nickname !== nickname ||
      findUser.password !== password
    ) {
      return res
        .status(412)
        .json({ errorMessage: "닉네임 또는 패스워드를 확인해주세요." });
    }

    const tokenUser = jwt.sign(nickname, process.env.SEKRET_KEY, {
      expiresIn: "30s",
    });

    res.cookie("Authorization", `Bearer ${tokenUser}`);

    return res.status(200).json({ token: tokenUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
