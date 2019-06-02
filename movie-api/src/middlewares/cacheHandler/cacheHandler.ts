import { Request, Response, NextFunction } from "express";
import logger from "@config/logger";
import { CacheClient } from "@config/cache";

const cacheHandler = (client: CacheClient) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const keyName = req.originalUrl;
  logger.info(`Search for ${keyName} on redis`);
  const data = await client.getAsync(keyName);
  const cachePolicy = { "Cache-Control": "public", "max-age": 60 };

  if (data) {
    logger.info(`Hit cache for ${keyName}`);
    return res.header(cachePolicy).send(JSON.parse(data));
  } else {
    res.sendResponse = res.send;
    res.send = (body: any): any => {
      if (!JSON.parse(body).errors) {
        logger.info(`Saving cache for ${keyName}`);
        client.setAsync(keyName, body);
      }
      return res.header(cachePolicy).sendResponse(body);
    };

    next();
  }
};

export default cacheHandler;
