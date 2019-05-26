import { Request, Response, NextFunction } from "express";
import logger from "@config/logger";

const cacheHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const cache = req.app.get("cache"); //redis
  const keyName = req.originalUrl || req.url;
  logger.info(`Search for ${keyName} on redis`);
  const data = await cache.getAsync(keyName);
  // const cachePolicy = { "Cache-Control": "public", "max-age": 60 };

  if (data) {
    logger.info(`Hit cache for ${keyName}`);
    return res.send(JSON.parse(data));
  } else {
    res.sendResponse = res.send;
    res.send = (body: any): any => {
      if (!JSON.parse(body).errors) {
        logger.info(`Saving cache for ${keyName}`);
        cache.setAsync(keyName, body);
      }
      return res.sendResponse(body);
    };

    next();
  }
};

export default cacheHandler;
