const express = require("express");

const router = express.Router();

// POST method: Sign up
router.post("/signup", (req, res, next) => {
  res.status(201).json({
    message: "Sign up successfully",
  });
});
module.exports = router;
