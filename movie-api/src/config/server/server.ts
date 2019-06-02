import * as express from "express";
import * as bodyParser from "body-parser";
import { Application } from "express";
import * as helmet from "helmet";
import * as responseTime from "response-time";
import errorHandler from "@middlewares/errorHandler";
import logger from "@config/logger";
class Server {
  public app: Application;
  public port: number;

  constructor(controllers: Array<any>, port: number) {
    this.app = express();
    this.config();
    this.routes(controllers);
    this.port = port;
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(errorHandler);
    this.app.use(helmet());
    this.app.disable("x-powered-by");
    this.app.use(responseTime());
  }

  private routes(controllers: Array<any>): void {
    controllers.forEach(controller => {
      this.app.use("/", controller.router);
    });
  }

  public listen(): any {
    this.app.listen(this.port, () => {
      logger.info(`Running app at http://localhost:${this.port}`);
    });
  }
}

export default Server;
