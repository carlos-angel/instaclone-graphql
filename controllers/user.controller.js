const { User } = require("../models");
const { encryptPassword, comparePassword } = require("../utils/encrypt");
const token = require("../utils/token");
const awsUploadImage = require("../utils/aws-upload-image");

async function register(input) {
  const newUser = input;
  newUser.email = newUser.email.toLowerCase();
  newUser.username = newUser.username.toLowerCase();

  const { email, username, password } = newUser;

  // Revisar si el email esta en uso
  const foundEmail = await User.findOne({ email });
  if (foundEmail) {
    throw new Error("Username o email no valido");
  }

  // Revisar si el username esta en uso
  const foundUsername = await User.findOne({ username });
  if (foundUsername) {
    throw new Error("Username o email no valido");
  }

  // Encriptar
  newUser.password = await encryptPassword(password);
  try {
    const user = new User(newUser);
    user.save();
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function login(input) {
  const { email, password } = input;

  const userFound = await User.findOne({ email: email.toLowerCase() });
  if (!userFound) {
    throw new Error("Error en el email o contraseña");
  }

  const passwordSuccess = await comparePassword(password, userFound.password);
  if (!passwordSuccess) {
    throw new Error("Error en el email o contraseña");
  }

  const result = token.createToken(userFound);

  return {
    token: result
  };
}

async function getUser(id, username) {
  let user = null;
  if (id) {
    user = await User.findById(id);
  } else if (username) {
    user = await User.findOne({ username });
  }

  if (!user) {
    throw new Error("El usuario no existe");
  }

  return user;
}

async function updateAvatar(file, context) {
  const { id } = context.user;

  const { createReadStream, mimetype } = await file;
  const extension = mimetype.split("/")[1];
  const imageName = `avatar/${id}.${extension}`;
  const fileData = createReadStream();

  try {
    const result = await awsUploadImage(fileData, imageName);
    await User.findByIdAndUpdate(id, { avatar: result });
    return {
      status: true,
      urlAvatar: result
    };
  } catch (error) {
    return {
      status: false,
      urlAvatar: null
    };
  }
}

async function deleteAvatar(context) {
  const { id } = context.user;
  try {
    await User.findByIdAndUpdate(id, { avatar: "" });
    return true;
  } catch (error) {
    return false;
  }
}

async function updateUser(input, context) {
  const { id } = context.user;
  try {
    if (input.currentPassword && input.newPassword) {
      const userFound = await User.findById(id);
      const passwordSuccess = await comparePassword(
        input.currentPassword,
        userFound.password
      );
      if (!passwordSuccess) {
        throw new Error("contraseña incorrecta");
      }

      const newPasswordCrypt = await encryptPassword(input.newPassword);

      await User.findByIdAndUpdate(id, { password: newPasswordCrypt });
    } else {
      await User.findByIdAndUpdate(id, input);
    }

    return true;
  } catch (error) {
    return false;
  }
}

async function search(search) {
  const users = await User.find({ name: { $regex: search, $options: "i" } });
  return users;
}

module.exports = {
  register,
  login,
  getUser,
  updateAvatar,
  deleteAvatar,
  updateUser,
  search
};
