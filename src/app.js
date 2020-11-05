const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const app = express();

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

// Body Parser
app.use(bodyParser.json());

// User Routers
app.use(authRoute);

module.exports = app;
