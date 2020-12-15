const {Like} = require("../models");

function addLike(idPublication, context){
  try {
    const like = new Like({
      idPublication,
      idUser: context.user.id
    });

    like.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteLike(idPublication, context){
  try {
    await Like.findOneAndDelete({ idPublication }).where({idUser: context.user.id});
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function isLike(idPublication, context){
  try {
    const result = await Like.findOne({idPublication}).where({idUser: context.user.id});
    if(!result){
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function countLikes(idPublication){
  try {
    const likes = await Like.countDocuments({idPublication});
    return likes;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addLike,
  deleteLike,
  isLike,
  countLikes
}