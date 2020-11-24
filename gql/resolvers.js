const { UserController } = require("../controllers");

const resolvers = {
  Query: {
    // User
    getUser: (_, { id, username }) => UserController.getUser(id, username),
    search: (_, { search }) => UserController.search(search),
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
  },
};

module.exports = resolvers;
