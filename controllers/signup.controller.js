const SignupService = require("../services/signup.service");
const { signupValidation } = require("../validations/auth-validation");

const bcrypt = require("bcrypt");
class signupController {
  signupService = new SignupService();

  signup = async (req, res) => {
    try {
      const { nickname, password, confirmPassword } =
        await signupValidation.validateAsync(req.body);

      const existUser = await this.signupService.existUser(nickname);
      if (existUser) {
        return res.status(412).json({ error: "중복된 닉네임입니다. " });
      }

      const regexp = new RegExp(`${nickname}`);
      if (regexp.test(password)) {
        return res
          .status(412)
          .json({ error: "패스워드에 닉네임이 포함되어 있습니다." });
      }

      const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
      const hashedPassword = await bcrypt.hash(password, salt);

      await this.signupService.signup(nickname, hashedPassword);

      return res.status(200).json({ message: "회원 가입에 성공하였습니다. " });
    } catch (err) {
      console.error(err);
      if (err.isJoi) {
        return res.status(412).json({ error: err.message });
      }
      return res.status(500).json({ error: "서버 에러" });
    }
  };
}

module.exports = signupController;
