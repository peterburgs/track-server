const express = require("express");
const mongoose = require("mongoose");
//const authRoute = require("./routes/authRoutes");
const bodyParser = require("body-parser");
// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Test connection status
mongoose.connection.on("connected", () => {
  console.log("*LOG: Connected to MongoDB successfully!");
});
mongoose.connection.on("error", () => {
  console.log("*LOG: Fail to connect to MongoDB!");
});

const app = express();

// Body Parser
app.use(bodyParser.json());

// User Routers
//app.use(authRoute);

// GET Method: get all
app.get("/", (req, res, next) => {});

module.exports = app;
