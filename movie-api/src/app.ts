import { server, Cache } from "./config";
import * as dotenv from "dotenv";
dotenv.config();

const {
  PORT = 3000,
  REDIS_HOST = "localhost",
  REDIS_PORT = 6379,
} = process.env;

// TODO: Cast redis port
server.set("cache", new Cache(REDIS_HOST, 6379));

server.listen(PORT, () => {
  console.log(`Running app at http://localhost:${PORT}`);
});

process.on("uncaughtException", err => {
  console.error("There was an uncaught error", err);
  process.exit(1);
});
