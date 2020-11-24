const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolvers");
const { compareToken } = require("./utils/token");

require("dotenv").config({ path: ".env" });

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
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
    context: ({ req }) => compareToken(req.headers.authorization),
  });

  serverApollo.listen().then(({ url }) => {
    console.log("#################################");
    console.log("servidor apollo on " + url);
    console.log("#################################");
  });
}
