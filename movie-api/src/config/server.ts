import * as express from "express";
import * as bodyParser from "body-parser";
import { Application, Request, Response, NextFunction } from "express";
import { errorHandler } from "../middleware";
import * as helmet from "helmet";
import * as responseTime from "response-time";
import healthcheck from "../modules/healthcheck";
import movie from "../modules/movie";
import { promises } from "fs";

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    // TODO: Middleware para tratar CSP errors
    // TODO: Middleware de logs
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(errorHandler);
    this.app.use(helmet());
    this.app.disable("x-powered-by");
    this.app.use(responseTime());
  }

  private routes(): void {
    this.app.use("/", healthcheck);
    this.app.use("/api", movie);
  }
}

export default new Server().app;
