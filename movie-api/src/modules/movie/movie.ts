import { Router, Request, Response, NextFunction, response } from "express";
import { check, validationResult } from "express-validator/check";
import cacheHandler from "@middleware/cacheHandler";
import httpStatus from "@helpers/httpStatus";
import fetchHelper from "@helpers/fetchHelper";

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

  private getMovies = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { keyword = "" } = req.query;
    const urlPage1 = this.getURLParams(keyword, 1);
    const urlPage2 = this.getURLParams(keyword, 2);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatus.BadRequest).json({ errors: errors.array() });
    }

    const data = await fetchHelper
      .getAll([urlPage1, urlPage2])
      .then(this.parseMovies);

    const cacheObj = req.app.get("cache"); //Redis
    await cacheObj.setAsync(req.originalUrl, JSON.stringify(data));
    const cachePolicy = { "Cache-Control": "public", "max-age": 60 };

    return res
      .header(cachePolicy)
      .status(httpStatus.OK)
      .json(data);
  };

  private flushCache = async (req: Request, res: Response) => {
    const result = await req.app.get("cache").flushdbAsync();
    res.status(httpStatus.OK).send(result);
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
