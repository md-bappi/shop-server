const jwt = require("jsonwebtoken");

const generateToken = async (payload, jwtSecretKey, expiresIn = "7d") => {
  try {
    const token = await jwt.sign(payload, jwtSecretKey, {
      expiresIn,
    });
    return token;
  } catch (error) {
    console.error("JWT create error:", error);
    throw new Error("Token creation failed");
  }
};

module.exports = generateToken;
