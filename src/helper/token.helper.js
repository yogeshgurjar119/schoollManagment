const jwt = require("jsonwebtoken");
const JWT_SECRET  = process.env.ACCESS_TOKEN

const createToken = (userId) => {
  try {
    const token = jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: "30d", // expires in 24 hours
    });
    return token;
  } catch (error) {
    // log.error("Error from [Token HELPER]:", error);
    throw error;
  }
};

const verifyToken = (token) => {
  try {
    // console.log(token);
    const decode = jwt.verify(token, JWT_SECRET);
    // console.log(token)
    return decode;
  } catch (error) {
    // log.error("Error from [Token HELPER]: ", error);
    console.log(error);
    throw false;
  }
};

module.exports = { createToken, verifyToken };
