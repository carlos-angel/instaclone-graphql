if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: ".env" });
}

module.exports = {
  port: process.env.PORT,
  isDev: process.env.NODE_ENV !== "production",
  encrypt: {
    salt: process.env.ENCRYPT_SALT
  },
  auth: {
    secret: process.env.SECRET_KEY,
    expiresIn: process.env.EXPIRES_IN
  },
  mongo: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    cluster: process.env.DB_CLUSTER,
    database: process.env.DB_NAME
  },
  aws: {
    id: process.env.AWS_ID,
    secret: process.env.AWS_SECRET,
    bucket: process.env.AWS_BUCKET_NAME
  }
};
