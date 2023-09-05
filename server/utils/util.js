const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const { Config } = require("../../configs/config");

const generateToken = (user, rememberMe) => {
  let options = {};
  if (rememberMe) {
    options = {
      expiresIn: "10d",
    };
  } else {
    options = { expiresIn: "1h" };
  }
  return jwt.sign(user, Config.SECRET_JWT, options);
};

const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

const comparePassword = (a, b) => {
  return bcrypt.compare(a, b);
};
function generateRandomAlphaNumeric(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}

function getTimestampBasedString() {
  const timestamp = Date.now().toString();
  const randomString = generateRandomAlphaNumeric(4); // Generate 4 random characters
  const timestampBasedString = timestamp + randomString;

  return timestampBasedString.slice(-8); // Take the last 8 characters
}
module.exports = {
  hashPassword,
  generateToken,
  comparePassword,
  getTimestampBasedString,
};
