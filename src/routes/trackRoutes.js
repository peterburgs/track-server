const express = require("express");
const mongoose = require("mongoose");

const requireAuth = require("../middlewares/requireAuth");

const Track = mongoose.model("Track");
const router = express.Router();

// Ensure Router use middleware
router.use(requireAuth);

// GET Method: get a track
router.get("/tracks", async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id });
  res.status(200).json({
    message: "All tracks found",
    count: tracks.length,
    tracks,
  });
});

router.post("/tracks", async (req, res) => {
  const { name, locations } = req.body;
  if (!name || !locations) {
    return res
      .status(404)
      .json({ message: "Name or locations cannot be empty" });
  }
  const track = new Track({ userId: req.user._id, name, locations });
  track
    .save()
    .then(() => {
      res.status(201).json({ message: "Track saved", track });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ message: "Track could not be saved", track });
    });
});
module.exports = router;
