const User = require("../schemas/user.js");

class signupRepository {
  existUser = async (nickname) => {
    const existUser = await User.findOne({ nickname });

    return existUser;
  };

  signup = async (nickname, password) => {
    const user = await new User({ nickname, password });
    user.save();
    return user;
  };
}

module.exports = signupRepository;
