import * as redis from "redis";
import { promisify } from "util";
import logger from "@config/logger";

class Cache implements CacheClient {
  public getAsync: (key: string) => Promise<any>;
  public setAsync: (key: string, value: string) => Promise<any>;
  public flushdbAsync: any;

  constructor(host: string, port: number) {
    const client = new redis.RedisClient({ host, port });

    this.getAsync = promisify(client.get).bind(client);
    this.setAsync = promisify(client.set).bind(client);
    this.flushdbAsync = promisify(client.flushdb).bind(client);

    client.on("connect", () => {
      logger.info(`REDIS connected on host ${host} and port ${port}`);
    });

    client.on("error", e => {
      logger.error("REDIS ERROR", e);
    });
  }
}

export interface CacheClient {
  getAsync(key: string): Promise<any>;
  setAsync(key: string, value: string): Promise<any>;
  flushdbAsync(): Promise<any>;
}

export default Cache;
