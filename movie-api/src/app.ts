import "module-alias/register";
import server from "@config/server";
import Cache from "@config/Cache";
import logger from "@config/logger";
import { PORT, REDIS_HOST, REDIS_PORT } from "@config/settings";

const cache = new Cache(REDIS_HOST, parseInt(<string>REDIS_PORT));
server.set("cache", cache);

server.listen(parseInt(<string>PORT), () => {
  logger.info(`Running app at http://localhost:${PORT}`);
});

process.on("uncaughtException", err => {
  logger.error("There was an uncaught error", err);
  process.exit(1);
});
