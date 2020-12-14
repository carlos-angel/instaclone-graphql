const { Publication, User } = require("../models");
const awsUploadImage = require("../utils/aws-upload-image");
const { v4: uuidv4 } = require("uuid");

async function publish(file, context) {
  const { id } = context.user;
  const { createReadStream, mimetype } = await file;
  const extension = mimetype.split("/")[1];
  const fileName = `publication/${uuidv4()}.${extension}`;
  const fileData = createReadStream();

  try {
    const result = await awsUploadImage(fileData, fileName);
    const publication = new Publication({
      idUser: id,
      file: result,
      typeFile: mimetype.split("/")[0],
    });

    publication.save();

    return {
      status: true,
      urlFile: result,
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      urlFile: "",
    };
  }
}

async function getPublications(username) {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Internal error");
  }

  const publications = await Publication.find()
    .where({ idUser: user._id })
    .sort({ createdAt: -1 });
  return publications;
}

module.exports = {
  publish,
  getPublications,
};
