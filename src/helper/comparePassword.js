const bcrypt = require("bcryptjs");

const comparePassword = async (password, hashedPassword) => {
  try {
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    return passwordMatch;
  } catch (error) {
    console.error(error);
  }
};

module.exports = comparePassword;
