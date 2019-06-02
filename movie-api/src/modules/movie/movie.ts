import { Router, Request, Response, NextFunction, response } from "express";
import { check, validationResult } from "express-validator/check";
import { OMDB_API_KEY, OMDB_API_URL } from "@helpers/constants";
import { CacheClient } from "@config/cache";
import cacheHandler from "@middlewares/cacheHandler";
import httpStatus from "@helpers/httpStatus";
import fetchHelper from "@helpers/fetchHelper";
import logger from "@config/logger";

class Movie {
  public path = "/api/search";
  public router = Router();

  constructor(cache?: CacheClient) {
    this.config(cache);
  }

  private config = (cache?: CacheClient) => {
    const middlewares: Array<any> = [[check("keyword").isLength({ min: 3 })]];
    cache && middlewares.push(cacheHandler(cache));

    this.router.get(this.path, ...middlewares, this.getMovies);
  };

  private getMovies = async (
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

  private getURLParams = (keyword: string, page: number) => {
    return `${OMDB_API_URL}?apikey=${OMDB_API_KEY}&s=${keyword}&page=${page}`;
  };

  private parseMovies = (data: Object) => {
    return [].concat(data[0].Search, data[1].Search);
  };
}

export default Movie;
