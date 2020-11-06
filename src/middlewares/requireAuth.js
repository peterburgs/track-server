const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: "Authorization required",
    });
  }
  const rawToken = authorization.split(" ");
  const token = rawToken[1];
  console.log(token);
  jwt.verify(token, "SECRET_KEY", async (error, payload) => {
    if (error) {
      console.log(error.message);
      return res.status(401).json({
        message: error.message,
      });
    }
    const { userId } = payload;
    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};
