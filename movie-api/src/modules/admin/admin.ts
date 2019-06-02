import { Router, Request, Response, NextFunction, response } from "express";
import { CacheClient } from "@config/cache";
import httpStatus from "@helpers/httpStatus";
import logger from "@config/logger";

class Admin {
  public path = "/api/clear";
  public router = Router();

  constructor(cache?: CacheClient) {
    this.config(cache);
  }

  private config = (cache?: CacheClient) => {
    this.router.get(this.path, this.flushCache(cache));
  };

  private flushCache = client => async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    logger.info(`Start flushing cache...`);

    try {
      const result = await client.flushdbAsync();
      logger.info(`Cache is empty`);
      res.status(httpStatus.OK).send(result);
    } catch (err) {
      next(err);
    }
  };
}

export default Admin;
