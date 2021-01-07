const { port } = require("./config");
const dbConnection = require("./lib/mongo");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolvers");
const { compareToken } = require("./utils/token");

function server() {
  const serverApollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => compareToken(req.headers.authorization)
  });

  serverApollo.listen({ port }).then(async ({ url }) => {
    await dbConnection();
    console.log(`Listening ${url}`);
  });
}

server();
