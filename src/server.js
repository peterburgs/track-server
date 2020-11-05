const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const port = process.env.PORT || 3001;

server.listen(port);
if (!server) {
  console.log("Could not start server on port " + port);
} else {
  console.log("Server listening on port " + port);
}
