import { Request, Response, NextFunction } from "express";
import httpStatus from "@helpers/httpStatus";
import logger from "@config/logger";

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.error(err.stack);
  res.status(httpStatus.ServerError).send("Ops, something is wrong!");
}

export default errorHandler;
