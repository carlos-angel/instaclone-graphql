const {
  UserController,
  FollowController,
  PublicationController,
} = require("../controllers");

const resolvers = {
  Query: {
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
  },
  Mutation: {
    // User
    register: (_, { input }) => UserController.register(input),
    login: (_, { input }) => UserController.login(input),
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
  },
};

module.exports = resolvers;
