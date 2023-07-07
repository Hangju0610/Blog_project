const User = require("../schemas/user.js");

class signupRepository {
  existUser = async (nickname) => {
    const existUser = await User.findOne({ nickname });

    return existUser;
  };

  signup = async (nickname, hashedPassword) => {
    const user = await new User({ nickname, password: hashedPassword });
    user.save();
    return user;
  };
}

module.exports = signupRepository;
