import * as redis from "redis";
import { promisify } from "util";
import logger from "@config/logger";
import { REDIS_HOST, REDIS_PORT } from "@helpers/constants";

class Cache extends redis.RedisClient {
  public getAsync: Promise<any>;
  public setAsync: Promise<any>;
  public flushdbAsync: Promise<any>;

  constructor() {
    super({ host: REDIS_HOST, port: parseInt(<string>REDIS_PORT) });

    this.getAsync = promisify(this.get).bind(this);
    this.setAsync = promisify(this.set).bind(this);
    this.flushdbAsync = promisify(this.flushdb).bind(this);

    this.on("connect", () => {
      logger.info(
        `REDIS connected on host ${REDIS_HOST} and port ${REDIS_PORT}`,
      );
    });

    this.on("error", e => {
      logger.error("REDIS ERROR", e);
    });
  }
}

export default new Cache();
