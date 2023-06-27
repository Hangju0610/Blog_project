const jwt = require("jsonwebtoken");

const jwtValidation = async (req, res) => {
  const { Authorization } = req.cookies;

  console.log(Authorization);

  const jwtVerify = jwt.verify(
    Authorization,
    process.env.SECRET_KEY,
    (error, decode) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(decode);
    }
  );
};

module.exports = {};
