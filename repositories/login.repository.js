const User = require("../schemas/user");

class loginRepository {
  findUser = async (nickname) => {
    const user = await User.findOne({ nickname });
    return user;
  };
}

module.exports = loginRepository;
