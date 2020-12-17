const { User, Follow } = require("../models");
const errorHandler = require("../utils/errorHandler");

async function follow(username, context) {
  try {
    const userFound = await User.findOne({ username });
    if (!userFound) throw new Error("Usuario no encontrado");

    const follow = new Follow({
      idUser: context.user.id,
      follow: userFound._id
    });
    follow.save();
    return true;
  } catch (error) {
    errorHandler("Internal error", error);
  }
}

async function isFollow(username, context) {
  try {
    const userFound = await User.findOne({ username });
    if (!userFound) throw new Error("Usuario no encontrado");

    const follow = await Follow.find({ idUser: context.user.id })
      .where("follow")
      .equals(userFound._id);

    if (!follow || follow <= 0) return false;

    return true;
  } catch (error) {
    errorHandler("Internal error", error);
  }
}

async function unFollow(username, context) {
  try {
    const userFound = await User.findOne({ username });
    if (!userFound) throw new Error("Usuario no encontrado");

    const follow = await Follow.deleteOne({ idUser: context.user.id })
      .where("follow")
      .equals(userFound._id);

    if (!follow || follow.deletedCount <= 0) return false;

    return true;
  } catch (error) {
    errorHandler("Internal error", error);
  }
}

async function getFollowers(username) {
  try {
    const user = await User.findOne({ username });

    const followers = await Follow.find({ follow: user._id }).populate(
      "idUser"
    );

    const followersList = [];
    for await (const data of followers) {
      followersList.push(data.idUser);
    }

    return followersList;
  } catch (error) {
    errorHandler("Internal error", error);
  }
}

async function getFolloweds(username) {
  try {
    const user = await User.findOne({ username });

    const followeds = await Follow.find({ idUser: user._id }).populate(
      "follow"
    );

    const followedsList = [];
    for await (const data of followeds) {
      followedsList.push(data.follow);
    }

    return followedsList;
  } catch (error) {
    errorHandler("Internal error", error);
  }
}

async function getNotFolloweds(userLogged) {
  const arrayUsers = [];
  try {
    const users = await User.find().limit(30);

    for await (const user of users) {
      const isFind = await Follow.findOne({ idUser: user.id })
        .where("follow")
        .equals(user._id);

      if (!isFind) {
        if (user._id.toString() !== userLogged.id.toString()) {
          arrayUsers.push(user);
        }
      }
    }
  } catch (error) {
    errorHandler("Internal error", error);
  }

  return arrayUsers;
}

module.exports = {
  follow,
  isFollow,
  unFollow,
  getFollowers,
  getFolloweds,
  getNotFolloweds
};
