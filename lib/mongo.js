const { mongo } = require("../config");

const USER = encodeURIComponent(mongo.user);
const PASSWORD = encodeURIComponent(mongo.password);

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${mongo.cluster}/${mongo.database}?retryWrites=true&w=majority`; // prettier-ignore

module.exports = MONGO_URI;
