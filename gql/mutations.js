const {
  AuthController,
  UserController,
  FollowController,
  PublicationController,
  CommentController,
  LikeController
} = require("../controllers");

module.exports = {
  // User
  register: (_, { input }) => AuthController.register({ user: input }),
  login: (_, { input }) =>
    AuthController.login({ email: input.email, password: input.password }),
  updateAvatar: (_, { file }, context) =>
    UserController.updateAvatar(file, context),
  deleteAvatar: (_, {}, context) => UserController.deleteAvatar(context),
  updateUser: (_, { input }, context) =>
    UserController.updateUser(input, context),
  // Follow
  follow: (_, { username }, context) =>
    FollowController.follow(username, context),
  unFollow: (_, { username }, context) =>
    FollowController.unFollow(username, context),

  //Publication
  publish: (_, { file }, context) =>
    PublicationController.publish(file, context),

  //Comment
  addComment: (_, { input }, context) =>
    CommentController.addComment(input, context),

  //like
  addLike: (_, { idPublication }, context) =>
    LikeController.addLike(idPublication, context),
  deleteLike: (_, { idPublication }, context) =>
    LikeController.deleteLike(idPublication, context)
};
