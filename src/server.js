const http = require("http");
const app = require("./index");
const server = http.createServer(app);

const port = process.env.PORT || 3001;

server.listen(port);
if (!server) {
  console.log("*LOG: Could not start server on port " + port);
} else {
  console.log("*LOG: Server listening on port " + port);
}
