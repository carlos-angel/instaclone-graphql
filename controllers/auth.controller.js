const { User } = require("../models");
const { encryptPassword, comparePassword } = require("../utils/encrypt");
const token = require("../utils/token");
const errorHandler = require("../utils/errorHandler");

async function register({ user }) {
  user.email = user.email.toLowerCase();
  user.username = user.username.toLowerCase();

  const emailFound = await existsEmail(user.email);
  const usernameFound = await existsUsername(user.username);
  if (emailFound || usernameFound) {
    errorHandler("Username o email no valido");
  }

  user.password = await encryptPassword(user.password);

  try {
    const userCreated = new User(user);
    userCreated.save();
    return userCreated;
  } catch (error) {
    console.log(error);
  }
}

async function login({ email, password }) {
  const userFound = await User.findOne({ email: email.toLowerCase() });

  if (!userFound) {
    errorHandler("contraseña y/o email no validos");
  }

  const passwordSuccess = await comparePassword(password, userFound.password);
  if (!passwordSuccess) {
    errorHandler("contraseña y/o email no validos");
  }

  try {
    const result = token.createToken(userFound);
    return {
      token: result
    };
  } catch (error) {
    errorHandler("Internal error", error);
  }
}

async function existsEmail(email) {
  const foundEmail = await User.findOne({ email });
  return foundEmail ? true : false;
}

async function existsUsername(username) {
  const foundUsername = await User.findOne({ username });
  return foundUsername ? true : false;
}

module.exports = {
  register,
  login
};
