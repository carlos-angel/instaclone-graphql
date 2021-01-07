const { User } = require("../models");
const { encryptPassword, comparePassword } = require("../utils/encrypt");
const awsUploadImage = require("../utils/aws-upload-image");
const errorHandler = require("../utils/errorHandler");
const { v4: uuidv4 } = require("uuid");

async function getUser(id, username) {
  let user = null;
  try {
    if (id) {
      user = await User.findById(id);
    } else if (username) {
      user = await User.findOne({ username });
    }

    if (!user) {
      errorHandler("usuario no encontrado");
    }
  } catch (error) {
    errorHandler("Internal error", error);
  }

  return user;
}

async function updateAvatar(file, context) {
  try {
    const { id } = context.user;

    const { createReadStream, mimetype } = await file;
    const extension = mimetype.split("/")[1];
    const imageName = `avatar/${uuidv4()}.${extension}`;
    const fileData = createReadStream();

    const result = await awsUploadImage(fileData, imageName);
    await User.findByIdAndUpdate(id, { avatar: result });
    return {
      status: true,
      urlAvatar: result
    };
  } catch (error) {
    errorHandler("Internal error", error);
  }
}

async function deleteAvatar(context) {
  const { id } = context.user;
  try {
    await User.findByIdAndUpdate(id, { avatar: "" });
    return true;
  } catch (error) {
    errorHandler("Internal error", error);
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
        errorHandler("contraseña incorrecta", error);
      }

      const newPasswordCrypt = await encryptPassword(input.newPassword);

      await User.findByIdAndUpdate(id, { password: newPasswordCrypt });
    } else {
      await User.findByIdAndUpdate(id, input);
    }

    return true;
  } catch (error) {
    errorHandler("Internal error", error);
  }
}

async function search(search) {
  try {
    const users = await User.find({ name: { $regex: search, $options: "i" } });
    return users;
  } catch (error) {
    errorHandler("Internal error", error);
  }
}

module.exports = {
  getUser,
  updateAvatar,
  deleteAvatar,
  updateUser,
  search
};
