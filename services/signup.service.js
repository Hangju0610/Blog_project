const SignupRepository = require("../repositories/signup.repository");

class signupService {
  signupRepository = new SignupRepository();

  existUser = async (nickname) => {
    const user = await this.signupRepository.existUser(nickname);
    return user;
  };

  signup = async (nickname, hashedPassword) => {
    const signData = await this.signupRepository.signup(
      nickname,
      hashedPassword
    );

    return signData;
  };
}

module.exports = signupService;
