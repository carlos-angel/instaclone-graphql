const bcrypt = require("bcryptjs");

const encryptPassword = async password => {
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const comparePassword = async (password, currentPassword) => {
  return await bcrypt.compare(password, currentPassword);
};

module.exports = {
  encryptPassword,
  comparePassword
};
