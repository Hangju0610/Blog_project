const jwt = require("jsonwebtoken");
const LoginService = require("../services/login.service");
const { loginValidation } = require("../validations/auth-validation");

const bcrypt = require("bcrypt");

class LoginController {
  loginService = new LoginService();

  findUser = async (req, res) => {
    try {
      const { nickname, password } = await loginValidation.validateAsync(
        req.body
      );
      const user = await this.loginService.findUser(nickname);

      const validPassword = await bcrypt.compare(password, user.password);

      if (!user || user.nickname !== nickname || !validPassword) {
        return res
          .status(412)
          .json({ error: "닉네임 또는 패스워드를 확인해주세요. " });
      }

      const token = jwt.sign({ nickname }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      res.cookie("Authorization", `Bearer ${token}`);

      return res.status(200).json({ token: token });
    } catch (err) {
      console.error(err);
      if (err.isJoi) {
        return res.status(412).json({ error: err.message });
      }
    }
  };
}

module.exports = LoginController;
