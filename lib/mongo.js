const { mongo, isDev } = require("../config");
const mongoose = require("mongoose");

const USER = encodeURIComponent(mongo.user);
const PASSWORD = encodeURIComponent(mongo.password);

let mongoUri = `mongodb+srv://${USER}:${PASSWORD}@${mongo.cluster}/${mongo.database}?retryWrites=true&w=majority`; // prettier-ignore

if (isDev) {
  mongoUri = `mongodb://localhost:27017/${mongo.database}`;
}

const dbConnection = async () => {
  try {
    mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log(`database ${mongo.database} connected`);
  } catch (error) {
    return error;
  }
};

module.exports = dbConnection;
