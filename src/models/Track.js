const mongoose = require("mongoose");
const pointSchema = new mongoose.Schema({
  timestamp: { type: Number, default: 0 },
  coords: {
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 },
    altitude: { type: Number, default: 0 },
    accuracy: { type: Number, default: 0 },
    heading: { type: Number, default: 0 },
    speed: { type: Number, default: 0 },
  },
});
const trackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    default: "Default User",
  },
  locations: [pointSchema],
});
mongoose.model("Track", trackSchema);
