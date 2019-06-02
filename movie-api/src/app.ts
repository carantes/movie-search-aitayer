import "module-alias/register";
import Server from "@config/server";
import Cache from "@config/cache";
import logger from "@config/logger";
import { PORT, REDIS_HOST, REDIS_PORT } from "@helpers/constants";
import Healthcheck from "@modules/healthcheck";
import Movie from "@modules/movie";
import Admin from "@modules/admin";

const cache = new Cache(REDIS_HOST, parseInt(<string>REDIS_PORT));
const controllers = [new Healthcheck(), new Movie(cache), new Admin(cache)];
const server = new Server(controllers, parseInt(<string>PORT));

server.listen();

process.on("uncaughtException", err => {
  logger.error("There was an uncaught error", err);
  process.exit(1);
});
