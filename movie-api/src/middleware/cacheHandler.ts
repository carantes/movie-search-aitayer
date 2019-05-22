import { Request, Response, NextFunction } from "express";

const cacheHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const cache = req.app.get("cache"); //redis
  const keyName = req.originalUrl;
  const data = await cache.getAsync(keyName);

  if (data) {
    console.log(`Hit cache for ${keyName}`);
    return res.send(JSON.parse(data));
  }

  next();
};

export default cacheHandler;
