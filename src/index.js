require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const bodyParser = require("body-parser");
const requireAuth = require("./middlewares/requireAuth");
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Test connection status
mongoose.connection.on("connected", () => {
  console.log("*LOG: Connected to MongoDB successfully!");
});
mongoose.connection.on("error", () => {
  console.log("*LOG: Fail to connect to MongoDB!");
});

// Body Parser
app.use(bodyParser.json());

// User Routers
app.use(authRoutes);
app.use(trackRoutes);
// GET
app.get("/", requireAuth, (req, res) => {
  res.status(200).json({
    message: `Welcome ${req.user.email}`,
  });
});
module.exports = app;
