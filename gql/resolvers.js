const { UserController } = require("../controllers");

const resolvers = {
  Query: {
    // User
    getUser: (_, { id, username }) => UserController.getUser(id, username),
  },
  Mutation: {
    // User
    register: (_, { input }) => UserController.register(input),
    login: (_, { input }) => UserController.login(input),
    updateAvatar: (_, { file }, context) =>
      userController.updateAvatar(file, context),
    deleteAvatar: (_, {}, context) => userController.deleteAvatar(context),
    updateUser: (_, { input }, context) =>
      userController.updateUser(input, context),
  },
};

module.exports = resolvers;
