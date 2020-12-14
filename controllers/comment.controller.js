const { Comment } = require("../models");

function addComment(input, context) {
  try {
    const comment = new Comment({
      idPublication: input.idPublication,
      idUser: context.user.id,
      comment: input.comment
    });
    comment.save();
    return comment;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getComments(idPublication) {
  try {
    const comments = await Comment.find({ idPublication }).populate("idUser");
    return comments;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  addComment,
  getComments
};
