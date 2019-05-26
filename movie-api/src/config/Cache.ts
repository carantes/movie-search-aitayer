import * as redis from "redis";
import { promisify } from "util";
import logger from "@config/logger";

class Cache extends redis.RedisClient {
  public getAsync: Promise<any>;
  public setAsync: Promise<any>;
  public flushdbAsync: Promise<any>;

  constructor(host?: string, port?: number) {
    super({ host, port });

    this.getAsync = promisify(this.get).bind(this);
    this.setAsync = promisify(this.set).bind(this);
    this.flushdbAsync = promisify(this.flushdb).bind(this);

    this.on("connect", () => {
      logger.info(`REDIS connected on host ${host} and port ${port}`);
    });

    this.on("error", e => {
      logger.info("REDIS ERROR", e);
    });
  }
}

export default Cache;
