import { Router, Request, Response, NextFunction, response } from "express";
import { check, validationResult } from "express-validator/check";
import cacheHandler from "@middlewares/cacheHandler";
import httpStatus from "@helpers/httpStatus";
import fetchHelper from "@helpers/fetchHelper";
import logger from "@config/logger";

class Movie {
  public routes: Router;

  constructor() {
    this.routes = Router();
    this.config();
  }

  private config(): void {
    this.routes
      .get(
        "/search",
        [check("keyword").isLength({ min: 3 })],
        cacheHandler,
        this.getMovies,
      )
      .get("/clear", this.flushCache);
  }

  public getMovies = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { keyword = "" } = req.query;
    logger.info(`Get movies with keyword: ${keyword}`);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn(`Request validation error for keyword: ${keyword}`, errors);
      return res.status(httpStatus.BadRequest).json({ errors: errors.array() });
    }

    const urlPage1 = this.getURLParams(keyword, 1);
    const urlPage2 = this.getURLParams(keyword, 2);

    const data = await fetchHelper
      .getAll([urlPage1, urlPage2])
      .then(this.parseMovies)
      .catch(logger.error);

    return res.status(httpStatus.OK).json(data);
  };

  public flushCache = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    logger.info(`Start flushing cache...`);

    try {
      const result = await req.app.get("cache").flushdbAsync();
      logger.info(`Cache is empty`);
      res.status(httpStatus.OK).send(result);
    } catch (err) {
      next(err);
    }
  };

  private getURLParams = (keyword: string, page: number) => {
    const { OMDB_API_KEY, OMDB_API_URL } = process.env;
    return `${OMDB_API_URL}?apikey=${OMDB_API_KEY}&s=${keyword}&page=${page}`;
  };

  private parseMovies = (data: Object) => {
    return [].concat(data[0].Search, data[1].Search);
  };
}

export default new Movie().routes;
