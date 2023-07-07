const SignupRepository = require("../repositories/signup.repository");

class signupService {
  signupRepository = new SignupRepository();

  existUser = async (nickname) => {
    const user = await this.signupRepository.existUser(nickname);
    return user;
  };

  signup = async (nickname, password) => {
    const signData = await this.signupRepository.signup(nickname, password);

    return signData;
  };
}

module.exports = signupService;
