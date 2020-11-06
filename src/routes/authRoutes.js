const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const router = express.Router();
const jwt = require("jsonwebtoken");

// POST method: Sign up
router.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  const token = jwt.sign({ userId: user._id }, "SECRET_KEY", {
    expiresIn: "24h",
  });
  console.log("*LOG: Saving user to database");
  await user
    .save()
    .then((result) => {
      console.log("*LOG: ", result);
      res.status(201).json({
        message: "Sign up successfully",
        user,
        token,
      });
    })
    .catch((error) => {
      console.log("*LOG: " + error.message);
      res.status(500).json({
        message: error.message,
      });
    });
});

// POST method: sign in user
router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      message: "Email or Password is incorrect",
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).json({
      message: "Invalid email or password",
    });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "SECRET_KEY");

    res.status(200).json({
      message: "Log in successful",
      token,
    });
  } catch (err) {
    return res.status(422).json({
      message: "Invalid email or password",
    });
  }
});

module.exports = router;
