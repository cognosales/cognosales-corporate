import http from "http";
import handler from "./dist/server/server.js";

const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  handler(req, res);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on ${port}`);
});
