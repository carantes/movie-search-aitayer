import "module-alias/register";
import server from "@config/server";
import cache from "@config/cache";
import logger from "@config/logger";
import { PORT } from "@helpers/constants";

server.set("cache", cache);

server.listen(parseInt(<string>PORT), () => {
  logger.info(`Running app at http://localhost:${PORT}`);
});

process.on("uncaughtException", err => {
  logger.error("There was an uncaught error", err);
  process.exit(1);
});
