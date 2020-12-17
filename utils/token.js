const jwt = require("jsonwebtoken");
const { auth } = require("../config");

const compareToken = token => {
  if (token) {
    try {
      const user = jwt.verify(token.replace("Bearer ", ""), auth.secret);
      return {
        user
      };
    } catch (error) {
      console.log("###error###");
      console.error(error.message);
      throw new Error("Token invalido");
    }
  }
};

const createToken = user => {
  const { id, name, email, username } = user;
  const payload = {
    id,
    name,
    email,
    username
  };

  return jwt.sign(payload, auth.secret, { expiresIn: auth.expiresIn });
};

module.exports = {
  compareToken,
  createToken
};
