const { port } = require("./config");
const mongoose = require("mongoose");
const MONGO_URI = require("./lib/mongo");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolvers");
const { compareToken } = require("./utils/token");

mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  },
  (err, _) => {
    if (err) {
      console.log("error de conexión");
    } else {
      server();
    }
  }
);

function server() {
  const serverApollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => compareToken(req.headers.authorization)
  });

  serverApollo.listen({ port }).then(({ url }) => {
    console.log("#################################");
    console.log("servidor apollo on " + url);
    console.log("#################################");
  });
}
