const { User, Follow } = require("../models");

async function follow(username, context) {
  try {
    const userFound = await User.findOne({ username });
    if (!userFound) throw new Error("Usuario no encontrado");

    const follow = new Follow({
      idUser: context.user.id,
      follow: userFound._id,
    });
    follow.save();
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
}

async function isFollow(username, context) {
  const userFound = await User.findOne({ username });
  if (!userFound) throw new Error("Usuario no encontrado");

  const follow = await Follow.find({ idUser: context.user.id })
    .where("follow")
    .equals(userFound._id);

  if (!follow || follow <= 0) return false;

  return true;
}

async function unFollow(username, context) {
  const userFound = await User.findOne({ username });
  if (!userFound) throw new Error("Usuario no encontrado");

  const follow = await Follow.deleteOne({ idUser: context.user.id })
    .where("follow")
    .equals(userFound._id);

  if (!follow || follow.deletedCount <= 0) return false;

  return true;
}

module.exports = {
  follow,
  isFollow,
  unFollow,
};
