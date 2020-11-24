const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

const compareToken = (token) => {
  if (token) {
    try {
      const user = jwt.verify(
        token.replace("Bearer ", ""),
        process.env.SECRET_KEY
      );
      return {
        user,
      };
    } catch (error) {
      console.log("###error###");
      console.error(error.message);
      throw new Error("Token invalido");
    }
  }
};

module.exports = {
  compareToken,
};
