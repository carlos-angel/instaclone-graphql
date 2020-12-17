const {
  UserController,
  FollowController,
  PublicationController,
  CommentController,
  LikeController
} = require("../controllers");

module.exports = {
  // User
  getUser: (_, { id, username }) => UserController.getUser(id, username),
  search: (_, { search }) => UserController.search(search),

  // Follow
  isFollow: (_, { username }, context) =>
    FollowController.isFollow(username, context),
  getFollowers: (_, { username }) => FollowController.getFollowers(username),
  getFolloweds: (_, { username }) => FollowController.getFolloweds(username),

  // Publication
  getPublications: (_, { username }) =>
    PublicationController.getPublications(username),
  getPublicationsFolloweds: (_, {}, { user }) =>
    PublicationController.getPublicationsFolloweds(user),
  getNotFolloweds: (_, {}, { user }) => FollowController.getNotFolloweds(user),

  // Comment
  getComments: (_, { idPublication }) =>
    CommentController.getComments(idPublication),

  // like
  isLike: (_, { idPublication }, context) =>
    LikeController.isLike(idPublication, context),
  countLikes: (_, { idPublication }) => LikeController.countLikes(idPublication)
};
