const { aws } = require("../config");
const AWS = require("aws-sdk");

const ID = aws.id;
const SECRET = aws.secret;
const BUCKET_NAME = aws.bucket;

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

async function awsUploadImage(file, filePath) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: `${filePath}`,
    Body: file
  };

  try {
    const response = await s3.upload(params).promise();
    return response.Location;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

module.exports = awsUploadImage;
