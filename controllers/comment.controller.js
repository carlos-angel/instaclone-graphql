const { Comment } = require("../models");
const errorHandler = require("../utils/errorHandler");

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
    errorHandler("Internal error", error);
  }
}

async function getComments(idPublication) {
  try {
    const comments = await Comment.find({ idPublication }).populate("idUser");
    return comments;
  } catch (error) {
    errorHandler("Internal error", error);
  }
}

module.exports = {
  addComment,
  getComments
};
