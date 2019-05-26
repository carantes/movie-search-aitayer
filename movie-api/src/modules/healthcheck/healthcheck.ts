import { Router, Request, Response } from "express";

class Healthcheck {
  public routes: Router;

  constructor() {
    this.routes = Router();
    this.config();
  }

  private config(): void {
    this.routes.get("/", this.getHealthcheck);
  }

  public getHealthcheck(_: Request, res: Response): void {
    res.status(200).send({
      message: "Movie API is running...",
    });
  }
}

export default new Healthcheck().routes;
